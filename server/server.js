import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { sign } from "jsonwebtoken";
import multer from 'multer';
import nodemailer from "nodemailer";
import path from 'path';
import { authenticate } from "../src/middleware/auth";


dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const generateJwt = (admin) => {
  return sign({ username: admin.username }, 'JWT_SECRET')
}

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/wiki')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});


app.post("/api/admin", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);

    const admin = await prisma.admin.create({
      data: { ...req.body, password: hashedPassword }
    });

    const { password: _password, ...adminWithoutPassword } = admin
    res.json({ ...adminWithoutPassword, token: generateJwt(admin) });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error)
  }
});

app.get("/api/admin", authenticate, async (req, res, next) => {
  try {
    if (!req.admin) {
      return res.sendStatus(401)
    }
    const { password: _password, ...adminWithoutPassword } = req.admin
    res.json({ ...adminWithoutPassword, token: generateJwt(req.admin) });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    next(error)
  }
})

// Admin login
app.post("/api/admin/login", async (req, res, next) => {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: req.body.email }
    });

    if (!admin) {
      res.json({ error: "Username not found" })
    }
    const isPasswordCorrect = await compare(req.body.password, admin.password)
    if (!isPasswordCorrect) {
      res.json({ error: "Password incorrect" })
    }
    const { password: _password, ...adminWithoutPassword } = admin

    res.json({ ...adminWithoutPassword, token: generateJwt(admin) });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error: error.message });
    
    next(error)
  }
});

// Add licenses (multiple at once)
app.post("/api/admin/licenses", authenticate, async (req, res, next) => {
  try {
    if (!req.admin) {
      return res.sendStatus(401)
    }

    const { licenses } = req.body;
    if (!Array.isArray(licenses) || licenses.length === 0) {
      return res.status(400).json({ success: false, error: "No licenses provided" });
    }

    const editedLicenses = licenses.map(l => ({
      ...l,
      costPrice: l.costPrice ? Number(l.costPrice) : 0,
      salesPrice: l.salesPrice ? Number(l.salesPrice) : undefined,
      discount: l.discount ? Number(l.discount) : undefined,
      noOfUsers: l.noOfUsers ? Number(l.noOfUsers) : undefined,
      noOfDeactivation: l.noOfDeactivation ? Number(l.noOfDeactivation) : 0,
      purchaseDate: l.purchaseDate ? new Date(l.purchaseDate).toISOString() : undefined,
      soldDate: l.soldDate ? new Date(l.soldDate).toISOString() : undefined,
      lastDeactivated: l.lastDeactivated ? new Date(l.lastDeactivated).toISOString() : undefined,
    }));
    const created = await prisma.license.createMany({ data: editedLicenses });
    res.json({ success: true, created });


  } catch (error) {
    res.status(400).json({ success: false, error: error.message });

    next(error)
  }

});

// Get all licenses
app.get("/api/admin/licenses", authenticate, async (req, res, next) => {
  try {
    const licenses = await prisma.license.findMany();
    res.json(licenses);
  } catch (error) {
    next(error)
  }
});

// Mark license as sold
app.post("/api/admin/licenses/:id/sell", authenticate, async (req, res) => {
  const { id } = req.params;
  const { userId, soldDate } = req.body;
  try {
    const license = await prisma.license.update({
      where: { id: Number(id) },
      data: { status: "sold", soldDate, userId }
    });
    res.json({ success: true, license });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Deactivate/reset license
app.post("/api/admin/licenses/:id/deactivate", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const license = await prisma.license.update({
      where: { id: Number(id) },
      data: { status: "deactivated", lastDeactivated: new Date() }
    });
    res.json({ success: true, license });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Sales details (example)
app.get("/api/admin/sales", authenticate, async (req, res) => {
  const sales = await prisma.sale.findMany({ include: { user: true } });
  res.json(sales);

});

app.delete('/api/admin/quotes/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.quotation.delete({
      where: { id: Number(id) }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Quote/Invoice (example)
app.put("/api/admin/quotes/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId, items, subTotal, discount, discountType, taxable, tax, total, price, message, notes, validUntil, status
    } = req.body;

    const quote = await prisma.quotation.update({
      where: { id: Number(id) },
      data: {
        userId, items, subTotal, discount, discountType, taxable, tax, total, price, message, notes, validUntil, status
      }
    });
    res.json({ success: true, quote });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Quote/Invoice (example)
app.post("/api/admin/quotes", authenticate, async (req, res) => {
  try {
    const quote = await prisma.quotation.create({
      data: req.body
    });
    res.json({ success: true, quote });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Get Settings
app.get("/api/admin/settings", async (req, res) => {
  try {
    const settings = await prisma.settings.findMany();
    res.json(settings);
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});


// Settings create
app.post("/api/admin/settings", authenticate, async (req, res) => {
  const { settings } = req.body;
  const data = settings.map(s => ({
    key: s.key,
    value: s.value,
    description: s.description
  }));
  try {
    const quote = await prisma.settings.createMany({
      data: data
    });
    res.json({ success: true, quote });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Quote/Invoice (example)
app.get("/api/admin/quotes", authenticate, async (req, res) => {
  try {
    const quotes = await prisma.quotation.findMany(
      { include: { user: true } }
    );
    res.json(quotes);
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Get all licenses
app.get("/api/admin/users", authenticate, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });

    next(error)
  }
});



// Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wiki Routes
app.get('/api/wikis', async (req, res) => {
  try {
    const wikis = await prisma.wiki.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { category: true }
    });
    res.json(wikis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/wikis', authenticate, async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const wiki = await prisma.wiki.create({
      data: { title, content, slug, categoryId }
    });
    res.json(wiki);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/wikis/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const wiki = await prisma.wiki.update({
      where: { id: id },
      data: { title, content, slug, categoryId }
    });
    res.json(wiki);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/wikis/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.wiki.delete({
      where: { id: Number(id) }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add image upload endpoint
app.post('/api/admin/wiki/upload', authenticate, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const imageUrl = `/uploads/wiki/${req.file.filename}`;
    res.json({
      success: true,
      file: {
        url: imageUrl,
        name: req.file.originalname
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/wikis/:category', async (req, res) => {

  try {
    const { category } = req.params;
    const wikiCat = await prisma.category.findFirst({ where: { slug: category } });
    const wikis = await prisma.wiki.findMany({
      where: {
        categoryId: wikiCat.id
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    if (!wikis) {
      return res.status(404).json({ error: 'Wikis not found' });
    }
    res.json(wikis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/wikis/:category/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const wiki = await prisma.wiki.findUnique({
      where: { slug }
    });

    if (!wiki) {
      return res.status(404).json({ error: 'Wiki not found' });
    }

    res.json(wiki);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// FAQ Routes
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/faqs', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const faq = await prisma.faq.create({
      data: { title, content }
    });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/faqs/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const faq = await prisma.faq.update({
      where: { id: Number(id) },
      data: { title, content }
    });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/faqs/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.faq.delete({
      where: { id: Number(id) }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Add image upload endpoint
app.post('/api/admin/faq/upload', authenticate, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const imageUrl = `/uploads/faq/${req.file.filename}`;
    res.json({
      success: true,
      file: {
        url: imageUrl,
        name: req.file.originalname
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/faqs/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const faqs = await prisma.faq.findMany({
      where: { category }
    });

    if (!faqs) {
      return res.status(404).json({ error: 'Wikis not found' });
    }

    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create user/customer
app.post('/api/users', async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create sale/order
app.post('/api/sales', async (req, res) => {
  try {
    const sale = await prisma.sale.create({ data: req.body });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find user by email
app.get('/api/users/by-email/:email', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email }
    });
    if (user) return res.json(user);
    res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/licenses', async (req, res) => {
  let { type, quantity, status } = req.query;

  try {
    const licenses = await prisma.license.findMany({
      where: { status },
      include: {
        product: true
      }
    });
    res.json(licenses);    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/api/licenses/bulk-update', async (req, res) => {
  const { licenseIds, saleId, soldDate } = req.body;
  await prisma.license.updateMany({
    where: { id: { in: licenseIds } },
    data: { saleId, soldDate: new Date(soldDate), status: 'sold' }
  });
  res.json({ success: true });
});

app.put('/api/sales/:id', async (req, res) => {
  const { id } = req.params;
  const { soldDate, status } = req.body;
  const sale = await prisma.sale.update({
    where: { id: Number(id) },
    data: { soldDate: new Date(soldDate), status }
  });
  res.json(sale);
});

app.use('/uploads', express.static('public/uploads'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Admin backend running on http://localhost:${PORT}`);
});
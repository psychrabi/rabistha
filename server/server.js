import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authenticate } from "../src/middleware/auth";
import multer from 'multer';
import path from 'path';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
const generateJwt = (admin) => {
  return sign({ username: admin.username }, 'JWT_SECRET')
}

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
app.post("/api/admin/login", async (req, res) => {
  try {
    const admin = await prisma.admin.findFirst({
      where: { username: req.body.username }
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
  const sales = await prisma.sale.findMany({ include: { user: true, license: true } });
  res.json(sales);
});

// Quote/Invoice (example)
app.post("/api/admin/quote", authenticate, async (req, res) => {
  const { userId, licenseId, type, price, message } = req.body;
  try {
    const quote = await prisma.quoteInvoice.create({
      data: { userId, licenseId, type, price, message }
    });
    res.json({ success: true, quote });
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


// Wiki Routes
app.get('/api/admin/wikis', authenticate, async (req, res) => {
  try {
    const wikis = await prisma.wiki.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    res.json(wikis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/wikis', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const wiki = await prisma.wiki.create({
      data: { title, content, slug }
    });
    res.json(wiki);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/wikis/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const wiki = await prisma.wiki.update({
      where: { id: Number(id) },
      data: { title, content, slug }
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

app.get('/api/wiki/:slug', async (req, res) => {
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

app.use('/uploads', express.static('public/uploads'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Admin backend running on http://localhost:${PORT}`);
});
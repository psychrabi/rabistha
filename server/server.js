import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authenticate } from "../src/middleware/auth";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
const generateJwt =(admin) => {
  return sign({username:admin.username}, 'JWT_SECRET')
}

app.post("/api/admin", async (req, res) => {
  try {    
    const hashedPassword = await hash(req.body.password, 10);

    const admin = await prisma.admin.create({
      data: {...req.body, password: hashedPassword}
    });

    const {password: _password, ...adminWithoutPassword} = admin 
    res.json({...adminWithoutPassword, token: generateJwt(admin)});
  } catch (error) {
    res.json({error: "username is not unique"})
  }

});

app.get("/api/admin", authenticate, async(req, res, next) =>{
  try {
    if(!req.admin){
      return res.sendStatus(401)
    }
    const {password: _password, ...adminWithoutPassword} = req.admin 
    res.json({...adminWithoutPassword, token: generateJwt(req.admin)});
  } catch (error) {
    next(error)
  }
} )

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const admin = await prisma.admin.findFirst({
      where: { username: req.body.username }
    });

    if (!admin) {
      res.json({error: "Username not found"})
    }
    const isPasswordCorrect = await compare(req.body.password, admin.password)
    if(!isPasswordCorrect){
      res.json({error: "Password incorrect"})
    }
    const {password: _password, ...adminWithoutPassword} = admin
 
    res.json({...adminWithoutPassword, token: generateJwt(admin)});
  } catch (error) {
    res.json({error: "Username or password are incorrect"})
  }

});

// Add licenses (multiple at once)
app.post("/api/admin/licenses", authenticate, async (req, res, next) => {
  try {
    if(!req.admin){
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
    res.status(400).json({ success: false, error: e.message });

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
    next(error)
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Admin backend running on http://localhost:${PORT}`);
});
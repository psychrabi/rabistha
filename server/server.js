import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Admin login
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await prisma.admin.findFirst({
    where: { username, password }
  });
  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  res.json({ success: true, admin: { id: admin.id, username: admin.username } });
});

// Add licenses (multiple at once)
app.post("/api/admin/licenses", async (req, res) => {
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

  try {
    const created = await prisma.license.createMany({ data: editedLicenses });
    res.json({ success: true, created });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Get all licenses
app.get("/api/admin/licenses", async (req, res) => {
  const licenses = await prisma.license.findMany();
  console.log(licenses);
  res.json(licenses);
});

// Mark license as sold
app.post("/api/admin/licenses/:id/sell", async (req, res) => {
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
app.post("/api/admin/licenses/:id/deactivate", async (req, res) => {
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
app.get("/api/admin/sales", async (req, res) => {
  const sales = await prisma.sale.findMany({ include: { user: true, license: true } });
  res.json(sales);
});

// Quote/Invoice (example)
app.post("/api/admin/quote", async (req, res) => {
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Admin backend running on http://localhost:${PORT}`);
});
import { useState } from "react";

export default function QuoteInvoice() {
  const [form, setForm] = useState({
    customer: "",
    email: "",
    license: "",
    price: "",
    message: "",
    type: "quote",
  });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });



  const saveToLocalStorage = data => {
    const quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
    quotes.push(data);
    localStorage.setItem("quotes", JSON.stringify(quotes));
  };

  const generatePDF = async data => {
    // Dynamically import jsPDF to avoid SSR issues if any
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(data.type === "invoice" ? "Invoice" : "Quote", 10, 15);

    doc.setFontSize(12);
    doc.text(`Customer: ${data.customer}`, 10, 30);
    doc.text(`Email: ${data.email}`, 10, 40);
    if (data.license) doc.text(`License: ${data.license}`, 10, 50);
    if (data.price) doc.text(`Price: ${data.price}`, 10, 60);
    if (data.message) doc.text(`Message: ${data.message}`, 10, 70);

    doc.save(`${data.type}-${data.customer || "document"}.pdf`);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    saveToLocalStorage(form);
    await generatePDF(form);
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-10  p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Send Quote / Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Customer Name</label>
          <input name="customer" value={form.customer} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block font-medium">License</label>
          <input name="license" value={form.license} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Price</label>
          <input name="price" value={form.price} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded p-2">
            <option value="quote">Quote</option>
            <option value="invoice">Invoice</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded" type="submit">Send</button>
        {sent && <div className="text-green-600 mt-2">Sent!</div>}
      </form>
    </div>
  );
}
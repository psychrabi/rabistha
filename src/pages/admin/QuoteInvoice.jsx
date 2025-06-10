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

  const handleSubmit = e => {
    e.preventDefault();
    // Implement sending logic here (API/email)
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
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
import { useState } from "react";
import { useAdminStore } from "../../store/adminStore";
import { useNavigate } from "react-router-dom";

export default function AddLicense() {
  const [form, setForm] = useState({
    license: "",
    type: "",
    noOfUsers: "",
    costPrice: "",
    salesPrice: "",
    discount: "",
    purchaseDate: "",
    replacementLicense: "",
  });
  const [multi, setMulti] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addLicense } = useAdminStore();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleMultiChange = e => setMulti(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (!multi.trim()) {
      setError("Enter at least one license key.");
      return;
    }
    const licenses = multi.split(/[\s,]+/).filter(Boolean);
    licenses.forEach(licenseKey => {
      addLicense({
        ...form,
        license: licenseKey,
        status: "-",
        noOfDeactivation: 0,
        lastDeactivated: null,
        soldDate: "",
      });
    });
    navigate("/rabistha/admin");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Licenses</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">License Key(s) (comma or newline separated)</label>
          <textarea
            name="multi"
            value={multi}
            onChange={handleMultiChange}
            rows={3}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Type</label>
            <input name="type" value={form.type} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block font-medium">No of Users</label>
            <input name="noOfUsers" value={form.noOfUsers} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block font-medium">Cost Price</label>
            <input name="costPrice" value={form.costPrice} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block font-medium">Sales Price</label>
            <input name="salesPrice" value={form.salesPrice} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block font-medium">Discount</label>
            <input name="discount" value={form.discount} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium">Purchase Date</label>
            <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium">Replacement License</label>
            <input name="replacementLicense" value={form.replacementLicense} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Licenses</button>
      </form>
    </div>
  );
}
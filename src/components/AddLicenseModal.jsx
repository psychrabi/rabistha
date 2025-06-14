import { useState } from "react";
import { useAdminStore } from "../store/adminStore";

export default function AddLicenseModal() {
	const [form, setForm] = useState({
		license: "",
		type: "",
		costPrice: "",
		purchaseDate: "",
	});
	const { addLicense } = useAdminStore();
	const [multi, setMulti] = useState("");
	const [error, setError] = useState("");
	const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

	const handleMultiChange = e => setMulti(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!multi.trim()) {
			setError("Enter at least one license key.");
			return;
		}
		const licenseKeys = multi.split(/[\s,]+/).filter(Boolean);
		const licenses = licenseKeys.map(licenseKey => ({
			...form,
			license: licenseKey,
			status: "available", // Default status
		}));

		// Call your API or store method with all licenses at once
		addLicense(licenses).then(response => {
			console.log(response)
			navigate("/rabistha/admin/licenses");
		})
	};

	return (
		<dialog className="modal" id="addLicenseModal">
			<div className="modal-box">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm text-gray-500 dark:text-gray-300">License Key(s) (comma or newline separated)</label>
						<textarea
							name="multi"
							value={multi}
							onChange={handleMultiChange}
							rows={3}
							className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
							required
						/>
					</div>
					<div>
						<label className="block text-sm text-gray-500 dark:text-gray-300">Type</label>
						<select
							name="type"
							value={form.type}
							onChange={handleChange}
							className="select block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
							required
						>
							<option value="" disabled>Select type</option>
							<option value="Pro-2">Pro-2</option>
							<option value="Pro-3">Pro-3</option>
							<option value="Pro-6">Pro-6</option>
							<option value="Annual-2">Annual-2</option>
							<option value="Annual-3">Annual-3</option>
							<option value="Annual-6">Annual-6</option>
						</select>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-300">Cost Price</label>
							<input name="costPrice" value={form.costPrice} onChange={handleChange} className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" required />
						</div>
						<div>
							<label className="block text-sm text-gray-500 dark:text-gray-300">Purchase Date</label>
							<input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
						</div>
					</div>
					{error && <div className="text-red-600">{error}</div>}
					<button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Licenses</button>
				</form>
			</div>
		</dialog>
	)
}

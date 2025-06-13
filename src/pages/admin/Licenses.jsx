import { useState } from "react";
import { useAdminStore } from "../../store/adminStore";
import { useNavigate } from "react-router-dom";
import { Edit2, Plus } from "lucide-react";

export default function Licenses() {
	const [form, setForm] = useState({
		license: "",
		type: "",
		costPrice: "",
		purchaseDate: "",
	});
	const [multi, setMulti] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { addLicense, licenses } = useAdminStore();

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
		addLicense(licenses).then(response =>{
			console.log(response)
			navigate("/rabistha/admin/licenses");
		})
		
			
		
	};

	return (
		<section className="w-full p-6 overflow-y-auto">
			<div className="sm:flex sm:items-center sm:justify-between">
				<h2 className="text-lg font-medium text-gray-800 dark:text-white">Licenses</h2>
				<div className="flex items-center mt-4 gap-x-3">
					{/* <button className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700">
                View Sales
            </button> */}
					<button type="button" onClick={() => document.getElementById('addLicenseModal').showModal()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
						<Plus className="w-5 h-5" />
						<span>Add Licenses</span>
					</button>
				</div>
			</div>
			<div className="flex flex-col mt-6">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full py-2 align-middle ">
						<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-gray-800">
									<tr>
										<th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											<div className="flex items-center gap-x-3">

												<span>License</span>
											</div>
										</th>

										<th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											Type
										</th>

										<th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											Cost Price
										</th>

										<th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											Purchase Date
										</th>

										<th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
											Status
										</th>

										<th scope="col" className="relative py-3.5 px-4">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
									{licenses.map((license, index) => (
										<tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
											<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
												{license.license}
											</td>
											<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
												{license.type}
											</td>
											<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">$ {license.costPrice}</td>
											<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{license.purchaseDate}</td>
											<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap capitalize">{license.status}</td>
											<td className="px-4 py-4 text-sm whitespace-nowrap">
												<button type="button" className="relative z-10 block p-2 text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
													<Edit2 className="w-5 h-5" />
												</button>
											</td>
										</tr>
									))}


								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="flex items-center justify-between mt-6">
				<a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
					</svg>
					<span>
						previous
					</span>
				</a>
				<div className="items-center hidden md:flex gap-x-3">
					<a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
					<a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
					<a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
					<a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
					<a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
					<a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
					<a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
				</div>
				<a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
					<span>
						Next
					</span>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
					</svg>
				</a>
			</div> */}
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
		</section>
	);
}
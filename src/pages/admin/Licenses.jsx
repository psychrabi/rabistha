import { useState } from "react";
import { useAdminStore } from "../../store/adminStore";
import { useNavigate } from "react-router-dom";
import { Edit2, Key, Plus, Search } from "lucide-react";
import AddLicenseModal from "../../components/AddLicenseModal";


export default function Licenses() {

	const [multi, setMulti] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { licenses } = useAdminStore();
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredLicenses = licenses.filter(license => {

		const matchesSearch = license.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
			license.type.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = license.type === filterType;

		const matchesStatus = filterStatus === "all" ||
			(filterStatus === "available" && !license.isSold && license.isActive) ||
			(filterStatus === "sold" && license.isSold) ||
			(filterStatus === "deactivated" && !license.isActive);

		return matchesSearch && matchesType && matchesStatus;
	});

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(parseFloat(amount));
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const getStatusBadge = (license) => {
		if (license.status == 'sold') {
			return <div className="px-4 py-2 badge badge-secondary border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Sold</div>;
		}
		if (!license.status === 'deactivated') {
			return <div className="px-4 py-2 badge badge-error border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80">Inactive</div>;
		}
		return <div className="px-4 py-2 badge badge-success border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Available</div>;
	};

	const licenseTypes = Array.from(new Set(licenses.map(l => l.type)));



	// if (isLoading) {
	// 	return (
	// 	  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
	// 		<div className="text-center">
	// 		  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
	// 		  <p className="text-slate-600">Loading licenses...</p>
	// 		</div>
	// 	  </div>
	// 	);
	//   }

	return (
		<section className="w-full p-6 overflow-y-auto">
			{/* Header */}
			<div className="mb-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">License Management</h1>
						<p className="text-slate-600 dark:text-gray-300">Manage your ASTER license inventory</p>
					</div>
					<button type="button" onClick={() => document.getElementById('addLicenseModal').showModal()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
						<Plus className="w-5 h-5" />
						<span>Add Licenses</span>
					</button>
					<AddLicenseModal />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-6">
						<div className="flex items-center justify-between">
							<div>

								<p className="text-sm font-medium text-slate-600">Total Licenses</p>
								<p className="text-3xl font-bold text-slate-900">{licenses.length}</p>
							</div>
							<div className="bg-blue-100 p-3 rounded-lg">
								<Key className="text-blue-600 h-6 w-6" />
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-6">
						<div className="flex items-center justify-between">
							<div >


								<p className="text-sm font-medium text-slate-600">Available</p>
								<p className="text-3xl font-bold text-slate-900">
									{licenses.filter(l => !l.isSold && l.isActive).length}
								</p>
							</div>
							<div className="bg-green-100 p-3 rounded-lg">
								<Key className="text-green-600 h-6 w-6" />
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-600">Sold</p>
								<p className="text-3xl font-bold text-slate-900">
									{licenses.filter(l => l.isSold).length}
								</p>
							</div>
							<div className="bg-purple-100 p-3 rounded-lg">
								<Key className="text-purple-600 h-6 w-6" />
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-slate-600">Inactive</p>
								<p className="text-3xl font-bold text-slate-900">
									{licenses.filter(l => !l.isActive).length}
								</p>
							</div>
							<div className="bg-red-100 p-3 rounded-lg">
								<Key className="text-red-600 h-6 w-6" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
				<div className="p-6">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
								<input
									placeholder="Search by license key or type..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								/>
							</div>
						</div>
						<select value={filterType} onChange={setFilterType} className="select bg-gray-100">
							{/* <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                  <SelectValue placeholder="Filter by type" />
                </div> */}

							<option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" value="all">All Types</option>
							{licenseTypes.map(type => (
								<option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" key={type} value={type}>{type}</option>
							))}

						</select>
						<select value={filterStatus} onChange={setFilterStatus} className="select  bg-gray-100">
							{/* <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                  <SelectValue placeholder="Filter by status" />
                </div> */}

							<option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" value="all">All Status</option>
							<option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" value="available">Available</option>
							<option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" value="sold">Sold</option>
							<option className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" value="inactive">Inactive</option>

						</select>
					</div>
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
									{filteredLicenses.length > 0 ? (
										filteredLicenses.map((license, index) => (
											<tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
													{license.license}
												</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
													{license.type}
												</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"> {formatCurrency(license.costPrice)}</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{formatDate(license.purchaseDate.toString())}</td>
												<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap capitalize">{getStatusBadge(license.status)}</td>
												<td className="px-4 py-4 text-sm whitespace-nowrap">
													<button type="button" className="relative z-10 block p-2 text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
														<Edit2 className="w-5 h-5" />
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={6} className="text-center py-8 text-slate-500">
												{searchTerm || filterType !== "all" || filterStatus !== "all"
													? "No licenses match your filters."
													: "No licenses available. Add some licenses to get started."
												}
											</td>

										</tr>
									)}
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

		</section>
	);
}
import { Ban, Eye, Plus } from "lucide-react";
import { lazy, useState } from "react";
import Filter from "../../components/Filter";
import LicenseMatrix from "../../components/LicenseMatrix";
import Pagination from "../../components/Pagination";
import { useAdminStore } from "../../store/adminStore";
const AddLicenseModal = lazy(() => import('../../components/AddLicenseModal'));


export default function Licenses() {
	const { licenses } = useAdminStore();
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage] = useState(8);
	const [showModal, setShowModal] = useState(false);

	// Update the filtering logic
	const filteredLicenses = licenses?.filter(license => {
		// If no filters are active, return all licenses
		if (searchTerm === '' && filterType === 'all' && filterStatus === 'all') {
			return true;
		}

		const matchesSearch = searchTerm === '' ||
			license.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
			license.type.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = filterType === 'all' || license.type === filterType;

		const matchesStatus = filterStatus === 'all' || license.status === filterStatus;

		return matchesSearch && matchesType && matchesStatus;
	}) || [];

	// Get current licenses for pagination
	const indexOfLastLicense = currentPage * perPage;
	const indexOfFirstLicense = indexOfLastLicense - perPage;
	const currentLicenses = filteredLicenses.slice(indexOfFirstLicense, indexOfLastLicense);

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

	const showAddLicenseModal = () => {
		setShowModal(true);
	}


	return (
		<section className="w-full p-6 overflow-y-auto  h-full">
			{/* Header */}
			<div className="mb-4">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">License Management</h1>
						<p className="text-slate-600 dark:text-gray-300">Manage your ASTER license inventory</p>
					</div>
					<button type="button" onClick={() => showAddLicenseModal()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
						<Plus className="w-5 h-5" />
						<span>Add Licenses</span>
					</button>
					{showModal && <AddLicenseModal onClose={() => setShowModal(false)} />}
				</div>
			</div>
			<LicenseMatrix licenses={licenses} />
			<Filter setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} setFilterType={setFilterType} searchTerm={searchTerm} filterType={filterType} filterStatus={filterStatus} />
			<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-800 text-sm">
						<tr>
							<th scope="col" className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
								License
							</th>
							<th scope="col" className="w-24 px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
								Type
							</th>
							<th scope="col" className="w-32 px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
								Cost Price
							</th>
							<th scope="col" className="w-32 px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
								Purchase Date
							</th>
							<th scope="col" className="w-24 px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
								Status
							</th>
							<th scope="col" className="w-32 px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
						{currentLicenses.length > 0 ? (
							currentLicenses.map((license) => (
								<tr key={license.id} className="text-sm">
									<td className="px-4 py-2 whitespace-nowrap font-medium ">{license.license}</td>
									<td className="px-4 py-2 whitespace-nowrap text-center">{license.type}</td>
									<td className="px-4 py-2 whitespace-nowrap text-center">{formatCurrency(license.costPrice)}</td>
									<td className="px-4 py-2 whitespace-nowrap text-center">{formatDate(license.purchaseDate)}</td>
									<td className="px-4 py-2 whitespace-nowrap text-center">
										<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    				${license.status === 'available' ? 'bg-green-100 text-green-800' :
												license.status === 'sold' ? 'bg-blue-100 text-blue-800' :
													'bg-red-100 text-red-800'}`}
										>
											{license.status}
										</span>
									</td>
									<td className="px-4 py-2 whitespace-nowrap font-medium">
										<button className="btn btn-ghost text-blue-600 hover:text-blue-900"
											onClick={() => handleView(license.id)}
										>
											<Eye />
										</button>
										<button className="btn btn-ghost text-red-600 hover:text-red-900 mr-2"
											onClick={() => handleDeactivate(license.id)}
										>
											<Ban />
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
			<Pagination perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage} total={licenses.length} />
		</section>
	);
}
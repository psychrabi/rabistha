import {  ArrowLeft, Eye, Link } from "lucide-react";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { useAdminStore } from "../../store/adminStore";
import Filter from "../../components/Filter";
import { useNavigate } from "react-router-dom";

export default function SalesDetails() {
  const { sales } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const navigate = useNavigate();

  // Update the filtering logic
  const filteredSales = sales?.filter(sale => {
    // If no filters are active, return all sales
    if (searchTerm === '' && filterType === 'all' && filterStatus === 'all') {
      return true;
    }

    const matchesSearch = searchTerm === '' ||
    sale.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || sale.type === filterType;

    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  }) || [];

  // Get current sales for pagination
  const indexOfLastLicense = currentPage * perPage;
  const indexOfFirstLicense = indexOfLastLicense - perPage;
  const currentSales = filteredSales.slice(indexOfFirstLicense, indexOfLastLicense);

  return (
    <section className="w-full p-6 overflow-y-auto  h-full">
    {/* Header */}
    <div className="mb-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">Sales Management</h1>
            <p className="text-slate-600 dark:text-gray-300">Manage your sales</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/admin/dashboard')} >
            Back to Dashboard
          </button>
          </div>
      </div>
      <Filter setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} setFilterType={setFilterType} searchTerm={searchTerm} filterType={filterType} filterStatus={filterStatus} />

      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">

        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer&apos;s Name</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Sales Price</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Discount</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Payment Method</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Sold At</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Payment Status</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {currentSales.map((sale) => (
              <tr key={sale.id} className="text-sm">
                <td className="px-4 py-2 whitespace-nowrap font-medium">{sale.user.firstName + " " + sale.user.lastName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">{sale.shippingEmail}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center capitalize">{sale.salesPrice}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center capitalize">{sale.discount}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center capitalize">{sale.paymentMethod}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center capitalize">{sale.soldDate ?? "-"}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center capitalize"><span className='badge badge-info'>{sale.paymentStatus}</span></td>
                <td className="px-4 py-2 whitespace-nowrap text-center">
                  <button type="button" className="text-green-600 hover:text-red-900">
                    <Eye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage} total={sales.length} />
    </section>
  );
}
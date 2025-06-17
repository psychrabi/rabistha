import { Eye, Plus } from 'lucide-react';
import { useEffect } from 'react';
import AddLicenseModal from '../../components/AddLicenseModal';
import DashboardMetrix from '../../components/DashboardMetrix';
import { useAdminStore } from '../../store/adminStore';


export default function Dashboard() {
  const { licenses, sales } = useAdminStore();
  const { isAuthenticated, fetchLicenses, fetchSales, fetchUsers } = useAdminStore();

  useEffect(() => {
    fetchLicenses();
    fetchSales();
    fetchUsers();
  }, [isAuthenticated, fetchUsers, fetchSales, fetchLicenses]);

  return (
    <section className="w-full p-6 overflow-y-auto">
      <div className="mb-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">License Management</h1>
            <p className="text-slate-600 dark:text-gray-300">Manage your ASTER license inventory</p>
          </div>
          <button type="button" onClick={() => document.getElementById('addLicenseModal').showModal()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <Plus
              className="w-5 h-5" />
            <span>Add Licenses</span>
          </button>
          <AddLicenseModal />
        </div>
      </div>
      <DashboardMetrix licenses={licenses} />
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer&apos;s Name</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Created At</th>
              <th scope="col" className="px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {sales.map((sales) => (
              <tr key={sales.id} className="text-sm">
                <td className="px-4 py-2 whitespace-nowrap font-medium">{sales.fullName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">{sales.email}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center">{sales.purchaseDate}</td>
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

    </section>
  );
} 
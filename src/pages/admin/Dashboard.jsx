import { BarChart3, DollarSign, Eye, Key, Plus, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useAdminStore } from '../../store/adminStore';
import AddLicenseModal from '../../components/AddLicenseModal';

export default function Dashboard() {
  const { licenses, sales, users } = useAdminStore();
  const { isAuthenticated, fetchLicenses, fetchSales, fetchUsers } = useAdminStore();
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.salesPrice, 0);
  const activeLicenses = licenses.filter(l => l.status === 'available').length;

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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-semibold text-gray-900">${totalRevenue.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Key className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Licenses</dt>
                  <dd className="text-lg font-semibold text-gray-900">{activeLicenses}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-lg font-semibold text-gray-900">{users.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                  <dd className="text-lg font-semibold text-gray-900">{sales.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Sales</h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer&apos;s Name</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sales.map((sales) => (
                    <tr key={sales.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sales.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sales.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sales.purchaseDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button type="button" className="text-green-600 hover:text-red-900">
                          <Eye />
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
    </section>
  );
} 
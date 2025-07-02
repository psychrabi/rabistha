import { Eye } from 'lucide-react';
import { useEffect } from 'react';
import DashboardMetrix from '../../components/DashboardMetrix';
import { useAdminStore } from '../../store/adminStore';


export default function Dashboard() {
  const { licenses, sales } = useAdminStore();
  const { isAuthenticated, fetchLicenses, fetchSales, fetchUsers } = useAdminStore();

  useEffect(() => {
    fetchLicenses();
    fetchSales();
    fetchUsers();
    console.log(sales)
  }, [isAuthenticated, fetchUsers, fetchSales, fetchLicenses]);

  return (
    <section className="w-full p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">ASTER Nepal Dashboard</h1>
            <p className="text-slate-600 dark:text-gray-300">Overview of sales and licenses</p>
          </div>
        </div>
      </div>
      <DashboardMetrix licenses={licenses} />
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
            {sales.map((sale) => (
              <tr key={sale.id} className="text-sm">
                <td className="px-4 py-2 whitespace-nowrap font-medium">{sale.user.name}</td>
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

    </section>
  );
} 
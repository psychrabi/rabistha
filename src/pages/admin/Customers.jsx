import { ArrowLeft, Edit2 } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";

const Customers = () => {
  const { users } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);

  // Update the filtering logic
  const filteredUsers = users?.filter(user => {
    // If no filters are active, return all users
    if (searchTerm === '' && filterType === 'all' && filterStatus === 'all') {
      return true;
    }

    const matchesSearch = searchTerm === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || user.type === filterType;

    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  }) || [];

  // Get current users for pagination
  const indexOfLastLicense = currentPage * perPage;
  const indexOfFirstLicense = indexOfLastLicense - perPage;
  const currentUsers = filteredUsers.slice(indexOfFirstLicense, indexOfLastLicense);

  return (
    <section className="w-full p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">User Management</h1>
            <p className="text-slate-600 dark:text-gray-300">Manage your customers</p>
          </div>
          <Link to="/admin/dashboard" className="btn btn-primary flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <Filter setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} setFilterType={setFilterType} searchTerm={searchTerm} filterType={filterType} filterStatus={filterStatus} />
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Customer&lsquo;s Name
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Last Purchase Date
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Action
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
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
                        ? "No users match your filters."
                        : "No users available. Add some users to get started."
                      }
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
      </div>
      <Pagination perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage} total={users.length} />
    </section>
  );
};

export default Customers; 
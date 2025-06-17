import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddFAQModal from '../../components/AddFAQModal';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import { useAdminStore } from '../../store/adminStore';


export default function FAQManager() {
  const { faqs, fetchFAQs, deleteFAQ } = useAdminStore()
  const [currentFAQ, setCurrentFAQ] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const showModal = () => {
    setCurrentFAQ(null)
    document.getElementById('addFAQModal').showModal()
  }

  // Update the filtering logic
  const filteredFAQs = faqs?.filter(faqs => {
    // If no filters are active, return all faqss
    if (searchTerm === '' && filterType === 'all' && filterStatus === 'all') {
      return true;
    }

    const matchesSearch = searchTerm === '' ||
      faqs.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || faqs.type === filterType;

    const matchesStatus = filterStatus === 'all' || faqs.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  }) || [];

  // Get current faqs for pagination
  const indexOfLastLicense = currentPage * perPage;
  const indexOfFirstLicense = indexOfLastLicense - perPage;
  const currentFAQs = filteredFAQs.slice(indexOfFirstLicense, indexOfLastLicense);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  useEffect(() => {
    fetchFAQs();
    console.log(currentFAQ)
  }, []);


  return (
    <section className="w-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">FAQ Management</h1>
            <p className="text-slate-600 dark:text-gray-300">Manage ASTER FAQs from here</p>
          </div>
          <button type="button" onClick={() => showModal()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <Plus className="w-5 h-5" />
            <span>Add a new FAQ</span>
          </button>
          <AddFAQModal currentFAQ={currentFAQ} />
        </div>
      </div>
      <Filter setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} setFilterType={setFilterType} searchTerm={searchTerm} filterType={filterType} filterStatus={filterStatus} />
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Title
              </th>
              <th scope="col" className="w-32 px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                Last Updated
              </th>
              <th scope="col" className="w-32 px-4 py-3.5 font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {currentFAQs.length > 0 ? (
              currentFAQs?.map(faq => (
                <tr key={faq.id} className="text-sm">
                  <td className="px-4 py-2 whitespace-nowrap font-medium">
                    {faq.title}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    {formatDate(faq.updatedAt)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium">
                    <button onClick={() => { setCurrentFAQ(faq); document.getElementById('addFAQModal').showModal() }}
                      className="text-yellow-600 hover:text-yellow-900 mx-2">
                      <Pencil />
                    </button>
                    <button onClick={() => deleteFAQ(faq)} className="text-red-600 hover:text-red-900 mx-2" >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-500">
                  {searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "No faqs match your filters."
                    : "No faqs available. Add some faqs to get started."
                  }
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
      <Pagination perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage} total={faqs.length} />
    </section>
  );
}
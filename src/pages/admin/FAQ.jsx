import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddFAQModal from '../../components/AddFAQModal';
import { useAdminStore } from '../../store/adminStore';


export default function FAQManager() {
  const { faqs, fetchFAQs, deleteFAQ } = useAdminStore()
  const [currentFAQ, setCurrentFAQ] = useState([])

  const showModal = () => {
    setCurrentFAQ(null)
    document.getElementById('addFAQModal').showModal()
  }

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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faqs.length > 0 ? (
              faqs?.map(faq => (
                <tr key={faq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{faq.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(faq.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => { setCurrentFAQ(faq); document.getElementById('addFAQModal').showModal() }}
                      className="text-yellow-600 hover:text-yellow-900 mx-2">
                      Edit
                    </button>
                    <button onClick={() => deleteFAQ(faq)} className="text-red-600 hover:text-red-900 mx-2" >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-500">
                  No FAQs available, add some faqs to get started
                  {/* {searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "No faqs match your filters."
                    : "No faqs available. Add some faqs to get started."
                  } */}
                </td>

              </tr>
            )}

          </tbody>
        </table>
      </div>
    </section>
  );
}
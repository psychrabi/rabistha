import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { lazy, useEffect, useState } from 'react';
import Filter from '../../components/Filter';
import { useAdminStore } from '../../store/adminStore';
const AddWikiModal = lazy(() => import('../../components/AddWikiModal'));

export default function WikiManager() {
  const { wikis, fetchWikis, deleteWiki } = useAdminStore()
  const [currentWiki, setCurrentWiki] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const [showModal, setShowModal] = useState(false);

  // Update the filtering logic
  const filteredWikis = (Array.isArray(wikis) ? wikis : []).filter(wiki => {
    // If no filters are active, return all wikis
    if (searchTerm === '' && filterType === 'all' && filterStatus === 'all') {
      return true;
    }

    const matchesSearch = searchTerm === '' ||
      wiki.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === 'all' || wiki.type === filterType;

    const matchesStatus = filterStatus === 'all' || wiki.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  }) || [];

  // Get current wikis for pagination
  const indexOfLastLicense = currentPage * perPage;
  const indexOfFirstLicense = indexOfLastLicense - perPage;
  const currentWikis = filteredWikis.slice(indexOfFirstLicense, indexOfLastLicense);


  const showAddModal = () => {
    setCurrentWiki(null)
    setShowModal(true);
    document.getElementById('addWikiModal').showModal()
  }

  const showEditModal = (wiki) => {
    setCurrentWiki(wiki)
    setShowModal(true);
    document.getElementById('addWikiModal').showModal()
  }

  useEffect(() => {
    fetchWikis();
  }, []);


  return (
    <section className="w-full p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">Wiki Management</h1>
            <p className="text-slate-600 dark:text-gray-300">Manage ASTER Wikis from here</p>
          </div>
          <button type="button" onClick={() => showAddModal()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <Plus className="w-5 h-5" />
            <span>Add a new Wiki</span>
          </button>
          <AddWikiModal currentWiki={currentWiki} />
        </div>
      </div>
      <Filter setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} setFilterType={setFilterType} searchTerm={searchTerm} filterType={filterType} filterStatus={filterStatus} />

      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Title</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Category</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Last Updated</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">


            {currentWikis.length > 0 ? (
              currentWikis.map(wiki => (
                <tr key={wiki.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {wiki.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {wiki.category.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {new Date(wiki.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap">
                    <button onClick={() => showEditModal(wiki)} className="text-yellow-600 hover:text-yellow-900 m-2 ">
                      <Pencil />
                    </button>
                    <button onClick={() => window.open(`/wiki/${wiki.slug}`, '_blank')} className="text-blue-600 hover:text-blue-900 m-2" >
                      <Eye />
                    </button>
                    <button onClick={() => deleteWiki(wiki)} className="text-red-600 hover:text-red-900 m-2" >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-500">
                  {searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "No wikis match your filters."
                    : "No wikis available. Add some wikis to get started."
                  }
                </td>

              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
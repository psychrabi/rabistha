import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddWikiModal from '../../components/AddWikiModal';
import { useAdminStore } from '../../store/adminStore';

export default function WikiManager() {
  const { wikis, fetchWikis, deleteWiki } = useAdminStore()
  const [currentWiki, setCurrentWiki] = useState([])

  useEffect(() => {
    fetchWikis();
    console.log(currentWiki)
  }, []);


  return (
    <section className="w-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">Wiki Management</h1>
            <p className="text-slate-600 dark:text-gray-300">Manage ASTER Wikis from here</p>
          </div>
          <button type="button" onClick={() => document.getElementById('addWikiModal').showModal()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <Plus className="w-5 h-5" />
            <span>Add a new Wiki</span>
          </button>
          <AddWikiModal currentWiki={currentWiki}/>
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
            {wikis.map(wiki => (
              <tr key={wiki.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{wiki.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(wiki.updatedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentWiki(wiki);
                      document.getElementById('addWikiModal').showModal()

                    }}
                    className="text-yellow-600 hover:text-yellow-900 mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => window.open(`/wiki/${wiki.slug}`, '_blank')}
                    className="text-blue-600 hover:text-blue-900 mx-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteWiki(wiki)}
                    className="text-red-600 hover:text-red-900 mx-2"
                  >
                    Delete
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
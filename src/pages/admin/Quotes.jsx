import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import CreateQuotationModal from '../../components/CreateQuotationModal';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import ViewQuoteModal from '../../components/ViewQuoteModal';
import { useAdminStore } from '../../store/adminStore';

export default function Quotes() {
  const { quotes, fetchQuotes } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const [selectedQuote, setSelectedQuote] = useState([]);

  // Update the filtering logic
  const filteredQuotes = quotes?.filter(quote => {
    // If no filters are active, return all quotes
    if (searchTerm === '' && filterType === 'all' && filterStatus === 'all') {
      return true;
    }

    const matchesSearch = searchTerm === '' ||
      quote.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.user?.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || quote.type === filterType;

    const matchesStatus = filterStatus === 'all' || quote.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  }) || [];

  // Get current quotes for pagination
  const indexOfLastQuote = currentPage * perPage;
  const indexOfFirstQuote = indexOfLastQuote - perPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote);


  const showQuotation = (quote) => {
    setSelectedQuote(quote);
    const modal = document.getElementById('quotationModal');
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return (
    <section className="w-full p-6 overflow-y-auto">
      <div className="mb-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">Quotes & Invoices</h1>
            <p className="text-slate-600 dark:text-gray-300">Create and manage quotes and invoices</p>
          </div>
          <button className="btn btn-primary" onClick={() => document.getElementById('createQuotationModal').showModal()} >
            Create New Quote
          </button>
          <CreateQuotationModal />
        </div>
      </div>
      <Filter setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} setFilterType={setFilterType} searchTerm={searchTerm} filterType={filterType} filterStatus={filterStatus} />

      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Quote #</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Customer</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Amount</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Valid Until</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Created</th>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQuotes?.length > 0 ? (
              currentQuotes?.map((quote, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">QT-{quote.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{quote.user.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${quote.total}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    <div className={`badge ${quote.status === 'DRAFT' ? 'badge-secondary' :
                      quote.status === 'SENT' ? 'badge-info' :
                        quote.status === 'ACCEPTED' ? 'badge-success' :
                          'badge-error'
                      }`}>
                      {quote.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{new Date(quote.validUntil).toLocaleDateString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline" onClick={() => showQuotation(quote)}>
                      <Eye className="inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500">
                  {searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "No quotes match your filters."
                    : "No quotes available. Add some quotes to get started."
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination total={currentQuotes.length} perPage={perPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      <ViewQuoteModal quote={selectedQuote} />
    </section>
  );
}

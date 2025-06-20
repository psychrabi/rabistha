import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { useAdminStore } from '../../store/adminStore';
import api from '../../utils/api';
import numberToText from 'number-to-text'
import CreateQuotationModal from '../../components/CreateQuotationModal';

const quoteSchema = z.object({
  userId: z.number().min(1, 'Customer is required'),
  items: z.array(z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be positive'),
  })).min(1, 'At least one item is required'),
  discount: z.number().min(0).default(0),
  discountType: z.enum(['amount', 'percent']).default('amount'),
  notes: z.string().optional(),
  message: z.string().optional(),
  subtotal: z.number().optional(),
  taxable: z.number().optional(),
  tax: z.number().optional(),
  total: z.number().optional(),
  validUntil: z.string().min(1, 'Valid until date is required'),
});

// Helper to convert number to words (USD)
function numberToWordsUSD(amount) {
  // Simple version, use Intl.NumberFormat for currency, and a basic number-to-words for dollars/cents
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function numToWords(n) {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
    if (n < 1000000) return numToWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + numToWords(n % 1000) : "");
    return n.toString();
  }
  const [dollars, cents] = amount.toFixed(2).split('.').map(Number);
  let words = '';
  if (dollars > 0) words += numToWords(dollars) + (dollars === 1 ? ' dollar' : ' dollars');
  if (cents > 0) words += (words ? ' and ' : '') + numToWords(cents) + (cents === 1 ? ' cent' : ' cents');
  if (!words) words = 'zero dollars';
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export default function InvoicesQuotes() {
  const { users } = useAdminStore()
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('quotes');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discountType, setDiscountType] = useState('amount'); // 'amount' or 'percent'
  const [lastAutoNote, setLastAutoNote] = useState('');


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const [quotesData, invoicesData, customersData] = await Promise.all([
        api.request('/admin/quotes'),
        // api.request('/admin/invoices'),
      ]);
      setQuotes(quotesData);
      // setInvoices(invoicesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };



  const sendQuote = async (quoteId) => {
    try {
      await api.request(`/quotes/${quoteId}/send`, { method: 'POST' });
      // Update quote status in local state
      setQuotes(quotes.map(q => q.id === quoteId ? { ...q, status: 'SENT' } : q));
    } catch (error) {
      console.error('Failed to send quote:', error);
    }
  };

  // const convertToInvoice = async (quoteId) => {
  //   try {
  //     const invoice = await api.request(`/quotes/${quoteId}/convert`, { method: 'POST' });
  //     setInvoices([...invoices, invoice]);
  //   } catch (error) {
  //     console.error('Failed to convert quote:', error);
  //   }
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="w-full p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quotes & Invoices</h1>
          <p className="text-gray-600">Create and manage quotes and invoices</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById('createQuotationModal').showModal()}
        >
          Create New Quote
        </button>
        <CreateQuotationModal />

      </div>

    
      


      {/* Tabs */}
      <div className="tabs tabs-lifted mb-6">
        <button
          className={`tab tab-lg ${activeTab === 'quotes' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          Quotes ({quotes.length})
        </button>
        {/* <button
          className={`tab tab-lg ${activeTab === 'invoices' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices ({invoices.length})
        </button> */}
      </div>

      {/* Quotes Tab */}
      {activeTab === 'quotes' && (
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th>Quote #</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Valid Until</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="font-mono">QT-{quote.id}</td>
                  <td>{quote.customer?.firstName} {quote.customer?.lastName}</td>
                  <td>${quote.totalAmount}</td>
                  <td>
                    <div className={`badge ${quote.status === 'DRAFT' ? 'badge-neutral' :
                      quote.status === 'SENT' ? 'badge-info' :
                        quote.status === 'ACCEPTED' ? 'badge-success' :
                          'badge-error'
                      }`}>
                      {quote.status}
                    </div>
                  </td>
                  <td>{new Date(quote.validUntil).toLocaleDateString()}</td>
                  <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                        Actions
                      </div>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={() => sendQuote(quote.id)}>Send Quote</a></li>
                        <li><a onClick={() => convertToInvoice(quote.id)}>Convert to Invoice</a></li>
                        <li><a>Edit</a></li>
                        <li><a>Download PDF</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}

      {/* Invoices Tab */}
      {/* {activeTab === 'invoices' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">All Invoices</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="font-mono">INV-{invoice.id.slice(-6)}</td>
                      <td>{invoice.customer?.firstName} {invoice.customer?.lastName}</td>
                      <td>${invoice.totalAmount}</td>
                      <td>
                        <div className={`badge ${invoice.status === 'DRAFT' ? 'badge-neutral' :
                          invoice.status === 'SENT' ? 'badge-info' :
                            invoice.status === 'PAID' ? 'badge-success' :
                              'badge-error'
                          }`}>
                          {invoice.status}
                        </div>
                      </td>
                      <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                      <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-ghost btn-xs">
                            Actions
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Send Invoice</a></li>
                            <li><a>Mark as Paid</a></li>
                            <li><a>Download PDF</a></li>
                            <li><a>Send Reminder</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )} */}
    </section>
  );
}

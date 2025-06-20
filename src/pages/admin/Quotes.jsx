
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAdminStore } from '../../store/adminStore';
import api from '../../utils/api';

const quoteSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  items: z.array(z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be positive'),
  })).min(1, 'At least one item is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
  notes: z.string().optional(),
});

export default function Quotes() {
  const { users } = useAdminStore()
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('quotes');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      items: [{ description: '', quantity: 1, price: 0 }],
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [quotesData, invoicesData, customersData] = await Promise.all([
        api.request('/quotes'),
        api.request('/invoices'),
      ]);
      setQuotes(quotesData);
      setInvoices(invoicesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const newQuote = await api.request('/quotes', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setQuotes([...quotes, newQuote]);
      setShowCreateForm(false);
      reset();
    } catch (error) {
      console.error('Failed to create quote:', error);
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

  const convertToInvoice = async (quoteId) => {
    try {
      const invoice = await api.request(`/quotes/${quoteId}/convert`, { method: 'POST' });
      setInvoices([...invoices, invoice]);
    } catch (error) {
      console.error('Failed to convert quote:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quotes & Invoices</h1>
          <p className="text-gray-600">Create and manage quotes and invoices</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          Create New Quote
        </button>
      </div>

      {/* Create Quote/Invoice Form */}
      {showCreateForm && (
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Create New Quote</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-gray-700 dark:text-gray-200" for="siteName">Customer's Name</label>
                  <select
                    className={`select select-bordered ${errors.customerId ? 'select-error' : ''} block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring`}
                    {...register('customerId')}
                  >
                    <option value="">Select customer</option>
                    {users.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} ({customer.email})
                      </option>
                    ))}
                  </select>
                  {errors.customerId && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.customerId.message}</span>
                    </label>
                  )}
                </div>
                <div >
                  <label class="text-gray-700 dark:text-gray-200" for="siteName">Valid Until</label>
                  <input
                    type="date"
                    className={`input input-bordered ${errors.validUntil ? 'input-error' : ''} block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring`}
                    {...register('validUntil')}
                  />
                  {errors.validUntil && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.validUntil.message}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Items Section */}
              <div className="divider">Quote Items</div>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 font-semibold">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Total</div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Product description"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      {...register('items.0.description')}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      {...register('items.0.quantity', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      step="0.01"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      {...register('items.0.price', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-lg font-semibold">
                      ${((watch('items.0.quantity') || 0) * (watch('items.0.price') || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                  </div>
                  <div className="col-span-2 text-right  flex items-center justify-end">Sub Total</div>

                  <div className="col-span-2 ">
                    <input
                      type="text"
                      placeholder="Sub Total"
                      className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      {...register('items.subTotal')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                  </div>
                  <div className="col-span-2 text-right  flex items-center justify-end">Discount</div>

                  <div className="col-span-2  ">
                    <input
                      type="text"
                      placeholder="Discount"
                      className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      {...register('items.discount')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                  </div>
                  <div className="col-span-2 text-right  flex items-center justify-end">Taxable</div>

                  <div className="col-span-2  ">
                    <input
                      type="text"
                      placeholder="Taxable"
                      className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      {...register('items.taxable')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                  </div>
                  <div className="col-span-2 text-right  flex items-center justify-end">Total</div>

                  <div className="col-span-2 ">
                    <input
                      type="text"
                      placeholder="Taxable"
                      className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      {...register('items.total')}
                    />
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div>
                <label className="label">Notes (Optional)</label>
                <textarea
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="Additional notes or terms"
                  {...register('notes')}
                ></textarea>
              </div>

              <div className="card-actions justify-end">
                <button type="button" className="btn btn-ghost" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs tabs-lifted mb-6">
        <button
          className={`tab tab-lg ${activeTab === 'quotes' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          Quotes ({quotes.length})
        </button>
        <button
          className={`tab tab-lg ${activeTab === 'invoices' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices ({invoices.length})
        </button>
      </div>

      {/* Quotes Tab */}
      {activeTab === 'quotes' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">All Quotes</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
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
                      <td className="font-mono">QT-{quote.id.slice(-6)}</td>
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
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
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
      )}
    </div>
  );
}

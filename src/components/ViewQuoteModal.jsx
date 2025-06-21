import { X } from "lucide-react";

const ViewQuoteModal = ({ quote }) => {
  return (
    <dialog id="quotationModal" className="modal">
      <div className="modal-box w-[40vw] max-w-5xl h-[95vh] overflow-y-auto relative">
        <form method="dialog">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </form>
        <div className="border-b pb-8 mb-8 flex items-center">
          <div className="flex-1 text-left">
            <div className="flex">
              <img className="w-auto h-7 mb-8 mr-4" src="https://merakiui.com/images/logo.svg" alt="" /> ASTER Nepal
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-200">149 Samakhushi Marg, Thamel Kathmandu</p>
            <p className="text-sm text-slate-500 dark:text-slate-200">Phone: +9779813098760</p>
            <p className="text-sm text-slate-500 dark:text-slate-200">Email: contact@company.com</p>
          </div>
          <h1 className="text-4xl font-bold text-slate-400 uppercase flex-1 text-right">Quotation</h1>
        </div>
        <div className="pb-4 mb-4 flex items-start">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-700 dark:text-slate-400">Prepared To:</h2>
            <p className="text-slate-600 dark:text-slate-100 text-xl font-semibold">{quote.user?.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">{quote.user?.address}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">{quote.user?.city}, {quote.user?.country}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">Phone: {quote.user?.contact}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">Email: {quote.user?.email}</p>
          </div>
          <div className="mb-4 text-right flex-1">
            <p className="text-2xl text-slate-500 dark:text-slate-300">Quote #: {quote.id}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">Date: {new Date(quote.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">Validity till: {new Date(quote.validUntil).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="divider "></div>
        <div className="min-h-[300px] overflow-y-auto">
          <h3 className="font-semibold mb-2">Items</h3>
          <table className="min-w-full mb-20 table-auto ">
            <thead>
              <tr className='border border-gray-700 dark:border-gray-700 bg-gray-700'>
                <th className="text-left px-4 py-2">Description</th>
                <th className="text-right px-4 py-2">Qty</th>
                <th className="text-right px-4 py-2">Unit Price</th>
                <th className="text-right px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-700 px-4 py-1">{item.description || item.name}</td>
                  <td className="border border-gray-700 px-4 py-1 text-right">{item.quantity}</td>
                  <td className="border border-gray-700 px-4 py-1 text-right">{item.price}</td>
                  <td className="border border-gray-700 px-4 py-1 text-right">
                    {item.price && item.quantity
                      ? `$${(item.price * item.quantity).toFixed(2)}`
                      : ''}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="border border-gray-700 px-4 py-1 font-semibold text-right">Subtotal</td>
                <td className="border border-gray-700 px-4 py-1 text-right">
                  ${quote.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="border border-gray-700 px-4 py-1 font-semibold text-right">Discount</td>
                <td className="border border-gray-700 px-4 py-1 text-right">
                  {quote.discount ? (
                    quote.discountType === 'percent'
                      ? `-${((quote.subTotal * quote.discount) / 100).toFixed(2)}`
                      : `-${quote.discount.toFixed(2)}`
                  ) : null}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="border border-gray-700 px-4 py-1 font-semibold text-right">Taxable</td>
                <td className="border border-gray-700 px-4 py-1 text-right">
                  {quote.taxable ? `${quote.taxable.toFixed(2)}` : '0.00'}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="border border-gray-700 px-4 py-1 font-semibold text-right">Tax (Tax)</td>
                <td className="border border-gray-700 px-4 py-1 text-right">
                  {quote.tax ? `${quote.tax.toFixed(2)}` : '0.00'}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="border border-gray-700 px-4 py-1 font-semibold text-right">Tax (Tax)</td>
                <td className="border border-gray-700 px-4 py-1 text-right">
                  {quote.total ? `${quote.total.toFixed(2)}` : '0.00'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Notes</label>
            <p>
              {quote.notes}
            </p>
          </div>
          <div className={`${quote.message ? '' : 'hidden'}`}>
            <label className="label">Message</label>
            <p>{quote.message}</p>
          </div>
        </div>
        <div className="mt-6 text-right text-gray-500 text-xs">
          Generated on {new Date().toLocaleString()}
        </div>
      </div>
    </dialog>
  );
};

export default ViewQuoteModal;
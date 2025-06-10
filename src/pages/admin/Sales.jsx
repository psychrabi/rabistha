import { useAdminStore } from "../../store/adminStore";

export default function SalesDetails() {
  const { sales } = useAdminStore();

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">License Sales Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">License</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Payment Details</th>
              <th className="px-4 py-2">Shipping Address</th>
              <th className="px-4 py-2">Sold Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td className="px-4 py-2">{sale.license}</td>
                <td className="px-4 py-2">{sale.name}</td>
                <td className="px-4 py-2">{sale.email}</td>
                <td className="px-4 py-2">{sale.contact}</td>
                <td className="px-4 py-2">{sale.paymentMethod}</td>
                <td className="px-4 py-2">{sale.paymentDetails}</td>
                <td className="px-4 py-2">{sale.shippingAddress}</td>
                <td className="px-4 py-2">{sale.soldDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sales.length === 0 && <div className="text-center text-gray-500 py-8">No sales found.</div>}
      </div>
    </div>
  );
}
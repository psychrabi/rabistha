import { BarChart3, DollarSign, Key, ShieldAlert, ShieldX, Users } from "lucide-react";
import { useAdminStore } from "../store/adminStore";
import MatrixCard from "./MatrixCard";

const DashboardMetrix = () => {
  const { licenses, sales, users } = useAdminStore();

  const noOfCustomers = users.length
  const noOfSales = sales.length
  const availableLicenses = licenses.length
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.salesPrice, 0);

  const matrixData = [
    {
      title: 'Total Revenue',
      value: totalRevenue,
      Icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: 'Available Licenses',
      value: availableLicenses,
      Icon: Key,
      color: 'text-green-600'
    },
    {
      title: 'Total Customers',
      value: noOfCustomers,
      Icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Sales',
      value: noOfSales,
      Icon: BarChart3,
      color: 'text-red-600'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-4">
      {matrixData.map(data => (
        <MatrixCard data={data} />
      ))}
    </div>
  );
};

export default DashboardMetrix;
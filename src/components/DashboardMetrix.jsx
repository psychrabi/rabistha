import { Banknote, BanknoteArrowUp, BarChart3, DollarSign, Eye, Key, ShieldAlert, ShieldX, Users } from "lucide-react";
import MatrixCard from "./MatrixCard";
import { useAdminStore } from "../store/adminStore";

const DashboardMetrix = () => {
  const { licenses, sales, users } = useAdminStore();

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.salesPrice, 0);
  const activeLicenses = licenses.filter(l => l.status === 'available').length;

  const matrixData = [
    {
      title: 'Total Revenue',
      value: totalRevenue,
      Icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: 'Available Licenses',
      value: licenses.length,
      Icon: Key,
      color: 'text-green-600'
    },
    {
      title: 'Total Customers',
      value: users.length,
      Icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Sales',
      value: licenses.filter(l => l.status === 'refunded').length,
      Icon: BarChart3,
      color: 'text-red-600'
    },
    {
      title: 'Deeactivated',
      value: licenses.filter(l => l.status === 'deactivated').length,
      Icon: ShieldX,
      color: 'text-red-600'
    },
    {
      title: 'Expired',
      value: licenses.filter(l => l.status === 'expired').length,
      Icon: ShieldAlert,
      color: 'text-orange-600'
    }
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
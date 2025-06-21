import { Banknote, BanknoteArrowUp, Eye, Key, ShieldAlert, ShieldX } from "lucide-react";
import React from "react";
import MatrixCard from "./MatrixCard";

const LicenseMatrix = React.memo(({ licenses }) => {

  const matrixData = [
    {
      title: 'Total Licenses',
      value: licenses.length,
      Icon: Key,
      color: 'text-blue-600'
    },
    {
      title: 'Available',
      value: licenses.filter(l => l.status === 'available').length,
      Icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Sold',
      value: licenses.filter(l => l.status === 'sold').length,
      Icon: Banknote,
      color: 'text-blue-600'
    },
    {
      title: 'Refunded',
      value: licenses.filter(l => l.status === 'refunded').length,
      Icon: BanknoteArrowUp,
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
        <MatrixCard data={data} key={data.title}/>
      ))}
    </div>
  );
});

export default LicenseMatrix;
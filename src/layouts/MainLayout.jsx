import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-0 font-sans">
      <Navbar />
      <div className="py-6">
        <Outlet />
      </div>
      <Footer />
      
    </div>
  );
};

export default MainLayout;
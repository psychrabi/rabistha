import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-0 font-sans">
      <Navbar />
      
        <Outlet />
      
      <Footer />
      
    </div>
  );
};

export default MainLayout;
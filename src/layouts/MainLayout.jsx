import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-0 font-sans">
      <Navbar />
      <div className="mt-18">
        <Outlet />
      </div>
      <Footer className="container" />
    </div>
  );
};

export default MainLayout;
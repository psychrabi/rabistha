import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Footer from '../components/Footer';

const AdminLayout = () => {
	return (
		<div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-0 font-sans">
			<Sidebar />
			<main className="w-full h-screen">
				<Outlet />
				<Footer />
			</main>
		</div>
	);
};

export default AdminLayout;
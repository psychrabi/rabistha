import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Footer from '../components/Footer';
import { useAdminStore } from '../store/adminStore';

const AdminLayout = () => {
	const { isAuthenticated } = useAdminStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/rabistha/admin/login');
			return;
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-0 font-sans">
			<Sidebar />
			<main className="w-full h-screen flex flex-col">
				<Outlet />
				<Footer />
			</main>
		</div>
	);
};

export default AdminLayout;
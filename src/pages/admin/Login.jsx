import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '@/store/adminStore';

export default function Login() {
	const [credentials, setCredentials] = useState({ username: '', password: '' });
	const navigate = useNavigate();
	const { login } = useAdminStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await login(credentials);
		if (success) {
			navigate('/rabistha/admin/dashboard');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center ">
			<div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
				<div class="px-6 py-4">
					<div class="flex justify-center mx-auto">
						<img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
					</div>
					<h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>
					<p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>
					<form onSubmit={handleSubmit} >
						<div class="w-full mt-4">
							<input class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" placeholder="Username" aria-label="Username"
								value={credentials.username}
								onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
							/>
						</div>
						<div class="w-full mt-4">
							<input class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="password" placeholder="Password" aria-label="Password"
								value={credentials.password}
								onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
							/>
						</div>
						<div class="flex items-center justify-between mt-4">
							<a href="#" class="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>
							<button class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
								Sign In
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
} 
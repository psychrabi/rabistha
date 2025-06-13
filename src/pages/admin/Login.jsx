'use server'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '@/store/adminStore';
import prisma from "@/db/db"
import { useForm } from "react-hook-form"

export default function Login() {
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAdminStore();

	const { register, control, handleSubmit, formState: { errors } } = useForm()
	const onSubmit = async (data) => {
		const success = await login(data);
		if (!success) {
			alert('Invalid credentials');
			return;
		} else {
			navigate('/rabistha/admin/dashboard');
		}
	};


	useEffect(() => {
		if (isAuthenticated) {
			navigate('/rabistha/admin/dashboard');
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center ">
			<div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
				<div className="px-6 py-4">
					<div className="flex justify-center mx-auto">
						<img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
					</div>
					<h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>
					<p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>
					<form onSubmit={handleSubmit(onSubmit)} >
						<div className="w-full mt-4">
							<input 	{...register('username')} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" placeholder="Username" aria-label="Username" />
						</div>
						<div className="w-full mt-4">
							<input {...register('password')} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="password" placeholder="Password" aria-label="Password" />
						</div>
						<div className="flex items-center justify-between mt-4">
							<a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>
							<button type="submit" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
								Sign In
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
} 
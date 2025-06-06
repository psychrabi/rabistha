import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "@/layouts/MainLayout";
const Cart = lazy(() => import("@/components/Cart"));
const Home = lazy(() => import("@/pages/Home"));
const Features = lazy(() => import("@/pages/Features"));
const Purchase = lazy(() => import("@/pages/Purchase"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const Wiki = lazy(() => import("@/pages/Wiki"));
const Blog = lazy(() => import("@/pages/Blog"));
const News = lazy(() => import("@/pages/News"));
const NotFound = lazy(() => import("@/components/NotFound"));

// Wiki pages
const QuickStart = lazy(() => import("@/pages/wiki/QuickStart"));
const UserManual = lazy(() => import("@/pages/wiki/UserManual"));

export const router = createBrowserRouter([
	{
		path: "/",
		Component: MainLayout,
		children: [
			{
				path: "/rabistha/",
				Component: Home,
			},
			{
				path: "/rabistha/features",
				Component: Features,
			},
			{
				path: "/rabistha/purchase",
				Component: Purchase,
			},
			{
				path: "/rabistha/cart",
				Component: Cart,
			},
			{
				path: "/rabistha/faqs",
				Component: FAQ,
			},
			{
				path: "/rabistha/contact",
				Component: Contact,
			},
			{
				path: "/rabistha/wiki",
				Component: Wiki,
			},
			{
				path: "/rabistha/wiki/quick-start",
				Component: QuickStart,
			},
			{
				path: "/rabistha/wiki/user-manual",
				Component: UserManual,
			},
			{
				path: "/rabistha/blog",
				Component: Blog,
			},
			{
				path: "/rabistha/news",
				Component: News,
			},
			{
				path: "/rabistha/*",
				Component: NotFound
			}
		],
	},
])
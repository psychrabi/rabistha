import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "@/layouts/MainLayout";
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
				path: "/",
				Component: Home,
			},
			{
				path: "/features",
				Component: Features,
			},
			{
				path: "/purchase",
				Component: Purchase,
			},
			{
				path: "/faqs",
				Component: FAQ,
			},
			{
				path: "/contact",
				Component: Contact,
			},
			{
				path: "/wiki",
				Component: Wiki,
			},
			{
				path: "/wiki/quick-start",
				Component: QuickStart,
			},
			{
				path: "/wiki/user-manual",
				Component: UserManual,
			},
			{
				path: "/blog",
				Component: Blog,
			},
			{
				path: "/news",
				Component: News,
			},
			{
				path: "/*",
				Component: NotFound
			}
		],
	},
])
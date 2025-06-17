import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

const ViewWikiCategory = lazy(() => import("@/pages/wiki/viewWikiCategory"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const FAQManager = lazy(() => import("@/pages/admin/FAQ"));
const Sales = lazy(() => import("@/pages/admin/Sales"));
const QuoteInvoice = lazy(() => import("@/pages/admin/QuoteInvoice"));
const Customers = lazy(() => import("@/pages/admin/Customers"));
const Licenses = lazy(() => import("@/pages/admin/Licenses"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Login = lazy(() => import("@/pages/admin/Login"));

const Cart = lazy(() => import("@/components/Cart"));
const Checkout = lazy(() => import("@/components/Checkout"));
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"));
const QRPayment = lazy(() => import("@/pages/QRPayment"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
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
const WikiManager = lazy(() => import("@/pages/admin/Wiki"));
const ViewWiki = lazy(() => import("@/pages/wiki/viewWiki"));

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
				Component: Features
			},
			{
				path: "/purchase",
				Component: Purchase,
			},
			{
				path: "/cart",
				Component: Cart,
			},
			{
				path: "/checkout",
				Component: Checkout,
			},
			{
				path: "/order-confirmation",
				Component: OrderConfirmation,
			},
			{
				path: "/qr-payment",
				Component: QRPayment,
			},
			{
				path: "/payment-success",
				Component: PaymentSuccess,
			},
			{
				path: "/faqs/*",
				Component: FAQ,
			},
			{
				path: "/contact",
				Component: Contact,
			},
			{
				path: "/wiki",
				Component: Wiki,
				children: [
					{
						path: "/wiki/:category",
						Component: ViewWikiCategory,
					},
					{
						path: "/wiki/:category/:slug",
						Component: ViewWiki,
					},				
				]
			},

			{
				path: "/wiki/:slug",
				Component: ViewWiki,
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
			},
		],

	},
	{
		path: "/login",
		Component: Login
	},
	{
		path: "/admin/",
		Component: AdminLayout,
		children: [
			{
				path: "/admin/dashboard",
				Component: Dashboard,
				index: true
			},
			{
				path: "/admin/licenses",
				Component: Licenses
			},
			{
				path: "/admin/customers",
				Component: Customers
			},
			{
				path: "/admin/sales",
				Component: Sales
			},
			{
				path: "/admin/invoices",
				Component: QuoteInvoice
			},
			{
				path: "/admin/wikis",
				Component: WikiManager
			},
			{
				path: "/admin/faqs",
				Component: FAQManager
			},
			{
				path: "/admin/*",
				Component: NotFound
			},
		]
	}
])
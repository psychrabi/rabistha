import Download from "../components/Download";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

function Contact() {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-[calc(100vh-8.6875rem)]">
      <div className="container px-6 py-4 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
          Contact <span className="text-blue-500">Us</span>
        </h1>
        <div className="flex mx-auto my-6">
          <span className="inline-block w-100 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
          <div>
            <div className="mb-8">
              <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-2xl dark:text-white">
                Chat to our friendly team
              </h1>
              <p className="mt-3 text-gray-500 dark:text-gray-400">
                We’d love to hear from you. Please fill out this form or shoot
                us an email.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="text-center">
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <Mail />
                </span>
                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  Email
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Have a question or issue, drop us an email.
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  support@aster.com.np
                </p>
              </div>
              <div className="text-center">
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <MessageCircle />
                </span>
                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  Live chat
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Have a question or issue, chat with us.
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  Start new chat
                </p>
              </div>
              <div className="text-center">
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <MapPin />
                </span>
                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  Office
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Come say hello at our office HQ.
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400"></p>
              </div>
              <div className="text-center">
                <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                  <Phone />
                </span>
                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                  Phone
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Mon-Fri from 10am to 5pm.
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  +977 9813098760
                </p>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">
                  +977 9860240841
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
            <form>
              <div className="-mx-2 md:items-center md:flex">
                <div className="flex-1 px-2">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name "
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="w-full mt-4">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Your message goes here."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Download />
    </section>
  );
}
export default Contact;

import { featuresData } from "../data/features";
import Download from "../components/Download";

function Features() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="my-6 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              What makes <span className="text-blue-500">ASTER</span> great
            </h1>
            <div className="flex mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
              <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                <feature.icon />
              </span>
              <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">{feature.title}</h1>
              <p className="text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Download />
    </section >
  );
}

export default Features;
import { BanknoteArrowDown, ClockFading, Leaf, Network, PlugZap, RulerDimensionLine, Sparkles, Volume1 } from "lucide-react";

const features = [
  {
    icon: BanknoteArrowDown,
    title: "Cost Saving",
    description: "With our software you can save money on additional computers"
  },
  {
    icon: Volume1,
    title: "Low Noise Level",
    description: "Multiseat systems reduce noise levels by eliminating additional system units"
  },
  {
    icon: RulerDimensionLine,
    title: "Space Saving",
    description: "You can create an additional workplace even in a small room"
  },
  {
    icon: Sparkles,
    title: "Easy to use",
    description: "ASTER can be started or unloaded at any time as a usual program"
  },
  {
    icon: PlugZap,
    title: "Electricity Saving",
    description: "Using ASTER you can reduce your electricity bill up to 4 times"
  },
  {
    icon: Network,
    title: "Zero Network Load",
    description: "Data exchange between workplaces does not increase network traffic"
  },
  {
    icon: Leaf,
    title: "Eco Friendly",
    description: "We will help you save nature"
  },
  {
    icon: ClockFading,
    title: "Quick Deployment",
    description: "Installing ASTER does not require formatting the disk or reinstalling the Windows"
  }
];

function Features() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white text-center">What makes <span className="text-blue-500">ASTER</span> great</h1>

        {/* <iframe className="min-w-full mt-12 rounded-xl md:h-[600px] overflow-hidden aspect-video" src="https://vimeo.com/showcase/7060635/video/525707984/embed"  /> */}

        <div className="grid grid-cols-1 gap-6 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} class="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
              <span class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                <feature.icon />
              </span>
              <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">{feature.title}</h1>
              <p class="text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
      </div>
    </div>
    </section >
  );
}

export default Features;
import Download from '@/components/Download';
import Testimonials from '@/components/Testimonials';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate()

  const handleDownload = useCallback(() => {
    navigate('/rabistha/download')
  }, []);

  return (
    <div>
      <section>
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl"><span className="text-blue-500 ">ASTER Multiseat</span></h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Turn one computer into two, four, six or even 12 workplaces, working independantly with each other.</p>
                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500" onClick={() => handleDownload()}>Get a free trial Now</button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img className="w-full h-full lg:max-w-3xl" src="images/6_monitors_one_comp.png" alt="ASTER 6 workplaces from one system" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">What is ASTER ?</h1>
                <p className="mt-3 text-gray-600 dark:text-gray-900">ASTER is a program for creating additional workplaces on one computer without thinclients, virtual machines and terminal statiosn.</p>
                <p className="my-3 text-gray-600 dark:text-gray-900">Several users can work simulteneously on one system without interferring with each other. Using ASTER, reduces the cost of acquiring and operating computer equipments by up to 50%.</p>
                <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl mt-10">Using the program</h2>
                <p className="mt-3 text-gray-600 dark:text-gray-900">
                  You can run common programs, create and edit documents, print on a common printer, watch movies - each workplace has its own and much more. The program allows up to 12 users to simultaneously and independently connect to the Internet and cloud services, as well as jointly play network games.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img className="w-full h-full lg:max-w-2xl" src="images/work_study_internet_dark.png" alt="ASTER 3 workplaces from one system" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container px-6 py-16 mx-auto">
          <div class="my-6 md:flex md:items-center md:justify-between">
            <div>
              <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                How it works
              </h1>
              <div class="flex mx-auto mt-6">
                <span class="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                <span class="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                <span class="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
              </div>
            </div>
          </div>
          <div className="items-center lg:flex">
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 flex-col">
              <img className="w-1/2 h-full lg:max-w-2xl" src="images/monitor.png" alt="Monitor inputs" />
              <img className="w-full h-full lg:max-w-2xl" src="images/usb_hdmi_dvi_vga_wifi.svg" alt="Different connection options" />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Step one</h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400 text-2xl">Connect an additional monitor or TV to the computer</p>
              <p className="mt-3 text-gray-600 dark:text-gray-400 text-md">Monitors can be connected to a computer via HDMI, DisplayPort, DVI, VGA, USB, WI FI.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl ">Step two</h1>
              <p className="mt-3 text-gray-600 dark:text-gray-900 text-2xl">Connect an additional keyboard and mouse to the computer</p>
              <p className="mt-3 text-gray-600 dark:text-gray-900 text-md">If necessary, you can connect a microphone, headphones or headset, speakers, webcam, and game devices to each workplace.</p>
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 flex-col">
              <img className="w-full h-full lg:max-w-2xl" src="images/multiseat.png" alt="Computer inputs" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 flex-col">
              <img className="w-full h-full lg:max-w-2xl" src="images/multiuser.png" alt="Computer input and ouput" />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Step three</h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400 text-2xl">Install ASTER program, configure the workplaces and enable it.</p>
              <p className="my-3 text-gray-600 dark:text-gray-400 text-md">On each monitor, desktop will be displayed and users will be able to independantly work with one computer computer and use common applications</p>
            </div>
          </div>
        </div>
      </section>
      <Download />
      <Testimonials />
    </div>
  );
}
export default Home;
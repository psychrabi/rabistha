import { Book, Download, Monitor, Key, Mouse, AlertTriangle } from 'lucide-react';

function getImageUrl(name) {
    // note that this does not include files in subdirectories
    return new URL(`/wiki/${name}.png`, import.meta.url).href
  }

function QuickStart() {
  const sections = [
    {
      title: "ASTER Installation",
      icon: <Download className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>To install ASTER:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the latest version of ASTER from the official website</li>
            <li>Run the installer as administrator</li>
            <li>Follow the installation wizard instructions</li>
            <li>Restart your computer when prompted</li>
          </ol>
        </div>
      ),
      image: `aster-installation.png`,
      imageAlt: "ASTER Installation Process"
    },
    {
      title: "ASTER Activation",
      icon: <Key className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>To activate ASTER:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Purchase a license from the official website</li>
            <li>Open ASTER Control Panel</li>
            <li>Click on "Activation"</li>
            <li>Enter your license key</li>
            <li>Click "Activate"</li>
          </ol>
        </div>
      ),
      image: "aster-activation.png",
      imageAlt: "ASTER Activation Process"
    },
    {
      title: "Monitor Setup",
      icon: <Monitor className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>To set up monitors:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Connect all monitors to your computer</li>
            <li>Open Windows Display Settings</li>
            <li>Configure monitor arrangement</li>
            <li>Set appropriate resolution for each monitor</li>
            <li>Save the configuration</li>
          </ol>
        </div>
      ),
      image: "monitor-setup.png",
      imageAlt: "Monitor Setup Configuration"
    },
    {
      title: "Enabling ASTER",
      icon: <Mouse className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>To enable ASTER:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open ASTER Control Panel</li>
            <li>Click on "Workplaces"</li>
            <li>Configure the number of workplaces</li>
            <li>Assign monitors to each workplace</li>
            <li>Click "Apply" to save changes</li>
            <li>Restart ASTER service when prompted</li>
          </ol>
        </div>
      ),
      image: "enable-aster.png",
      imageAlt: "Enabling ASTER Configuration"
    },
    {
      title: "Troubleshooting",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>Common issues and solutions:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>If monitors are not detected, check physical connections</li>
            <li>For activation issues, verify your license key</li>
            <li>If ASTER service fails to start, check system requirements</li>
            <li>For performance issues, ensure hardware meets minimum requirements</li>
          </ul>
        </div>
      ),
      image: "troubleshooting.png",
      imageAlt: "Troubleshooting Guide"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Book className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Quick Start Guide</h1>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg mb-8">
            Welcome to ASTER! This quick start guide will help you get up and running with ASTER quickly. Follow these steps to set up your multi-user workstation environment.
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={index} className="bg-base-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>{section.content}</div>
                  <div className="flex items-center justify-center">
                    <img 
                      src={`/wiki/${section.image}`} 
                      alt={section.imageAlt}
                      className="rounded-lg shadow-lg max-w-full h-auto"
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 bg-base-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p>
              If you need additional assistance, please refer to our comprehensive documentation or contact our support team. You can find more detailed information in the User Manual section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickStart; 
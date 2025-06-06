import { useState } from 'react';
import { ChevronRight, Book, HelpCircle, FileText, Link, History, Star } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

function Wiki() {
  const [activeSection, setActiveSection] = useState('quick-start');

  const wikiSections = {
    'quick-start': {
      title: 'Quick Start Guide',
      icon: <Book className="w-5 h-5" />,
      path: '/rabistha/wiki/quick-start',
      description: 'Get started with ASTER quickly and efficiently'
    },
    'user-manual': {
      title: 'User Manual',
      icon: <FileText className="w-5 h-5" />,
      path: '/rabistha/wiki/user-manual',
      description: 'Comprehensive guide to ASTER features and functionality'
    },
    'faq': {
      title: 'FAQ',
      icon: <HelpCircle className="w-5 h-5" />,
      path: '/rabistha/wiki/faq',
      description: 'Frequently asked questions and answers'
    },
    'solutions': {
      title: 'Solutions',
      icon: <Star className="w-5 h-5" />,
      path: '/rabistha/wiki/solutions',
      description: 'Troubleshooting guides and solutions'
    },
    'version-history': {
      title: 'Version History',
      icon: <History className="w-5 h-5" />,
      path: '/rabistha/wiki/version-history',
      description: 'Release notes and version updates'
    },
    'useful-links': {
      title: 'Useful Links',
      icon: <Link className="w-5 h-5" />,
      path: '/rabistha/wiki/useful-links',
      description: 'Additional resources and external links'
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-4">Wiki Navigation</h2>
        <div className="flex flex-col gap-2">
          {Object.entries(wikiSections).map(([key, section]) => (
            <RouterLink
              key={key}
              to={section.path}
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-base-300 ${activeSection === key ? 'bg-primary text-primary-content' : ''
                }`}
              onClick={() => setActiveSection(key)}
            >
              {section.icon}
              <span>{section.title}</span>
            </RouterLink>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="prose max-w-none">
          <h1 className="text-4xl font-bold mb-8">ASTER Documentation</h1>
          <p className="text-lg mb-8">
            Welcome to the ASTER documentation. Choose a section from the sidebar to learn more about ASTER's features and functionality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(wikiSections).map(([key, section]) => (
              <RouterLink
                key={key}
                to={section.path}
                className="block p-6 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {section.icon}
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <p className="text-base-content/70">{section.description}</p>
                <div className="flex items-center gap-2 mt-4 text-primary">
                  <span>Read more</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </RouterLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wiki;
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export default function ViewWikiCategory() {
  const [wikis, setWikis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/wikis/${category}`);
        
        if (!response.ok) {
          throw new Error('Wiki not found');
        }
        
        const data = await response.json();
        setWikis(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWiki();
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <section className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(wikis).map(([key, wiki]) => (
              <RouterLink
                key={key}
                to={`/wiki/${wiki.category}/${wiki.slug}`}
                className="block p-6 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {wiki.icon}
                  <h2 className="text-xl font-bold">{wiki.title}</h2>
                </div>
                <p className="text-base-content/70">{wiki.description}</p>
                <div className="flex items-center gap-2 mt-4 text-primary">
                  <span>Read more</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </RouterLink>
            ))}
          </div> 
    </section>
  );
}
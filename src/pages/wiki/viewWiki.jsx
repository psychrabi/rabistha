import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewWiki() {
  const [wiki, setWiki] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/wiki/${slug}`);
        
        if (!response.ok) {
          throw new Error('Wiki not found');
        }
        
        const data = await response.json();
        setWiki(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWiki();
  }, [slug]);

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
    <section >
            <div className="container px-6 py-10 mx-auto">

      <h1 className="text-3xl font-bold mb-6">{wiki?.title}</h1>
      <div 
        className="prose max-w-none text-white"
        dangerouslySetInnerHTML={{ __html: wiki?.content }}
      />
      </div>
    </section>
  );
}
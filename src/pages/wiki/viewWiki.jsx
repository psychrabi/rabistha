import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Loading from "../../components/Loading";
import ErrorBoundary from "../../components/ErrorBoundary";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function ViewWiki() {
  const [wiki, setWiki] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug, category } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchWiki = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${API_BASE_URL}/api/wikis/${category}/${slug}`
        );
        if (!response.ok) throw new Error("Wiki not found");
        const data = await response.json();
        if (isMounted) setWiki(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchWiki();
    return () => {
      isMounted = false;
    };
  }, [slug, category]);

  if (loading) return <Loading />;
  if (error) return <ErrorBoundary message={error} />;

  return (
    <section>
      <div className="px-6 py-10 bg-base-content">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">{wiki?.title}</h1>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              wiki?.content || "",
              { USE_PROFILES: { html: true }}
            ),
          }}
        />
      </div>
    </section>
  );
}

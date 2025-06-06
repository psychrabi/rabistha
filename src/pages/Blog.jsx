import { useState } from 'react';
import { Calendar, Tag, User } from 'lucide-react';

function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'news', name: 'News' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'updates', name: 'Updates' },
    { id: 'tips', name: 'Tips & Tricks' }
  ];

  const posts = [
    {
      id: 1,
      title: 'ASTER v3.0 Released: Major Update with New Features',
      category: 'updates',
      date: '2024-03-18',
      author: 'ASTER Team',
      content: `ASTER v3.0 brings significant improvements to multi-user computing. Key features include:
- Enhanced performance optimization
- New security features
- Improved user management
- Better network stability`,
      tags: ['release', 'v3.0', 'update']
    },
    {
      id: 2,
      title: 'How to Set Up Multiple Workstations with ASTER',
      category: 'tutorials',
      date: '2024-03-15',
      author: 'John Doe',
      content: `Learn how to configure multiple workstations using ASTER:
1. Hardware requirements
2. Network setup
3. User configuration
4. Performance optimization`,
      tags: ['setup', 'tutorial', 'configuration']
    },
    {
      id: 3,
      title: 'Top 10 Tips for Optimizing ASTER Performance',
      category: 'tips',
      date: '2024-03-12',
      author: 'Jane Smith',
      content: `Discover the best practices for getting the most out of ASTER:
- System optimization
- Network configuration
- User management
- Resource allocation`,
      tags: ['optimization', 'performance', 'tips']
    }
  ];

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">ASTER Blog</h1>

      {/* Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === category.id
                ? 'bg-primary text-primary-content'
                : 'bg-base-200 hover:bg-base-300'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="grid gap-8">
        {filteredPosts.map(post => (
          <article key={post.id} className="bg-base-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>

            <div className="flex gap-4 text-sm text-base-content/70 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </div>

            <div className="prose max-w-none mb-4">
              <div className="whitespace-pre-wrap">{post.content}</div>
            </div>

            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 bg-base-300 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;

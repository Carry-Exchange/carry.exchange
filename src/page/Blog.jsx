import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBlogs, getBlogCoverUrl } from "../lib/pb";
import { getTagColor } from "../utils/tagColor";
import { formatDate } from "../utils/formatDate";

function BlogCard({ post }) {
  const cover = getBlogCoverUrl(post);
  return (
    <Link
      to={`/insights/${post.slug || post.id}`}
      className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(139,92,246,0.08)] group flex flex-col"
    >
      <div className="relative h-48 overflow-hidden shrink-0">
        {cover ? (
          <img
            src={cover}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-950 to-indigo-950 flex items-center justify-center">
            <svg className="w-12 h-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 2v6h6M9 13h6M9 17h4" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {(post.tags || []).slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-xs shrink-0">
            {formatDate(post.published_at || post.created)}
          </span>
        </div>

        <h3 className="text-white font-medium text-sm leading-snug mb-2 line-clamp-2 flex-1">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}

        {post.author && (
          <p className="text-gray-600 text-xs mt-auto">By {post.author}</p>
        )}
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-800" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-800 rounded-full w-16" />
          <div className="h-4 bg-gray-800 rounded w-12" />
        </div>
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-gray-800 rounded w-full mt-2" />
        <div className="h-3 bg-gray-800 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTag, setActiveTag] = useState("");
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getBlogs({ tag: activeTag })
      .then((data) => {
        const items = data.items || [];
        setPosts(items);
        if (!activeTag) {
          const tags = [...new Set(items.flatMap((p) => p.tags || []))];
          setAllTags(tags);
        }
      })
      .catch(() => { setPosts([]); setError(true); })
      .finally(() => setLoading(false));
  }, [activeTag]);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Carry Exchange Blog | AI & Crypto Derivatives News</title>
        <meta name="description" content="Insights, market analysis, and updates from the Carry Exchange team." />
        <link rel="canonical" href="https://carry.exchange/insights" />
        <meta property="og:title" content="Blog | Carry Exchange" />
        <meta property="og:description" content="Insights, market analysis, and updates from the Carry Exchange team." />
        <meta property="og:url" content="https://carry.exchange/blog" />
      </Helmet>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <span className="inline-block border border-purple-500 text-purple-400 text-xs font-semibold px-3 mt-10 py-1 rounded-full mb-4">
            Blog
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Carry Exchange Blog: News on AI &amp; Crypto Derivatives</h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10">
            Market analysis, product updates, and trading insights from the Carry Exchange team.
          </p>
        </div>

        {/* Tag filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setActiveTag("")}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeTag === ""
                  ? "border-purple-500 bg-purple-500/20 text-purple-300"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? "" : tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeTag === tag
                    ? "border-purple-500 bg-purple-500/20 text-purple-300"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-sm">Failed to load posts. Please try again.</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-5">
              <FiFileText className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-white text-lg font-medium mb-2">No posts yet</h2>
            <p className="text-gray-500 text-sm max-w-xs">
              We're working on it. Check back soon for market analysis and trading insights.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft, FiLink, FiCheck } from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBlog, getBlogCoverUrl } from "../lib/pb";
import { getTagColor } from "../utils/tagColor";
import { formatDateLong as formatDate } from "../utils/formatDate";
import DOMPurify from "dompurify";

function ShareButtons({ title }) {
  const url = window.location.href;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const btnBase = "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-gray-500 text-xs mr-1">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className={`${btnBase} bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/20`}
      >
        <FaTwitter className="w-3.5 h-3.5" />
        Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className={`${btnBase} bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/20`}
      >
        <FaLinkedin className="w-3.5 h-3.5" />
        LinkedIn
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank"
        rel="noreferrer"
        className={`${btnBase} bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20`}
      >
        <FaWhatsapp className="w-3.5 h-3.5" />
        WhatsApp
      </a>
      <a
        href={`https://t.me/share/url?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        className={`${btnBase} bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20 text-[#2AABEE] border border-[#2AABEE]/20`}
      >
        <FaTelegram className="w-3.5 h-3.5" />
        Telegram
      </a>
    </div>
  );
}

function TopShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {navigator.share && (
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition-all"
        >
          <FiLink className="w-3 h-3" />
          Share
        </button>
      )}
      <button
        onClick={copyLink}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
          copied
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            : "bg-gray-800 hover:bg-gray-700 text-gray-400 border-gray-700"
        }`}
      >
        {copied ? <FiCheck className="w-3 h-3" /> : <FiLink className="w-3 h-3" />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function SkeletonPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse">
      <div className="h-4 bg-gray-800 rounded w-24 mb-10" />
      <div className="h-72 bg-gray-800 rounded-2xl mb-8" />
      <div className="flex gap-2 mb-4">
        <div className="h-5 bg-gray-800 rounded-full w-16" />
        <div className="h-5 bg-gray-800 rounded-full w-20" />
      </div>
      <div className="h-8 bg-gray-800 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-800 rounded w-1/3 mb-8" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-4 bg-gray-800 rounded ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getBlog(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 text-white">
        <Header />
        <SkeletonPost />
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex flex-col">
        <Helmet>
          <title>Post Not Found | Carry Exchange</title>
        </Helmet>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-gray-400 mb-4">This blog post could not be found.</p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const cover = getBlogCoverUrl(post);
  const publishedDate = post.published_at || post.created;

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>{post.title} | Carry Exchange</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://carry.exchange/insights/${post.slug || post.id}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        {cover && <meta property="og:image" content={cover} />}
      </Helmet>

      <Header />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors mb-10"
        >
          <FiArrowLeft className="w-4 h-4" />
          All Posts
        </Link>

        {/* Cover image */}
        {cover && (
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
            <img src={cover} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Tags */}
        {(post.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-white leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta + Top Share */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {post.author && (
              <>
                <span>By <span className="text-gray-300">{post.author}</span></span>
                <span>·</span>
              </>
            )}
            <span>{formatDate(publishedDate)}</span>
          </div>
          <TopShareButtons title={post.title} />
        </div>

        {/* Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />

        {/* Bottom Share */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm mb-4">Found this useful? Share it with others.</p>
          <ShareButtons title={post.title} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

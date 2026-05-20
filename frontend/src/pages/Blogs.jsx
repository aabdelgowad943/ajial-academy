import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import BlogCard from '../components/BlogCard';

const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  return url.endsWith('/api') ? url : `${url}/api`;
})();

export default function Blogs() {
  const { language, t, isRtl } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', options);
  };

  // If a blog is selected, render the detail view
  if (selectedBlog) {
    const title = selectedBlog.title[language] || selectedBlog.title['en'];
    const content = selectedBlog.content[language] || selectedBlog.content['en'];
    const author = selectedBlog.author[language] || selectedBlog.author['en'];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
        {/* Back Button */}
        <button
          onClick={() => setSelectedBlog(null)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
        >
          {isRtl ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
          <span>{t('blogBack')}</span>
        </button>

        {/* Article Cover */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={selectedBlog.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Meta Info */}
        <div className="flex items-center text-sm text-gray-500 gap-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(selectedBlog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl leading-tight">
          {title}
        </h1>

        {/* Content Body */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800 whitespace-pre-line">
          {content}
        </div>
      </div>
    );
  }

  // Render index view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          {t('blogTitle')}
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          {t('blogSubtitle')}
        </p>
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800/50 rounded-2xl h-80" />
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onClick={() => setSelectedBlog(blog)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {t('noBlogs')}
        </div>
      )}

    </div>
  );
}

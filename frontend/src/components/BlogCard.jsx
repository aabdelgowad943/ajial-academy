import React from 'react';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function BlogCard({ blog, onClick }) {
  const { language, t, isRtl } = useLanguage();

  const title = blog.title[language] || blog.title['en'];
  const content = blog.content[language] || blog.content['en'];
  const author = blog.author[language] || blog.author['en'];

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', options);
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Blog Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={blog.imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Blog Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Date & Author */}
          <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span>{author}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Content snippet */}
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {content}
          </p>
        </div>

        {/* Read More button */}
        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span>{t('blogReadMore')}</span>
            {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function CourseCard({ course }) {
  const { language, t } = useLanguage();

  const title = course.title[language] || course.title['en'];
  const description = course.description[language] || course.description['en'];
  const category = course.category[language] || course.category['en'];
  const duration = course.duration[language] || course.duration['en'];
  
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300 group">
      {/* Image with Category Badge */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={course.imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Features Checklist */}
          {course.features && course.features.length > 0 && (
            <ul className="pt-2 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
              {course.features.slice(0, 3).map((feat, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                  <span className="truncate">{feat[language] || feat['en']}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1.5">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{t('courseDuration')}: {duration}</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
              {course.price}{t('courseCurrency')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

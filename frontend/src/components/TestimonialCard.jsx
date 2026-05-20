import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function TestimonialCard({ testimonial }) {
  const { language } = useLanguage();

  const name = testimonial.name[language] || testimonial.name['en'];
  const role = testimonial.role[language] || testimonial.role['en'];
  const feedback = testimonial.feedback[language] || testimonial.feedback['en'];
  const rating = testimonial.rating || 5;

  return (
    <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex text-yellow-400 gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4.5 w-4.5 ${
                i < rating ? 'fill-current' : 'text-gray-200 dark:text-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Feedback Text */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 italic leading-relaxed">
          "{feedback}"
        </p>
      </div>

      {/* User Info */}
      <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-400 flex items-center justify-center font-bold text-white text-sm uppercase">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-none">
            {name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

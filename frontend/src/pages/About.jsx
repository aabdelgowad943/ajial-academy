import React from 'react';
import { Award, Compass, BookOpen, Star } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
      titleKey: "whyPoint1",
      descKey: "whyPoint1Desc"
    },
    {
      icon: <Compass className="h-6 w-6 text-secondary-500" />,
      titleKey: "whyPoint2",
      descKey: "whyPoint2Desc"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
      titleKey: "whyPoint3",
      descKey: "whyPoint3Desc"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          {t('aboutTitle')}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          {t('aboutSubtitle')}
        </p>
      </div>

      {/* 2. Banner Image */}
      <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-gray-100 dark:bg-gray-800">
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&auto=format&fit=crop&q=80"
          alt="Academy environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* 3. Story & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Story */}
        <div className="space-y-4 bg-white dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('aboutHeading1')}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('aboutText1')}
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-4 bg-white dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('aboutHeading2')}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('aboutText2')}
          </p>
        </div>
      </div>

      {/* 4. Value Propositions / Why Choose Us */}
      <div className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('aboutHeading3')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800/60 rounded-2xl space-y-4"
            >
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t(val.titleKey)}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {t(val.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

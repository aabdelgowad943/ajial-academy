import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  return url.endsWith('/api') ? url : `${url}/api`;
})();

export default function FAQs() {
  const { language, t } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_URL}/faqs`);
        if (response.ok) {
          const data = await response.json();
          setFaqs(data);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          {t('faqsTitle')}
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          {t('faqsSubtitle')}
        </p>
      </div>

      {/* Accordion Layout */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800/40 rounded-xl h-16" />
          ))}
        </div>
      ) : faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const question = faq.question[language] || faq.question['en'];
            const answer = faq.answer[language] || faq.answer['en'];
            const isOpen = openIndex === index;

            return (
              <div
                key={faq._id}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-800/40 transition-colors"
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left rtl:text-right font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/35 transition-colors gap-4"
                >
                  <span className="flex items-center gap-3 text-sm md:text-base">
                    <HelpCircle className="h-5 w-5 text-primary-500 shrink-0" />
                    {question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 dark:border-gray-800 text-sm md:text-base text-gray-500 dark:text-gray-300 leading-relaxed">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {t('noFaqs')}
        </div>
      )}

    </div>
  );
}

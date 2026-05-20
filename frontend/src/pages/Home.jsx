import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Code, Globe, PenTool, TrendingUp, Users, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import CourseCard from '../components/CourseCard';
import OwnerCard from '../components/OwnerCard';
import TestimonialCard from '../components/TestimonialCard';

const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  return url.endsWith('/api') ? url : `${url}/api`;
})();

export default function Home() {
  const { language, t, isRtl } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, testimonialsRes] = await Promise.all([
          fetch(`${API_URL}/courses`),
          fetch(`${API_URL}/testimonials`)
        ]);
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }
        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTestimonials(testimonialsData);
        }
      } catch (err) {
        console.error('Error fetching landing page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Static Owners Data
  const owners = [
    {
      id: 1,
      name: { en: "Eng. Khaled Mahmoud", ar: "م. خالد محمود" },
      role: { en: "Co-Founder & Tech Director", ar: "شريك مؤسس ومدير التعليم التقني" },
      bio: {
        en: "Khaled has over 10 years of experience writing clean code and scaling platforms. He directs the programming and software engineering curriculum.",
        ar: "خالد لديه أكثر من 10 سنوات من الخبرة في كتابة الأكواد وتطوير المنصات. يدير المناهج البرمجية وتطوير البرمجيات بالأكاديمية."
      },
      phone: "+201234567890",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: { en: "Designer Sarah Ali", ar: "المصممة سارة علي" },
      role: { en: "Co-Founder & UI/UX Director", ar: "شريكة مؤسسة ومديرة التصميم الرقمي" },
      bio: {
        en: "Sarah is a digital designer who specializes in creating user-centered interfaces. She leads design and digital marketing tracks.",
        ar: "سارة مصممة رقمية متخصصة في إنشاء واجهات تتمحور حول المستخدم. تقود مسارات التصميم الرقمي والتسويق الإلكتروني."
      },
      phone: "+201098765432",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        {/* Soft background glow circles */}
        <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-secondary-500/10 dark:bg-secondary-500/5 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Details */}
          <div className="space-y-6 text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 border border-primary-200/40">
              <GraduationCap className="h-4 w-4" />
              <span>{t('appName')} - Build Real Careers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
              {t('heroTitle')}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:justify-center rtl:lg:justify-start pt-2">
              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-lg shadow-primary-600/15 hover:shadow-primary-600/25 transition-all"
              >
                <span>{t('heroCta')}</span>
                {isRtl ? <ArrowLeft className="h-4.5 w-4.5" /> : <ArrowRight className="h-4.5 w-4.5" />}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
              >
                {t('heroCtaSecondary')}
              </Link>
            </div>
          </div>

          {/* Hero Illustration / Graphics */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square overflow-hidden rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800/80 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 p-2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60"
                alt="Students studying"
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Floating micro elements */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="p-3 bg-green-500 text-white rounded-xl">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Programming</h4>
                  <span className="text-xs text-gray-400">100% Practical</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-white dark:bg-gray-800/20 border-y border-gray-100 dark:border-gray-800/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-gray-100 dark:divide-gray-800">
            <div className="py-4 sm:py-0">
              <h3 className="text-4xl font-extrabold text-primary-600 dark:text-primary-400">{t('statStudents')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-semibold">{t('statStudentsLabel')}</p>
            </div>
            <div className="py-4 sm:py-0">
              <h3 className="text-4xl font-extrabold text-secondary-500">{t('statCourses')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-semibold">{t('statCoursesLabel')}</p>
            </div>
            <div className="py-4 sm:py-0">
              <h3 className="text-4xl font-extrabold text-primary-600 dark:text-primary-400">{t('statInstructors')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-semibold">{t('statInstructorsLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC COURSES SECTION */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {t('coursesTitle')}
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('coursesSubtitle')}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800/50 rounded-2xl h-80" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t('noCourses')}
          </div>
        )}
      </section>

      {/* 4. FOUNDERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {t('ownersTitle')}
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('ownersSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {owners.map((owner) => (
            <OwnerCard key={owner.id} owner={owner} />
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800/50 rounded-2xl h-48" />
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <TestimonialCard key={test._id} testimonial={test} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t('testimonialsSubtitle')}
          </div>
        )}
      </section>

      {/* 6. ADMIN DASHBOARD CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-500 p-8 sm:p-12 text-white shadow-xl shadow-primary-600/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10 max-w-xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold">{t('navDashboard')} ACCESS</h2>
            <p className="text-sm sm:text-base text-primary-50 leading-relaxed">
              If you are the academy administrator, you can access the secure dashboard to update courses, write articles, check contact messages, and handle FAQs.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 shadow-md shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 transition-all"
              >
                <span>Go to Admin Dashboard</span>
                <ArrowUpRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

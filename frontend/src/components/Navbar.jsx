import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, GraduationCap, Languages, LayoutDashboard, LogOut } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navBlogs'), path: '/blogs' },
    { name: t('navFaqs'), path: '/faqs' },
    { name: t('navContact'), path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-200 border-b border-gray-200/50 dark:border-gray-800/50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <div className="p-2 rounded-xl bg-primary-500 text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400">
              {t('appName')}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Utilities (Theme, Lang, Login/Dashboard) */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Change Language"
            >
              <Languages className="h-4.5 w-4.5" />
              <span>{t('toggleLanguage')}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Admin Buttons */}
            {token ? (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-xl transition-all shadow-md shadow-primary-600/10 hover:shadow-primary-600/20"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{t('navDashboard')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                  title={t('navLogout')}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
              >
                {t('navLogin')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2 rtl:space-x-reverse">
            {/* Lang toggle in mobile bar */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <Languages className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col space-y-3">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-base font-semibold text-white bg-primary-600 dark:bg-primary-500 rounded-xl"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  {t('navDashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
                >
                  <LogOut className="h-5 w-5" />
                  {t('navLogout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-2.5 text-base font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl"
              >
                {t('navLogin')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

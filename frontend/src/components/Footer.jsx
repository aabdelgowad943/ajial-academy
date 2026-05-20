import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse text-white">
              <div className="p-2 rounded-xl bg-primary-600 text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl tracking-tight">{t('appName')}</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t('heroSubtitle').substring(0, 120)}...
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 rtl:space-x-reverse pt-2">
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-primary-600 hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-primary-600 hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-primary-600 hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-primary-600 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('navHome')}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">{t('navHome')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">{t('navAbout')}</Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white transition-colors">{t('navBlogs')}</Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors">{t('navFaqs')}</Link>
              </li>
            </ul>
          </div>

          {/* Academy Info */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('navAbout')}</h3>
            <p className="text-sm leading-relaxed mb-3">
              {t('academyOwner')}
            </p>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} {t('appName')}. All rights reserved.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('navContact')}</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-secondary-500 shrink-0" />
                <span>{t('contactInfoAddressVal')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary-500 shrink-0" />
                <span className="ltr:block dir-ltr text-left">+20 1234 567 890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary-500 shrink-0" />
                <span>info@ajialacademy.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

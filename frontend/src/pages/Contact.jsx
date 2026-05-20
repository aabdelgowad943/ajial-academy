import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  return url.endsWith('/api') ? url : `${url}/api`;
})();

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: t('contactSuccess') });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        const err = await response.json();
        throw new Error(err.message || 'Error occurred');
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: t('contactError') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          {t('contactTitle')}
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          {t('contactSubtitle')}
        </p>
      </div>

      {/* 2. Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Info Column */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
              Contact Information
            </h2>
            
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('contactInfoAddress')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{t('contactInfoAddressVal')}</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-secondary-50 text-secondary-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('contactInfoPhone')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 dir-ltr text-left">+20 1234 567 890</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">Saturday - Thursday: 10 AM - 9 PM</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('contactInfoEmail')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">info@ajialacademy.com</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">support@ajialacademy.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-sm space-y-6"
          >
            {status.message && (
              <div
                className={`p-4 rounded-xl text-sm font-semibold ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400'
                    : 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t('contactFormName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ahmad Ali"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t('contactFormEmail')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. ahmad@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t('contactFormPhone')}
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +20123456789"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t('contactFormSubject')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Course Inquiry"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {t('contactFormMessage')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3.5 w-full sm:w-auto font-bold text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-xl transition-all shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <span>{t('contactFormSending')}</span>
                ) : (
                  <>
                    <Send className="h-4.5 w-4.5 rtl:rotate-180" />
                    <span>{t('contactFormSubmit')}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}

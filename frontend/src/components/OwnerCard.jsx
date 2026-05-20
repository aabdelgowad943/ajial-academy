import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function OwnerCard({ owner }) {
  const { language, t, isRtl } = useLanguage();

  const name = owner.name[language] || owner.name['en'];
  const role = owner.role[language] || owner.role['en'];
  const bio = owner.bio[language] || owner.bio['en'];

  // Custom whatsapp URL
  const encodedMsg = encodeURIComponent(
    language === 'ar' 
      ? `مرحباً أكاديمية أجيال، أود الاستفسار عن الدورات المتاحة.` 
      : `Hello Ajial Academy, I would like to inquire about the available courses.`
  );
  const whatsappUrl = `https://wa.me/${owner.phone}?text=${encodedMsg}`;

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-800/40 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5">
      {/* Outer wrapper for avatar */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800/80 mb-4">
        <img
          src={owner.imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* WhatsApp Hover Overlay */}
        <div className="absolute inset-0 bg-primary-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <MessageSquare className="h-5 w-5 shrink-0" />
            <span>{t('ownersContactWhatsapp')}</span>
          </a>
          <span className="text-xs text-green-300/80 mt-2 font-medium tracking-wide">
            {owner.phone}
          </span>
        </div>
      </div>

      {/* Info details */}
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            {name}
          </h3>
        </div>
        <p className="text-xs font-semibold text-secondary-600 dark:text-secondary-400 uppercase tracking-wider">
          {role}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
          {bio}
        </p>
      </div>
    </div>
  );
}

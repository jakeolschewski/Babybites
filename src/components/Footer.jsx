import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-babyBlue p-4 text-center mt-10">
      <p className="text-gray-600">{t('footerCopyright')}</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="/about" className="text-blue-600 hover:underline" aria-label={t('about')}>
          {t('about')}
        </a>
        <a href="/contact" className="text-blue-600 hover:underline" aria-label={t('contact')}>
          {t('contact')}
        </a>
        <a href="/privacy" className="text-blue-600 hover:underline" aria-label={t('privacy')}>
          {t('privacy')}
        </a>
        <a href="/terms" className="text-blue-600 hover:underline" aria-label={t('terms')}>
          {t('terms')}
        </a>
      </div>
    </footer>
  );
};

export default Footer;

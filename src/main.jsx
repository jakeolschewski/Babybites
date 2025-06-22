import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import enTranslation from './translations/en.json';
import esTranslation from './translations/es.json';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
  },
}).catch((e) => console.warn('i18next init failed:', e));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch((e) => console.warn('Service worker registration failed:', e));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

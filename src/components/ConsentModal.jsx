import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';

const ConsentModal = () => {
  const { t } = useTranslation();
  const { dispatch } = useContext(AppContext);

  const handleConsent = (consent) => {
    dispatch({ type: 'SET_CONSENT', payload: consent });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md" role="dialog" aria-labelledby="consent-title">
        <h3 id="consent-title" className="text-xl font-semibold mb-4">{t('privacyConsent')}</h3>
        <p className="mb-4">{t('consentMessage')}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleConsent(true)}
            className="baby-button"
            aria-label={t('accept')}
          >
            {t('accept')}
          </button>
          <button
            onClick={() => handleConsent(false)}
            className="baby-button bg-gray-500"
            aria-label={t('decline')}
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;

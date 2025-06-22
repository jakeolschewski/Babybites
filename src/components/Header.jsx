import React, { useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const auth = getAuth();

  const handleSignIn = useCallback(async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      toast.success(t('signInSuccess'));
    } catch (e) {
      toast.error(t('signInError'));
      console.warn('Sign-in failed:', e);
    }
  }, [t]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      toast.success(t('signOutSuccess'));
    } catch (e) {
      toast.error(t('signOutError'));
      console.warn('Sign-out failed:', e);
    }
  }, [t]);

  const toggleTheme = useCallback(() => {
    const themes = ['default', 'dark', 'high-contrast', 'colorblind'];
    const nextTheme = themes[(themes.indexOf(state.theme) + 1) % themes.length];
    dispatch({ type: 'SET_THEME', payload: nextTheme });
  }, [state.theme, dispatch]);

  return (
    <header className="bg-gradient-to-r from-babyBlue to-babyPink p-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800" aria-label="BabyBites logo">BabyBites</h1>
        <nav className="flex items-center space-x-4">
          <a href="#home" className="text-blue-600 hover:underline" aria-label={t('home')}>{t('home')}</a>
          <a href="#products" className="text-blue-600 hover:underline" aria-label={t('products')}>{t('products')}</a>
          <a href="#cart" className="text-blue-600 hover:underline" aria-label={t('cart')}>
            {t('cart')} ({state.cart.length})
          </a>
          <a href="#quiz" className="text-blue-600 hover:underline" aria-label={t('dailyQuiz')}>{t('dailyQuiz')}</a>
          <a href="#forum" className="text-blue-600 hover:underline" aria-label={t('communityForum')}>{t('communityForum')}</a>
          <select
            onChange={(e) => {
              i18n.changeLanguage(e.target.value).catch(() => toast.error(t('languageError')));
              dispatch({ type: 'SET_LANGUAGE', payload: e.target.value });
            }}
            className="border rounded p-1"
            aria-label={t('selectLanguage')}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          <select
            onChange={(e) => dispatch({ type: 'SET_CURRENCY', payload: e.target.value })}
            className="border rounded p-1"
            aria-label={t('selectCurrency')}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <button onClick={toggleTheme} className="text-blue-600 hover:underline" aria-label={t('toggleTheme')}>
            {t('toggleTheme')}
          </button>
          {state.user ? (
            <>
              <span aria-label={t('userPoints')}>Points: {state.points} ({state.tier})</span>
              <button onClick={handleSignOut} className="text-blue-600 hover:underline" aria-label={t('signOut')}>
                {t('signOut')}
              </button>
            </>
          ) : (
            <button onClick={handleSignIn} className="text-blue-600 hover:underline" aria-label={t('signIn')}>
              {t('signIn')}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const SignUp = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [babyAge, setBabyAge] = useState('');
  const auth = getAuth();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || password.length < 6) {
        toast.error(t('signUpInvalid'));
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success(t('signUpSuccess'));
        setEmail('');
        setPassword('');
        setBabyAge('');
      } catch (e) {
        toast.error(t('signUpError') + ': ' + e.message);
        console.warn('Sign-up failed:', e);
      }
    },
    [email, password, t]
  );

  return (
    <section className="bg-babyBlue py-20 text-center pt-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 holographic">{t('welcome')}</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email')}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-babyPink"
            aria-label={t('email')}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password')}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-babyPink"
            aria-label={t('password')}
            required
          />
          <input
            type="number"
            value={babyAge}
            onChange={(e) => setBabyAge(e.target.value)}
            placeholder={t('babyAge')}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-babyPink"
            aria-label={t('babyAge')}
          />
          <button type="submit" className="baby-button w-full" aria-label={t('signUp')}>
            {t('signUp')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;

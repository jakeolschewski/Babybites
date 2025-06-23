import React, { useReducer, useEffect, lazy, Suspense } from 'react';
import { initializeApp } from 'firebase/app/dist/index.esm.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth/dist/index.esm.js';
import { AppContext, reducer, initialState } from './context/AppContext';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = lazy(() => import('./components/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const StickyCart = lazy(() => import('./components/StickyCart'));
const ConsentModal = lazy(() => import('./components/ConsentModal'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const Footer = lazy(() => import('./components/Footer'));

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'mock-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mock.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mock-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mock.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'mock-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'mock-app-id',
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.warn('Firebase init failed, using mock:', e);
  app = { auth: () => ({ onAuthStateChanged: (cb) => cb(null) }) };
}
const auth = getAuth(app);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'SET_USER', payload: user });
      if (user && !state.flConsent) {
        dispatch({ type: 'SHOW_CONSENT', payload: true });
      }
    }, (e) => {
      console.warn('Auth state change failed:', e);
      toast.error('Authentication error. Please try again.');
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={`min-h-screen ${state.theme === 'dark' ? 'bg-gray-800 text-white' : state.theme === 'high-contrast' ? 'bg-black text-yellow-200' : state.theme === 'colorblind' ? 'bg-gray-200 text-blue-900' : 'bg-gray-100'}`}>
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Header />
          {state.user ? <Dashboard /> : <SignUp />}
          {state.user && <StickyCart />}
          {state.showConsent && <ConsentModal />}
          <Chatbot />
          <Footer />
        </Suspense>
        <ToastContainer position="bottom-left" autoClose={3000} />
      </div>
    </AppContext.Provider>
  );
};

export default App;

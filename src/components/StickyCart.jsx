import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const StickyCart = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);

  const getPrice = useMemo(
    () => (product) => {
      let price = product.price;
      if (state.tier === 'Gold') price *= 0.9;
      else if (state.tier === 'Silver') price *= 0.95;
      if (product.stock < 10) price *= 1.05;
      return price.toFixed(2);
    },
    [state.tier]
  );

  const total = useMemo(
    () => state.cart.reduce((sum, item) => sum + parseFloat(getPrice(item)), 0).toFixed(2),
    [state.cart, getPrice]
  );

  const handleCheckout = () => {
    toast.info(t('checkoutMocked'));
  };

  return (
    <section id="cart" className="fixed top-20 right-4 w-64 bg-white p-4 rounded-lg shadow-md" role="region" aria-label={t('cart')}>
      <h2 className="text-xl font-bold mb-4">{t('cart')}</h2>
      {state.cart.length === 0 ? (
        <p className="text-gray-600">{t('cartEmpty')}</p>
      ) : (
        <div>
          {state.cart.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between mb-2" role="listitem">
              <span>{item.name}</span>
              <span>${getPrice(item)}</span>
            </div>
          ))}
          {state.cart.length > 3 && (
            <p className="text-gray-600">{t('moreItems', { count: state.cart.length - 3 })}</p>
          )}
          <p className="text-right font-bold">{t('total')}: ${total}</p>
          <button onClick={handleCheckout} className="baby-button mt-4 w-full" aria-label={t('checkout')}>
            {t('checkout')}
          </button>
        </div>
      )}
    </section>
  );
};

export default StickyCart;

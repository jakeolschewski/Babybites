import React, { createContext, useMemo } from 'react';
import { toast } from 'react-toastify';

export const initialState = {
  user: null,
  cart: [],
  products: [
    {
      id: 1,
      name: 'Organic Baby Puree',
      price: 5.99,
      originalPrice: 6.99,
      image: 'https://via.placeholder.com/150',
      category: 'food',
      stock: 50,
      carbonFootprint: '0.5kg',
      affiliateLink: 'https://amazon.com',
      description: 'Gentle, organic puree for your baby’s first meals.',
    },
    {
      id: 2,
      name: 'Baby Sleep Sack',
      price: 19.99,
      originalPrice: 22.99,
      image: 'https://via.placeholder.com/150',
      category: 'clothing',
      stock: 20,
      carbonFootprint: '1.2kg',
      affiliateLink: 'https://amazon.com',
      description: 'Cozy sleep sack for safe nights.',
    },
    {
      id: 3,
      name: 'Teething Toy',
      price: 9.99,
      originalPrice: 11.99,
      image: 'https://via.placeholder.com/150',
      category: 'toys',
      stock: 8,
      carbonFootprint: '0.3kg',
      affiliateLink: 'https://amazon.com',
      description: 'Safe, soothing toy for teething babies.',
    },
  ],
  points: 0,
  tier: 'Bronze',
  theme: localStorage.getItem('theme') || 'default',
  currency: 'USD',
  language: 'en',
  flConsent: false,
  showConsent: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      const newPoints = state.points + 50;
      const newTier = newPoints >= 1000 ? 'Gold' : newPoints >= 500 ? 'Silver' : 'Bronze';
      toast.success(`${action.payload.name} added to cart! +50 points`);
      return {
        ...state,
        cart: [...state.cart, action.payload],
        points: newPoints,
        tier: newTier,
      };
    case 'ADD_POINTS':
      const updatedPoints = state.points + action.payload;
      const updatedTier = updatedPoints >= 1000 ? 'Gold' : updatedPoints >= 500 ? 'Silver' : 'Bronze';
      return { ...state, points: updatedPoints, tier: updatedTier };
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SHOW_CONSENT':
      return { ...state, showConsent: action.payload };
    case 'SET_CONSENT':
      return { ...state, flConsent: action.payload, showConsent: false };
    default:
      return state;
  }
};

export const AppContext = createContext();

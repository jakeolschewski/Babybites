import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import sanitizeHtml from 'sanitize-html';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { updateFederatedChatModel } from '../utils/federatedLearning';

const getBotResponse = (input, products) => {
  const lowerInput = input.toLowerCase();
  try {
    if (lowerInput.includes('product') || lowerInput.includes('baby')) {
      return `Try our ${products[0]?.name || 'Organic Baby Puree'} for your baby!`;
    }
    return `Can you clarify? Ask about products or parenting tips.`;
  } catch (e) {
    console.warn('Bot response generation failed:', e);
    return 'Sorry, I couldn’t process that. Try again!';
  }
};

const Chatbot = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: t('chatbotWelcome') },
  ]);
  const [input, setInput] = useState('');
  const recognition = useRef(null);
  const isVoiceSupported = 'webkitSpeechRecognition' in window;

  useEffect(() => {
    if (isVoiceSupported) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = state.language;
      recognition.current.onresult = (e) => setInput(e.results[0][0].transcript);
      recognition.current.onerror = () => toast.error(t('speechError'));
    }
  }, [state.language, t]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) {
      toast.warn(t('emptyMessage'));
      return;
    }
    const sanitizedInput = sanitizeHtml(input, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const response = getBotResponse(sanitizedInput, state.products);
    const newMessages = [
      ...messages,
      { sender: 'user', text: sanitizedInput },
      { sender: 'bot', text: response },
    ];
    setMessages(newMessages);
    if (state.flConsent) {
      try {
        await updateFederatedChatModel(sanitizedInput, response);
      } catch (e) {
        toast.warn(t('chatUpdateError'));
      }
    }
    setInput('');
    toast.success(t('messageSent'));
  }, [input, messages, state.products, state.flConsent, t]);

  const startVoice = useCallback(() => {
    if (!isVoiceSupported) {
      toast.error(t('voiceNotSupported'));
      return;
    }
    try {
      recognition.current?.start();
    } catch (e) {
      toast.error(t('voiceError'));
      console.warn('Voice input failed:', e);
    }
  }, [t]);

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4" role="region" aria-label={t('chatbot')}>
      <div className="h-64 overflow-y-auto mb-2" role="log" aria-live="polite">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-bubble ${msg.sender === 'user' ? 'user' : ''}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-babyPink"
          placeholder={t('typeMessage')}
          aria-label={t('typeMessage')}
        />
        <button onClick={handleSend} className="baby-button" aria-label={t('send')}>
          {t('send')}
        </button>
        <button
          onClick={startVoice}
          className={`baby-button ml-1 ${!isVoiceSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isVoiceSupported}
          aria-label={t('startVoice')}
        >
          {isVoiceSupported ? '🎤' : '🔇'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

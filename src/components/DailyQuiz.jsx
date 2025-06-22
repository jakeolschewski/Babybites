import React, { useState, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const DailyQuiz = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const [question] = useState({
    text: t('quizQuestion'),
    options: ['Puree', 'Candy', 'Juice'],
    correct: 'Puree',
  });
  const [answer, setAnswer] = useState(null);

  const handleAnswer = useCallback(
    (option) => {
      if (option === question.correct) {
        dispatch({ type: 'ADD_POINTS', payload: 10 });
        toast.success(t('quizCorrect'));
      } else {
        toast.error(t('quizIncorrect'));
      }
      setAnswer(option);
    },
    [dispatch, question.correct, t]
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto" role="region" aria-label={t('dailyQuiz')}>
      <h3 className="text-xl font-semibold">{question.text}</h3>
      <div className="mt-4 space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className={`baby-button w-full ${answer ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={answer}
            aria-label={t('selectAnswer', { option: opt })}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DailyQuiz;

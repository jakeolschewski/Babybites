import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const AnalyticsChart = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: state.purchases.map((p) => p.date),
        datasets: [
          {
            label: t('purchaseAmount'),
            data: state.purchases.map((p) => p.amount),
            backgroundColor: '#60a5fa',
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [state.purchases, t]);

  return (
    <div className="max-w-2xl mx-auto">
      <canvas ref={canvasRef} aria-label={t('analyticsChart')} role="img" />
    </div>
  );
};

export default AnalyticsChart;

'use client';
import React from 'react';
import { Zap, Shield, Clock, Star } from 'lucide-react';
import AdvantageCard from '../advantage-card/AdvantageCard';
const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      icon: <Zap size={46} />,
      title: 'Быстро',
      description: 'Выполнение заказов от 1 дня',
    },
    {
      icon: <Shield size={46} />,
      title: 'Качественно',
      description: 'Используем только лучшие материалы',
    },
    {
      icon: <Clock size={46} />,
      title: 'Вовремя',
      description: 'Всегда укладываемся в сроки',
    },
    {
      icon: <Star size={46} />,
      title: 'Индивидуально',
      description: 'Персональный подход к каждому заказу',
    },
  ];
  return (
    <div className="py-12 bg-gray-900">
      <div className="text-center mb-8">
        <h2 className="text-luxury text-3xl font-bold text-white mb-4">
          Почему выбирают нас?
        </h2>
        <p className="text-[24px] text-gray-300 max-w-2xl mx-auto">
          Мы гарантируем высокое качество и индивидуальный подход к каждому
          клиенту
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {advantages.map((advantage, index) => (
          <AdvantageCard
            key={index}
            icon={advantage.icon}
            title={advantage.title}
            description={advantage.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvantagesSection;

'use client';
import React from 'react';
// import { CheckCircle } from 'lucide-react';

const InstructionsSection: React.FC = () => {
  const instructions = [
    'Отсканируйте QR-код или переведите сумму на карту',
    'Сделайте скриншот чека об оплате',
    'Отправьте скриншот через Telegram или WhatsApp',
    'Дождитесь подтверждения заказа',
  ];

  return (
    <div className="section-card">
      <div className="page-header">
        <h2 className="page-title">Инструкция по оплате</h2>
        <p className="page-subtitle">
          Следуйте простым шагам для завершения оплаты
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructions.map((instruction, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-card/50 rounded-xl border border-border/50 hover:border-primary/50 transition-luxury hover:shadow-luxury"
          >
            {/* <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center"> */}
              {/* <span className="text-primary-foreground font-bold text-sm"></span> */}
            <div className="flex-1">
              <p className="text-foreground ">
                {index + 1} {instruction}
              </p>
            </div>
            </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default InstructionsSection;

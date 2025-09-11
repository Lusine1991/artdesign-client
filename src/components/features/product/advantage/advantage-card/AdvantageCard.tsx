'use client';
import React from 'react';

type AdvantageCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const AdvantageCard: React.FC<AdvantageCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-[20px] border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12  h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
          {icon}
        </div>
      </div>
      <h4 className="text-xs font-semibold text-gray-900 text-luxury mb-2">{title}</h4>
      <p className="text-gray-600 text-[18px]">{description}</p>
    </div>
  );
};

export default AdvantageCard;

'use client';
import React from 'react';

interface Statistic {
  id: number;
  value: string;
  label: string;
}

interface StatisticsSectionProps {
  statistics: Statistic[];
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  statistics,
}) => {
  return (
    <div className="section-card m-[100px]">
      <div className="page-header">
        <h2 className="page-title">Наша статистика</h2>
        <p className="page-subtitle">
          Цифры, которые говорят о нашем опыте и качестве
        </p>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
        {statistics.map((stat) => (
          <div
            key={stat.id}
            className="text-center p-6 bg-card/50 rounded-xl border border-border/50 hover:border-primary/50 transition-luxury hover:shadow-luxury hover:-translate-y-1"
          >
            <div className="text-9xl font-bold text-luxury mb-2">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-xl font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;

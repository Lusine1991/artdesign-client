'use client';
import React from 'react';
import { Target } from 'lucide-react';

interface MissionSectionProps {
  title: string;
  description: string;
}

const MissionSection: React.FC<MissionSectionProps> = ({
  title,
  description,
}) => {
  return (
    <div className="section-card m-[100px]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
          <Target className="h-8 w-8 text-primary-foreground" />
        </div>

        <h2 className="page-title mb-6">{title}</h2>

        <p className="text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MissionSection;

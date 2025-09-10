'use client';
import React from 'react';
import {
  Star,
  Zap,
  Users,
  Shield,
  Palette,
  Monitor,
  CheckCircle,
} from 'lucide-react';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  items: Feature[];
}

const iconMap = {
  quality: Star,
  speed: Zap,
  team: Users,
  guarantee: Shield,
  personal: Palette,
  tech: Monitor,
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title,
  subtitle,
  items,
}) => {
  return (
    <div className="section-card m-[100px]">
      <div className="page-header">
        <h2 className="page-title">{title}</h2>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      <div className="grid grid-cols-3  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((feature) => {
          const IconComponent =
            iconMap[feature.icon as keyof typeof iconMap] || CheckCircle;

          return (
            <div
              key={feature.id}
              className="p-6 bg-card/50 text-center rounded-xl border border-border/50 hover:border-primary/50 transition-luxury hover:shadow-luxury hover:-translate-y-1 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-4 group-hover:scale-110 transition-luxury">
                <IconComponent className="h-6 w-6 text-primary-foreground" />
              </div>

              <h3 className="text-xl text-luxury font-semibold text-foreground mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;

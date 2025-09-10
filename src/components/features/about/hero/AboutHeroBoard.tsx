'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AboutHeroBoardProps {
  companyName: string;
  title: string;
  description: string;
}

const AboutHeroBoard: React.FC<AboutHeroBoardProps> = ({
  companyName,
  title,
  description,
}) => {
  const router = useRouter();

  return (
    <section className="relative min-h-[50vh] flex overflow-hidden gradient-hero">
      <div className="container flex lg:flex-row items-center justify-center gap-[80px] py-[100px]">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center text-foreground rounded-full text-[36px] font-medium mb-[0px]">
            <Sparkles className="h-8 w-8" />
            {companyName}
          </div>
          <h1 className="text-[80px] lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-tight">
            {title}
          </h1>
          <p className="text-[24px] lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <Button
              onClick={() => router.push('/add-order')}
              size="lg"
              className="gradient-primary text-primary-foreground border-0 text-[24px] rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury p-[10px]"
            >
              Оформить заказ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroBoard;

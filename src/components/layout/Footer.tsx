'use client';

import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Footer: React.FC = () => {
  const router = useRouter();
  const instagramUrl =
    'https://www.instagram.com/christina.77777?igsh=MTNjemg0bWN1em1odA%3D%3D';
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Основной контент футера - всегда горизонтально */}
        <div className="flex flex-wrap gap-8 justify-between">
          {/* О компании */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              О компании
            </h3>
            <p className="text-muted-foreground mb-4">
              Профессиональная печать на различных материалах. Качественные
              услуги печати для вашего бизнеса и личных нужд.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                style={{ color: 'hsl(43 96% 90%)' }}
                className="hover:text-primary transition-luxury"
              >
                <Facebook size={20} />
              </a>
              <a
                onClick={() => router.push(instagramUrl)}
                href="https://www.instagram.com/christina.77777?igsh=MTNjemg0bWN1em1odA%3D%3D"
                style={{ color: 'hsl(43 96% 90%)' }}
                className="hover:text-primary transition-luxury"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                style={{ color: 'hsl(43 96% 90%)' }}
                className="hover:text-primary transition-luxury"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-4 text-foreground">Контакты</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary" />
                <span>+374 94851491</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary" />
                <span>christina-777@inbox.ru</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1 text-primary" />
                <span>Гюмри, Мазманя 61</span>
              </div>
            </div>
          </div>

          {/* Режим работы */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Режим работы
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-primary" />
                <div>
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Сб: 10:00 - 16:00</p>
                  <p>Вс: Выходной</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-muted-foreground  text-sm">
              © 2025 Gevorgyan&apos;s Art & Design Studio. Все права защищены.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

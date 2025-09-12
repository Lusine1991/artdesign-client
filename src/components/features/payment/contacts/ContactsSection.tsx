'use client';
import React from 'react';
import { Phone } from 'lucide-react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

interface ContactsSectionProps {
  orderId: string | null;
  totalAmount: string | null;
  phoneNumber: string;
  onTelegramClick: () => void;
  onWhatsAppClick: () => void;
}

const ContactsSection: React.FC<ContactsSectionProps> = ({ phoneNumber }) => {
  return (
    <div className="section-card">
      <div className="page-header">
        <h2 className="page-title">Свяжитесь с нами</h2>
        <p className="page-subtitle">
          После оплаты отправьте скриншот чека через мессенджер
        </p>
      </div>

      <div className=" grid-cols-1 text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Напишите
          </h3>
          <div className="flex flex-row justify-center items-center space-x-4 gap-[30px]">
            <a
              href="https://t.me/yourtelegram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[50px] h-[50px] bg-transparent hover:bg-transparent rounded-full font-semibold transition-luxury transform hover:scale-105 flex justify-center items-center"
            >
              <FaTelegramPlane className="h-[40px] w-[40px] text-[#0088cc]" />
            </a>

            <a
              href="https://wa.me/yourwhatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[50px] h-[50px] bg-transparent hover:bg-transparent rounded-full font-semibold transition-luxury transform hover:scale-105 flex justify-center items-center"
            >
              <FaWhatsapp className="h-[40px] w-[40px] text-[#25D366]" />
            </a>
          </div>
        </div>

        <div className="space-y-4 ">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Или позвоните
          </h3>

          <div className="bg-card/50 p-6 rounded-xl shadow-luxury">
            <div className="flex items-center gap-3 mb-4 justify-center items-center">
              <Phone className="h-6 w-6 text-primary" />
              <span className="text-muted-foreground">
                Телефон:{' '}
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-2xl font-bold text-luxury hover:text-primary transition-luxury"
                >
                  {phoneNumber}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsSection;

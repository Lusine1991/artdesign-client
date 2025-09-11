"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

interface ContactsSectionProps {
  orderId: string | null;
  totalAmount: string | null;
  phoneNumber: string;
  onTelegramClick: () => void;
  onWhatsAppClick: () => void;
}

const ContactsSection: React.FC<ContactsSectionProps> = ({
  phoneNumber,
  onTelegramClick,
  onWhatsAppClick,
}) => {
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

          <div className=" flex flex-row justify-center items-center space-x-4 gap-[50px]">
            <Button
              onClick={onTelegramClick}
              className="w-[150px] bg-[#0088cc] hover:bg-[#006699] text-white border-0 p-4 rounded-xl font-semibold transition-luxury transform hover:scale-105 shadow-luxury"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Telegram
            </Button>

            <Button
              onClick={onWhatsAppClick}
              className="w-[150px] bg-[#25D366] hover:bg-[#1ea952] text-white border-0 p-4 rounded-xl font-semibold transition-luxury transform hover:scale-105 shadow-luxury"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
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
                Телефон:{" "}
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

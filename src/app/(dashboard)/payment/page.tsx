'use client';

import React, { Suspense } from 'react';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { useRouter, useSearchParams } from 'next/navigation';
import PaymentHeroBoard from '@/components/features/payment/hero/PaymentHeroBoard';
import QrSection from '@/components/features/payment/qr/QrSection';
import ContactsSection from '@/components/features/payment/contacts/ContactsSection';
import InstructionsSection from '@/components/features/payment/instructions/InstructionsSection';

export default function PaymentPage(): React.JSX.Element {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="page-container">
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        }
      >
        <PaymentContent />
      </Suspense>
    </ProtectedRoute>
  );
}

function PaymentContent() {
  const searchParams = useSearchParams();

  // Получаем данные заказа из URL параметров
  const orderId = searchParams.get('orderId');
  const totalAmount = searchParams.get('amount');
  const quantity = searchParams.get('quantity') || '1';
  const router = useRouter();
  
  if (!orderId || !totalAmount || !quantity) {
    router.push('/main');
    return;
  }

  // Данные для контактов
  const telegramUrl = 'https://t.me/your_telegram_username';
  const whatsappUrl = 'https://wa.me/37494851491';
  const phoneNumber = '+374 94851491';

  const handleTelegramClick = () => {
    const message = `Привет! Хочу оплатить заказ #${orderId}. Сумма: ${totalAmount}֏`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`${telegramUrl}?text=${encodedMessage}`, '_blank');
  };

  const handleWhatsAppClick = () => {
    const message = `Привет! Хочу оплатить заказ #${orderId}. Сумма: ${totalAmount}֏`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`${whatsappUrl}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <PaymentHeroBoard
        orderId={orderId}
        totalAmount={totalAmount}
        quantity={quantity}
      />

      {/* QR Section */}
      <div className="page-content py-12">
        <QrSection />
      </div>

      {/* Contacts Section */}
      <div className="page-content py-12">
        <ContactsSection
          orderId={orderId}
          totalAmount={totalAmount}
          phoneNumber={phoneNumber}
          onTelegramClick={handleTelegramClick}
          onWhatsAppClick={handleWhatsAppClick}
        />
      </div>

      {/* Instructions Section */}
      <div className="page-content py-12">
        <InstructionsSection />
      </div>
    </div>
  );
}

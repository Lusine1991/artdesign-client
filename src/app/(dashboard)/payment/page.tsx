'use client'

import React, { Suspense } from 'react'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import styles from './page.module.css'

export default function PaymentPage(): React.JSX.Element {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Загрузка...</div>}>
        <PaymentContent />
      </Suspense>
    </ProtectedRoute>
  )
}

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Получаем данные заказа из URL параметров
  const orderId = searchParams.get("orderId");
  const totalAmount = searchParams.get("amount");
  const quantity = searchParams.get("quantity") || 1;

  // Данные для контактов
  const telegramUrl = 'https://t.me/your_telegram_username'
  const whatsappUrl = 'https://wa.me/37494851491' // Ваш номер телефона
  const phoneNumber = '+374 94851491'

  const handleTelegramClick = () => {
    const message = `Привет! Хочу оплатить заказ #${orderId}. Сумма: ${totalAmount}֏`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`${telegramUrl}?text=${encodedMessage}`, "_blank");
  };

  const handleWhatsAppClick = () => {
    const message = `Привет! Хочу оплатить заказ #${orderId}. Сумма: ${totalAmount}֏`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`${whatsappUrl}?text=${encodedMessage}`, "_blank");
  };

  const handleBackToOrders = () => {
    router.push("/user-profile");
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Оплата заказа</h1>
          </div>

          <div className={styles.paymentSection}>
            <div className={styles.amountCard}>
              <h2 className={styles.amountTitle}>К оплате</h2>
              <div className={styles.amountValue}>
                {totalAmount} ֏ x {quantity} ={" "}
                {Number(totalAmount) * Number(quantity)} ֏
              </div>
            </div>

            <div className={styles.qrSection}>
              <h3 className={styles.qrTitle}>QR-код для оплаты</h3>
              <div className={styles.qrContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={`ArtDesignGevorgyans.mooo.com/qr/qr.webp`}
                  alt="QR-код для оплаты"
                  className={styles.qrCode}
                />
                <p className={styles.qrDescription}>
                  Отсканируйте QR-код для оплаты через мобильное приложение
                  банка
                </p>
              </div>
            </div>

          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>Свяжитесь с нами</h3>
            <p className={styles.contactDescription}>
              После оплаты отправьте скриншот чека через мессенджер
            </p>
            
            <div className={styles.contactButtons}>
              <Button 
                onClick={handleTelegramClick}
                className={styles.telegramButton}
              >
                <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Написать в Telegram
              </Button>

              <Button 
                onClick={handleWhatsAppClick}
                className={styles.whatsappButton}
              >
                <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Написать в WhatsApp
              </Button>
            </div>

            <div className={styles.phoneInfo}>
              <p className={styles.phoneLabel}>Или позвоните:</p>
              <a href={`tel:${phoneNumber}`} className={styles.phoneNumber}>
                {phoneNumber}
              </a>
            </div>
          </div>

          <div className={styles.instructions}>
            <h3 className={styles.instructionsTitle}>Инструкция по оплате:</h3>
            <ol className={styles.instructionsList}>
              <li>Отсканируйте QR-код или переведите сумму на карту</li>
              <li>Сделайте скриншот чека об оплате</li>
              <li>Отправьте скриншот через Telegram или WhatsApp</li>
              <li>Дождитесь подтверждения заказа</li>
            </ol>
          </div>

            <div className={styles.actions}>
              <Button
                onClick={handleBackToOrders}
                className={styles.backButton}
              >
                Вернуться к заказам
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

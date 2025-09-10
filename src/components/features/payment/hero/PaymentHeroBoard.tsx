'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentHeroBoardProps {
  orderId: string | null;
  totalAmount: string | null;
  quantity: string;
}

const PaymentHeroBoard: React.FC<PaymentHeroBoardProps> = ({
  orderId,
  totalAmount,
  quantity,
}) => {
  const router = useRouter();

  return (
    <section className="relative min-h-[50vh] flex overflow-hidden gradient-hero">
      <div className="container lg:flex-row items-center justify-center gap-[80px] py-[100px]">
        <div className="text-center">
          <h1 className="text-[60px] lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-tight">
            Оплата заказа
          </h1>
          <div className="inline-flex items-center text-foreground rounded-full text-[36px] font-medium mb-[0px]">
            <CreditCard className="h-8 w-8" />
            Заказ #{orderId}
          </div>

          <p className="text-[24px] lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
            Сумма к оплате:{' '}
            <span className="text-luxury font-bold">
              {totalAmount} ₽ x {quantity} ={' '}
              {Number(totalAmount) * Number(quantity)} ₽
            </span>
          </p>
          {/* </div> */}

          {/* <div className="flex-shrink-0 flex justify-start"> */}
          {/* <div className="luxury-glow rounded-2xl p-4"> */}
          {/* <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-luxury"> */}
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Способы оплаты
          </h3>

          <div className=" flex flex-row justify-center space-x-4 gap-[60px] mb-[40px] items-center">
            <div className="flex  gap-3 p-3 bg-primary/10 rounded-lg">
              <CreditCard className="h-6 w-6 text-primary" />
              <div className="text-foreground">
                <div className="font-semibold">QR-код</div>
                <div className="text-sm opacity-80">Сканируйте для оплаты</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="h-6 w-6 text-primary">📱</div>
              <div className="text-foreground">
                <div className="font-semibold">Мессенджеры</div>
                <div className="text-sm opacity-80">Telegram, WhatsApp</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="h-6 w-6 text-primary">📞</div>
              <div className="text-foreground">
                <div className="font-semibold">Телефон</div>
                <div className="text-sm opacity-80">+374 94851491</div>
              </div>
            </div>
          </div>
          <div className="flex items-center m-4 justify-center lg:justify-start">
            <Button
              onClick={() => router.push('/user-profile')}
              size="lg"
              className="gradient-primary text-primary-foreground border-0 text-[24px] rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury p-[10px]"
            >
              Вернуться к заказам
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* </div> */}
    </section>
  );
};

export default PaymentHeroBoard;

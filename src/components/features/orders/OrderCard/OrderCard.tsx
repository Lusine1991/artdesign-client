import { updateStatus } from '@/entities/order/model/thunks';
import { OrderT } from '@/entities/order/model/types';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  order: OrderT;
};

export default function OrderCard({ order }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const abortHandler = () => {
    dispatch(updateStatus({ orderId: order.id, status: 'Отменён' }));
  };

  const payOrderHandler = () => {
    router.push(
      `/payment?orderId=${order.id}&amount=${order.Good.price}&type=${order.Good.type}&quantity=${order.quantity}`
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 hover:shadow-luxury-lg transition-luxury my-[20px]">
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={400}
            height={400}
            src={`${process.env.CLIENT_URL || 'http://localhost:3001'}${
              order.Good.image
            }`}
            alt="Изображение товара"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2 my-[20px]">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Статус:</span>{' '}
            {order.status}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Адрес:</span>{' '}
            {order.adress}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Количество:</span>{' '}
            {order.quantity}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Размер:</span>{' '}
            {order.Good.size}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Стоимость:</span>{' '}
            {order.Good.price * order.quantity} ₽
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Телефон:</span>{' '}
            {order.phoneNumber}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Описание:</span>{' '}
            {order.Good.description}
          </div>
        </div>

        {/* Кнопки действий в зависимости от статуса */}
        {order.status === 'Ожидает подтверждения' && (
          <div className="flex justify-center">
            <button
              className="w-1/3 h-[27px] text-[18px] text-center max-w-xs gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury py-3"
              onClick={abortHandler}
            >
              Отменить заказ
            </button>
          </div>
        )}

        {order.status === 'Ожидает оплату' && (
          <div className="flex justify-center">
            <button
              className="w-1/3 h-[27px] text-[18px] text-center gradient-primary text-primary-foreground rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury py-3"
              onClick={payOrderHandler}
            >
              Оплатить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import { updateStatus } from "@/entities/order/model/thunks";
import { OrderT } from "@/entities/order/model/types";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  order: OrderT;
};

export default function OrderCard({ order }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const abortHandler = () => {
    dispatch(updateStatus({ orderId: order.id, status: "Отменён" }));
  };

  const payOrderHandler = () => {
    
    router.push(
      `/payment?orderId=${order.id}&amount=${order.Good.price}&type=${order.Good.type}&quantity=${order.quantity}`
    );
  };

  return (
    <div className="container-card">
      <div className="box-orders">
        <img
          src={`http://localhost:3001${order.Good.image}`}
          alt="Изображение товара"
        />
        <div className="status">Статус: {order.status}</div>
        <div className="status">Адрес: {order.adress}</div>
        <div className="status">Количество: {order.quantity}</div>
        <div className="status">
          Стоимость: {order.Good.price * order.quantity}
        </div>
        <div className="status">Телефон: {order.phoneNumber}</div>
        <div className="status">Описание: {order.Good.description}</div>

        {/* Кнопки действий в зависимости от статуса */}
        {order.status === "Ожидает подтверждения" && (
          <button className="detail-btn cancel-btn" onClick={abortHandler}>
            Отменить заказ
          </button>
        )}

        {order.status === "Ожидает оплату" && (
          <button className="detail-btn pay-btn" onClick={payOrderHandler}>
            Оплатить заказ
          </button>
        )}
      </div>
    </div>
  );
}

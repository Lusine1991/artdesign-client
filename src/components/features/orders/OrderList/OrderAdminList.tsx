'use client';
import { useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import AdminOrderCard from '../OrderCard/AdminOrderCard';

export default function OrderAdminList(): React.JSX.Element {
  const orders = useAppSelector((store) => store.order.adminOrders);
  const [showOrders, setShowOrders] = useState(orders);
  const [parameters, setParameters] = useState({
    status: 'all',
    sorted: 'date',
    sortedBy: 'desc',
    username: '',
  });

  useEffect(() => {
    setShowOrders(() => {
      switch (parameters.status) {
        case 'all':
          return orders.filter((order) =>
            order.User.username.includes(parameters.username)
          );
        case 'pending':
          return orders.filter(
            (order) =>
              order.status === 'Ожидает подтверждения' &&
              order.User.username.includes(parameters.username)
          );
        case 'waiting_payment':
          return orders.filter(
            (order) =>
              order.status === 'Ожидает оплату' &&
              order.User.username.includes(parameters.username)
          );
        case 'processing':
          return orders.filter(
            (order) =>
              order.status === 'В работе' &&
              order.User.username.includes(parameters.username)
          );
        case 'completed':
          return orders.filter(
            (order) =>
              order.status === 'Завершён' &&
              order.User.username.includes(parameters.username)
          );
        case 'cancelled':
          return orders.filter(
            (order) =>
              order.status === 'Отменён' &&
              order.User.username.includes(parameters.username)
          );
        default:
          return orders;
      }
    });
    setShowOrders((prev) => {
      switch (parameters.sortedBy) {
        case 'asc':
          switch (parameters.sorted) {
            case 'date':
              return [...prev].sort((a, b) => a.id - b.id);
            case 'price':
              return [...prev].sort(
                (a, b) => a.Good.price * a.quantity - b.Good.price * b.quantity
              );
            case 'quantity':
              return [...prev].sort((a, b) => a.quantity - b.quantity);
            default:
              return prev;
          }
        case 'desc':
          switch (parameters.sorted) {
            case 'date':
              return [...prev].sort((a, b) => b.id - a.id);
            case 'price':
              return [...prev].sort(
                (a, b) => b.Good.price * b.quantity - a.Good.price * a.quantity
              );
            case 'quantity':
              return [...prev].sort((a, b) => b.quantity - a.quantity);
            default:
              return prev;
          }
        default:
          return prev;
      }
    });
  }, [orders, parameters]);

  return (
    <div className="container-goodlist">
      <input
        type="text"
        placeholder="Поиск по имени пользователя"
        value={parameters.username}
        onChange={(e) =>
          setParameters({ ...parameters, username: e.target.value })
        }
      />
      <select
        onChange={(e) =>
          setParameters({ ...parameters, status: e.target.value })
        }
      >
        <option value="all">Все</option>
        <option value="pending">Ожидает подтверждения</option>
        <option value="waiting_payment">Ожидает оплату</option>
        <option value="processing">В работе</option>
        <option value="completed">Завершён</option>
        <option value="cancelled">Отменён</option>
      </select>
      <select
        onChange={(e) =>
          setParameters({ ...parameters, sorted: e.target.value })
        }
      >
        <option value="date">Дата</option>
        <option value="price">Стоимость</option>
        <option value="quantity">Количество</option>
      </select>
      <select
        onChange={(e) =>
          setParameters({ ...parameters, sortedBy: e.target.value })
        }
      >
        <option value="desc">По убыванию</option>
        <option value="asc">По возрастанию</option>
      </select>

      <div className="grid grid-cols-2 gap-[20px]">
        {showOrders.map((order) => (
          <AdminOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

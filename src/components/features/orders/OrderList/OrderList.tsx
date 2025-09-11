import { useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';

export default function OrderList(): React.JSX.Element {
  const orders = useAppSelector((store) => store.order.orders);
  const [showOrders, setShowOrders] = useState(orders);
  const [parameters, setParameters] = useState({
    status: 'all',
    sorted: 'date',
    sortedBy: 'desc',
  });

  useEffect(() => {
    
    let filteredOrders = orders;
    switch (parameters.status) {
      case 'pending':
        filteredOrders = orders.filter(
          (order) => order.status === 'Ожидает подтверждения'
        );
        break;
      case 'waiting_payment':
        filteredOrders = orders.filter(
          (order) => order.status === 'Ожидает оплату'
        );
        break;
      case 'processing':
        filteredOrders = orders.filter((order) => order.status === 'В работе');
        break;
      case 'completed':
        filteredOrders = orders.filter((order) => order.status === 'Завершён');
        break;
      case 'cancelled':
        filteredOrders = orders.filter((order) => order.status === 'Отменён');
        break;
      default:
        filteredOrders = orders;
    }

    
    const sortedOrders = [...filteredOrders];
    switch (parameters.sortedBy) {
      case 'asc':
        switch (parameters.sorted) {
          case 'date':
            sortedOrders.sort((a, b) => a.id - b.id);
            break;
          case 'price':
            sortedOrders.sort(
              (a, b) => a.Good.price * a.quantity - b.Good.price * b.quantity
            );
            break;
          case 'quantity':
            sortedOrders.sort((a, b) => a.quantity - b.quantity);
            break;
          default:
            break;
        }
        break;
      case 'desc':
        switch (parameters.sorted) {
          case 'date':
            sortedOrders.sort((a, b) => b.id - a.id);
            break;
          case 'price':
            sortedOrders.sort(
              (a, b) => b.Good.price * b.quantity - a.Good.price * a.quantity
            );
            break;
          case 'quantity':
            sortedOrders.sort((a, b) => b.quantity - a.quantity);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    setShowOrders(sortedOrders);
  }, [orders, parameters]);

  return (
    <div className="container-goodlist">
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
      <div className="map">
        {showOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

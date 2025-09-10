import Portal from "@/components/ui/Portal";
import { updateOrder } from "@/entities/order/model/thunks";
import { OrderAdminT } from "@/entities/order/model/types";
import axiosInstance from "@/shared/api/axiosInstance";
import { useAppDispatch } from "@/store/hooks";
import React, { useState, useEffect } from "react";

type Props = {
  order: OrderAdminT;
};

export default function AdminOrderCard({ order }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    status: order.status,
    quantity: order.quantity,
    adress: order.adress,
    phoneNumber: order.phoneNumber,
  });

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Блокировка скролла при открытии модалки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
    };
  }, [isOpen]);

  const changeHandler = () => {
    setIsOpen(false);
    dispatch(updateOrder({ orderId: order.id, orderData: editData }));
  };

  const downHandler = async () => {
  try {
    const fileName = order.Good.print.slice(7);
    const response = await axiosInstance.get(`/good/prints/${fileName}`, {
      responseType: 'blob', // ← Это ключевой параметр!
    });

    // Создаем URL для blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    
    // Очистка
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('Ошибка скачивания:', error);
  }
};

  return (
    <>
      <div className="container-card">
        <div className="box-orders">
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            width={400}
            height={400}
            src={`http://localhost:3001${order.Good.image}`}
            alt="Изображение товара"
          />
          <div className="status">Пользователь: {order.User.username}</div>
          <div className="status">Email: {order.User.email}</div>
          <div className="status">Статус: {order.status}</div>
          <div className="status">Адрес: {order.adress}</div>
          <div className="status">Количество: {order.quantity}</div>
          <div className="status">Размер: {order.Good.size}</div>
          <div className="status">
            Стоимость: {order.Good.price * order.quantity}
          </div>
          <div className="status">Телефон: {order.phoneNumber}</div>
          <div className="status">Описание: {order.Good.description}</div>

          {/* Кнопки для админа */}
          <div className="admin-actions">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Редактировать
            </button>
            <button
              onClick={downHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Скачать
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно через портал */}
      {isOpen && (
        <Portal>
          <div
            className="portal-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4 modal-content"
              onClick={handleModalClick}
            >
              <h2 className="text-xl font-bold mb-4">
                Редактирование заказа #{order.id}
              </h2>
              <div className="flex flex-col space-y-3 mb-4">
                <label className="flex items-center">Статус:</label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    className="mr-2"
                    checked={editData.status === "Ожидает подтверждения"}
                    onChange={() =>
                      setEditData({
                        ...editData,
                        status: "Ожидает подтверждения",
                      })
                    }
                  />
                  Ожидает подтверждения
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    className="mr-2"
                    checked={editData.status === "Ожидает оплату"}
                    onChange={() =>
                      setEditData({ ...editData, status: "Ожидает оплату" })
                    }
                  />
                  Ожидает оплату
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    className="mr-2"
                    checked={editData.status === "В работе"}
                    onChange={() =>
                      setEditData({ ...editData, status: "В работе" })
                    }
                  />
                  В работе
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    className="mr-2"
                    checked={editData.status === "Завершён"}
                    onChange={() =>
                      setEditData({ ...editData, status: "Завершён" })
                    }
                  />
                  Завершен
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    className="mr-2"
                    checked={editData.status === "Отменён"}
                    onChange={() =>
                      setEditData({ ...editData, status: "Отменён" })
                    }
                  />
                  Отменен
                </label>
                <input
                  type="text"
                  placeholder="Адрес"
                  value={editData.adress}
                  onChange={(event) => {
                    setEditData({
                      ...editData,
                      adress: event.target.value,
                    });
                  }}
                />
                <input
                  type="number"
                  placeholder="Количество"
                  value={editData.quantity}
                  onChange={(event) => {
                    setEditData({
                      ...editData,
                      quantity: Number(event.target.value),
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Телефон"
                  value={editData.phoneNumber}
                  onChange={(event) => {
                    setEditData({
                      ...editData,
                      phoneNumber: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Отмена
                </button>
                <button
                  onClick={changeHandler}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

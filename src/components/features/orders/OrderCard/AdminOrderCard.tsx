import Portal from "@/components/ui/Portal";
import { updateOrder } from "@/entities/order/model/thunks";
import { OrderAdminT } from "@/entities/order/model/types";
import axiosInstance from "@/shared/api/axiosInstance";
import { useAppDispatch } from "@/store/hooks";
import React, { useState, useEffect } from "react";
import styles from "./AdminOrderCard.module.css";

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
        responseType: "blob", // ← Это ключевой параметр!
      });

      // Создаем URL для blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Очистка
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Ошибка скачивания:", error);
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6 shadow-luxury hover:shadow-luxury-lg transition-luxury my-[20px]">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={400}
              height={400}
              src={`${
                process.env.CLIENT_URL || "https://ArtDesignGevorgyans.mooo.com"
              }${order.Good.image}`}
              alt="Изображение товара"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 my-[20px]">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Пользователь:</span>{" "}
              {order.User.username}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Email:</span>{" "}
              {order.User.email}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Статус:</span>{" "}
              {order.status}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Адрес:</span>{" "}
              {order.adress}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Количество:</span>{" "}
              {order.quantity}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Размер:</span>{" "}
              {order.Good.size}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Стоимость:</span>{" "}
              {order.Good.price * order.quantity} ₽
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Телефон:</span>{" "}
              {order.phoneNumber}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Описание:</span>{" "}
              {order.Good.description}
            </div>
          </div>

          {/* Кнопки для админа */}
          <div className="flex flex-row gap-[20px]">
            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 h-[27px] text-[18px] gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury py-3"
            >
              Редактировать
            </button>
            <button
              onClick={downHandler}
              className="flex-1 h-[27px] text-[18px] gradient-primary text-primary-foreground border-0 rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxury py-3"
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
            className={`${styles.portalModal} fixed inset-0 flex items-center justify-center z-50`}
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`${styles.modalContent}`}
              onClick={handleModalClick}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Редактирование заказа #{order.id}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className={styles.modalCloseButton}
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.statusSection}>
                  <label className={styles.statusLabel}>Статус заказа:</label>
                  <div className={styles.statusOptions}>
                    {[
                      {
                        value: "Ожидает подтверждения",
                        label: "Ожидает подтверждения",
                      },
                      { value: "Ожидает оплату", label: "Ожидает оплату" },
                      { value: "В работе", label: "В работе" },
                      { value: "Завершён", label: "Завершён" },
                      { value: "Отменён", label: "Отменён" },
                    ].map((status) => (
                      <label
                        key={status.value}
                        className={`${styles.statusOption} ${
                          editData.status === status.value
                            ? styles.selected
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          checked={editData.status === status.value}
                          onChange={() =>
                            setEditData({ ...editData, status: status.value })
                          }
                        />
                        <span className={styles.statusOptionLabel}>
                          {status.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.detailsSection}>
                  <label className={styles.detailsLabel}>Детали заказа:</label>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Адрес доставки"
                      value={editData.adress}
                      onChange={(event) => {
                        setEditData({
                          ...editData,
                          adress: event.target.value,
                        });
                      }}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
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
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Номер телефона"
                      value={editData.phoneNumber}
                      onChange={(event) => {
                        setEditData({
                          ...editData,
                          phoneNumber: event.target.value,
                        });
                      }}
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`${styles.modalButton} ${styles.modalButtonCancel}`}
                >
                  Отмена
                </button>
                <button
                  onClick={changeHandler}
                  className={`${styles.modalButton} ${styles.modalButtonSave}`}
                >
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { ProductT } from "../../../../entities/product/model/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Portal from "@/components/ui/Portal";
import { updateProduct } from "@/entities/product/model/thunks";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: ProductT;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: product.id,
    description: product.description,
    price: product.price,
    isPublic: product.isPublic,
  });

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Блокировка скролла при открытии модалки
  useEffect(() => {
    if (isOpen) {
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "static";
    }

    return () => {
      document.body.style.position = "static";
    };
  }, [isOpen]);

  const router = useRouter();
  const handleOrder = () => {
    router.push(`/add-order?productId=${product.id}&redact=true`);
  };

  const changeHandler = () => {
    dispatch(updateProduct(editData));
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-between bg-white h-[880px] border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-xs md:max-w-md">
        <div className="w-full aspect-[2/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={400}
            height={600}
            src={`${
              process.env.CLIENT_URL || "https://ArtDesignGevorgyans.mooo.com"
            }${product.image}`}
            alt={product.type}
            className="w-full  object-contain"
          />
        </div>
        <div className="px-[20px] py-[10px]">
          <h3 className="text-lg font-semibold text-luxury text-gray-900 mb-[5px]">
            {product.type}
          </h3>

          <p className="text-gray-600 text-[18px] mb-[5px]">
            {product.description.slice(0, 100)}...
          </p>

          <div className="space-y-1 mb-[10px] text-sm">
            <div>
              <span className="text-gray-500">Цвет:</span>{" "}
              <span className="text-gray-900 ml-1">{product.color}</span>
            </div>
          </div>
          <div className="text-[20px] font-bold text-luxury text-orange-600 mb-4">
            {product.price} ֏
          </div>
        </div>
        <div className="flex mb-[10px] h-[33px]  text-[18px] gap-[10px] justify-center">
          <Button
            onClick={handleOrder}
            className="gradient-primary text-primary-foreground border-0 text-[18px] rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxur p-[10px]"
          >
            Заказать
          </Button>
          {user?.isAdmin && (
            <Button
              onClick={() => setIsOpen(true)}
              className="gradient-primary text-primary-foreground border-0 text-[18px] rounded-full font-semibold transition-luxury transform hover:scale-105 shadow-luxur p-[10px]"
            >
              Редактировать
            </Button>
          )}
        </div>
      </div>

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
                  Редактирование товара #{product.id}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className={styles.modalCloseButton}
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={editData.isPublic}
                    onChange={() =>
                      setEditData({ ...editData, isPublic: !editData.isPublic })
                    }
                  />
                  <span className={styles.checkboxLabel}>Публичный товар</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Описание товара:</label>
                  <textarea
                    id="description"
                    rows={4}
                    value={editData.description}
                    onChange={(event) => {
                      setEditData({
                        ...editData,
                        description: event.target.value,
                      });
                    }}
                    className={styles.formTextarea}
                    placeholder="Введите описание товара..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Цена товара:</label>
                  <input
                    type="number"
                    placeholder="Введите цену в рублях"
                    value={editData.price}
                    onChange={(event) => {
                      setEditData({
                        ...editData,
                        price: Number(event.target.value),
                      });
                    }}
                    className={styles.formInput}
                  />
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
};

export default ProductCard;

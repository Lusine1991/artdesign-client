"use client";
import React, { useState, useEffect, useRef } from "react";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createProduct, getProducts } from "@/entities/product/model/thunks";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import { ConstructorDataT } from "@/entities/order/model/types";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const showToast = (message: string, type: 'error' | 'success' | 'warning' = 'error') => {
  const backgroundColor = type === 'error' ? '#ff4444' : 
                         type === 'success' ? '#00c851' : '#ffbb33';
  
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: backgroundColor,
    stopOnFocus: true,
  }).showToast();
};

export default function AddGoodPage() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);

  const [customPrint, setCustomPrint] = useState<string | null>(null);
  const [baseProductImage, setBaseProductImage] = useState<string | null>(null);

  // Все поля для конструктора
  const [constructorData, setConstructorData] = useState<ConstructorDataT>({
    type: "",
    color: "",
    size: "M",
    print: "",
    price: 0,
    description: "",
    isPublic: true,
    customPrint: "",
    customImage: "",
    filePrint: null,
    fileImage: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const productFileInputRef = useRef<HTMLInputElement>(null);

  // Опции для радио-кнопок
  const typeOptions = [
    "Футболка",
    "Кружка",
    "Кепка",
    "Сумка",
    "Блокнот",
    "Кружка Хамелеон",
  ];
  const colorOptions = [
    "Черный",
    "Белый",
    "Красный",
    "Синий",
    "Зеленый",
    "Желтый",
    "Розовый",
  ];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Убираем useEffect для загрузки базового изображения с сервера

  if (status === "loading" || status === "logged") {
    return (
      <ProtectedRoute requireAdmin={true}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </ProtectedRoute>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomPrint(result);
        setConstructorData((prev) => ({
          ...prev,
          customPrint: result,
          print: file.name,
          filePrint: file,
        }));
        console.log("Принт загружен");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBaseProductImage(result);
        setConstructorData((prev) => ({
          ...prev,
          customImage: result,
          fileImage: file,
        }));
        console.log("Изображение товара загружено");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConstructorChange = (field: string, value: string) => {
    setConstructorData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === "type") {
      setConstructorData((prev) => {
        switch (value) {
          case "Футболка":
            return {
              ...prev,
              price: 4000,
              size: "M",
            };
          case "Кружка":
            return {
              ...prev,
              price: 1500,
              size: "300мл",
            };
          case "Кепка":
            return {
              ...prev,
              price: 3000,
              size: "S (54-55см)",
            };
          case "Сумка":
            return {
              ...prev,
              price: 2000,
              size: "Средняя",
            };
          case "Кружка Хамелеон":
            return {
              ...prev,
              price: 2000,
              size: "300мл",
            };
          case "Блокнот":
            return {
              ...prev,
              price: 1000,
              size: "A4",
            };
          default:
            return {
              ...prev,
              price: 0,
              size: "M",
            };
        }
      });
    }
  };

  const addHandler = async () => {
    if (
      constructorData.type === "" ||
      constructorData.color === "" ||
      constructorData.size === ""
    ) {
      showToast("Заполните все обязательные поля конструктора", "error");
      return;
    }

    if (!constructorData.filePrint) {
      showToast("Загрузите принт", "error");
      return;
    }

    if (!constructorData.fileImage) {
      showToast("Загрузите изображение товара", "error");
      return;
    }

    try {
      const goodData = {
        type: constructorData.type,
        color: constructorData.color,
        size: constructorData.size,
        print: constructorData.filePrint,
        image: constructorData.fileImage,
        description: constructorData.description,
        price: constructorData.price,
        isPublic: constructorData.isPublic,
      };
      await dispatch(createProduct(goodData)).unwrap();
      showToast("Товар успешно добавлен!", "success");

      setConstructorData({
        type: "",
        color: "",
        size: "",
        print: "",
        price: 0,
        description: "",
        isPublic: true,
        customPrint: "",
        customImage: "",
        filePrint: null,
        fileImage: null,
      });
      setCustomPrint(null);
      setBaseProductImage(null);
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">Создать товар с конструктором</h1>
            <p className="page-subtitle">Добавьте новый товар в каталог</p>
          </div>

          <div className="section-card">
            <h2 className="section-title">Конструктор товара</h2>

              <div className={styles.constructorContent}>
                {/* Основные поля товара */}
                <div className={styles.goodsFields}>
                  <h3 className={styles.subsectionTitle}>Параметры товара</h3>

                  {/* Тип товара - радио кнопки */}
                  <div className={styles.field}>
                    <label className={styles.label}>Тип товара:</label>
                    <div className={styles.radioGroup}>
                      {typeOptions.map((option) => (
                        <label key={option} className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="type"
                            value={option}
                            checked={constructorData.type === option}
                            onChange={(e) =>
                              handleConstructorChange("type", e.target.value)
                            }
                            className={styles.radioInput}
                          />
                          <span className={styles.radioText}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Цвет - радио кнопки */}
                  <div className={styles.field}>
                    <label className={styles.label}>Цвет:</label>
                    <div className={styles.radioGroup}>
                      {colorOptions.map((option) => (
                        <label key={option} className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="color"
                            value={option}
                            checked={constructorData.color === option}
                            onChange={(e) =>
                              handleConstructorChange("color", e.target.value)
                            }
                            className={styles.radioInput}
                          />
                          <span className={styles.radioText}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Описание */}
                  <div className={styles.field}>
                    <label className={styles.label}>Описание:</label>
                    <textarea
                      value={constructorData.description}
                      onChange={(e) =>
                        handleConstructorChange("description", e.target.value)
                      }
                      className={styles.textarea}
                      placeholder="Описание товара..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Загрузка изображения товара */}
                <div className={styles.field}>
                  <label className={styles.label}>
                    Загрузите изображение товара:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleProductImageUpload}
                    ref={productFileInputRef}
                    className={styles.fileInput}
                  />
                  <Button
                    type="button"
                    onClick={() => productFileInputRef.current?.click()}
                    className={styles.uploadButton}
                  >
                    Выбрать изображение товара
                  </Button>
                  {baseProductImage && (
                    <div className={styles.imagePreview}>
                      {/* eslint-disable-next-line @next/next/no-img-element*/}
                      <img
                        src={baseProductImage}
                        alt="Загруженный товар"
                        className={styles.previewImg}
                      />
                    </div>
                  )}
                </div>

                {/* Загрузка принта */}
                <div className={styles.field}>
                  <label className={styles.label}>Загрузите принт:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className={styles.fileInput}
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={styles.uploadButton}
                  >
                    Выбрать принт
                  </Button>
                  {customPrint && (
                    <div className={styles.imagePreview}>
                      {/* eslint-disable-next-line @next/next/no-img-element*/}
                      <img
                        src={customPrint}
                        alt="Загруженный принт"
                        className={styles.previewImg}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.field}>
                  <Button
                    type="button"
                    onClick={addHandler}
                    className={styles.uploadButton}
                  >
                    Создать товар
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </ProtectedRoute>
  );
}

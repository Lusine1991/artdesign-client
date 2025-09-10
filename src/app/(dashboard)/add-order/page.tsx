'use client';
import React, { useState, useEffect, useRef, Suspense } from "react";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProducts } from "@/entities/product/model/thunks";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import { createOrder } from "@/entities/order/model/thunks";
import { useSearchParams } from "next/navigation";

// Выносим основной контент в отдельный компонент для использования useSearchParams
function AddOrderContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const dispatch = useAppDispatch();
  const { loading: orderLoading, error } = useAppSelector(
    (state) => state.order
  );
  const product = useAppSelector((state) => state.product.products).find(
    (product) => product.id === Number(productId)
  );
  console.log(product);
  const { user, status } = useAppSelector((state) => state.user);

  const [customPrint, setCustomPrint] = useState<string | null>(null);
  const [baseProductImage, setBaseProductImage] = useState<string | null>(null);
  const [baseProductImageLoaded, setBaseProductImageLoaded] = useState(false);

  // Настройки принта как слайдеры
  const [printPosition, setPrintPosition] = useState(50);
  const [printSize, setPrintSize] = useState(50);
  const [printRotation, setPrintRotation] = useState(0);
  const [printHorizontal, setPrintHorizontal] = useState(50);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Добавляем состояние для модального окна размеров
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Все поля для конструктора
  const [constructorData, setConstructorData] = useState<{
    type: string;
    color: string;
    size: string;
    print: string;
    price: number;
    description: string;
    isPublic: boolean;
    customPrint: string;
    customImage: string;
    printPosition: number;
    printSize: number;
    printRotation: number;
    printHorizontal: number;
    isCustom: boolean;
    printFile: null | File;
    imageFile: null | File;
  }>({
    type: "",
    color: "",
    size: "",
    print: "",
    price: 0,
    description: '',
    isPublic: false,
    customPrint: '',
    customImage: '',
    printPosition: 50,
    printSize: 50,
    printRotation: 0,
    printHorizontal: 50,
    isCustom: true,
    printFile: null,
    imageFile: null,
  });

  const [formData, setFormData] = useState({
    quantity: 1,
    adress: '',
    phoneNumber: '',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Опции для радио-кнопок
  const typeOptions = [
    'Футболка',
    'Кружка',
    'Кепка',
    'Сумка',
    'Блокнот',
    'Кружка Хамелеон',
    'Банер',
    'Визитка',
  ];
  const colorOptions = [
    'Черный',
    'Белый',
    'Красный',
    'Синий',
    'Зеленый',
    'Желтый',
    'Розовый',
  ];

  // Размеры для разных типов товаров
  const getSizeOptions = (type: string) => {
    switch (type) {
      case 'Футболка':
        return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      case 'Кружка':
        return ['200мл', '300мл', '400мл', '500мл'];
      case 'Кепка':
        return ['S (54-55см)', 'M (56-57см)', 'L (58-59см)', 'XL (60-61см)'];
      case 'Сумка':
        return ['Маленькая', 'Средняя', 'Большая'];
      case 'Блокнот':
        return ['A5', 'A4', 'A3'];
      case 'Кружка Хамелеон':
        return ['200мл', '300мл', '400мл', '500мл'];
      case 'Банер':
        return ['50x70см', '70x100см', '100x150см', '150x200см'];
      case 'Визитка':
        return ['85x55мм', '90x50мм', '100x60мм'];
      default:
        return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
  };

  // Таблицы размеров для разных товаров
  const getSizeTable = (type: string) => {
    switch (type) {
      case 'Футболка':
        return {
          headers: [
            'Размер',
            'Обхват груди (см)',
            'Длина (см)',
            'Обхват талии (см)',
          ],
          rows: [
            ['XS', '86-90', '66-68', '70-74'],
            ['S', '90-94', '68-70', '74-78'],
            ['M', '94-98', '70-72', '78-82'],
            ['L', '98-102', '72-74', '82-86'],
            ['XL', '102-106', '74-76', '86-90'],
            ['XXL', '106-110', '76-78', '90-94'],
          ],
        };
      case 'Кружка':
        return {
          headers: ['Объем', 'Высота (см)', 'Диаметр (см)', 'Вес (г)'],
          rows: [
            ['200мл', '8.5', '7.5', '280'],
            ['300мл', '9.5', '8.0', '350'],
            ['400мл', '10.5', '8.5', '420'],
            ['500мл', '11.5', '9.0', '490'],
          ],
        };
      case 'Кружка Хамелеон':
        return {
          headers: ['Объем', 'Высота (см)', 'Диаметр (см)', 'Вес (г)'],
          rows: [
            ['200мл', '8.5', '7.5', '280'],
            ['300мл', '9.5', '8.0', '350'],
            ['400мл', '10.5', '8.5', '420'],
            ['500мл', '11.5', '9.0', '490'],
          ],
        };
      case 'Кепка':
        return {
          headers: ['Размер', 'Обхват головы (см)', 'Глубина (см)', 'Описание'],
          rows: [
            ['S', '54-55', '8-9', 'Детский/женский'],
            ['M', '56-57', '8-9', 'Универсальный'],
            ['L', '58-59', '8-9', 'Мужской'],
            ['XL', '60-61', '8-9', 'Большой размер'],
          ],
        };
      case 'Сумка':
        return {
          headers: ['Размер', 'Ширина (см)', 'Высота (см)', 'Глубина (см)'],
          rows: [
            ['Маленькая', '25', '20', '8'],
            ['Средняя', '35', '30', '12'],
            ['Большая', '45', '40', '15'],
          ],
        };
      case 'Блокнот':
        return {
          headers: [
            'Формат',
            'Ширина (см)',
            'Высота (см)',
            'Количество листов',
          ],
          rows: [
            ['A5', '14.8', '21', '80'],
            ['A4', '21', '29.7', '80'],
            ['A3', '29.7', '42', '80'],
          ],
        };
      case 'Банер':
        return {
          headers: ['Размер', 'Ширина (см)', 'Высота (см)', 'Плотность (г/м²)'],
          rows: [
            ['50x70см', '50', '70', '200'],
            ['70x100см', '70', '100', '200'],
            ['100x150см', '100', '150', '200'],
            ['150x200см', '150', '200', '200'],
          ],
        };
      case 'Визитка':
        return {
          headers: ['Размер', 'Ширина (мм)', 'Высота (мм)', 'Толщина (мм)'],
          rows: [
            ['85x55мм', '85', '55', '0.3'],
            ['90x50мм', '90', '50', '0.3'],
            ['100x60мм', '100', '60', '0.3'],
          ],
        };
      default:
        return {
          headers: [
            'Размер',
            'Обхват груди (см)',
            'Длина (см)',
            'Обхват талии (см)',
          ],
          rows: [
            ['XS', '86-90', '66-68', '70-74'],
            ['S', '90-94', '68-70', '74-78'],
            ['M', '94-98', '70-72', '78-82'],
            ['L', '98-102', '72-74', '82-86'],
            ['XL', '102-106', '74-76', '86-90'],
            ['XXL', '106-110', '76-78', '90-94'],
          ],
        };
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  async function dataURLtoFile(dataurl: string) {
    const match = dataurl.match(/^data:image\/(png|jpeg|jpg|gif|webp|bmp|svg\+xml);base64/);
    const response = await fetch(dataurl);

    if (match && match[1]) {
      const extension = match[1]; // 'png'
      console.log(extension);
      const blob = await response.blob();
      return new File([blob], `image.${match[1]}`, { type: blob.type });
    } else {
      console.log("Расширение не найдено");
    }
  }

  // Обновляем базовое изображение товара при изменении типа или цвета
  useEffect(() => {
    if (constructorData.type && constructorData.color) {
      const imageUrl = `https://ArtDesignGevorgyans.mooo.com/items/${constructorData.type}_${constructorData.color}.webp`;

      // Сбрасываем флаг загрузки
      setBaseProductImageLoaded(false);

      // Проверяем доступность изображения
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Важно для CORS
      img.onload = () => {
        setBaseProductImage(imageUrl);
        setBaseProductImageLoaded(true);
        console.log('Изображение товара загружено:', imageUrl);
      };
      img.onerror = () => {
        console.warn('Изображение товара не найдено:', imageUrl);
        setBaseProductImage(null);
        setBaseProductImageLoaded(false);
      };
      img.src = imageUrl;
    } else {
      setBaseProductImage(null);
      setBaseProductImageLoaded(false);
    }
  }, [constructorData.type, constructorData.color]);

  // Функция для создания превью с принтом
  const generatePreview = () => {
    if (!baseProductImage || !customPrint || !baseProductImageLoaded) {
      console.log('Недостаточно данных для превью:', {
        baseProductImage,
        customPrint,
        baseProductImageLoaded,
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas не найден');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Context не найден');
      return;
    }

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Загружаем изображение товара
    const goodImage = new Image();
    goodImage.crossOrigin = 'Anonymous'; // Для работы с кросс-доменными изображениями
    goodImage.onload = () => {
      console.log('Изображение товара загружено в canvas');

      // Рисуем товар
      ctx.drawImage(goodImage, 0, 0, canvas.width, canvas.height);

      // Загружаем принт
      const printImage = new Image();
      printImage.onload = () => {
        console.log('Принт загружен в canvas');

        // Вычисляем размеры принта на основе слайдера
        const baseSize = Math.min(canvas.width, canvas.height) * 0.5;
        const sizeMultiplier = printSize / 100;
        const finalSize = baseSize * sizeMultiplier;

        const printWidth = finalSize;
        const printHeight = finalSize;

        // Логика позиционирования по Y
        let y;
        if (printPosition <= 50) {
          const factor = printPosition / 50;
          const topY = canvas.height * 0.1;
          const centerY = (canvas.height - printHeight) / 2;
          y = topY + (centerY - topY) * factor;
        } else {
          const factor = (printPosition - 50) / 50;
          const centerY = (canvas.height - printHeight) / 2;
          const bottomY = canvas.height * 0.9 - printHeight;
          y = centerY + (bottomY - centerY) * factor;
        }

        // Логика позиционирования по X
        let x;
        if (printHorizontal <= 50) {
          const factor = printHorizontal / 50;
          const leftX = canvas.width * 0.1;
          const centerX = (canvas.width - printWidth) / 2;
          x = leftX + (centerX - leftX) * factor;
        } else {
          const factor = (printHorizontal - 50) / 50;
          const centerX = (canvas.width - printWidth) / 2;
          const rightX = canvas.width * 0.9 - printWidth;
          x = centerX + (rightX - centerX) * factor;
        }

        // Сохраняем состояние canvas
        ctx.save();

        // Поворачиваем canvas
        ctx.translate(x + printWidth / 2, y + printHeight / 2);
        ctx.rotate((printRotation * Math.PI) / 180);
        ctx.translate(-printWidth / 2, -printHeight / 2);

        // Рисуем принт
        ctx.drawImage(printImage, 0, 0, printWidth, printHeight);

        // Восстанавливаем состояние canvas
        ctx.restore();

        // Сохраняем превью
        const dataUrl = canvas.toDataURL();

        dataURLtoFile(dataUrl).then((file) => {
          if (!file) {
            console.log("Файл не создан");
            return;
          }
          setPreviewImage(dataUrl);
          setConstructorData((prev) => ({
            ...prev,
            customImage: dataUrl,
            imageFile: file,
          }));
          console.log("Превью создано успешно");
        });
      };
      printImage.onerror = () => {
        console.error('Ошибка загрузки принта');
      };
      printImage.src = customPrint;
    };
    goodImage.onerror = () => {
      console.error('Ошибка загрузки изображения товара в canvas');
    };
    goodImage.src = baseProductImage;
  };

  // Обновляем превью при изменении параметров
  useEffect(() => {
    generatePreview();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    baseProductImage,
    customPrint,
    printPosition,
    printSize,
    printRotation,
    printHorizontal,
    baseProductImageLoaded, // Добавляем зависимость от флага загрузки
  ]);

  if (status === 'loading' || status === 'admin') {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
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
          printFile: file,
        }));
        console.log('Принт загружен');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConstructorChange = (field: string, value: string) => {
    setConstructorData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === 'type') {
      setConstructorData((prev) => {
        switch (value) {
          case 'Футболка':
            return {
              ...prev,
              price: 4000,
              size: '',
            };
          case 'Кружка':
            return {
              ...prev,
              price: 1500,
              size: '',
            };
          case 'Кепка':
            return {
              ...prev,
              price: 3000,
              size: '',
            };
          case 'Сумка':
            return {
              ...prev,
              price: 2000,
              size: '',
            };
          case 'Кружка Хамелеон':
            return {
              ...prev,
              price: 2000,
              size: '',
            };
          case 'Блокнот':
            return {
              ...prev,
              price: 1000,
              size: '',
            };
          case 'Банер':
            return {
              ...prev,
              price: 500, // цена за кв.м или фиксированная
              size: '',
            };
          case 'Визитка':
            return {
              ...prev,
              price: 50, // цена за штуку
              size: '',
            };
          default:
            return {
              ...prev,
              price: 0,
              size: '',
            };
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Необходимо войти в систему');
      return;
    }

    if (
      !constructorData.type ||
      !constructorData.color ||
      !constructorData.size
    ) {
      alert('Заполните все обязательные поля конструктора');
      return;
    }

    if (!constructorData.printFile) {
      alert("Загрузите принт");
      return;
    }

    if (!constructorData.imageFile) {
      alert("Загрузите изображение товара");
      return;
    }

    console.log(constructorData, "constructorData");

    try {
      const orderData = {
        ...formData,
        type: constructorData.type,
        color: constructorData.color,
        size: constructorData.size,
        print: constructorData.printFile,
        image: constructorData.imageFile,
        description: constructorData.description,
        price: constructorData.price,
        isPublic: constructorData.isPublic,
      };
      console.log(orderData);
      await dispatch(createOrder(orderData)).unwrap();
      alert('Заказ успешно создан!');

      // Сброс формы
      setFormData({
        quantity: 1,
        adress: '',
        phoneNumber: '',
      });
      setConstructorData({
        type: '',
        color: '',
        size: '',
        print: '',
        price: 0,
        description: '',
        isPublic: false,
        customPrint: '',
        customImage: '',
        printPosition: 50,
        printSize: 50,
        printRotation: 0,
        printHorizontal: 50,
        isCustom: true,
        imageFile: null,
        printFile: null,
      });
      setCustomPrint(null);
      setBaseProductImage(null);
      setBaseProductImageLoaded(false);
      setPreviewImage(null);
      setPrintPosition(50);
      setPrintSize(50);
      setPrintRotation(0);
      setPrintHorizontal(50);
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'goodId' ? Number(value) : value,
    }));
    if (name === 'quantity') {
      setFormData((prev) => ({
        ...prev,
        quantity: Number(value),
      }));
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Создать заказ с конструктором</h1>
          <p className="page-subtitle">
            Создайте уникальный товар с помощью нашего конструктора
          </p>
        </div>

        <div className="grid-2">
          {/* Конструктор */}
          <div className="section-card">
            <h2 className="section-title">Конструктор</h2>

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
                            handleConstructorChange('type', e.target.value)
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
                            handleConstructorChange('color', e.target.value)
                          }
                          className={styles.radioInput}
                        />
                        <span className={styles.radioText}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Размер - радио кнопки с кнопкой справки */}
                <div className={styles.field}>
                  <div className={styles.labelWithHelp}>
                    <label className={styles.label}>Размер:</label>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className={styles.helpButton}
                      title="Таблица размеров"
                    >
                      <span className={styles.helpIcon}>?</span>
                    </button>
                  </div>
                  <div className={styles.radioGroup}>
                    {getSizeOptions(constructorData.type).map((option) => (
                      <label key={option} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="size"
                          value={option}
                          checked={constructorData.size === option}
                          onChange={(e) =>
                            handleConstructorChange('size', e.target.value)
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
                      handleConstructorChange('description', e.target.value)
                    }
                    className={styles.textarea}
                    placeholder="Описание товара..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Превью базового товара */}
              {baseProductImage && (
                <div className={styles.field}>
                  <label className={styles.label}>Базовый товар:</label>
                  <div className={styles.imagePreview}>
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={baseProductImage}
                      alt="Базовый товар"
                      className={styles.previewImg}
                      onError={(e) => {
                        console.error('Ошибка загрузки изображения товара');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {!baseProductImageLoaded && (
                      <div className={styles.loadingText}>
                        Загрузка изображения...
                      </div>
                    )}
                  </div>
                </div>
              )}

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
              </div>

              {/* Настройки принта - слайдеры */}
              {customPrint && baseProductImage && baseProductImageLoaded && (
                <div className={styles.printSettings}>
                  <h3 className={styles.subsectionTitle}>Настройки принта</h3>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Позиция по вертикали:{' '}
                      {printPosition < 50
                        ? 'Сверху'
                        : printPosition > 50
                        ? 'Снизу'
                        : 'По центру'}{' '}
                      ({printPosition}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={printPosition}
                      onChange={(e) =>
                        setPrintPosition(Number(e.target.value))
                      }
                      className={styles.range}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Позиция по горизонтали:{' '}
                      {printHorizontal < 50
                        ? 'Слева'
                        : printHorizontal > 50
                        ? 'Справа'
                        : 'По центру'}{' '}
                      ({printHorizontal}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={printHorizontal}
                      onChange={(e) =>
                        setPrintHorizontal(Number(e.target.value))
                      }
                      className={styles.range}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Размер:{' '}
                      {printSize < 33
                        ? 'Маленький'
                        : printSize < 66
                        ? 'Средний'
                        : 'Большой'}{' '}
                      ({printSize}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={printSize}
                      onChange={(e) => setPrintSize(Number(e.target.value))}
                      className={styles.range}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Поворот: {printRotation}°
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={printRotation}
                      onChange={(e) =>
                        setPrintRotation(Number(e.target.value))
                      }
                      className={styles.range}
                    />
                  </div>
                </div>
              )}

              {/* Превью с принтом */}
              {baseProductImage && customPrint && baseProductImageLoaded && (
                <div className={styles.preview}>
                  <h3 className={styles.previewTitle}>Превью с принтом:</h3>
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className={styles.canvas}
                    style={{ border: '1px solid #ccc' }}
                  />
                  {!previewImage && (
                    <div className={styles.loadingText}>
                      Создание превью...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Форма заказа */}
          <div className="section-card">
            <h2 className="section-title">Данные заказа</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Количество:</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity === 0 ? '' : formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Адрес доставки:</label>
                <input
                  type="text"
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                  placeholder="Введите адрес доставки"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Номер телефона:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  className={styles.input}
                  required
                />
              </div>
              {constructorData.customPrint &&
                constructorData.customImage &&
                constructorData.size && (
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Примерная стоимость без доставки:{' '}
                      {constructorData.price * formData.quantity} руб.
                    </label>
                  </div>
                )}

              {error && <div className={styles.error}>{error}</div>}

              <Button
                type="submit"
                disabled={orderLoading || !previewImage}
                className={styles.submitButton}
              >
                {orderLoading ? 'Создание заказа...' : 'Создать заказ'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Модальное окно с таблицей размеров */}
      {showSizeGuide && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                Таблица размеров - {constructorData.type || 'Товар'}
              </h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowSizeGuide(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.sizeTable}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {getSizeTable(constructorData.type).headers.map(
                      (header, index) => (
                        <th key={index}>{header}</th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {getSizeTable(constructorData.type).rows.map(
                    (row, index) => (
                      <tr key={index}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Основной компонент страницы с Suspense
export default function AddOrderPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      }>
        <AddOrderContent />
      </Suspense>
    </ProtectedRoute>
  );
}
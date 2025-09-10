'use client';
import { getProducts } from '@/entities/product/model/thunks';
import ProductCarousel from '@/components/features/product/product-carousel/ProductCarousel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import AdvantagesSection from '@/components/features/product/advantage/advantages-section/AdvantagesSection';
import HeroBoard from '@/components/features/product/hero/HeroBoard';
import ProductFilter from '@/components/features/product/product-filter/ProductFilter';
import ProductGrid from '@/components/features/product/product-grid/ProductGrid';
import Pagination from '@/components/features/product/pagination/Pagination';
import { refresh } from '@/entities/user/model/thunks';

export default function MainPage(): React.JSX.Element {
  const products = useAppSelector((state) => state.product.products);
  const filteredProducts = products.filter((prod) => prod.isPublic === true);

  const dispatch = useAppDispatch();

  const [selectedType, setSelectedType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Максимум 6 карточек на странице (2 ряда по 3)

  useEffect(() => {
    dispatch(getProducts());
    dispatch(refresh());
  }, [dispatch]);

  // Фильтрация товаров по типу
  const filteredByType = useMemo(() => {
    if (!selectedType) return filteredProducts;
    return filteredProducts.filter((product) => product.type === selectedType);
  }, [filteredProducts, selectedType]);

  // Пагинация
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredByType.slice(startIndex, endIndex);
  }, [filteredByType, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredByType.length / itemsPerPage);

  // Сброс страницы при изменении фильтра
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  return (
    <div className="page-container">
      <div>
        <HeroBoard />

        <div className="page-content">
          <div className="page-header">
            <h2 className="page-title">Наши услуги</h2>
            <p className="page-subtitle">
              Широкий спектр услуг печати для любых потребностей
            </p>
          </div>

          <div className="section-card">
            <ProductCarousel products={filteredProducts} />
          </div>

          <div className="section-card mt-8">
            <AdvantagesSection />
          </div>
        </div>

        {/* Секция с размапом всех товаров */}
        <div className="page-content py-12">
          <div className="page-header">
            <h2 className="page-title">Все товары</h2>
            <p className="page-subtitle">Выберите товар из нашего каталога</p>
          </div>

          <div className="section-card">
            {/* Фильтр товаров */}
            <ProductFilter
              products={filteredProducts}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />

            {/* Сетка товаров - максимум 6 карточек (2 ряда по 3) */}
            <ProductGrid products={paginatedProducts} />

            {/* Пагинация */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

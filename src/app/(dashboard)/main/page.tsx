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
  const itemsPerPage = 9; // Максимум 6 карточек на странице (2 ряда по 3)

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
    <div>
      <HeroBoard />

      <div className="page-header">
        <h2 className="text-luxury text-3xl pb-[20px] text-white mb-4">Наши услуги</h2>
        <p className="page-subtitle">
          Широкий спектр услуг печати для любых потребностей
        </p>
      </div>

      <div className="section-card mb-[200px]">
        <ProductCarousel products={filteredProducts} />
      </div>

      <div className="section-card mt-8">
        <AdvantagesSection />
      </div>

      <div className="page-header">
        <h2 className="text-luxury text-3xl pb-[20px] text-white mb-4">Все товары</h2>
        <p className="page-subtitle">Выберите товар из нашего каталога</p>
      </div>

      <div className="section-card">
        <ProductFilter
          products={filteredProducts}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
        <ProductGrid products={paginatedProducts} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductT } from '../../../../entities/product/model/types';
import ProductCard from '../product-card/ProductCard';

interface ProductCarouselProps {
  products: ProductT[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const goLeft = () => {
    setCurrentIndex(currentIndex <= 0 ? products.length - 4 : currentIndex - 1);
  };

  const goRight = () => {
    setCurrentIndex(
      currentIndex >= products.length - itemsToShow ? 0 : currentIndex + 1
    );
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg">
        <p className="text-gray-600 text-lg">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden px-6">
        <button
          onClick={goLeft}
          className="absolute top-1/2 transform -translate-y-1/2 gradient-primary text-primary-foreground p-3 rounded-full shadow-luxury border-0 z-50 transition-luxury transform hover:scale-105"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          className="flex left-[0px] transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            width: `${(products.length / itemsToShow) * 100}%`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-[20px]"
              // style={{ width: `${100 / products.length}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={goRight}
          className="absolute right-[0px] top-1/2 transform -translate-y-1/2 gradient-primary text-primary-foreground p-3 rounded-full shadow-luxury border-0 z-50 transition-luxury transform hover:scale-105"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
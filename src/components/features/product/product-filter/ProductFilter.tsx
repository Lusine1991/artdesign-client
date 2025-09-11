'use client';

import React from 'react';
import { ProductT } from '../../../../entities/product/model/types';

interface ProductFilterProps {
  products: ProductT[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  selectedType,
  onTypeChange,
}) => {
  // Получаем уникальные типы товаров
  const uniqueTypes = Array.from(
    new Set(products.map((product) => product.type))
  );

  return (
    <div className="mb-8">
      <h3 className="text-xl text-center text-luxury font-semibold text-gray-900 mb-4">
        Фильтр по типу товара
      </h3>
      <div className="flex flex-wrap justify-center pb-[20px] gap-[10px]">
        <button
          onClick={() => onTypeChange('')}
          className={`px-[10px] py-[6px] rounded-full text-[18px] font-medium transition-luxury transform hover:scale-105 shadow-luxury ${
            selectedType === ''
              ? 'gradient-primary text-primary-foreground brightness-75'
              : 'gradient-primary text-primary-foreground'
          }`}
        >
          Все товары
        </button>
        {uniqueTypes.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-[10px] py-[6px] rounded-full text-[18px] font-medium transition-luxury transform hover:scale-105 shadow-luxury ${
              selectedType === type
                ? 'gradient-primary text-primary-foreground brightness-75'
                : 'gradient-primary text-primary-foreground'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;

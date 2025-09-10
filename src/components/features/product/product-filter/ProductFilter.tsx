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
  const uniqueTypes = Array.from(new Set(products.map(product => product.type)));

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Фильтр по типу товара</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onTypeChange('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedType === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Все товары
        </button>
        {uniqueTypes.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
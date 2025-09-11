'use client';

import React from 'react';
import { ProductT } from '../../../../entities/product/model/types';
import ProductCard from '../product-card/ProductCard';

interface ProductGridProps {
  products: ProductT[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg">
        <p className="text-gray-600 text-lg">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] my-[20px] max-w-6xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

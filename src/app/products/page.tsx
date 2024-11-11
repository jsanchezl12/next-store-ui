// pages/index.tsx
"use client";

import { useEffect, useState } from 'react';
import { Product } from '../models/types';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Shopify Products</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.body_html}</p>
            <img src={product.image?.src} alt={product.image?.alt ?? ''} width={200} />
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductsPage;

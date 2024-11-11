// pages/index.tsx
"use client";
import { useEffect, useState } from 'react';
import { getAllProducts } from '../shopifyService';
import { IProduct } from '../models/types';
import styles from '../page.module.css';
import Image from 'next/image';

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;<code className={styles.code}>src/app/page.tsx</code>&nbsp;this is a test from @juansesanchezl
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
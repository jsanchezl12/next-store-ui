// shopifyService.ts
import Shopify from 'shopify-api-node';
import { IProduct } from './models/types';

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME as string,
  apiKey: process.env.SHOPIFY_API_KEY as string,
  password: process.env.SHOPIFY_API_PASSWORD as string,
});

export async function getAllProducts(): Promise<IProduct[]> {
  try {
    const products = await shopify.product.list();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
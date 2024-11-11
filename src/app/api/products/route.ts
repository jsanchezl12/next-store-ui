// pages/api/products.ts

import type { NextRequest, NextResponse } from 'next/server'
import Shopify from 'shopify-api-node';
//import { getRequestContext } from '@cloudflare/next-on-pages'

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME as string,
  apiKey: process.env.SHOPIFY_API_KEY as string,
  password: process.env.SHOPIFY_ADMIN_API_TOKEN as string,
});
console.log('shopify:', process.env.SHOPIFY_SHOP_NAME, process.env.SHOPIFY_API_KEY, process.env.SHOPIFY_API_PASSWORD);

export async function GET(request: NextRequest) {
  let responseText = 'Hello World Products'
  try {
    const products = await shopify.product.list();
    responseText = JSON.stringify(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    responseText = JSON.stringify({ error: 'Error fetching products' });
  }

  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  // const myKv = getRequestContext().env.MY_KV_NAMESPACE
  // await myKv.put('suffix', ' from a KV store!')
  // const suffix = await myKv.get('suffix')
  // responseText += suffix

  return new Response(responseText)
}

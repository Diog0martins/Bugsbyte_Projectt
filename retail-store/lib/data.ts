import type { Category, Product } from "./types"

import axios from 'axios';

// Mock data for demonstration purposes
// In a real application, this would be fetched from a database or API

const API_BASE_URL = 'http://127.0.0.1:5000';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const category_response = await axios.get(`${API_BASE_URL}/category`);
  const categories: Category[] = category_response.data;
  return categories.find((category) => category.slug === slug)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = { routename: "João Dom" };
  const request = await axios.post(`${API_BASE_URL}/product`, data, {
    headers: { "Content-Type": "application/json" },
  });
  
  const products_response = await axios.get(`${API_BASE_URL}/product`);
  const products: Product[] = products_response.data;
  return products.filter((product) => product.featured)
}

/* export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${categorySlug}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];
  }
} */

export async function getProductsByCategory(id: string): Promise<Product[]> {
    const products_response = await axios.get(`${API_BASE_URL}/product`);
    const products: Product[] = products_response.data;
    return products.filter((product) => product.categorySlug === id)
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${id}`);
    return response.data.product[id];
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return undefined;
  }
}

export async function getProducts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const products_response = await axios.get(`${API_BASE_URL}/product`);
  const products: Product[] = products_response.data;
  // Return all products in a flat array
  return products
}


export async function getRelatedProducts(productId: string): Promise<Product[]> {
  const products_response = await axios.get(`${API_BASE_URL}/product`);
  const products: Product[] = products_response.data;
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.categorySlug === product.categorySlug && p.id !== productId).slice(0, 4)
}

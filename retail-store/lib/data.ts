import type { Category, Product } from "./types"


import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

// Mock data for demonstration purposes
// In a real application, this would be fetched from a database or API

const categories: Category[] = [
  {
    slug: "clothing",
    name: "Clothing",
    description: "Discover the latest fashion trends for all occasions.",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    slug: "electronics",
    name: "Electronics",
    description: "Explore cutting-edge technology and gadgets.",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    description: "Everything you need to make your house a home.",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    slug: "beauty",
    name: "Beauty",
    description: "Premium beauty products for your self-care routine.",
    image: "/placeholder.svg?height=96&width=96",
  },
]

const products: Product[] = [
  {
    id: "prod-1",
    name: "Classic T-Shirt",
    description: "A comfortable cotton t-shirt for everyday wear.",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "clothing",
    featured: true,
  },
  {
    id: "prod-2",
    name: "Wireless Earbuds",
    description: "High-quality sound with noise cancellation technology.",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "electronics",
    featured: true,
  },
  {
    id: "prod-3",
    name: "Non-Stick Cookware Set",
    description: "Professional-grade cookware for your kitchen.",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "home-kitchen",
    featured: true,
  },
  {
    id: "prod-4",
    name: "Facial Serum",
    description: "Hydrating serum with vitamin C for radiant skin.",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "beauty",
    featured: true,
  },
  {
    id: "prod-5",
    name: "Slim Fit Jeans",
    description: "Classic denim jeans with a modern fit.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "clothing",
    featured: false,
  },
  {
    id: "prod-6",
    name: "Smart Watch",
    description: "Track your fitness and stay connected on the go.",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "electronics",
    featured: false,
  },
  {
    id: "prod-7",
    name: "Blender",
    description: "Powerful blender for smoothies and food preparation.",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "home-kitchen",
    featured: false,
  },
  {
    id: "prod-8",
    name: "Moisturizer",
    description: "Daily moisturizer for all skin types.",
    price: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    categorySlug: "beauty",
    featured: false,
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    const categories: Category[] = response.data;
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  await delay(300)
  return categories.find((category) => category.slug === slug)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await delay(800)
  return products.filter((product) => product.featured)
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  console.log(categories);
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${categorySlug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return undefined;
  }
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  await delay(500)
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products.filter((p) => p.categorySlug === product.categorySlug && p.id !== productId).slice(0, 4)
}


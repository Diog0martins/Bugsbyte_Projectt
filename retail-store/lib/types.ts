export interface Category {
  slug: string
  name: string
  description: string
  image?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image?: string
  categorySlug: string
  featured: boolean
}

export interface CartItem {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
}


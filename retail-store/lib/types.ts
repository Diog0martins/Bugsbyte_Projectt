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

export interface User {
  routename: string
  email: string
  phone: string
  account_no: string
  family_members: string
  age_group: string
  district: string
  segment_cd_lifestyle: string
  segment_cd_lifestage: string
  basket: CartItem[]
}


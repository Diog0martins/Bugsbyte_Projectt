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
  "routename": "João Dom",
  "email": "john.doe@example.com",
  "phone": "(123) 456-7890",
  "account_no": "839942280271",
  "family_members": "4",
  "age_group": "55-65 anos",
  "district": "viana do castelo", 
  "segment_cd_lifestyle": "4",
  "segment_cd_lifestage": "4"
}


import { getFeaturedProducts } from "@/lib/data"
import {ProductCard, ProductCardItem} from "./product-card"

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCardItem key={product.id} product={product} />
      ))}
    </div>
  )
}


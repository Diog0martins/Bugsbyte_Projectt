import { getRelatedProducts } from "@/lib/data"
import ProductCard from "./product-card"

export default async function ProductRecommendations({ productId }: { productId: string }) {
  const products = await getRelatedProducts(productId)

  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}


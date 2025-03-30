import { getProductsByCategory } from "@/lib/data"
import {ProductCardItem} from "./product-card"

export default async function ProductGrid({ categorySlug }: { categorySlug: string }) {
  const products = await getProductsByCategory(categorySlug)

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCardItem key={product.id} product={product} />
      ))}
    </div>
  )
}


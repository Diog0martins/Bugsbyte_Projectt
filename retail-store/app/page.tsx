import { Suspense } from "react"
import CategoryList from "@/components/category-list"
import FeaturedProducts from "@/components/featured-products"
import HeroBanner from "@/components/hero-banner"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroBanner />

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <Suspense fallback={<CategoryListSkeleton />}>
          <CategoryList />
        </Suspense>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  )
}

function CategoryListSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-full mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
    </div>
  )
}


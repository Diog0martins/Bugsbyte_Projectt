import { Suspense } from "react"
import { notFound } from "next/navigation"
import ProductGrid from "@/components/product-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategory } from "@/lib/data"

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid categorySlug={params.slug} />
      </Suspense>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(12)
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


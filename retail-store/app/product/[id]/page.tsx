import { notFound } from "next/navigation"
import Image from "next/image"
import { getProduct } from "@/lib/data"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductRecommendations from "@/components/product-recommendations"

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <div className="mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
      

      <div className="my-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <ProductRecommendations productId={params.id} />
      </div>
    </div>
  )
}


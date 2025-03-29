import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import AddToCartButton from "./add-to-cart-button"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden group">
      <Link href={`/product/${product.id}`} className="block relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium mb-1 group-hover:text-[#eb0205] transition-colors">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
          <p className="font-semibold mb-4">${product.price}</p>
        </Link>

        <AddToCartButton product={product} />
      </div>
    </div>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import type { Product } from "@/lib/types"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Button className="w-full" onClick={handleAddToCart} disabled={isAdding}>
      {isAdding ? (
        "Added!"
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}


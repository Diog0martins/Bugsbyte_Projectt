"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import type { CartItem as CartItemType } from "@/lib/types"

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateItemQuantity, removeItem } = useCart()

  const handleIncreaseQuantity = () => {
    updateItemQuantity(item.id, item.quantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1)
    } else {
      removeItem(item.id)
    }
  }

  return (
    <div className="flex items-center py-6 border-b">
      <div className="relative h-24 w-24 rounded overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg?height=96&width=96"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <Link href={`/product/${item.id}`} className="font-medium hover:text-primary">
          {item.name}
        </Link>
        <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDecreaseQuantity}>
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center">{item.quantity}</span>

        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleIncreaseQuantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="ml-6 text-right">
        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive mt-1"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  )
}


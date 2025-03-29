"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform, useAnimation, type PanInfo } from "framer-motion"
import Image from "next/image"
import { Check, ShoppingCart, X } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"

interface SwipeableProductCardProps {
  products: Product[]
  onSwipeLeft?: (product: Product) => void
  onSwipeRight?: (product: Product) => void
  onSwipeUp?: (product: Product) => void
  onProductsFinished?: () => void
}

export default function SwipeableProductCard({
  products,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onProductsFinished,
}: SwipeableProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "up" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const { addItem } = useCart()

  // Get current product
  const currentProduct = products[currentIndex]

  // Motion values for dragging
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const controls = useAnimation()

  // Calculate background opacity based on drag distance
  const leftOpacity = useTransform(x, [-200, 0], [1, 0])
  const rightOpacity = useTransform(x, [0, 200], [0, 1])
  const upOpacity = useTransform(y, [-200, 0], [1, 0])

  // Handle drag end
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xOffset = info.offset.x
    const yOffset = info.offset.y
    const threshold = 100

    setIsAnimating(true)

    // Determine swipe direction based on velocity and offset
    if (yOffset < -threshold && Math.abs(yOffset) > Math.abs(xOffset)) {
      // Swipe up - already own
      setExitDirection("up")
      controls
        .start({
          y: -window.innerHeight,
          transition: { duration: 0.5 },
        })
        .then(() => handleSwipeComplete("up"))
    } else if (xOffset > threshold) {
      // Swipe right - add to cart
      setExitDirection("right")
      controls
        .start({
          x: window.innerWidth,
          transition: { duration: 0.5 },
        })
        .then(() => handleSwipeComplete("right"))
    } else if (xOffset < -threshold) {
      // Swipe left - reject
      setExitDirection("left")
      controls
        .start({
          x: -window.innerWidth,
          transition: { duration: 0.5 },
        })
        .then(() => handleSwipeComplete("left"))
    } else {
      // Reset if not enough to trigger swipe
      controls
        .start({
          x: 0,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
          },
        })
        .then(() => setIsAnimating(false))
    }
  }

  // Handle swipe completion
  const handleSwipeComplete = (direction: "left" | "right" | "up") => {
    // Call appropriate callback
    if (direction === "left" && onSwipeLeft) {
      onSwipeLeft(currentProduct)
    } else if (direction === "right" && onSwipeRight) {
      onSwipeRight(currentProduct)
      // Add to cart
      addItem({
        id: currentProduct.id,
        name: currentProduct.name,
        price: Number(currentProduct.price),
        image: currentProduct.image,
        quantity: 1,
      })
    } else if (direction === "up" && onSwipeUp) {
      onSwipeUp(currentProduct)
    }

    // Move to next product or finish
    if (currentIndex < products.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      // No more products
      if (onProductsFinished) {
        onProductsFinished()
      }
    }

    // Reset motion values
    x.set(0)
    y.set(0)
    setExitDirection(null)
    setIsAnimating(false)
  }

  // Indicator styles based on drag direction
  const getIndicatorStyles = () => {
    if (exitDirection === "left") {
      return "bg-red-500"
    } else if (exitDirection === "right") {
      return "bg-green-500"
    } else if (exitDirection === "up") {
      return "bg-blue-500"
    }
    return ""
  }

  if (!currentProduct) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <p className="text-xl text-gray-500">No more products to display</p>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center w-full h-[700px] overflow-hidden">
      {/* Swipe indicators */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="absolute left-8 rounded-full p-3 bg-red-100 text-red-500"
          style={{ opacity: leftOpacity }}
        >
          <X size={24} />
        </motion.div>

        <motion.div
          className="absolute right-8 rounded-full p-3 bg-green-100 text-green-500"
          style={{ opacity: rightOpacity }}
        >
          <ShoppingCart size={24} />
        </motion.div>

        <motion.div
          className="absolute top-8 rounded-full p-3 bg-blue-100 text-blue-500"
          style={{ opacity: upOpacity }}
        >
          <Check size={24} />
        </motion.div>
      </div>

      {/* Product card */}
      <motion.div
        className={`absolute w-[320px] max-w-full bg-white rounded-xl shadow-lg overflow-hidden ${getIndicatorStyles()}`}
        style={{
          x,
          y,
          rotate,
          zIndex: 10,
        }}
        drag={!isAnimating}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        <div className="relative h-[320px] w-full bg-gray-100">
          <Image
            src={currentProduct.image || "/placeholder.svg?height=320&width=320"}
            alt={currentProduct.name}
            fill
            className="object-cover pointer-events-none"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-black">{currentProduct.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{currentProduct.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold text-black">${currentProduct.price}</span>
            <div className="text-sm text-gray-500">Swipe to interact</div>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        <p>Swipe left to reject, right to add to cart, up if you already own it</p>
      </div>
    </div>
  )
}


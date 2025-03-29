"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname }  from "next/navigation"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Header() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    { name: "Início", path: "/" },
    { name: "Produtos Frescos", path: "/category/produtos-frescos" },
    { name: "Congelados", path: "/category/congelados" },
    { name: "Bebidas", path: "/category/bebidas" },
    { name: "Bio & Eco", path: "/category/bio-eco" },
  ]

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>

            <Link href="/" className="text-2xl font-bold text-[#eb0205]">
              <Image
                src="/logo_continente.png" // Correct path for the `public` folder
                alt="Continente Logo"
                width={200} // Adjust width
                height={100} // Adjust height
                priority // Ensures it loads quickly
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#eb0205]",
                  pathname === route.path ? "text-[#eb0205]" : "text-muted-foreground",
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <MiniCart />
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                pathname === route.path
                  ? "bg-[#eb0205]/10 text-[#eb0205]"
                  : "text-muted-foreground hover:bg-[#eb0205]/5 hover:text-[#eb0205]",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

function MiniCart() {
  const { items, total, removeItem } = useCart()

  return (
    <div className="h-full flex flex-col">

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto py-4">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t py-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}


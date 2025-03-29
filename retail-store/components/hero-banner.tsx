import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="bg-[#eb0205] text-white p-8 md:p-16">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Os nossos produtos!</h1>
          <p className="text-lg md:text-xl mb-8">
            Descubra os nossos produtos frescos e de alta qualidade.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-[#eb0205] hover:bg-gray-100">
            <Link href="/category/clothing">Fazer compras</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


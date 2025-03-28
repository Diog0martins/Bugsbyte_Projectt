import Link from "next/link"
import Image from "next/image"
import { getCategories } from "@/lib/data"

export default async function CategoryList() {
  const categories = await getCategories()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`} className="group flex flex-col items-center">
          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-2 group-hover:ring-2 ring-[#eb0205] transition-all">
            <Image
              src={category.image || "/placeholder.svg?height=96&width=96"}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium group-hover:text-[#eb0205] transition-colors">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}


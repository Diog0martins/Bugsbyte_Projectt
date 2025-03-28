import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RetailStore</h3>
            <p className="text-muted-foreground">Your one-stop shop for all your retail needs.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/clothing" className="text-muted-foreground hover:text-[#eb0205]">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="text-muted-foreground hover:text-[#eb0205]">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/home-kitchen" className="text-muted-foreground hover:text-[#eb0205]">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="text-muted-foreground hover:text-[#eb0205]">
                  Beauty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-[#eb0205]">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account?tab=orders" className="text-muted-foreground hover:text-[#eb0205]">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-[#eb0205]">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">123 Retail Street</li>
              <li className="text-muted-foreground">Shopville, SV 12345</li>
              <li className="text-muted-foreground">support@retailstore.com</li>
              <li className="text-muted-foreground">(123) 456-7890</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RetailStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


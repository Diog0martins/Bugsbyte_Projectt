import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Continente</h3>
            <p className="text-muted-foreground">O que rende é ir ao <b>Continente</b>.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/frutas" className="text-muted-foreground hover:text-[#eb0205]">
                  Frutas
                </Link>
              </li>
              <li>
                <Link href="/category/carne" className="text-muted-foreground hover:text-[#eb0205]">
                  Carne
                </Link>
              </li>
              <li>
                <Link href="/category/peixe" className="text-muted-foreground hover:text-[#eb0205]">
                  Peixe
                </Link>
              </li>
              <li>
                <Link href="/category/ingredientes-basicos" className="text-muted-foreground hover:text-[#eb0205]">
                  Ingredientes Básicos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Conta</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-[#eb0205]">
                  Perfil
                </Link>
              </li>
              <li>
                <Link href="/account?tab=orders" className="text-muted-foreground hover:text-[#eb0205]">
                  Histórico de compras
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-[#eb0205]">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Rua Nossa Senhora de Fátima 0</li>
              <li className="text-muted-foreground">Valença, 4930-632</li>
              <li className="text-muted-foreground">ajuda@continente.pt</li>
              <li className="text-muted-foreground">218 247 247</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Continente. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


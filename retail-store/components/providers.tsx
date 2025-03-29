"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/cart-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider {...({ attribute: "class", defaultTheme: "system", enableSystem: true, disableTransitionOnChange: true } as any)}>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}

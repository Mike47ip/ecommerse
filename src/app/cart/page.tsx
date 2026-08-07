import { ShopLayout } from "@/components/layout/ShopLayout";
import { CartView } from "@/components/shop/CartView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shopping Cart" };

export default function CartPage() {
  return (
    <ShopLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartView />
      </div>
    </ShopLayout>
  );
}

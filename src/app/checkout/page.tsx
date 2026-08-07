import { ShopLayout } from "@/components/layout/ShopLayout";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/checkout");

  return (
    <ShopLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutForm user={session.user} />
      </div>
    </ShopLayout>
  );
}

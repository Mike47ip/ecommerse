"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { formatPrice, toPaystackAmount } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Loader2, CreditCard, MapPin, User } from "lucide-react";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

const schema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  street: z.string().min(5, "Street address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "Region required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
}

export function CheckoutForm({ user }: { user: User }) {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const shipping = totalPrice() >= 200 ? 0 : 20;
  const total = totalPrice() + shipping;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
    },
  });

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      // 1. Create a pending order on server
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            price: i.product.price,
            name: i.product.name,
          })),
          shippingAddress: {
            name: data.name,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
          },
          subtotal: totalPrice(),
          shippingCost: shipping,
          total,
          notes: data.notes,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const { orderId, reference } = await orderRes.json();

      // 2. Load Paystack inline script if not loaded
      if (!window.PaystackPop) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://js.paystack.co/v1/inline.js";
          s.onload = () => res();
          s.onerror = () => rej(new Error("Paystack script failed"));
          document.head.appendChild(s);
        });
      }

      // 3. Open Paystack payment modal
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: data.email,
        amount: toPaystackAmount(total), // in pesewas
        currency: "GHS",
        ref: reference,
        metadata: {
          orderId,
          custom_fields: [
            { display_name: "Customer Name", variable_name: "name", value: data.name },
            { display_name: "Phone", variable_name: "phone", value: data.phone },
          ],
        },
        onClose() {
          toast.error("Payment cancelled. Your order is saved — try again.");
          setLoading(false);
        },
        async callback(response: { reference: string }) {
          // 4. Verify on our server
          const verifyRes = await fetch("/api/paystack/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference, orderId }),
          });
          const result = await verifyRes.json();

          if (result.success) {
            clearCart();
            toast.success("Payment successful! 🎉");
            router.push(`/orders/${orderId}`);
          } else {
            toast.error("Payment verification failed. Contact support.");
            setLoading(false);
          }
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 space-y-6">
          {/* Contact */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-5">
              <User size={18} className="text-brand-600" /> Contact Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                <input {...register("name")} className="input" placeholder="John Doe" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                <input {...register("email")} type="email" className="input" placeholder="john@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone</label>
                <input {...register("phone")} className="input" placeholder="+233 XX XXX XXXX" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-5">
              <MapPin size={18} className="text-brand-600" /> Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Street Address</label>
                <input {...register("street")} className="input" placeholder="123 Main Street, Apt 4B" />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">City / Town</label>
                  <input {...register("city")} className="input" placeholder="Accra" />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Region</label>
                  <input {...register("state")} className="input" placeholder="Greater Accra" />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Order Notes (optional)</label>
                <textarea
                  {...register("notes")}
                  className="input resize-none"
                  rows={3}
                  placeholder="Special delivery instructions…"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <CreditCard size={18} className="text-brand-600" /> Payment
            </h2>
            <p className="text-sm text-gray-500 mb-1">
              Secure payment powered by{" "}
              <span className="font-semibold text-gray-700">Paystack</span>.
              You can pay with mobile money (MTN, Vodafone, AirtelTigo) or card.
            </p>
            <div className="flex items-center gap-3 mt-3 p-3 rounded-xl bg-green-50 border border-green-100">
              <span className="text-green-600 text-lg">🔒</span>
              <p className="text-xs text-green-700">Your payment is secured with 256-bit SSL encryption.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-base"
          >
            {loading ? (
              <><Loader2 size={20} className="animate-spin" /> Processing…</>
            ) : (
              <><CreditCard size={20} /> Pay {formatPrice(total)}</>
            )}
          </button>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <Image src={product.image || "/placeholder.png"} alt={product.name} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</p>
                    <p className="text-sm text-gray-500">{formatPrice(product.price)} × {quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 shrink-0">{formatPrice(product.price * quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

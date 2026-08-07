"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  stock: number;
  category?: { name: string };
  reviews?: { rating: number }[];
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = product.stock > 0;

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null;

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (!inStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      stock: product.stock,
    });
    toast.success(`${product.name} added to cart!`);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0] ?? "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {discount && (
            <span className="absolute top-2 left-2 badge bg-red-100 text-red-700 font-semibold">
              -{discount}%
            </span>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="badge bg-gray-200 text-gray-600">Out of Stock</span>
            </div>
          )}
          <button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all"
            onClick={(e) => { e.preventDefault(); toast("Wishlist coming soon!"); }}
          >
            <Heart size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          {product.category && (
            <p className="text-xs text-brand-600 font-medium mb-1">{product.category.name}</p>
          )}
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>

          {avgRating !== null && (
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  className={cn(
                    s <= Math.round(avgRating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                  )}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviews!.length})</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mt-3">
            <div>
              <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={cn(
                "p-2 rounded-xl transition-all",
                inStock
                  ? "bg-brand-600 text-white hover:bg-brand-700 active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

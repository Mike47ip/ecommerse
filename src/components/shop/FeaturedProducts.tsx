import Link from "next/link";
import { ProductCard } from "./ProductCard";

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

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-500 text-sm mt-1">Hand-picked deals just for you</p>
        </div>
        <Link href="/products?featured=true" className="text-sm text-brand-600 font-medium hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

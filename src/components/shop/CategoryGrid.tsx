import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">Shop by Category</h2>
        <Link href="/products" className="text-sm text-brand-600 font-medium hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100"
          >
            {cat.image && (
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-white font-bold text-lg font-display leading-tight">{cat.name}</p>
              {cat.description && (
                <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{cat.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

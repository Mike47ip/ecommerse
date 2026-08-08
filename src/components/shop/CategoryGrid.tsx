import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    name: "AirPods & Earbuds",
    slug: "airpods",
    desc: "Wireless audio",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
  },
  {
    name: "Computers",
    slug: "computers",
    desc: "Laptops & desktops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
  },
  {
    name: "Cameras",
    slug: "cameras",
    desc: "Photography & video",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
  },
  {
    name: "Batteries & Power",
    slug: "batteries",
    desc: "Power banks & chargers",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
  },
  {
    name: "Storage",
    slug: "storage",
    desc: "SSDs, USBs & cards",
    image: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=600&q=80",
  },
];

export function CategoryGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 text-sm mt-1">Everything tech, all in one place</p>
        </div>
        <Link href="/products" className="text-sm text-brand-500 font-medium hover:underline">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="group relative rounded-2xl overflow-hidden aspect-square hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />

            {/* Bottom fade only */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

            {/* Blue tint on hover */}
            <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/15 transition-all duration-300" />

            {/* Hover ring */}
            <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-brand-400/70 transition-all duration-300" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="font-bold text-white text-sm leading-tight drop-shadow-lg">{cat.name}</p>
              <p className="text-white/80 text-xs mt-0.5 drop-shadow">{cat.desc}</p>
            </div>

            {/* Arrow */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
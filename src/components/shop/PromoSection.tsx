import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromoSection() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="relative rounded-3xl overflow-hidden p-8 text-white"
        style={{ background: "linear-gradient(135deg, #0047ab, #0066CC)" }}>
        <div className="relative z-10">
          <span className="text-blue-200 text-sm font-medium">Best Sellers</span>
          <h3 className="font-display text-2xl font-bold mt-1 mb-2">Top AirPods & Earbuds</h3>
          <p className="text-blue-100 text-sm mb-6">Crystal clear sound, all day comfort.</p>
          <Link href="/products?category=airpods"
            className="inline-flex items-center gap-2 bg-white text-blue-700 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
            Shop AirPods <ArrowRight size={14} />
          </Link>
        </div>
        <div className="absolute right-4 bottom-2 text-[100px] opacity-10 select-none">🎧</div>
      </div>

      <div className="relative rounded-3xl overflow-hidden p-8 text-white"
        style={{ background: "linear-gradient(135deg, #111827, #1f2937)" }}>
        <div className="relative z-10">
          <span className="text-gray-400 text-sm font-medium">New Arrivals</span>
          <h3 className="font-display text-2xl font-bold mt-1 mb-2">Latest Laptops & PCs</h3>
          <p className="text-gray-400 text-sm mb-6">Power through anything with cutting-edge machines.</p>
          <Link href="/products?category=computers"
            className="inline-flex items-center gap-2 bg-brand-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-brand-600 transition-colors">
            Shop Computers <ArrowRight size={14} />
          </Link>
        </div>
        <div className="absolute right-4 bottom-2 text-[100px] opacity-10 select-none">💻</div>
      </div>
    </section>
  );
}

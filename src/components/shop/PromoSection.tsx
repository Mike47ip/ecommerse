import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromoSection() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white">
        <div className="relative z-10">
          <span className="text-brand-200 text-sm font-medium">Limited Time</span>
          <h3 className="font-display text-2xl font-bold mt-1 mb-2">Up to 40% Off Electronics</h3>
          <p className="text-brand-200 text-sm mb-6">Grab the latest gadgets at unbeatable prices.</p>
          <Link
            href="/products?category=electronics"
            className="inline-flex items-center gap-2 bg-white text-brand-700 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors"
          >
            Shop Electronics <ArrowRight size={14} />
          </Link>
        </div>
        <div className="absolute right-0 bottom-0 text-[120px] opacity-10 select-none">📱</div>
      </div>

      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white">
        <div className="relative z-10">
          <span className="text-amber-100 text-sm font-medium">New Season</span>
          <h3 className="font-display text-2xl font-bold mt-1 mb-2">Fresh Fashion Arrivals</h3>
          <p className="text-amber-100 text-sm mb-6">Style that moves with you, every day.</p>
          <Link
            href="/products?category=fashion"
            className="inline-flex items-center gap-2 bg-white text-orange-700 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors"
          >
            Shop Fashion <ArrowRight size={14} />
          </Link>
        </div>
        <div className="absolute right-0 bottom-0 text-[120px] opacity-10 select-none">👗</div>
      </div>
    </section>
  );
}

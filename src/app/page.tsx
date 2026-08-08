import { ShopLayout } from "@/components/layout/ShopLayout";
import { HeroSection } from "@/components/shop/HeroSection";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";
import { CategoryGrid } from "@/components/shop/CategoryGrid";
import { PromoSection } from "@/components/shop/PromoSection";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { featured: true, published: true },
    include: { category: true, reviews: { select: { rating: true } } },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <ShopLayout>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <CategoryGrid />
        <FeaturedProducts products={featured} />
        <PromoSection />
      </div>
    </ShopLayout>
  );
}

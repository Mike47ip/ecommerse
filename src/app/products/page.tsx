import { ShopLayout } from "@/components/layout/ShopLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shop All Products" };

interface SearchParams {
  category?: string;
  search?: string;
  sort?: string;
  featured?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, search, sort, featured, minPrice, maxPrice } = searchParams;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        published: true,
        ...(category && { category: { slug: category } }),
        ...(featured === "true" && { featured: true }),
        ...(search && {
          name: { contains: search, mode: "insensitive" },
        }),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice && { gte: parseFloat(minPrice) }),
                ...(maxPrice && { lte: parseFloat(maxPrice) }),
              },
            }
          : {}),
      },
      include: { category: true, reviews: { select: { rating: true } } },
      orderBy:
        sort === "price-asc"
          ? { price: "asc" }
          : sort === "price-desc"
          ? { price: "desc" }
          : sort === "newest"
          ? { createdAt: "desc" }
          : { createdAt: "desc" },
    }),
    prisma.category.findMany(),
  ]);

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              {search ? `Results for "${search}"` : category ? `${category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}` : "All Products"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{products.length} products found</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters categories={categories} />
          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}

import { ShopLayout } from "@/components/layout/ShopLayout";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Product Not Found" };
  return { title: product.name, description: product.description.slice(0, 160) };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, published: true },
    include: {
      category: true,
      reviews: { include: { user: { select: { name: true, image: true } } } },
    },
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, published: true },
    include: { category: true, reviews: { select: { rating: true } } },
    take: 4,
  });

  return (
    <ShopLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetail product={product} relatedProducts={related} />
      </div>
    </ShopLayout>
  );
}
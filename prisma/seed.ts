import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@shopwave.com" },
    update: {},
    create: {
      email: "admin@shopwave.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Demo user
  const userPassword = await bcrypt.hash("user123", 12);
  await prisma.user.upsert({
    where: { email: "demo@shopwave.com" },
    update: {},
    create: {
      email: "demo@shopwave.com",
      name: "Demo User",
      password: userPassword,
      role: "USER",
    },
  });

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "electronics" },
      update: {},
      create: {
        name: "Electronics",
        slug: "electronics",
        description: "Phones, laptops, gadgets and accessories",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
      },
    }),
    prisma.category.upsert({
      where: { slug: "fashion" },
      update: {},
      create: {
        name: "Fashion",
        slug: "fashion",
        description: "Clothing, shoes and accessories",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
      },
    }),
    prisma.category.upsert({
      where: { slug: "home-living" },
      update: {},
      create: {
        name: "Home & Living",
        slug: "home-living",
        description: "Furniture, decor and kitchen essentials",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      },
    }),
    prisma.category.upsert({
      where: { slug: "beauty" },
      update: {},
      create: {
        name: "Beauty",
        slug: "beauty",
        description: "Skincare, makeup and personal care",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      },
    }),
  ]);

  // Products
  const products = [
    {
      name: "Wireless Noise-Cancelling Headphones",
      slug: "wireless-noise-cancelling-headphones",
      description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Perfect for travel and work-from-home.",
      price: 299.99,
      comparePrice: 399.99,
      stock: 50,
      featured: true,
      categorySlug: "electronics",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
      ],
    },
    {
      name: "Smart Watch Pro",
      slug: "smart-watch-pro",
      description: "Track fitness, receive notifications, and monitor health metrics with this sleek smartwatch. Water-resistant with 7-day battery life.",
      price: 199.99,
      comparePrice: 249.99,
      stock: 30,
      featured: true,
      categorySlug: "electronics",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
      ],
    },
    {
      name: "Minimalist Leather Sneakers",
      slug: "minimalist-leather-sneakers",
      description: "Handcrafted from genuine full-grain leather. Minimal design that pairs with everything. Available in white, black, and tan.",
      price: 120.00,
      comparePrice: 160.00,
      stock: 75,
      featured: true,
      categorySlug: "fashion",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      ],
    },
    {
      name: "Linen Summer Dress",
      slug: "linen-summer-dress",
      description: "Breathable 100% linen dress perfect for warm weather. Available in sage, ivory, and rust. Machine washable.",
      price: 85.00,
      stock: 40,
      featured: false,
      categorySlug: "fashion",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
      ],
    },
    {
      name: "Ceramic Pour-Over Coffee Set",
      slug: "ceramic-pour-over-coffee-set",
      description: "Handmade ceramic pour-over dripper with matching server and two mugs. The perfect morning ritual companion.",
      price: 65.00,
      comparePrice: 80.00,
      stock: 25,
      featured: true,
      categorySlug: "home-living",
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
      ],
    },
    {
      name: "Portable Bluetooth Speaker",
      slug: "portable-bluetooth-speaker",
      description: "360° surround sound in a compact, waterproof design. 20-hour playtime and built-in power bank.",
      price: 79.99,
      stock: 60,
      featured: false,
      categorySlug: "electronics",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
      ],
    },
    {
      name: "Natural Glow Skincare Kit",
      slug: "natural-glow-skincare-kit",
      description: "Complete 5-step skincare routine with cleanser, toner, vitamin C serum, moisturizer, and SPF30. Suitable for all skin types.",
      price: 95.00,
      comparePrice: 130.00,
      stock: 35,
      featured: true,
      categorySlug: "beauty",
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
      ],
    },
    {
      name: "Modular Bookshelf",
      slug: "modular-bookshelf",
      description: "Stackable modular shelving system in solid walnut veneer. Mix and match units to create your perfect configuration.",
      price: 340.00,
      stock: 15,
      featured: false,
      categorySlug: "home-living",
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      ],
    },
  ];

  for (const p of products) {
    const cat = categories.find((c) => c.slug === p.categorySlug);
    if (!cat) continue;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice,
        stock: p.stock,
        featured: p.featured,
        published: true,
        categoryId: cat.id,
        images: p.images,
      },
    });
  }

  console.log("✅ Seed complete!");
  console.log("👤 Admin: admin@shopwave.com / admin123");
  console.log("👤 Demo:  demo@shopwave.com  / user123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

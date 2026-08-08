import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding GadgetHub Signature...");

  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@gadgethubsignature.com" },
    update: {},
    create: { email: "admin@gadgethubsignature.com", name: "Admin", password: adminPassword, role: "ADMIN" },
  });

  const userPassword = await bcrypt.hash("user123", 12);
  await prisma.user.upsert({
    where: { email: "demo@gadgethubsignature.com" },
    update: {},
    create: { email: "demo@gadgethubsignature.com", name: "Demo User", password: userPassword, role: "USER" },
  });

  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: "airpods" }, update: {}, create: { name: "AirPods & Earbuds", slug: "airpods", description: "Wireless earbuds and headphones", image: "https://images.unsplash.com/photo-1606741965429-02919b2e0806?w=400" } }),
    prisma.category.upsert({ where: { slug: "computers" }, update: {}, create: { name: "Computers", slug: "computers", description: "Laptops, desktops and accessories", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" } }),
    prisma.category.upsert({ where: { slug: "cameras" }, update: {}, create: { name: "Cameras", slug: "cameras", description: "Digital cameras and photography gear", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400" } }),
    prisma.category.upsert({ where: { slug: "batteries" }, update: {}, create: { name: "Batteries & Power", slug: "batteries", description: "Power banks, chargers and batteries", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400" } }),
    prisma.category.upsert({ where: { slug: "storage" }, update: {}, create: { name: "Storage", slug: "storage", description: "USB drives, SSDs and memory cards", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400" } }),
  ]);

  const [airpods, computers, cameras, batteries, storage] = categories;

  const products = [
    { name: "Apple AirPods Pro (2nd Gen)", slug: "apple-airpods-pro-2nd-gen", description: "Industry-leading Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. USB-C charging case with 30-hour battery.", price: 899.99, comparePrice: 1099.99, stock: 40, featured: true, categoryId: airpods.id, images: ["https://images.unsplash.com/photo-1606741965429-02919b2e0806?w=600", "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600"] },
    { name: "Samsung Galaxy Buds2 Pro", slug: "samsung-galaxy-buds2-pro", description: "Intelligent ANC, 360° audio, and seamless Galaxy ecosystem integration. IPX7 water resistant.", price: 599.99, comparePrice: 749.99, stock: 35, featured: true, categoryId: airpods.id, images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"] },
    { name: "Sony WF-1000XM5", slug: "sony-wf-1000xm5", description: "World-class noise cancellation in the smallest, lightest body ever. LDAC for high-quality audio streaming.", price: 749.99, comparePrice: null, stock: 25, featured: false, categoryId: airpods.id, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"] },
    { name: "MacBook Air M3 13\"", slug: "macbook-air-m3-13", description: "Supercharged by the M3 chip. Up to 18 hours battery, 8GB RAM, 256GB SSD. Fanless, silent performance.", price: 7499.99, comparePrice: 8199.99, stock: 15, featured: true, categoryId: computers.id, images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"] },
    { name: "Dell XPS 15 OLED", slug: "dell-xps-15-oled", description: "15.6\" OLED display, Intel Core i7, 16GB RAM, 512GB SSD. Professional powerhouse for creators.", price: 9299.99, comparePrice: 10499.99, stock: 10, featured: true, categoryId: computers.id, images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"] },
    { name: "Lenovo ThinkPad X1 Carbon", slug: "lenovo-thinkpad-x1-carbon", description: "14\" ultra-light business laptop at just 1.12kg. Intel Core i5, 16GB RAM, 512GB SSD, MIL-SPEC durability.", price: 6799.99, comparePrice: null, stock: 20, featured: false, categoryId: computers.id, images: ["https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600"] },
    { name: "Sony Alpha A7 IV", slug: "sony-alpha-a7-iv", description: "33MP full-frame mirrorless camera. 4K60p video, real-time Eye AF, 10fps burst. Perfect for pros and enthusiasts.", price: 8999.99, comparePrice: 9999.99, stock: 12, featured: true, categoryId: cameras.id, images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"] },
    { name: "Canon EOS R50", slug: "canon-eos-r50", description: "24.2MP APS-C mirrorless camera. Dual Pixel CMOS AF II, 4K video, compact and beginner-friendly.", price: 3499.99, comparePrice: 3999.99, stock: 20, featured: false, categoryId: cameras.id, images: ["https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=600"] },
    { name: "GoPro HERO12 Black", slug: "gopro-hero12-black", description: "5.3K video, HyperSmooth 6.0 stabilization, waterproof to 10m. Capture every adventure.", price: 1999.99, comparePrice: 2299.99, stock: 30, featured: true, categoryId: cameras.id, images: ["https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=600"] },
    { name: "Anker 27,000mAh Power Bank", slug: "anker-27000mah-power-bank", description: "65W fast charging, charges laptop + phone simultaneously. 3 USB ports. Enough power for 5 full phone charges.", price: 349.99, comparePrice: 449.99, stock: 60, featured: true, categoryId: batteries.id, images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600"] },
    { name: "Baseus 20W USB-C Charger", slug: "baseus-20w-usbc-charger", description: "GaN technology, ultra-compact, supports PD 3.0 fast charging. Compatible with iPhone, Samsung, MacBook.", price: 89.99, comparePrice: null, stock: 100, featured: false, categoryId: batteries.id, images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600"] },
    { name: "Samsung 990 Pro 1TB SSD", slug: "samsung-990-pro-1tb-ssd", description: "NVMe M.2 SSD with read speeds up to 7,450MB/s. PCIe 4.0, perfect for gaming and creative work.", price: 699.99, comparePrice: 849.99, stock: 45, featured: true, categoryId: storage.id, images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600"] },
    { name: "SanDisk 512GB USB-C Flash Drive", slug: "sandisk-512gb-usbc-flash-drive", description: "Ultra-fast USB 3.2 transfer speeds. Dual connector (USB-C + USB-A). Compact and pocket-friendly.", price: 199.99, comparePrice: 249.99, stock: 80, featured: false, categoryId: storage.id, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"] },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, published: true },
    });
  }

  console.log("✅ GadgetHub Signature seeded!");
  console.log("👤 Admin: admin@gadgethubsignature.com / admin123");
  console.log("👤 Demo:  demo@gadgethubsignature.com  / user123");
}

main().catch(console.error).finally(() => prisma.$disconnect());

# 🛍️ ShopWave — Full-Stack E-Commerce Platform

A modern, production-ready e-commerce platform built with **Next.js 15**, **Tailwind CSS**, **Prisma**, and **Paystack** payments.

---

## ✨ Features

- 🛒 **Full Shopping Cart** — persistent via Zustand + localStorage
- 💳 **Paystack Payments** — mobile money (MTN, Vodafone, AirtelTigo) & card via inline SDK
- 📦 **Order Management** — full lifecycle: Pending → Processing → Shipped → Delivered
- 🔐 **Auth** — email/password with NextAuth v5, JWT sessions, role-based access
- 🧑‍💼 **Admin Panel** — dashboard, product CRUD, order status management, low-stock alerts
- 📬 **Contact Form** — powered by Formspree
- 🔍 **Product Filtering** — by category, price range, search, sort, featured
- ⭐ **Product Reviews** — ratings and comments
- 📱 **Fully Responsive** — mobile-first design
- 🌙 **Modern UI** — custom brand palette, animations, skeleton loaders and more

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
yarn install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | [Supabase](https://supabase.com), [Neon](https://neon.tech), [Railway](https://railway.app) |
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` (dev) or your domain (prod) |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developers) |
| `PAYSTACK_SECRET_KEY` | Same as above |
| `NEXT_PUBLIC_FORMSPREE_ID` | [Formspree](https://formspree.io) — your form ID |

### 3. Set up the database

```bash
yarn prisma:generate   # Generate Prisma client
yarn prisma:push       # Push schema to your DB
yarn prisma:seed       # Seed demo data (products + users)
```

### 4. Run the dev server

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔑 Demo Accounts (after seeding)

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@shopwave.com | admin123 |
| **User** | demo@shopwave.com | user123 |

---

## 💳 Paystack Live Demo

To test a real purchase:

1. Sign in as demo user
2. Add a product to cart
3. Go to **Checkout**
4. Fill in your details (use your real email for Paystack)
5. Click **Pay** — the Paystack modal opens
6. Use **test card**: `4084 0840 8408 4081`, CVV: `408`, Exp: any future date, OTP: `408080`
7. Or test MTN MoMo: use number `0551234987`, PIN: `1234`

> ⚠️ Make sure `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` starts with `pk_test_` for test mode.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── products/           # Product listing & detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout + Paystack
│   ├── orders/             # Order history & detail
│   ├── login/ register/    # Auth pages
│   ├── contact/            # Contact (Formspree)
│   ├── admin/              # Admin panel (protected)
│   └── api/                # API routes
│       ├── auth/           # NextAuth + Register
│       ├── products/       # Product CRUD
│       ├── orders/         # Order management
│       ├── paystack/       # Payment verification
│       └── contact/        # Formspree proxy
├── components/
│   ├── layout/             # Navbar, Footer, ShopLayout
│   ├── shop/               # ProductCard, CartView, CheckoutForm…
│   ├── admin/              # AdminSidebar, ProductForm, OrderActions
│   ├── auth/               # LoginForm, RegisterForm
│   ├── ui/                 # Skeleton loaders
│   └── providers/          # SessionProvider
├── lib/
│   ├── prisma.ts           # Prisma singleton
│   ├── auth.ts             # NextAuth config
│   ├── store.ts            # Zustand cart store
│   ├── paystack.ts         # Paystack API helpers
│   └── utils.ts            # formatPrice, slugify, etc.
├── types/
│   └── next-auth.d.ts      # Type augmentation
prisma/
├── schema.prisma           # Full DB schema
└── seed.ts                 # Demo data seeder
```

---

## 🌐 Deployment

### Vercel (recommended)

```bash
yarn build  # Make sure it builds cleanly first
```

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy

### Environment for production

- Change `NEXTAUTH_URL` to your real domain
- Switch Paystack keys from `pk_test_` to `pk_live_`
- Use a production PostgreSQL URL (Supabase or Neon recommended)

---

## 📬 Formspree Setup

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form → copy the form ID (last part of the URL, e.g. `xabcdefg`)
3. Add to `.env`: `NEXT_PUBLIC_FORMSPREE_ID=xabcdefg`
4. Submissions from the contact page will arrive in your Formspree dashboard + email

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 3 |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 (JWT) |
| Payments | Paystack (inline + server verify) |
| Contact | Formspree |
| State | Zustand (cart) |
| Forms | React Hook Form + Zod |
| Toasts | react-hot-toast |
| Package manager | Yarn |

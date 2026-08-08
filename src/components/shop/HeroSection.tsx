"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const FEATURES = [
  { icon: Truck, label: "Free delivery over GHS 200" },
  { icon: ShieldCheck, label: "Secure Paystack checkout" },
  { icon: RotateCcw, label: "30-day easy returns" },
];

const FLOATING_PRODUCTS = [
  { emoji: "🎧", delay: "0s",   x: "75%", y: "12%" },
  { emoji: "💻", delay: "0.6s", x: "83%", y: "50%" },
  { emoji: "📷", delay: "1.2s", x: "68%", y: "72%" },
  { emoji: "🔋", delay: "0.3s", x: "89%", y: "28%" },
  { emoji: "💾", delay: "0.9s", x: "61%", y: "38%" },
];

const WORDS = ["AirPods.", "Laptops.", "Cameras.", "Gadgets."];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible]     = useState(true);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden text-white" style={{ minHeight: "580px" }}>
      {/* Deep blue background */}
      {/* Deep blue background */}
<div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #000d1a 0%, #001f4d 40%, #0047ab 100%)" }} />

{/* Subtle bg image layered under the blobs — keeps the blue design intact */}
<div
  className="absolute inset-0 opacity-[0.09] mix-blend-luminosity"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
/>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #0066CC 0%, transparent 70%)", top: "-150px", right: "-100px", animation: "blobMove1 8s ease-in-out infinite alternate" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #003d7a 0%, transparent 70%)", bottom: "-100px", left: "-80px", animation: "blobMove2 10s ease-in-out infinite alternate" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0099ff 0%, transparent 70%)", top: "40%", left: "35%", animation: "blobMove1 12s ease-in-out infinite alternate-reverse" }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />

        {/* Sweep lines */}
        <div className="absolute top-1/3 left-0 w-full h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #0066CC, transparent)", animation: "shootStar 5s linear infinite" }} />
        <div className="absolute top-2/3 left-0 w-full h-px opacity-10"
          style={{ background: "linear-gradient(90deg, transparent, #3399ff, transparent)", animation: "shootStar 7s linear infinite 2.5s" }} />
      </div>

      {/* Floating emojis */}
      {mounted && FLOATING_PRODUCTS.map(({ emoji, delay, x, y }) => (
        <div key={emoji} className="absolute hidden lg:flex items-center justify-center select-none pointer-events-none"
          style={{ left: x, top: y, animation: `floatBob 4s ease-in-out infinite`, animationDelay: delay }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            {emoji}
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold"
            style={{ background: "rgba(0,102,204,0.25)", border: "1px solid rgba(0,102,204,0.5)", animation: mounted ? "fadeSlideUp 0.6s ease-out both" : "none" }}>
            <Zap size={12} className="text-blue-300" />
            <span className="text-blue-200">Ghana's #1 Gadget Store</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
            style={{ animation: mounted ? "fadeSlideUp 0.6s ease-out 0.1s both" : "none" }}>
            Premium{" "}
            <span className="inline-block"
              style={{
                background: "linear-gradient(135deg, #3399ff, #0066CC, #001f4d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-10px)",
                display: "inline-block",
              }}>
              {WORDS[wordIndex]}
            </span>
            <br />
            <span className="text-white/90">Delivered Fast.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: "rgba(255,255,255,0.6)", animation: mounted ? "fadeSlideUp 0.6s ease-out 0.2s both" : "none" }}>
            Shop the latest AirPods, laptops, cameras, batteries and storage devices.
            Authentic products, competitive prices, fast delivery across Ghana.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12"
            style={{ animation: mounted ? "fadeSlideUp 0.6s ease-out 0.3s both" : "none" }}>
            <Link href="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, #0066CC, #003d7a)", boxShadow: "0 0 30px rgba(0,102,204,0.5), 0 4px 15px rgba(0,0,0,0.3)" }}>
              Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/products?featured=true"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(12px)" }}>
              Featured Deals
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6"
            style={{ animation: mounted ? "fadeSlideUp 0.6s ease-out 0.4s both" : "none" }}>
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,102,204,0.3)", border: "1px solid rgba(0,102,204,0.4)" }}>
                  <Icon size={13} className="text-blue-300" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blobMove1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px,30px) scale(1.1); } }
        @keyframes blobMove2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-30px,-40px) scale(1.08); } }
        @keyframes floatBob { 0%,100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-18px) rotate(2deg); } }
        @keyframes shootStar { 0% { transform: translateX(-100%); opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { transform: translateX(100%); opacity:0; } }
        @keyframes fadeSlideUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

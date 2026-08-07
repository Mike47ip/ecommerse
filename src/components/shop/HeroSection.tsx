"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const FEATURES = [
  { icon: Truck, label: "Free delivery over GHS 200" },
  { icon: ShieldCheck, label: "Secure Paystack checkout" },
  { icon: RotateCcw, label: "30-day easy returns" },
];

const FLOATING_PRODUCTS = [
  { emoji: "📱", delay: "0s",   x: "75%", y: "15%", size: "text-4xl" },
  { emoji: "👟", delay: "0.6s", x: "82%", y: "55%", size: "text-3xl" },
  { emoji: "⌚", delay: "1.2s", x: "68%", y: "75%", size: "text-2xl" },
  { emoji: "🎧", delay: "0.3s", x: "88%", y: "30%", size: "text-3xl" },
  { emoji: "💄", delay: "0.9s", x: "60%", y: "40%", size: "text-2xl" },
];

const WORDS = ["Smarter.", "Better.", "Faster.", "Easier."];

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
    <section className="relative overflow-hidden text-white" style={{ minHeight: "560px" }}>

      {/* ── Deep space background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #c026d3 0%, transparent 70%)",
            top: "-200px", right: "-100px",
            animation: "blobMove1 8s ease-in-out infinite alternate",
          }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            bottom: "-150px", left: "-80px",
            animation: "blobMove2 10s ease-in-out infinite alternate",
          }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            top: "30%", left: "40%",
            animation: "blobMove1 12s ease-in-out infinite alternate-reverse",
          }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />

        {/* Shooting star lines */}
        <div className="absolute top-1/4 left-0 w-full h-px opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, #c026d3, transparent)",
            animation: "shootStar 4s linear infinite",
          }} />
        <div className="absolute top-2/3 left-0 w-full h-px opacity-10"
          style={{
            background: "linear-gradient(90deg, transparent, #7c3aed, transparent)",
            animation: "shootStar 6s linear infinite 2s",
          }} />
      </div>

      {/* Floating product emojis (desktop) */}
      {mounted && FLOATING_PRODUCTS.map(({ emoji, delay, x, y, size }) => (
        <div key={emoji}
          className={`absolute hidden lg:flex items-center justify-center ${size} select-none pointer-events-none`}
          style={{
            left: x, top: y,
            animation: `floatBob 4s ease-in-out infinite`,
            animationDelay: delay,
            filter: "drop-shadow(0 0 20px rgba(192,38,211,0.4))",
          }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>
            {emoji}
          </div>
        </div>
      ))}

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold"
            style={{
              background: "rgba(192,38,211,0.15)",
              border: "1px solid rgba(192,38,211,0.35)",
              animation: mounted ? "fadeSlideUp 0.6s ease-out both" : "none",
            }}>
            <Sparkles size={12} className="text-fuchsia-400" />
            <span className="text-fuchsia-300">New arrivals every week</span>
          </div>

          {/* Headline with cycling word */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6"
            style={{ animation: mounted ? "fadeSlideUp 0.6s ease-out 0.1s both" : "none" }}>
            Shop{" "}
            <span className="inline-block"
              style={{
                background: "linear-gradient(135deg, #e879f9, #a855f7, #6366f1)",
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
            <span className="text-white/90">Live Better.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-relaxed mb-10 max-w-xl"
            style={{
              color: "rgba(255,255,255,0.6)",
              animation: mounted ? "fadeSlideUp 0.6s ease-out 0.2s both" : "none",
            }}>
            Discover thousands of premium products — electronics, fashion, home essentials and more.
            Fast delivery across Ghana, powered by secure Paystack checkout.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12"
            style={{ animation: mounted ? "fadeSlideUp 0.6s ease-out 0.3s both" : "none" }}>
            <Link href="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #c026d3, #7c3aed)",
                boxShadow: "0 0 30px rgba(192,38,211,0.4), 0 4px 15px rgba(0,0,0,0.3)",
              }}>
              Shop Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/products?featured=true"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}>
              Featured Deals
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6"
            style={{ animation: mounted ? "fadeSlideUp 0.6s ease-out 0.4s both" : "none" }}>
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(192,38,211,0.2)",
                    border: "1px solid rgba(192,38,211,0.2)",
                  }}>
                  <Icon size={13} className="text-fuchsia-400" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes blobMove1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes blobMove2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-30px, -40px) scale(1.08); }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes shootStar {
          0%   { transform: translateX(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
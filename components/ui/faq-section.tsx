"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function FAQWithSpiral() {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [query] = useState("");

  // Spiral configuration — now blue gradient by default
  const [cfg] = useState({
    points: 700,
    dotRadius: 2.8,
    duration: 3.0,
    color: "#3b82f6",
    gradient: "ocean" as
      | "none"
      | "rainbow"
      | "sunset"
      | "ocean"
      | "fire"
      | "neon"
      | "pastel"
      | "grayscale",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.95,
    sizeMin: 0.5,
    sizeMax: 1.4,
    background: "#f9fbff",
  });

  const gradients: Record<string, string[]> = useMemo(
    () => ({
      none: [],
      ocean: ["#1359d1", "#1e90ff", "#00bcd4"],
      rainbow: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0099ff", "#6633ff"],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#00ffff", "#00aaff", "#1359d1"],
      pastel: ["#d0e8ff", "#c8f0ff", "#e6f7ff"],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    []
  );

  // Spiral generation (unchanged)
  useEffect(() => {
    if (!spiralRef.current) return;
    const SIZE = 560;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)");
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  // ✅ Persian FAQ content for AI medical imaging
  const faqs = [
    {
      q: "سامانه تحلیل تصاویر پزشکی چیست؟",
      a: "این سامانه با استفاده از هوش مصنوعی، تصاویر پزشکی مانند MRI و CT را تحلیل کرده و به پزشکان در تشخیص سریع‌تر و دقیق‌تر کمک می‌کند.",
    },
    {
      q: "آیا این سامانه فقط برای پزشکان است؟",
      a: "خیر، بیماران نیز می‌توانند از طریق این سامانه نتایج اولیه و گزارش تحلیلی از تصاویر خود را مشاهده کنند، اما تفسیر نهایی باید توسط پزشک انجام شود.",
    },
    {
      q: "چه نوع تصاویری توسط سامانه پشتیبانی می‌شوند؟",
      a: "سامانه از تصاویر MRI، CT و X-Ray پشتیبانی می‌کند و در نسخه‌های بعدی سایر مدالیته‌ها نیز اضافه خواهند شد.",
    },
    {
      q: "آیا داده‌های من امن هستند؟",
      a: "بله، تمامی تصاویر و داده‌ها به‌صورت رمزگذاری‌شده ذخیره و پردازش می‌شوند و فقط پزشک یا کاربر مجاز به دسترسی هستند.",
    },
    {
      q: "آیا تشخیص سامانه قابل اعتماد است؟",
      a: "بله، مدل‌های یادگیری عمیق این سامانه بر روی هزاران تصویر آموزش دیده‌اند و دقت آن‌ها در سطح استانداردهای جهانی است.",
    },
    {
      q: "چطور می‌توانم از سامانه استفاده کنم؟",
      a: "کافی است وارد حساب کاربری خود شوید، تصویر پزشکی خود را بارگذاری کنید و پس از چند دقیقه نتیجه تحلیل را مشاهده نمایید.",
    },
  ];

  const filtered = query
    ? faqs.filter(({ q, a }) =>
        (q + a).toLowerCase().includes(query.toLowerCase())
      )
    : faqs;

  return (
    <div
      className="relative  w-full overflow-hidden text-[#0c2b75]"
    >
      {/* Spiral background */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
      >
        <div ref={spiralRef} />
      </div>

      {/* Layout */}
      <div className="relative mx-auto max-w-5xl px-6 py-25" dir="rtl">
        <header className="mb-12 border-b border-blue-200/40 pb-6  ">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight z-10 relative  text-[#1359d1]">
            سوالات پرتکرار
          </h1>

          <Image src="/faq.png" width={1000} height={1000} alt="faq" className="w-75 md:opacity-100 opacity-35 z-0 absolute -top-1 left-0" />
        </header>

         <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/70 p-5 backdrop-blur-lg transition hover:shadow-lg hover:bg-white/80">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-right"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-blue-400">{String(index).padStart(2, "0")}</span>
          <h3 className="text-base md:text-lg font-semibold leading-tight text-[#0c2b75]">
            {q}
          </h3>
        </div>
        <span className="ml-4 text-blue-500 transition group-hover:text-blue-700">
          {open ? "–" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-gray-700 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

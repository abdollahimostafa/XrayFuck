"use client";

import Image from "next/image";
import { FadingGridBackground } from "./fadingbg";
import Header from "./header";


export default function Mainmid() {
  return (
    <section className="h-300 bg-[#1359d1] text-white relative overflow-hidden rounded-t-none  md:rounded-t-3xl">
      <Header />

      {/* Fading Grid Background */}
      <FadingGridBackground />

      {/* Hero Section */}
      <section
        className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-6"
        dir="rtl"
      >
          <div className="mb-6 px-5 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-sm md:text-base text-white/90 flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
    پلتفرم مبتنی بر هوش مصنوعی
  </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          سامانه هوش مصنوعی تحلیل تصاویر پزشکی
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-white/80 mb-8">
          با استفاده از هوش مصنوعی پیشرفته، تصاویر پزشکی را به‌صورت خودکار تحلیل کنید و تشخیص دقیق‌تری داشته باشید.
        </p>
        <div className="flex gap-4">
          <a href="/signin" className="bg-white text-[#1359d1] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
            شروع کنید
          </a>
          <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20">
            اطلاعات بیشتر
          </button>
        </div>
<div className="absolute bottom-[-30vw] md:bottom-[-35vw]  lg:bottom-[-36vw]  xl:bottom-[-25vw] inset-x-0 flex justify-center z-20">
  <div className="relative w-[95vw] max-w-5xl px-4">
    <div className="transform md:rotate-x-12 md:rotate-y-[-11deg] md:scale-[0.95] shadow-xl shadow-black/10 transition-transform duration-700">
      <Image
        src="/testam.png"
        alt="نمایی از سامانه"
        width={1600}
        height={900}
        className="rounded-2xl border border-white/10 w-full h-auto"
      />
    </div>
  </div>
</div>

                {/* Floating Image */}
      </section>
      
          </section>
  );
}

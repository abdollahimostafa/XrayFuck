import Image from "next/image";
import { Sparkles, Brain, Layers, Shield } from "lucide-react";

export default function FeaturesSection() {
  return (

<div>    {/* gradient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/70 to-blue-100/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative flex justify-center md:justify-start">
          <div className="relative w-[90%] max-w-md rotate-[-3deg]">
            <div className="absolute z-2 inset-0 rounded-3xl blur-2xl" />
            <Image
              src="/f1.png"
              alt="نمایی از سامانه"
              width={900}
              height={500}
              className="rounded-3xl   z-40"
            />
          </div>
        </div>

        {/* Right text */}
        <div className="text-center md:text-right" dir="rtl">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-md border border-white/30 text-sm font-semibold text-[#1359d1]">
            ویژگی‌های کلیدی
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c2b75] leading-tight mb-4">
            قدرت <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">هوش مصنوعی</span> در پردازش تصاویر پزشکی
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            ما مجموعه‌ای از قابلیت‌های هوشمند را طراحی کرده‌ایم تا تحلیل و تفسیر تصاویر پزشکی را سریع‌تر، دقیق‌تر و زیباتر کنیم.
          </p>
          <p className="text-sm text-gray-400">
            ساخته‌شده برای پزشکان، پژوهشگران و مراکز درمانی مدرن
          </p>
        </div>
      </div>

      {/* Features Row */}
      <div className="relative z-20 max-w-7xl mx-auto -mt-6 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group relative p-6 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-blue-600/30 to-transparent opacity-50 group-hover:opacity-80 blur-xl transition-all duration-500" />
            <div className="relative z-10 flex flex-col items-start text-right" dir="rtl">
              <div className="mb-4 p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-[#1e45c0] text-white shadow-lg shadow-blue-500/30">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#0c2b75] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    
  );
}

const features = [
  {
    title: "تحلیل خودکار تصاویر",
    description: "سیستم ما تصاویر پزشکی را به‌صورت خودکار تحلیل کرده و نتایج دقیق را ارائه می‌دهد.",
    icon: Brain,
  },
  {
    title: "طراحی مدرن و ساده",
    description: "محیطی زیبا و کاربرپسند برای پزشکان و پژوهشگران فراهم کرده‌ایم.",
    icon: Sparkles,
  },
  {
    title: "پشتیبانی از انواع داده‌ها",
    description: "سازگار با داده‌های MRI، CT، و دیگر تصاویر پزشکی در فرمت‌های متنوع.",
    icon: Layers,
  },
  {
    title: "امنیت و حریم خصوصی",
    description: "تمامی داده‌ها با بالاترین سطح رمزنگاری و امنیت ذخیره و پردازش می‌شوند.",
    icon: Shield,
  },
];

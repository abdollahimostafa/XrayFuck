import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "یکپارچه‌سازی آسان",
  "پشتیبانی ۲۴/۷",
  "طراحی قابل سفارشی‌سازی",
  "عملکرد مقیاس‌پذیر",
  "صدها بلوک آماده",
];

export const Cta4 = ({
  title = "همین حالا شروع کن!",
description = "به دنیایی از نوآوری، دقت و هوش مصنوعی خوش آمدی. پکسی نسل جدیدی از سامانه‌های تحلیلی است که با طراحی مدرن، سرعت بالا و الگوریتم‌های هوشمند، تجربه‌ای متفاوت از دنیای پزشکی دیجیتال را برایت رقم می‌زند!",
  buttonText = "شروع کنید",
  buttonUrl = "https://shadcnblocks.com",
  items = defaultItems,
}: Cta4Props) => {
  return (
    <section className="relative py-28 overflow-hidden rounded-b-[4rem]">
      {/* 🔹 Subtle fading grid */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="white" strokeWidth="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 🔹 Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2879fc] to-[#155cd5]  opacity-100"></div>

      <div className="relative container mx-auto px-6">
        <div className="flex justify-center">
          <div className="max-w-6xl w-full">
            <div className="relative flex flex-col md:flex-row items-start justify-between gap-10 rounded-3xl     p-10 md:p-16">
              
              {/* 🔹 Decorative overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 via-cyan-600/10 to-transparent opacity-60"></div>

              {/* 🔹 Left side: text & button */}
              <div className="relative z-10 md:w-1/2 text-right" dir="rtl">
                <h4 className="mb-3 text-3xl md:text-4xl font-extrabold text-white">
                  {title}
                </h4>
                <p className="text-justify text-white leading-relaxed text-base md:text-lg mb-6">
                  {description}
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-cyan-400 hover:to-blue-600 text-white px-6 py-5 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300"
                >
                  <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                                        <ArrowRight className="ml-2 w-5 h-5 inline-block" />

                    {buttonText}
                  </a>
                </Button>
              </div>

              {/* 🔹 Right side: feature list */}
              <div className="relative z-10 md:w-1/3 text-gray-800" dir="rtl">
                <ul className="flex flex-col text-right space-y-3 text-base font-medium">
                  {items.map((item, idx) => (
                    <li
                      className="flex items-start text-white text-right justify-start gap-3  bg-white/30 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/30 hover:bg-white/50 transition-all"
                      key={idx}
                    >
                                            <Check className="w-5 h-5 text-white flex-shrink-0" />

                      <span className="text-right">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

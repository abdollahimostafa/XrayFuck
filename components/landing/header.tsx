"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 right-0 left-0 z-50   mt-9  ">
      <div className="container mx-auto flex items-center justify-between py-3 px-6" dir="rtl">
        {/* Right: Logo */}
        <div className="flex items-center gap-2">
          {/* <Image src="/logo.png" alt="لوگو" width={40} height={40} /> */}
          <span className="font-bold text-white text-lg">ایـــکس ری Ai</span>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-6 text-white font-medium">
          <Link href="#features" className="hover:text-gray-200 transition">ویژگی‌ها</Link>
          
                    <Link href="#features" className="hover:text-gray-200 transition">مشتریان</Link>
                    <Link href="#features" className="hover:text-gray-200 transition">حامیان</Link>

          <Link href="http://yousefmohammadpour.ir/" className="hover:text-gray-200 transition">درباره ما</Link>
          <Link href="http://yousefmohammadpour.ir/" className="hover:text-gray-200 transition">تماس با ما</Link>
        </nav>

        {/* Left: Buttons */}
        <div className="flex gap-3">
          <a href="/signin"  className="text-black py-2 text-center align-middle justify-center content-center bg-white hover:bg-white/20 rounded-full px-3">ورود</a>
          <a href="/signup" className="bg-[#fbf352] text-black hover:bg-gray-100 rounded-full px-7 pt-2">ثبت‌نام</a>
        </div>
      </div>
    </header>
  );
}

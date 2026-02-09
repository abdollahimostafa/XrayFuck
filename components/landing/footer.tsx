"use client";

import { Footer } from "@/components/ui/modem-animated-footer";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  NotepadTextDashed,
} from "lucide-react";

export default function FooterDemo() {
  const socialLinks = [
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com",
      label: "تویتر",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com",
      label: "لینکدین",
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com",
      label: "گیتهاب",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:contact@resumegpt.com",
      label: "ایمیل",
    },
  ];

  const navLinks = [
    { label: "قیمت ها", href: "/" },
    { label: "پنل کاربران", href: "/" },
    { label: "درباره ما", href: "https://yousefmohammadpour.ir/" },
    { label: "تماس با ما", href: "https://yousefmohammadpour.ir/" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#f9fbff] via-white to-[#eef3ff] rounded-t-[3rem] overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(19,89,209,0.12)_0%,transparent_60%)] [mask-image:radial-gradient(white,transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]" />

      {/* Glow line on top */}

      {/* Main footer content */}
      <div className="relative z-10">
        
        <Footer
          brandName="XRAYAI"
          brandDescription="سامانه هوش مصنوعی تحلیل تصاویر پزشکی. طراحی‌شده برای نسل جدید  پزشکان و پژوهشگران."
          socialLinks={socialLinks}
          navLinks={navLinks}
          brandIcon={
            <NotepadTextDashed className="w-10 h-10 text-blue-600 drop-shadow-[0_0_10px_rgba(19,89,209,0.5)]" />
          }
        />
      </div>

      {/* Decorative blur bubbles */}
      <div className="absolute -bottom-20 right-20 w-64 h-64 bg-cyan-300/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-10 left-16 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full" />
    </footer>
  );
}

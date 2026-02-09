"use client";

import { motion } from "framer-motion";
import FeaturesSection from "@/components/landing/fetur";
import { LogoCarouselDemo } from "@/components/landing/logostuf";
import FAQWithSpiral from "@/components/ui/faq-section";
import { Cta4 } from "@/components/ui/cta-4";
import FooterDemo from "@/components/landing/footer";
import Mainmid from "@/components/landing/mainmid";

import type { Variants ,Easing} from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" satisfies Easing, // ✅ typed correctly
    },
  },
};



export default function HomePage() {
  return (
    <div className="m-0 md:m-7">

      {/* Main Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Mainmid />
      </motion.div>

      <div className="relative z-50">

        {/* Features Section */}
        <section
          className="relative min-h-[70vh] bg-white -mt-20 rounded-t-[3rem] z-10 rounded-b-[3rem] border-t-[6px] border-b-[6px] border-[#1359d1]/10 shadow-[0_-40px_150px_rgba(0,0,0,0.1)] overflow-hidden"
        >
          <FeaturesSection />
        </section>

        {/* Logo Carousel */}
        <motion.section
          className="bg-gradient-to-br from-blue-500 to-[#1359d1] z-9 -mt-12 pt-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <LogoCarouselDemo />
        </motion.section>

        {/* FAQ Section */}
        <section
          className="relative bg-white rounded-[4rem] z-50 -mt-12 pt-7"
        >
          <FAQWithSpiral />
        </section>

        {/* CTA Section */}
        <motion.section
          className="relative rounded-[4rem] z-10 -mt-22 pt-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Cta4 />
        </motion.section>

        {/* Footer Section */}
        <section
          className="relative rounded-[4rem] z-50 -mt-31 pt-7"
>          <FooterDemo />
        </section>

      </div>
    </div>
  );
}

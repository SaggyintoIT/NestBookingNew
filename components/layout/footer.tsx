"use client";

import { motion, useInView, easeInOut } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeInOut, // ✅ fixed
      },
    },
  };

  const slideInLeft = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeInOut, // ✅ fixed
      },
    },
  };

  const slideInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeInOut, // ✅ fixed
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-white border-t border-border"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-primary">Nestbooking</span>
            </div>
          </motion.div>

          {/* Sell a Home */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary text-sm mb-4">SELL A HOME</h4>
            <ul className="space-y-3 text-sm">
              {["Request an offer", "Pricing", "Reviews", "Stories"].map((item, index) => (
                <motion.li key={item} variants={slideInLeft} custom={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 block"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Buy a Home */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary text-sm mb-4">BUY A HOME</h4>
            <ul className="space-y-3 text-sm">
              {["Buy", "Finance"].map((item, index) => (
                <motion.li key={item} variants={slideInLeft} custom={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 block"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Buy, Rent and Sell */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary text-sm mb-4">BUY, RENT AND SELL</h4>
            <ul className="space-y-3 text-sm">
              {["Buy and sell properties", "Rent home", "Builder trade-up"].map((item, index) => (
                <motion.li key={item} variants={slideInLeft} custom={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 block"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary text-sm mb-4">ABOUT</h4>
            <ul className="space-y-3 text-sm">
              {["Company", "How it works", "Contact", "Investors"].map((item, index) => (
                <motion.li key={item} variants={slideInLeft} custom={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 block"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Terms & Privacy and Resources Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div></div>

          {/* Terms & Privacy */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary text-sm mb-4">TERMS & PRIVACY</h4>
            <ul className="space-y-3 text-sm">
              {["Trust & Safety", "Terms of Service", "Privacy Policy"].map((item, index) => (
                <motion.li key={item} variants={slideInLeft} custom={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 block"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div></div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-primary text-sm mb-4">RESOURCES</h4>
            <ul className="space-y-3 text-sm">
              {["Blog", "Guides", "FAQ", "Help Center"].map((item, index) => (
                <motion.li key={item} variants={slideInLeft} custom={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 block"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <motion.div variants={slideInUp} className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
              © 2021 Nestbooking. All rights reserved
            </motion.p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <motion.div key={index} variants={itemVariants} custom={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block"
                  >
                    <Icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}

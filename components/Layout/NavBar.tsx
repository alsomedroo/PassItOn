"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { User, Menu, X, House } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#FDF6FF] flex items-center justify-between px-6 py-5 relative">
      {/* Logo with startup name */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => router.push("/")}
      >
        <span className="inline-flex items-center justify-center p-1 rounded-full shadow-md">
          <Image
            src="/logo3.jpeg"
            alt="Brand Logo"
            width={42}
            height={42}
            className="rounded-full "
            priority
          />
        </span>

        <span
          className="text-[#5B3DF6] font-bold tracking-wider text-lg md:text-xl"
          style={{
            letterSpacing: "0.13em",
            fontFamily: "'Montserrat', 'Inter', Arial, sans-serif",
          }}
        >
          PASSITON
        </span>
        <span className="inline-flex items-center justify-center">
          <Image
            src="/startup_india.png"
            alt="Brand Logo"
            width={84}
            height={84}
            priority
          />
        </span>
      </div>
      {/* Desktop: Profile + Logout */}
      <div className="hidden md:flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2 bg-white hover:bg-[#E0D5FA] text-[#5B3DF6] rounded-full px-4 py-2 transition shadow"
          onClick={() => router.push("/dashboard")}
          aria-label="Dashboard"
          style={{ minWidth: 40 }}
        >
          <User size={22} />
          <span className="font-semibold text-base">Profile</span>
        </motion.button>
        <LogoutButton />
      </div>
      {/* Mobile: Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          className="p-2 rounded-full hover:bg-[#e0d5fa] transition"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} className="text-[#5B3DF6]" />
        </button>
      </div>
      {/* Mobile: Slide-out menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="bg-white w-64 h-full shadow-xl flex flex-col p-6 relative animate-slideInLeft">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#e0d5fa] transition"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-6 mt-10">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/");
                }}
                type="button"
                className="
        flex items-center gap-2
        px-5 py-2
        rounded-full
        bg-white
        text-[#5B3DF6]
        font-semibold
        shadow-md
        transition
        hover:bg-[#ffe158]
        hover:text-[#23185B]
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-[#5B3DF6]
        text-base
      "
                title="Home"
              >
                <House size={26} />
                Home
              </motion.button>
              <button
                className="flex items-center gap-2 bg-[#5B3DF6] hover:bg-[#755FF5] text-white rounded-full px-5 py-3 transition shadow"
                style={{ minWidth: 48 }}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/dashboard");
                }}
                aria-label="Dashboard"
              >
                <User size={26} />
                <span className="font-semibold text-base">Profile</span>
              </button>
              <LogoutButton />
              <button
                className="flex items-center gap-2 bg-[#5B3DF6] hover:bg-[#755FF5] text-white rounded-full px-5 py-3 transition shadow"
                style={{ minWidth: 48 }}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/about");
                }}
                aria-label="Team"
              >
                <span className="font-semibold text-base">About Us</span>
              </button>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}

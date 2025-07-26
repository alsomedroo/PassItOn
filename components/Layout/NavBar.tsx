"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { User, Menu, X, House, Info, Layers, List } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import SearchBox from "../SearchBar";

export function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: House, href: "/" },
    { name: "Profile", icon: User, href: "/dashboard" },
    { name: "Sell", icon: Layers, href: "/seller" },
    { name: "Categories", icon: List, href: "/buyer" },
    { name: "About Us", icon: Info, href: "/about" },
  ];

  return (
    <header className="w-full bg-[#FDF6FF] flex flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-6 relative shadow-sm">
      {/* Branding */}
      <div
        className="flex justify-between justify-center items-center gap-3 cursor-pointer select-none min-w-[150px]"
        onClick={() => router.push("/")}
      >
        <span className="inline-flex items-center justify-center p-1 rounded-full shadow-md">
          <Image
            src="/logo3.jpeg"
            alt="Brand Logo"
            width={42}
            height={42}
            className="rounded-full"
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
            alt="Startup India"
            width={84}
            height={84}
            priority
          />
        </span>
<button
  className="p-2 rounded-full hover:bg-[#e0d5fa] transition block md:hidden"
  onClick={() => setMenuOpen(true)}
  aria-label="Open menu"
>
  <Menu size={28} className="text-[#5B3DF6]" />
</button>

      </div>

      {/* SearchBox (Centered on mobile, aligned on tablet/laptop) */}
      <div className="hidden md:flex flex-1 w-full md:w-auto justify-center md:justify-start">
        <SearchBox />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map(({ name, icon: Icon, href }) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(href)}
            className="flex items-center gap-2 px-1 py-2 text-sm font-semibold text-[#5B3DF6] hover:bg-[#E0D5FA] transition rounded-full"
          >
            {name}
          </motion.button>
        ))}
        <LogoutButton />
        
      </nav>
      

      {/* Mobile Hamburger */}
      <div className="md:hidden w-full flex items-center">

        <div className=" md:flex flex-1 w-full md:w-auto justify-center md:justify-end">
          <SearchBox />
        </div>
        
      </div>

      {/* Mobile Slide-out Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="bg-white w-72 h-full shadow-xl flex flex-col p-6 relative animate-slideInLeft">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#e0d5fa] transition"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map(({ name, icon: Icon, href }) => (
                <motion.button
                  key={name}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    router.push(href);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full text-[#5B3DF6] font-medium bg-white hover:bg-[#ffe158] hover:text-[#23185B] shadow transition"
                >
                  <Icon size={22} />
                  {name}
                </motion.button>
              ))}
              <LogoutButton />
            </div>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}

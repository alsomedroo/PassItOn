"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="w-full bg-[#5B3DF6] flex items-center justify-between px-6 py-3 shadow-md z-50">
      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => router.push("/")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="inline-flex items-center justify-center p-1 rounded-full border-2 border-white shadow-md">
          <Image
            src="/logo2.jpeg"
            alt="Brand Logo"
            width={42}
            height={42}
            className="rounded-full"
            priority
          />
        </span>
        <span
          className="text-white font-bold text-lg md:text-xl tracking-wide"
          style={{
            fontFamily: "'Montserrat', 'Inter', Arial, sans-serif",
            letterSpacing: "0.13em",
          }}
        >
          PASS IT ON
        </span>
      </motion.div>

      {/* Right Icons */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#5B3DF6] hover:bg-[#e6e0fd] transition cursor-pointer shadow"
          onClick={() => router.push("/dashboard")}
          aria-label="Dashboard"
        >
          <User size={22} />
        </motion.button>

        <LogoutButton />
      </div>
    </header>
  );
}

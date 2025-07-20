"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        router.push("/auth/login");
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  };

  return (
    <motion.button
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.94 }}
    onClick={handleLogout}
    type="button"
    title="Logout"
    className="
    w-10 h-10
    flex items-center justify-center
    rounded-full
    bg-white text-[#5B3DF6]
    hover:bg-[#e6e0fd]
    transition
    cursor-pointer
    shadow
    "
    >
    <LogOut size={22} />
    </motion.button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center bg-[#faf7ed] shadow-sm">
      <h1
        className="text-2xl md:text-3xl font-extrabold text-[#23185B] cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="text-[#03B1AA]">PassItOn</span>
      </h1>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => router.push("/dashboard")}
          className="p-2 rounded-full text-[#5B3DF6] transition-colors hover:bg-[#eae6f6] cursor-pointer"
          title="Dashboard"
        >
          <User size={18} />
        </motion.button>

        <LogoutButton />
      </div>
    </div>
  );
}

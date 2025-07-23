"use client";

import { motion } from "framer-motion";
import { Mail, Users, Info, Linkedin, Twitter, Instagram, MessageCircle, MessageCircleDashedIcon } from "lucide-react";
import { Chathura } from "next/font/google";
import Image from "next/image";

const Footer = () => (
  <footer className="w-full px-3 sm:px-6 md:px-16 py-10 bg-gradient-to-br to-[#5B3DF6] via-[#755FF5] from-[#02afa5] shadow-inner border-t border-[#eee3c6] ">
    <div className=" mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-8">
      <div className="flex flex-row justify-center gap-4 w-full md:w-auto">
        <Image
          src="/startup_india.png"
          width={200}
          height={200}
          alt="Startup India 1"
          className="flex-shrink-0"
        />
        
      </div>

      {/* About */}
      <div className="flex flex-col gap-2 w-full md:w-1/5 items-center text-center">
        <span className="font-bold text-white flex items-center justify-center gap-2">
          <Info size={18} /> About
        </span>
        <span className="text-white/80 text-sm">
          Passion Writers is a team originated in college that aims to help
          students make their college life easier and more productive.
        </span>
      </div>

      {/* Team */}
      <div className="flex flex-col gap-2 w-full md:w-1/5 items-center text-center">
        <span className="font-bold text-white flex items-center justify-center gap-2">
          <Users size={18} /> <a href="/about" className="hover:text-[#03B1AA] transition">
            Team
          </a>
        </span>
        <span className="text-white/80 text-sm">
          Meet our team of enthusiastic innovators, mentors, and literary
          experts. <br />
          <a href="/about" className="underline hover:text-[#03B1AA] transition">
            Learn More
          </a>
        </span>
      </div>
      

      {/* Contact & Social */}
      <div className="flex flex-col gap-4 w-full md:w-1/4 items-center text-center">
        <motion.button
          whileHover={{
            scale: 1.07,
            color: "#03B1AA",
            backgroundColor: "#f5f3ea",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() =>
            (window.location.href = "mailto:freakyakkmu@gmail.com")
          }
          className="flex items-center gap-2 text-[#5B3DF6] font-semibold px-5 py-2 rounded-full bg-white/70 hover:bg-[#e6e6fc] border border-[#ded7ff] transition-all duration-200 shadow"
          type="button"
        >
          <Mail size={18} />
          Contact Us
        </motion.button>

          


        <div className="flex gap-3 mt-2 justify-center">
          <a
            href="https://www.linkedin.com/company/pass-it-on-%E2%80%93-pass-karo-earn-karo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#e5e5e5]"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="https://chat.whatsapp.com/L9kdlV8J0liJ2Ve04j69Mc?mode=ac_t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#e5e5e5]"
          >
            <MessageCircle size={22} />
          </a>
          <a
            href="https://www.instagram.com/passiton.cash?igsh=MTFqbTJsaWNlejMxcA=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#e5e5e5]"
          >
            <Instagram size={22} />
          </a>
        </div>
     

      </div>
      

    </div>
    
    <div className="border-t border-[#ded7ff]/30 mt-10 pt-4 text-center">
      <span className="text-xs text-white/80">
        © 2025 <b>Passion Writers</b>. All rights reserved <br></br> Powered By Quantum Leap Systems LLP

      </span>
    </div>
  </footer>
);

export default Footer;

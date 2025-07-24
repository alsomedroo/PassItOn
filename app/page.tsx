"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, PlusCircle, Compass, Heart } from "lucide-react";
import Feedback from "../components/FeedbackForm";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#faf7ed] flex flex-col items-center w-full">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 pt-10 pb-14 bg-gradient-to-br from-[#5B3DF6] via-[#755FF5] to-[#02afa5]">
        {/* Text Block */}
        <div className="flex-1 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <h1
            className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-md"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="text-[#FFE158] animate-pulse">PASS</span> Karo,{" "}
            <span className="text-[#FFE158] animate-bounce">EARN</span> Karo
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight italic"
            style={{
              fontFamily: "'Satisfy', cursive",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            College life gets better with{" "}
            <span className="relative font-extrabold text-[#FFE158] px-2 py-1 rounded-md bg-white/10 shimmer not-button">
              PassItOn
              <span className="absolute inset-0 shimmer-effect rounded-md pointer-events-none"></span>
            </span>{" "}
            🎒📚
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-sm">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 bg-[#FFE158] hover:bg-[#ffd900] text-[#23185B] font-bold flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg transition-all text-sm sm:text-base"
              onClick={() => router.push("/seller")}
            >
              <PlusCircle size={18} />
              List an item
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 bg-white hover:bg-[#e0d5fa] text-[#5B3DF6] font-bold flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg transition-all text-sm sm:text-base"
              onClick={() => router.push("/buyer")}
            >
              <Compass size={18} />
              Browse
            </motion.button>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 w-full flex justify-center items-center mt-8 md:mt-0">
          <Image
            src="/student-illustration.svg"
            alt="Student illustration"
            width={280}
            height={280}
            className="object-contain max-w-full"
            priority
          />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="w-full max-w-5xl px-4 sm:px-6 pt-12 pb-10">
        <div className="bg-[#fff9e8] w-full rounded-2xl shadow-md py-8 px-6 flex flex-col">
          <h2 className="text-xl sm:text-2xl font-bold text-[#23185B] mb-7">
            Featured Listings
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { img: "/icons/book.png", label: "Textbooks", price: "₹200" },
              { img: "/coset.jpg", label: "Co-Set", price: "₹700" },
              { img: "/laptop.jpg", label: "Laptop", price: "₹10000" },
              {
                img: "/icons/headphones.png",
                label: "Headphones",
                price: "₹1000",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-[#f7f4e8] shadow-sm rounded-xl p-5 transition-transform hover:scale-105"
              >
                <Image src={item.img} alt={item.label} width={54} height={54} />
                <span className="mt-2 font-semibold text-sm sm:text-base text-[#23185B]">
                  {item.label}
                </span>
                <span className="text-[#23185B] text-sm">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#ffedc2] text-center rounded-xl p-4 border border-[#ffd46b] shadow-md animate-pulse">
            <p className="text-sm sm:text-base font-semibold text-[#23185B]">
              📞 For more information, contact us at{" "}
              <span className="text-[#D93D04]">8273145433</span>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-5xl px-4 sm:px-6 pt-4 pb-10">
        <div className="bg-[#ffefa9] w-full rounded-2xl shadow-md py-8 px-6 flex flex-col">
          <h2 className="text-xl sm:text-2xl font-bold text-[#23185B] mb-7 px-2">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {[
              {
                title: "Sign Up",
                icon: "/icons/signup.png",
                color: "bg-[#5B3DF6]",
                desc: "Create an account with your student email",
              },
              {
                title: "List Items",
                icon: "/icons/list.png",
                color: "bg-[#03B1AA]",
                desc: "Upload your items for sale in just minutes",
              },
              {
                title: "Connect",
                icon: "/icons/connect.png",
                color: "bg-[#FFE158]",
                desc: "Chat with other students and arrange",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center flex-1"
              >
                <div className={`${step.color} p-3 rounded-full mb-2`}>
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={38}
                    height={38}
                  />
                </div>
                <div className="font-bold text-[#23185B] mb-1 text-base sm:text-lg">
                  {step.title}
                </div>
                <div className="text-[#23185B] text-sm font-medium">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-5xl px-4 sm:px-6 pt-2 pb-10">
        <div className="bg-white shadow px-6 py-5 flex flex-col sm:flex-row items-center gap-4 rounded-2xl">
          <Image
            src="/icons/student1.svg"
            alt="Testimonial user"
            width={48}
            height={48}
          />
          <span className="text-base text-[#23185B] font-medium text-center sm:text-left">
            I found a great deal on a used textbook! The process was super easy
          </span>
          <button
            className="mt-3 sm:mt-0 sm:ml-auto bg-[#5B3DF6] hover:bg-[#3b278e] transition text-white font-bold px-6 py-2 rounded-full text-sm shadow"
            onClick={() => router.push("/seller")}
          >
            List an item
          </button>
        </div>
      </section>

      {/* Wishlist */}
      <motion.section
        className="w-full flex justify-center mt-10 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="w-full max-w-2xl bg-[#fff9e8] border-2 rounded-3xl shadow-lg p-7 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={28} className="text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#5B3DF6]">
              Wish for Something?
            </h2>
          </div>
          <p className="text-[#7c689c] text-sm sm:text-base mb-6 text-center">
            <span className="text-[#e11d48] font-semibold">
              Submit your wish
            </span>{" "}
            &amp; we’ll let sellers know!
          </p>
          <form
            className="w-full flex flex-col gap-4 items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const item = formData.get("item")?.toString().trim() || "";
              const details = formData.get("details")?.toString().trim() || "";

              if (!item) {
                alert("Please enter what you're looking for");
                return;
              }

              const res = await fetch("/api/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item, details }),
              });

              if (res.ok) {
                alert("✅ Your wish has been submitted!");
                form.reset();
              } else {
                alert("❌ Something went wrong.");
              }
            }}
          >
            <input
              name="item"
              type="text"
              placeholder="What do you need? (e.g., Table, Calculator)"
              className="w-full px-5 py-3 rounded-full bg-white border-2 border-pink-100 focus:border-pink-400 text-[#402973] placeholder-[#a78bfa] shadow-sm focus:outline-none text-sm sm:text-base"
              required
            />
            <textarea
              name="details"
              rows={2}
              placeholder="Any details? Color, brand, etc. (optional)"
              className="w-full px-5 py-3 rounded-2xl bg-white border-2 border-pink-100 focus:border-pink-400 text-[#402973] placeholder-[#a78bfa] shadow-sm focus:outline-none text-sm sm:text-base"
            />
            <button
              type="submit"
              className="mt-1 px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition shadow font-bold text-white text-sm sm:text-base flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Heart size={18} className="inline-block" />
              Submit Wish
            </button>
          </form>
        </div>
      </motion.section>

      <div className="h-10"></div>

      <a
  href="/feedback"
  className="text-sm font-semibold tracking-wide underline underline-offset-4 text-transparent bg-clip-text bg-gradient-to-r from-[#02afa5] via-[#5B3DF6] to-[#755FF5] hover:brightness-125 hover:scale-105 transition-all duration-200 ease-in-out"
>
  Feedback?
</a>


      {/* Footer */}

      {/* <div className="h-10"></div>
      <Feedback/>
      <div className="h-10"></div> */}

      <div className="h-10"></div>
    </div>
  );
}

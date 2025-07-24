"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Testimonials() {
  const router = useRouter();

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 pt-2 pb-10">
      <div className="bg-white shadow px-6 py-5 flex flex-col sm:flex-row items-center gap-4 rounded-2xl">
        <Image src="/icons/student1.svg" alt="Testimonial user" width={48} height={48} />
        <span className="text-base text-[#23185B] font-medium text-center sm:text-left">
          I found a great deal on a used textbook! The process was super easy
        </span>
        <button className="mt-3 sm:mt-0 sm:ml-auto bg-[#5B3DF6] hover:bg-[#3b278e] transition text-white font-bold px-6 py-2 rounded-full text-sm shadow" onClick={() => router.push("/seller")}>
          List an item
        </button>
      </div>
    </section>
  );
}

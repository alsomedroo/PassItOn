import Image from "next/image";

export default function FeaturedListings() {
  const items = [
    { img: "/icons/book.png", label: "Textbooks", price: "₹199" },
    { img: "/coset.jpg", label: "Co-Set", price: "₹599" },
    { img: "/laptop.jpg", label: "Laptop", price: "₹7999" },
    { img: "/icons/headphones.png", label: "Headphones", price: "₹399" },
  ];

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 pt-12 pb-10">
      <div className="bg-[#fff9e8] w-full rounded-2xl shadow-md py-8 px-6 flex flex-col">
        <h2 className="text-xl sm:text-2xl font-bold text-[#23185B] mb-7">Featured Listings</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-[#f7f4e8] shadow-sm rounded-xl p-5 transition-transform hover:scale-105">
              <Image src={item.img} alt={item.label} width={54} height={54} />
              <span className="mt-2 font-semibold text-sm sm:text-base text-[#23185B]">{item.label}</span>
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
  );
}

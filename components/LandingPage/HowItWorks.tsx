import Image from "next/image";

export default function HowItWorks() {
  const steps = [
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
  ];

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 pt-4 pb-10">
      <div className="bg-[#ffefa9] w-full rounded-2xl shadow-md py-8 px-6 flex flex-col">
        <h2 className="text-xl sm:text-2xl font-bold text-[#23185B] mb-7 px-2">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center flex-1">
              <div className={`${step.color} p-3 rounded-full mb-2`}>
                <Image src={step.icon} alt={step.title} width={38} height={38} />
              </div>
              <div className="font-bold text-[#23185B] mb-1 text-base sm:text-lg">{step.title}</div>
              <div className="text-[#23185B] text-sm font-medium">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

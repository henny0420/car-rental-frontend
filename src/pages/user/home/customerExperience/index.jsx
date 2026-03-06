import React from 'react';
import {
  Tags,
  CircleDollarSign,
  CreditCard,
  ShieldCheck,
  Headset,
  Wrench,
  Settings,
  Car,
  Zap,
  ThermometerSnowflake,
  MoreHorizontal,
  Check,
  BadgeCent
} from 'lucide-react';

export default function CustomerExperience() {
  const leftFeatures = [
    {
      id: 'top-left',
      icon: Tags,
      title: "Competitive Pricing",
      connectorClass: "absolute top-1/2 left-full w-12 xl:w-24 h-20 border-t border-r border-red-400 rounded-tr-xl",
      dotClass: "absolute bottom-0 right-[-5px] w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white"
    },
    {
      id: 'mid-left',
      icon: CircleDollarSign,
      title: "Easier Rent On Your Budget",
      connectorClass: "absolute top-1/2 left-full w-12 xl:w-24 border-t border-red-400",
      dotClass: "absolute top-[-5px] right-[-5px] w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white"
    },
    {
      id: 'bot-left',
      icon: CreditCard,
      title: "Most Flexible Payment Plans",
      connectorClass: "absolute bottom-1/2 left-full w-12 xl:w-24 h-20 border-b border-r border-red-400 rounded-br-xl",
      dotClass: "absolute top-0 right-[-5px] w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white"
    },
  ];

  const rightFeatures = [
    {
      id: 'top-right',
      icon: ShieldCheck,
      title: "The Best Extended Auto Warranties",
      connectorClass: "absolute top-1/2 right-full w-12 xl:w-24 h-20 border-t border-l border-red-400 rounded-tl-xl",
      dotClass: "absolute bottom-0 left-[-5px] w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white"
    },
    {
      id: 'mid-right',
      icon: Headset,
      title: "Roadside Assistance 24/7",
      connectorClass: "absolute top-1/2 right-full w-12 xl:w-24 border-t border-red-400",
      dotClass: "absolute top-[-5px] left-[-5px] w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white"
    },
    {
      id: 'bot-right',
      icon: Wrench,
      title: "Your Choice Of Mechanic",
      connectorClass: "absolute bottom-1/2 right-full w-12 xl:w-24 h-20 border-b border-l border-red-400 rounded-bl-xl",
      dotClass: "absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white"
    },
  ];

  const bottomTags = [
    { icon: Settings, label: "Engine" },
    { icon: Car, label: "Auto" },
    { icon: Zap, label: "Electric" },
    { icon: ThermometerSnowflake, label: "Cooling" },
    { icon: MoreHorizontal, label: "8+ More" },
  ];

  return (
    <section className="py-24 bg-slate-50 font-sans overflow-hidden">
      <div className="container relative z-10 max-w-7xl mx-auto px-4">

        {/* --- Section Header --- */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-3">
            Top Rated Dealer
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Best Customer Experience
          </h2>

          {/* Custom Decorative Separator matching the image */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-[2px] bg-red-300"></div>
            <div className="text-red-500 flex items-center justify-center">
              <BadgeCent size={20} strokeWidth={2} />
            </div>
            <div className="w-12 h-[2px] bg-red-300"></div>
          </div>
        </div>

        {/* --- Main Interactive Layout --- */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-4 xl:gap-8">

          {/* LEFT FEATURES */}
          <div className="flex flex-col gap-10 lg:gap-24 w-full lg:w-1/3 items-center lg:items-end order-2 lg:order-1 z-10">
            {leftFeatures.map((feature) => (
              <div key={feature.id} className="relative flex flex-col items-center group w-48">

                {/* Connecting Line (Desktop Only) */}
                <div className={`hidden lg:block ${feature.connectorClass} -z-10 transition-colors duration-300 group-hover:border-red-500`}>
                  <div className={`${feature.dotClass} group-hover:bg-red-500 transition-colors duration-300`}></div>
                </div>

                {/* White Square Icon Box */}
                <div className="w-[72px] h-[72px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center text-red-500 mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-red-500/20 relative z-10 border border-slate-50">
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>

                {/* Text Label Below */}
                <h4 className="text-[13px] font-extrabold text-slate-800 text-center leading-snug px-2">
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>

          {/* CENTER CAR IMAGE */}
          <div className="w-full lg:w-1/3 flex justify-center relative order-1 lg:order-2 py-10 lg:py-0 z-0">

            {/* Red Tire Tracks behind the car */}
            <div
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-32 h-40 flex justify-between px-2 opacity-50 -z-10"
              style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }}
            >
              <div className="w-6 h-full" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #ef4444, #ef4444 4px, transparent 4px, transparent 8px)' }}></div>
              <div className="w-6 h-full" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #ef4444, #ef4444 4px, transparent 4px, transparent 8px)' }}></div>
            </div>

            <img
              src="/orange-car-top.png"
              alt="Top view of orange car"
              className="w-64 md:w-80 lg:w-[340px] relative z-20 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* RIGHT FEATURES */}
          <div className="flex flex-col gap-10 lg:gap-24 w-full lg:w-1/3 items-center lg:items-start order-3 lg:order-3 z-10">
            {rightFeatures.map((feature) => (
              <div key={feature.id} className="relative flex flex-col items-center group w-48">

                {/* Connecting Line (Desktop Only) */}
                <div className={`hidden lg:block ${feature.connectorClass} -z-10 transition-colors duration-300 group-hover:border-red-500`}>
                  <div className={`${feature.dotClass} group-hover:bg-red-500 transition-colors duration-300`}></div>
                </div>

                {/* White Square Icon Box */}
                <div className="w-[72px] h-[72px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center text-red-500 mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-red-500/20 relative z-10 border border-slate-50">
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>

                {/* Text Label Below */}
                <h4 className="text-[13px] font-extrabold text-slate-800 text-center leading-snug px-2">
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>

        </div>

        {/* --- Bottom Tags Row --- */}
        <div className="flex flex-wrap justify-center gap-3 mt-24 relative z-20">
          {bottomTags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-100 text-slate-600 font-bold text-sm hover:border-red-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <tag.icon size={16} className="text-red-400 group-hover:text-red-500 transition-colors" strokeWidth={2} />
              <span>{tag.label}</span>
              <Check size={16} className="text-red-500 ml-1" strokeWidth={2.5} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
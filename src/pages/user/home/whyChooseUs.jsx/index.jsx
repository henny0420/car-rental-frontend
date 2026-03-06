import React from 'react';
import { ShieldCheck, Headset, Tags, CarFront } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Tags,
      title: "Best Price Guarantee",
      description: "We offer the most competitive rates in the market. Find a lower price, and we'll match it."
    },
    {
      icon: ShieldCheck,
      title: "100% Fully Insured",
      description: "Drive with peace of mind knowing all our vehicles come with comprehensive insurance coverage."
    },
    {
      icon: CarFront,
      title: "Premium Fleet",
      description: "Choose from a meticulously maintained collection of top-tier luxury and sports cars."
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "Our dedicated support team and roadside assistance are available around the clock."
    }
  ];

  return (
    <section className="py-24 bg-tarmac-900 text-white font-sans relative overflow-hidden">
      
      {/* --- CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes border-spin {
          100% { transform: rotate(360deg); }
        }
        .animate-border-spin {
          animation: border-spin 4s linear infinite;
        }
        
        @keyframes shooting-line {
          0% { transform: translateX(-100vw); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        .animate-shooting-line-1 {
          animation: shooting-line 8s linear infinite;
        }
        .animate-shooting-line-2 {
          animation: shooting-line 12s linear infinite 4s; /* Delayed start */
        }
      `}</style>

      {/* --- BACKGROUND ANIMATIONS --- */}
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Glowing Moving Lines (Shooting across the screen) */}
      <div className="absolute top-[20%] left-0 w-64 h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-shooting-line-1 opacity-0 z-0"></div>
      <div className="absolute top-[70%] left-0 w-96 h-[1px] bg-gradient-to-r from-transparent via-secondary-500 to-transparent animate-shooting-line-2 opacity-0 z-0"></div>

      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tarmac-800 text-primary-500 text-xs font-bold uppercase tracking-wider mb-4 border border-tarmac-700">
            Our Advantage
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tight mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">GoDrive</span>
          </h2>
          <p className="text-tarmac-400 font-medium text-lg">
            We don't just provide cars; we deliver unforgettable driving experiences with unmatched service and reliability.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            /* Animated Border Wrapper */
            <div 
              key={index} 
              className="relative rounded-3xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-black/20"
            >
              {/* Spinning Gradient Line (Hidden by default, shows on hover) */}
              <div className="absolute -inset-[150%] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#ef4444_50%,#0f172a_100%)] animate-border-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Inner Card Content (Leaves 1px space for the border to shine through) */}
              <div className="relative m-[1px] h-[calc(100%-2px)] bg-tarmac-800/95 backdrop-blur-xl p-8 rounded-[23px] flex flex-col items-start border border-tarmac-700 group-hover:border-transparent transition-colors duration-300">
                
                {/* Icon Container */}
                <div className="w-14 h-14 bg-tarmac-900 rounded-2xl flex items-center justify-center mb-6 text-primary-500 group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-secondary-500 group-hover:text-white transition-all duration-300 border border-tarmac-700 group-hover:border-transparent shadow-inner relative z-10">
                  <feature.icon size={26} strokeWidth={2} />
                </div>
                
                {/* Text Content */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors relative z-10">
                  {feature.title}
                </h3>
                <p className="text-tarmac-400 leading-relaxed text-sm font-medium relative z-10">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
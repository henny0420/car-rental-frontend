import React from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className=" bg-slate-50 font-sans relative overflow-x-hidden">
      
      {/* --- Full Width Red Banner Background --- */}
      {/* This creates the band that spans across the screen behind the content */}
      <div className="absolute top-1/2 left-0 w-full h-[65%] md:h-[70%] bg-secondary-500 -translate-y-1/2 z-0"></div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          
          {/* --- Left Content (Text & Form) --- */}
          <div className="w-full lg:w-5/12 text-white z-20">
            <p className="font-bold text-xs uppercase tracking-widest mb-3 opacity-90">
              Newsletter
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight tracking-tight">
              Subscribe To Our Newsletter <br className="hidden md:block" /> For New Updates
            </h2>
            
            {/* Small decorative dots matching the reference */}
            <div className="flex items-center gap-2 mb-10 opacity-80">
               <div className="w-4 h-4 rounded-full border-2 border-white/40 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
               </div>
               <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            </div>

            {/* --- Input Form --- */}
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="bg-white p-2 rounded-2xl flex items-center w-full max-w-md shadow-2xl shadow-black/20"
            >
              <div className="pl-4 text-slate-400">
                 <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Your Email Address..." 
                className="flex-grow bg-transparent text-slate-900 px-3 py-3 outline-none font-medium placeholder-slate-400 w-full"
                required
              />
              <button 
                type="submit" 
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors duration-300 shadow-md whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          </div>

          {/* --- Right Content (Car Image) --- */}
          <div className="w-full lg:w-7/12 flex justify-center lg:justify-end z-20">
            {/* The car image is scaled up and positioned to break out of the red banner.
              Hover effect adds a slight scale to make it interactive. 
            */}
            <img 
              src="https://freepngimg.com/thumb/land_rover/83648-rover-car-land-evoque-range-hq-image-free.png" 
              alt="Orange Luxury SUV" 
              className=" absolute -top-20 w-64 md:w-80 lg:w-[740px] relative z-20 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              // Fallback image in case the primary transparent PNG fails to load
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://pngimg.com/uploads/land_rover/land_rover_PNG82.png";
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
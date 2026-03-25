import React from 'react';
import { 
  Target, 
  Eye, 
  CarFront, 
  ShieldCheck, 
  Smartphone, 
  Banknote,
  Users,
  MapPin,
  Car
} from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { icon: Car, value: "5,000+", label: "Vehicles Available" },
    { icon: Users, value: "100k+", label: "Happy Customers" },
    { icon: MapPin, value: "50+", label: "Cities Covered" },
  ];

  const benefits = [
    {
      icon: CarFront,
      title: "Endless Variety",
      description: "From practical daily drivers to exotic sports cars, find the exact vehicle that fits your mood and budget."
    },
    {
      icon: Smartphone,
      title: "Seamless Booking",
      description: "Our user-friendly platform lets you browse, apply discount coupons, and book your car in just a few clicks."
    },
    {
      icon: Banknote,
      title: "Host Your Vehicle",
      description: "Car owners can easily list their vehicles on our platform, manage bookings, and earn extra income securely."
    },
    {
      icon: ShieldCheck,
      title: "Safe & Trustworthy",
      description: "With verified users, secure payments, and comprehensive insurance coverage, your peace of mind is guaranteed."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Find Your Car",
      description: "Enter your location and dates to browse our wide selection of available vehicles."
    },
    {
      number: "02",
      title: "Book & Save",
      description: "Choose your car, apply any available coupons, and confirm your booking instantly."
    },
    {
      number: "03",
      title: "Hit the Road",
      description: "Pick up the keys from the owner or our hub, and enjoy your journey!"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* --- HERO / INTRO SECTION --- */}
      <section className="bg-slate-900 pt-24 pb-32 relative overflow-hidden text-center px-4">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container relative z-10 max-w-4xl mx-auto">
          <p className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-4">
            Discover Our Story
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tight mb-6">
            Redefining How The World <span className="text-primary-500">Rents Cars</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
            At GoDrive, we believe that the journey is just as important as the destination. We are a modern, community-driven car rental platform designed to make finding, booking, and driving your perfect vehicle easier, faster, and more rewarding than ever before.
          </p>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative z-20 -mt-16 container max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-8 md:p-10 flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-4">
                <stat.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-24 container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 group">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              To provide a seamless, transparent, and flexible mobility solution that empowers people to travel freely. We aim to break down the traditional barriers of car rentals, offering fair prices for renters and a reliable income stream for car owners.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 group">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              To become the world's most trusted and community-driven car sharing platform. We envision a future where accessing a premium vehicle is as easy as tapping a screen, bringing drivers and dream cars together everywhere.
            </p>
          </div>

        </div>
      </section>

      {/* --- WHY CHOOSE US (BENEFITS) --- */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black italic tracking-tight mb-4">
              Why Choose <span className="text-primary-500">Our Platform?</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg">
              Built for renters, owners, and administrators alike. We provide a complete ecosystem for a flawless car rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-primary-500 hover:-translate-y-2 transition-all duration-300 group">
                <div className="text-primary-500 mb-6 group-hover:text-white transition-colors">
                  <benefit.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 italic tracking-tight mb-4">
              How It <span className="text-primary-600">Works</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Getting behind the wheel has never been this simple. Follow these easy steps to start your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Dashed Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-slate-200"></div>

            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                {/* Number Badge */}
                <div className="w-24 h-24 bg-slate-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center mb-8 relative z-10 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  <span className="text-3xl font-black text-slate-900 group-hover:text-white transition-colors">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
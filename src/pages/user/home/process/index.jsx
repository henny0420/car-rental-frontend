import React from 'react';
import { MapPin, CalendarCheck, Car, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Choose Location",
      description: "Select a pickup point near you or choose our premium doorstep delivery service.",
      icon: MapPin,
      color: "primary", 
    },
    {
      id: 2,
      title: "Rent a Car",
      description: "Browse our exclusive fleet, select your dates, and book instantly with zero paperwork.",
      icon: CalendarCheck,
      color: "secondary", 
    },
    {
      id: 3,
      title: "Pick up the Car",
      description: "Grab the keys at your selected spot and start your adrenaline-filled journey.",
      icon: Car,
      color: "tarmac", 
    },
  ];

  return (
    <section className="py-24 bg-white font-sans relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-tarmac-50 -skew-x-12 opacity-50 pointer-events-none" />

      <div className="container relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-tarmac-900 italic tracking-tight mb-4">
            How it <span className="text-primary-600">Works</span>
          </h2>
          <p className="text-tarmac-500 font-medium text-lg">
            Get behind the wheel of your dream car in three simple steps. No hassle, just drive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-tarmac-200 -z-10 dashed-line"></div>

          {steps.map((step, index) => (
            <div key={step.id} className="group relative bg-white p-8 rounded-3xl border border-tarmac-100 shadow-xl shadow-tarmac-900/5 hover:shadow-2xl hover:shadow-primary-900/10 hover:-translate-y-2 transition-all duration-300">
              
              <div className="absolute top-6 right-6 text-6xl font-black  group-hover:text-tarmac-100 transition-colors select-none">
                0{step.id}
              </div>

              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10
                ${step.color === 'primary' ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white' : ''}
                ${step.color === 'secondary' ? 'bg-secondary-100 text-secondary-600 group-hover:bg-secondary-600 group-hover:text-white' : ''}
                ${step.color === 'tarmac' ? 'bg-tarmac-100 text-tarmac-600 group-hover:bg-tarmac-900 group-hover:text-white' : ''}
                transition-all duration-300 shadow-lg
              `}>
                <step.icon size={32} strokeWidth={2} />
              </div>

              <h3 className="text-2xl font-black text-tarmac-900 mb-3 group-hover:text-primary-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-tarmac-500 font-medium leading-relaxed">
                {step.description}
              </p>

              <div className="mt-6 flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className={`${
                    step.color === 'primary' ? 'text-primary-600' : 
                    step.color === 'secondary' ? 'text-secondary-600' : 'text-tarmac-900'
                }`}>
                    Get Started
                </span>
                <ChevronRight size={16} className={`ml-1 ${
                    step.color === 'primary' ? 'text-primary-600' : 
                    step.color === 'secondary' ? 'text-secondary-600' : 'text-tarmac-900'
                }`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
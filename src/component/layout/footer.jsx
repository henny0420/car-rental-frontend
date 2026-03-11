import React from 'react';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Our Fleet", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "Booking Terms", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  const services = [
    { name: "Luxury Car Rental", href: "#" },
    { name: "Sports Cars", href: "#" },
    { name: "Chauffeur Service", href: "#" },
    { name: "Airport Transfer", href: "#" },
    { name: "Corporate Events", href: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans pt-20 pb-8 border-t border-slate-900 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand & About */}
          <div className="flex flex-col gap-6">
            <a href="/" className="flex items-center gap-2 group inline-block">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-2.5 rounded-xl shadow-lg shadow-primary-600/20 group-hover:scale-105 transition-transform duration-300">
                <Car size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white">
                GO<span className="text-primary-500">DRIVE</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Unlock the world's most exclusive supercars. Instant booking, zero paperwork, pure adrenaline. Experience the thrill of driving your dream car today.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-black text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-400 hover:text-primary-500 text-sm font-medium flex items-center group transition-colors duration-300">
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1 text-primary-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Our Services */}
          <div>
            <h4 className="text-white font-black text-lg mb-6 tracking-wide">Our Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-400 hover:text-primary-500 text-sm font-medium flex items-center group transition-colors duration-300">
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1 text-primary-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-white font-black text-lg mb-6 tracking-wide">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  125 5th Ave, New York,<br /> NY 10003, USA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <span className="text-sm text-slate-400">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <span className="text-sm text-slate-400">support@godrive.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- Bottom Bar (Copyright & Socials) --- */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-xs text-slate-500 font-medium">
            &copy; {currentYear} GoDrive Luxury Rentals. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 shadow-sm">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 shadow-sm">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 shadow-sm">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 shadow-sm">
              <Linkedin size={16} />
            </a>
          </div>

        </div>
        
      </div>
    </footer>
  );
}
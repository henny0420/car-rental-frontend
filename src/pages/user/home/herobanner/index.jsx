import React, { useState } from "react";
import { Calendar, MapPin, ChevronRight, Search, Star, Shield, Zap } from "lucide-react";
import { Link } from 'react-router-dom';

export default function Herobanner() {
    return (
        <div className="relative bg-tarmac-50 h-[] flex flex-col justify-center overflow-hidden">

            {/* 🏎️ DYNAMIC BACKGROUND */}
            <div className="absolute inset-0 z-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                {/* Radial Gradient Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-tarmac-50 via-transparent to-transparent"></div>

                {/* Animated Blobs */}
                <div className="absolute top-[-10%] right-[-5%] w-150 h-150 bg-primary-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-125 h-125 bg-secondary-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse delay-1000"></div>
            </div>

            {/* ✅ UPDATED: Now using the global 'container' class.
          This handles max-width (80rem), centering, and padding automatically 
          based on your Global Styles definition.
      */}
            <div className="container relative z-10 w-full pt-20 lg:pt-10 pb-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* 👈 LEFT: CONTENT */}
                    <div className="text-tarmac-900 space-y-8 relative">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-tarmac-200 shadow-sm transition-transform hover:scale-105 cursor-default">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-600"></span>
                            </span>
                            <span className="text-sm font-bold text-tarmac-700 tracking-wide uppercase text-[11px]">Premium Fleet Ready</span>
                        </div>

                        {/* Heading */}
                        <div className="relative">
                            <h1 className="text-6xl sm:text-7xl lg:text-6xl font-black leading-20 tracking-tighter text-tarmac-900 uppercase italic">
                                Drive The Experience <br />
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500">
                                    You Deserve
                                </span>
                            </h1>
                            {/* Text Decoration Line */}
                            <div className="w-24 h-2 bg-tarmac-900 mt-6 mb-2"></div>
                        </div>

                        <p className="text-tarmac-600 text-lg sm:text-xl max-w-lg leading-relaxed font-medium">
                            Unlock the world's most exclusive cars.
                            <span className="text-tarmac-900 font-bold"> Instant booking. Zero paperwork. Pure adrenaline.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link to="/cars" className="group bg-tarmac-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-tarmac-900/20 hover:shadow-primary-600/30 transform hover:-translate-y-1">
                                Browse Fleet
                                <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </Link>
                            <Link to="/how-it-works" className="px-8 py-4 rounded-full font-bold text-lg text-tarmac-800 border-2 border-tarmac-200 hover:border-tarmac-900 hover:bg-tarmac-50 transition-all duration-300 flex items-center justify-center">
                                How it works
                            </Link>
                        </div>

                        {/* 🏆 Stats Chips */}
                        <div className="flex items-center gap-6 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary-100 rounded-lg text-primary-600"><Zap className="w-5 h-5" fill="currentColor" /></div>
                                <div>
                                    <p className="font-black text-lg leading-none">50+</p>
                                    <p className="text-xs font-bold text-tarmac-400 uppercase">Supercars</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-tarmac-200"></div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-secondary-100 rounded-lg text-secondary-600"><Shield className="w-5 h-5" fill="currentColor" /></div>
                                <div>
                                    <p className="font-black text-lg leading-none">100%</p>
                                    <p className="text-xs font-bold text-tarmac-400 uppercase">Insured</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 👉 RIGHT: VISUAL */}
                    <div className="relative h-full flex items-center justify-center lg:justify-end ">
                        {/* Stylized Backdrops */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-tarmac-200 rounded-full opacity-30 animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-tarmac-300 rounded-full opacity-30 animate-[spin_40s_linear_infinite_reverse]"></div>
                        <div className="absolute -top-24 -right-24 bg-secondary-500 h-150 lg:w-150 rounded-l-full" ></div>
                        {/* Gradient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-primary-200/50 to-secondary-200/50 rounded-full blur-3xl opacity-60 "></div>

                        {/* 🚗 CAR IMAGE */}
                        <div className="relative z-10 w-80 md:w-200 lg:w-200 h-auto transform transition-transform duration-700 hover:scale-105 hover:-rotate-1 ">
                            <img
                                src="https://res.cloudinary.com/dpqnyjcgw/image/upload/v1768301892/Adobe_Express_-_file_94_cvr6fe.png"
                                alt="Luxury Sports Car"
                                width={900}
                                height={600}
                                className="w-full h-auto drop-shadow-2xl object-contain "
                            />
                            {/* Floating Review Card */}
                            <div className="absolute -bottom-20 -left-10 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white hidden md:block animate-bounce delay-1000 duration-3000">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="flex text-orange-400">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <span className="text-xs font-bold text-tarmac-500">4.9/5</span>
                                </div>
                                <p className="text-sm font-bold text-tarmac-900">"Best driving experience ever!"</p>
                                <p className="text-xs text-tarmac-400 mt-1">- Alex M.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 👇 BOTTOM: SEARCH BAR (Floating) */}
                <div className=" mt-5 relative z-20">
                    <div className="bg-white shadow-2xl shadow-tarmac-900/10 rounded-3xl p-3 max-w-800 mx-auto border border-tarmac-100 transform hover:-translate-y-1 transition-all duration-300">
                        <form className="grid grid-cols-1 md:grid-cols-12 gap-2" onSubmit={(e) => e.preventDefault()}>

                            {/* Location */}
                            <div className="md:col-span-2 bg-tarmac-50/50 rounded-2xl px-6 py-4 flex flex-col justify-center transition-colors hover:bg-tarmac-100/50 group cursor-pointer border border-transparent hover:border-tarmac-200">
                                <label className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest mb-1 group-hover:text-primary-600 transition-colors">Where</label>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-tarmac-400 w-5 h-5 group-hover:text-primary-600 transition-colors" />
                                    <input type="text" placeholder="City or Address" className="bg-transparent w-full outline-none text-tarmac-900 font-bold placeholder-tarmac-400/70" />
                                </div>
                            </div>

                            {/* Pick Up */}
                            <div className="md:col-span-3 bg-tarmac-50/50 rounded-2xl px-6 py-4 flex flex-col justify-center transition-colors hover:bg-tarmac-100/50 group cursor-pointer border border-transparent hover:border-tarmac-200">
                                <label className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest mb-1 group-hover:text-primary-600 transition-colors">Start Date</label>
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-tarmac-400 w-5 h-5 group-hover:text-primary-600 transition-colors" />
                                    <input type="date" className="bg-transparent w-full outline-none text-tarmac-900 font-bold uppercase text-sm cursor-pointer" />
                                </div>
                            </div>

                            {/* Return */}
                            <div className="md:col-span-3 bg-tarmac-50/50 rounded-2xl px-6 py-4 flex flex-col justify-center transition-colors hover:bg-tarmac-100/50 group cursor-pointer border border-transparent hover:border-tarmac-200">
                                <label className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest mb-1 group-hover:text-primary-600 transition-colors">End Date</label>
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-tarmac-400 w-5 h-5 group-hover:text-primary-600 transition-colors" />
                                    <input type="date" className="bg-transparent w-full outline-none text-tarmac-900 font-bold uppercase text-sm cursor-pointer" />
                                </div>
                            </div>
                            {/* passenger*/}

                            <div className="md:col-span-2 bg-tarmac-50/50 rounded-2xl px-6 py-4 flex flex-col justify-center transition-colors hover:bg-tarmac-100/50 group cursor-pointer border border-transparent hover:border-tarmac-200">
                                <label className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest mb-1 group-hover:text-primary-600 transition-colors">Passenger</label>
                                <div className="flex items-center gap-3">
                                    <input type="text" placeholder="seats" className="bg-transparent w-full outline-none text-tarmac-900 font-bold uppercase text-sm cursor-pointer" />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="md:col-span-2">
                                <button type="submit" className="h-full w-full bg-tarmac-900 hover:bg-primary-600 text-white rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 shadow-lg group">
                                    <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
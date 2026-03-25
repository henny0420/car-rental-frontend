import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

export default function ContactUs() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      details: ["125 5th Ave, New York", "NY 10003, USA"],
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+1 (800) 123-4567", "+1 (212) 555-0198"],
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["support@godrive.com", "info@godrive.com"],
      bgColor: "bg-primary-50",
      textColor: "text-primary-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* --- HERO / HEADER SECTION --- */}
      <section className="bg-slate-900 pt-24 pb-32 relative overflow-hidden text-center px-4">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container relative z-10 max-w-3xl mx-auto">
          <p className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-4">
            We're Here to Help
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tight mb-6">
            Get in <span className="text-primary-500">Touch</span>
          </h1>
          <p className="text-lg text-slate-300 font-medium leading-relaxed">
            Have questions about renting a car, listing your vehicle, or our coupons? Our dedicated support team is ready to assist you every step of the way.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTACT CONTENT --- */}
      <section className="relative z-20 -mt-16 container max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-8 md:p-12">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Send us a Message</h2>
            <p className="text-slate-500 mb-8 font-medium">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder-slate-400 font-medium"
                    required
                  />
                </div>
                
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder-slate-400 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder-slate-400 font-medium"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Your Message</label>
                <textarea 
                  rows="5" 
                  placeholder="How can we help you today?" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors placeholder-slate-400 font-medium resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="mt-2 w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-slate-900/20 group"
              >
                Send Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* RIGHT: Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-start gap-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${info.bgColor} ${info.textColor}`}>
                  <info.icon size={26} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-slate-500 font-medium leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Media Section */}
            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl mt-2 text-center text-white">
              <h3 className="text-xl font-black mb-4">Follow Our Journey</h3>
              <p className="text-slate-400 text-sm font-medium mb-6">Stay updated with our latest fleet additions and exclusive offers on social media.</p>
              <div className="flex justify-center items-center gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary-500 hover:text-white transition-all duration-300 border border-slate-700 hover:border-primary-500">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- MAP SECTION --- */}
        <div className="mt-16 bg-white p-4 rounded-3xl shadow-xl border border-slate-200">
          <div className="w-full h-[400px] rounded-2xl overflow-hidden relative group">
            {/* Map overlay for styling */}
            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            
            <iframe
              title="Office Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.00%2C40.73%2C-73.98%2C40.74&layer=mapnik&marker=40.7382%2C-73.9911"
              className="w-full h-full grayscale-[0.5] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>

      </section>
    </div>
  );
}
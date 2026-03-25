'use client';

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSession } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Car, 
  PlusCircle, 
  CalendarCheck, 
  Wallet, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Search,
  X
} from 'lucide-react';

export default function OwnerLayout({ children }) {
  const { data: session } = useSession();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/owner/dashboard', active: location.pathname === '/owner/dashboard' || location.pathname === '/owner' },
    { name: 'My Fleet', icon: Car, href: '/owner/cars', active: location.pathname === '/owner/cars' },
    { name: 'Add Vehicle', icon: PlusCircle, href: '/owner/cars/add', active: location.pathname === '/owner/cars/add' },
    { name: 'Bookings', icon: CalendarCheck, href: '/owner/bookings', active: location.pathname === '/owner/bookings' },
    { name: 'Earnings', icon: Wallet, href: '/owner/earnings', active: location.pathname === '/owner/earnings' },
  ];

  return (
    <div className="flex h-screen bg-tarmac-50 text-tarmac-900 font-sans overflow-hidden relative selection:bg-primary-100 selection:text-primary-900">
      
      {/* --- Global Background Effects --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-100/40 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-100/40 blur-[100px] pointer-events-none z-0"></div>

      {/* --- Mobile Overlay --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-tarmac-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col
          bg-white border-r border-tarmac-200 shadow-xl lg:shadow-none
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-72' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className={`h-20 flex items-center ${isSidebarOpen ? 'justify-between px-6' : 'justify-center'} border-b border-tarmac-100`}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
               {/* Replaced Image with Icon for consistency in this demo, strictly using theme colors */}
               <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-200">
                 <span className="font-black text-white text-lg italic">G</span>
               </div>
               <span className="text-xl font-black tracking-tighter text-tarmac-900 italic">
                 GO<span className="text-primary-600">DRIVE</span>
               </span>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-200">
              <span className="font-black text-white text-lg italic">G</span>
            </div>
          )}
          
          {/* Mobile Close Button */}
          <button onClick={toggleMobileMenu} className="lg:hidden text-tarmac-400 hover:text-primary-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* User Profile Snippet (Top) */}
        <div className={`p-4 ${!isSidebarOpen && 'flex justify-center'}`}>
           <div className={`
             flex items-center gap-3 p-3 rounded-xl border border-tarmac-100 bg-tarmac-50/50
             ${!isSidebarOpen ? 'justify-center w-12 h-12 p-0 rounded-full' : ''}
           `}>
             <div className="w-10 h-10 rounded-full bg-tarmac-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
             </div>
              {isSidebarOpen && (
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm truncate text-tarmac-900">{session?.user?.name || 'Owner'}</h4>
                  <p className="text-xs text-tarmac-500 truncate font-medium">Owner Account</p>
                </div>
              )}
           </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar bg-primary-600 rounded-t-[100px] rounded-l-none">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
                className={`
                group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 block mb-1 relative
                ${item.active 
                   ? 'bg-gradient-to-r from-tarmac-950 to-tarmac-500 text-white shadow-lg shadow-primary-200' 
                  : 'text-white hover:bg-tarmac-50 hover:text-tarmac-900'
                }
                ${!isSidebarOpen && 'justify-center'}
              `}
            >
              <div className="relative">
                <item.icon size={20} className={`${item.active ? 'text-white' : 'group-hover:text-primary-600 transition-colors'}`} />
                {item.badge && !isSidebarOpen && (
                  <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-primary-600 rounded-full border-2 border-white"></span>
                )}
              </div>
              
              {isSidebarOpen && (
                <span className="flex-1 text-sm font-bold">{item.name}</span>
              )}
              
              {isSidebarOpen && item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.active ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-700'}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 bg-primary-600 border-tarmac-100 space-y-1">
           <Link 
              to="/owner/settings"
              className={`
                group flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-tarmac-50 hover:text-tarmac-900 transition-all block
                ${!isSidebarOpen && 'justify-center'}
              `}
            >
              <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              {isSidebarOpen && <span className="text-sm font-bold">Settings</span>}
           </Link>
           <button 
              className={`
                w-full group flex items-center gap-3 px-3 py-3 rounded-xl text-tarmac-500 hover:bg-primary-50 hover:text-primary-700 transition-all
                ${!isSidebarOpen && 'justify-center'}
              `}
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="text-sm font-bold">Logout</span>}
           </button>
        </div>

        {/* Sidebar Toggler (Desktop Only) */}
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 bg-white border border-tarmac-200 rounded-full items-center justify-center text-tarmac-500 shadow-md hover:text-primary-600 hover:border-primary-200 transition-all z-50"
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative bg-tarmac-50">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-tarmac-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-tarmac-500 hover:text-tarmac-900 hover:bg-tarmac-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-tarmac-100/50 border border-transparent focus-within:bg-white focus-within:border-primary-200 focus-within:ring-2 focus-within:ring-primary-100 rounded-full transition-all w-64 lg:w-96">
              <Search size={18} className="text-tarmac-400" />
              <input 
                type="text" 
                placeholder="Search bookings, cars..." 
                className="bg-transparent border-none outline-none text-sm text-tarmac-800 placeholder-tarmac-400 w-full font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 text-tarmac-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-primary-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-8 bg-tarmac-200 hidden md:block"></div>
            <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] uppercase font-bold text-tarmac-400 tracking-wide">Total Earnings</span>
               <span className="text-sm font-black text-success">$12,450.00</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          {/* This is where your pages will render. 
            Example: <AddCarForm /> 
          */}
          <div className="max-w-7xl mx-auto h-full">
            {children || (
               /* --- Placeholder Content (Visualizing the Layout) --- */
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="bg-white border border-tarmac-100 p-6 rounded-2xl shadow-sm animate-pulse">
                     <div className="h-10 w-10 bg-tarmac-100 rounded-lg mb-4"></div>
                     <div className="h-4 w-24 bg-tarmac-100 rounded mb-2"></div>
                     <div className="h-6 w-16 bg-tarmac-100 rounded"></div>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Scrollbar Styles using Theme Colors */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* tarmac-300 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; /* tarmac-400 */
        }
      `}</style>
    </div>
  );
};
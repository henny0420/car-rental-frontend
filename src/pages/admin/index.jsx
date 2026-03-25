'use client';

import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import {
    LayoutDashboard,
    FileCheck,
    UserCog,
    Users,
    Car,
    Tags,
    Globe,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
    X,
    ShieldAlert
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [counts, setCounts] = useState({ unreadCount: 0, pendingCarsCount: 0 });
    const [notifications, setNotifications] = useState([]);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const location = useLocation();

    const fetchCounts = async () => {
        try {
            const res = await axiosInstance.get('/notification/admin/unread-count');
            if (res.data?.success) {
                setCounts({
                    unreadCount: res.data.unreadCount,
                    pendingCarsCount: res.data.pendingCarsCount
                });
            }
        } catch (err) {
            console.error("Failed to fetch notification counts", err);
        }
    };

    const fetchNotifications = async () => {
        try {
            const res = await axiosInstance.get('/notification/admin/all');
            if (res.data?.success) {
                setNotifications(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    React.useEffect(() => {
        fetchCounts();
        fetchNotifications();
        // Refresh counts every 30 seconds
        const interval = setInterval(fetchCounts, 30000);
        return () => clearInterval(interval);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { 
            name: 'Approvals', 
            icon: FileCheck, 
            href: '/admin/approvals', 
            badge: counts.pendingCarsCount > 0 ? counts.pendingCarsCount : null, 
            alert: counts.pendingCarsCount > 0,
            active: location.pathname === '/admin/approvals'
        },
        { name: 'Owners List', icon: UserCog, href: '/admin/owners', active: location.pathname === '/admin/owners' },
        { name: 'Users (All)', icon: Users, href: '/admin/users', active: location.pathname === '/admin/users' },
        { name: 'All Cars', icon: Car, href: '/admin/cars', active: location.pathname === '/admin/cars' },
        { name: 'Brands', icon: Tags, href: '/admin/brands', active: location.pathname === '/admin/brands' || location.pathname === '/admin' }, 
    ];

    // Mark Dashboard active if exactly on dashboard or no subpath
    if (location.pathname === '/admin/dashboard') navItems[0].active = true;

    return (
        <div className="flex h-screen bg-tarmac-50 text-tarmac-900 font-sans overflow-hidden relative selection:bg-primary-100 selection:text-primary-900">

            {/* --- Global Background Effects (Theme) --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-100/30 blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-100/30 blur-[100px] pointer-events-none z-0"></div>

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
                            {/* Admin Logo Variant */}
                            <div className="w-8 h-8 rounded-lg bg-tarmac-900 flex items-center justify-center shadow-lg">
                                <ShieldAlert className="w-5 h-5 text-primary-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black tracking-tighter text-tarmac-900 italic leading-none">
                                    GO<span className="text-primary-600">DRIVE</span>
                                </span>
                                <span className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest leading-none mt-1">
                                    Admin Portal
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-9 h-9 rounded-lg bg-tarmac-900 flex items-center justify-center shadow-lg">
                            <span className="font-black text-primary-500 text-lg italic">A</span>
                        </div>
                    )}

                    {/* Mobile Close Button */}
                    <button onClick={toggleMobileMenu} className="lg:hidden text-tarmac-400 hover:text-primary-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Admin Profile Snippet */}
                <div className={`p-4 ${!isSidebarOpen && 'flex justify-center'}`}>
                    <div className={`
             flex items-center gap-3 p-3 rounded-xl border border-tarmac-100 bg-gradient-to-r from-tarmac-50 to-white
             ${!isSidebarOpen ? 'justify-center w-12 h-12 p-0 rounded-full' : ''}
           `}>
                        <div className="w-10 h-10 rounded-full bg-primary-100 overflow-hidden border-2 border-white shadow-sm shrink-0 flex items-center justify-center">
                            <span className="font-bold text-primary-700">AD</span>
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <h4 className="font-bold text-sm truncate text-tarmac-900">Super Admin</h4>
                                <p className="text-xs text-tarmac-500 truncate font-medium flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar bg-primary-600 rounded-t-[100px] rounded-l-none">
                    <div className={`text-xs font-bold text-white uppercase tracking-wider mb-2 px-3 ${!isSidebarOpen && 'hidden'}`}>
                        Management
                    </div>

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
                                <item.icon size={20} className={`${item.active ? 'text-primary-500' : 'group-hover:text-primary-600 transition-colors'}`} />
                                {/* Notification Dot */}
                                {item.alert && !isSidebarOpen && (
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary-600 rounded-full border-2 border-white"></span>
                                )}
                            </div>

                            {isSidebarOpen && (
                                <span className="flex-1 text-sm font-bold">{item.name}</span>
                            )}

                            {isSidebarOpen && item.badge && (
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${item.active ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-700'}`}>
                                    {item.badge}
                                </span>
                            )}

                            {/* Active Indicator Bar (Left) */}
                            {item.active && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-3  border-tarmac-100 space-y-1 bg-primary-600">
                    <Link
                        to="/"
                        className={`
                group flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-secondary-50 hover:text-secondary-700 transition-all block
                ${!isSidebarOpen && 'justify-center'}
              `}
                    >
                        <Globe size={20} className="group-hover:scale-110 transition-transform" />
                        {isSidebarOpen && <span className="text-sm font-bold">Back to Website</span>}
                    </Link>
                    <button
                        className={`
                w-full group flex items-center gap-3 px-3 py-3 rounded-xl text-white hover:bg-red-50 hover:text-primary-700 transition-all
                ${!isSidebarOpen && 'justify-center'}
              `}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-sm font-bold">Sign Out</span>}
                    </button>
                </div>

                {/* Sidebar Toggler */}
                <button
                    onClick={toggleSidebar}
                    className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 bg-tarmac-900 border border-tarmac-700 rounded-full items-center justify-center text-white shadow-md hover:scale-110 transition-all z-50"
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

                        {/* Context Title (Visible on larger screens) */}
                        <div className="hidden lg:block">
                            <h2 className="text-lg font-black text-tarmac-900 uppercase italic">Admin Dashboard</h2>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-tarmac-100/50 border border-transparent focus-within:bg-white focus-within:border-primary-200 focus-within:ring-2 focus-within:ring-primary-100 rounded-full transition-all w-64 lg:w-96 ml-auto lg:ml-8">
                            <Search size={18} className="text-tarmac-400" />
                            <input
                                type="text"
                                placeholder="Search database..."
                                className="bg-transparent border-none outline-none text-sm text-tarmac-800 placeholder-tarmac-400 w-full font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-4 relative">
                        <button 
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="relative p-2.5 text-tarmac-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                        >
                            <Bell size={20} />
                            {counts.unreadCount > 0 && (
                                <span className="absolute top-2.5 right-3 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                                    {counts.unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {isNotificationsOpen && (
                            <div className="absolute right-0 top-14 w-80 bg-white border border-tarmac-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                <div className="p-4 border-b border-tarmac-100 flex items-center justify-between">
                                    <h3 className="font-bold text-sm">Notifications</h3>
                                    <button 
                                        onClick={async () => {
                                            await axiosInstance.put('/notification/admin/mark-all-read');
                                            fetchCounts();
                                            setIsNotificationsOpen(false);
                                        }}
                                        className="text-[10px] font-bold text-primary-600 hover:underline"
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-xs text-tarmac-400 font-medium">
                                            No notifications found
                                        </div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div key={notif._id} className={`p-4 border-b border-tarmac-50 last:border-none hover:bg-tarmac-50 transition-colors ${!notif.isRead ? 'bg-primary-50/30' : ''}`}>
                                                <p className="text-xs font-bold text-tarmac-900 mb-0.5">{notif.title}</p>
                                                <p className="text-[11px] text-tarmac-500 line-clamp-2 mb-1">{notif.message}</p>
                                                <p className="text-[9px] text-tarmac-400 font-medium italic">
                                                    {new Date(notif.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="p-3 bg-tarmac-50 border-t border-tarmac-100 text-center">
                                    <Link to="/admin/approvals" className="text-[11px] font-bold text-tarmac-600 hover:text-primary-600" onClick={() => setIsNotificationsOpen(false)}>
                                        View all approvals
                                    </Link>
                                </div>
                            </div>
                        )}
                        <div className="w-px h-8 bg-tarmac-200 hidden md:block"></div>
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-xs font-bold text-tarmac-500">v1.2.0</span>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar">
                    <div className="max-w-7xl mx-auto h-full">
                        {children || (
                            /* --- Placeholder Content for Preview --- */
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {['Total Users', 'Pending Cars', 'Active Rentals', 'Revenue'].map((item, i) => (
                                        <div key={i} className="bg-white border border-tarmac-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="h-10 w-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                                                    {/* Icon Placeholder */}
                                                    <div className="w-5 h-5 bg-current rounded-sm opacity-50"></div>
                                                </div>
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
                                            </div>
                                            <div className="h-4 w-24 bg-tarmac-100 rounded mb-2"></div>
                                            <div className="h-8 w-16 bg-tarmac-200 rounded"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Table Placeholder */}
                                <div className="bg-white border border-tarmac-100 rounded-2xl p-6 shadow-sm min-h-[400px]">
                                    <div className="h-6 w-48 bg-tarmac-100 rounded mb-6"></div>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map(j => (
                                            <div key={j} className="h-12 w-full bg-tarmac-50 rounded-lg animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Scrollbar Styles */}
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
}
import React, { useState, useEffect } from 'react';
import { Car, CalendarCheck, Wallet, ArrowUpRight, TrendingUp, Users } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function OwnerDashboard() {
    const [stats, setStats] = useState({
        totalCars: 0,
        totalBookings: 0,
        activeBookings: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosInstance.get('/owner/dashboard');
                if (res.data?.success) {
                    setStats(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch owner stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Vehicles', value: stats.totalCars, icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Total Bookings', value: stats.totalBookings, icon: CalendarCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Active Hires', value: stats.activeBookings, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
        { name: 'Total Earnings', value: `$${stats.totalRevenue.toLocaleString()}`, icon: Wallet, color: 'text-success', bg: 'bg-green-50' },
    ];

    if (loading) {
        return (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white border border-tarmac-100 p-6 rounded-2xl h-32 shadow-sm"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-tarmac-900">Owner Dashboard</h1>
                    <p className="text-tarmac-500 font-medium">Welcome back! Here's how your fleet is performing.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 border border-tarmac-100 rounded-xl shadow-sm text-sm font-bold text-tarmac-600">
                        Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white border border-tarmac-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${card.bg} rounded-full -mr-8 -mt-8 opacity-40 group-hover:scale-110 transition-transform`}></div>
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-sm font-bold text-tarmac-400 uppercase tracking-widest mb-1">{card.name}</p>
                                <h3 className="text-2xl font-black text-tarmac-900">{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-success relative z-10">
                            <ArrowUpRight size={14} />
                            <span>+12.5% from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Visual Placeholder for complex data */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-tarmac-100 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-tarmac-900">Fleet Performance</h2>
                        <select className="bg-tarmac-50 border-none outline-none text-xs font-bold text-tarmac-600 rounded-lg px-3 py-2">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    {/* Placeholder for chart */}
                    <div className="h-64 w-full bg-tarmac-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-tarmac-200">
                         <p className="text-tarmac-400 font-bold italic">Performance Analytics Chart coming soon...</p>
                    </div>
                </div>

                <div className="bg-white border border-tarmac-100 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-xl font-black text-tarmac-900 mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        <a href="/owner/cars/add" className="w-full flex items-center justify-between p-4 rounded-2xl border border-primary-100 bg-primary-50/30 text-primary-700 font-bold hover:bg-primary-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <PlusCircle className="text-primary-600" size={20} />
                                <span>Add New Car</span>
                            </div>
                            <ChevronRight size={18} />
                        </a>
                        <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-tarmac-100 hover:bg-tarmac-50 transition-colors text-tarmac-700 font-bold">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="text-tarmac-400" size={20} />
                                <span>Check Messages</span>
                            </div>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Minimal missing icons
const ChevronRight = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const PlusCircle = ({ size, className }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>;
const MessageSquare = ({ size, className }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;

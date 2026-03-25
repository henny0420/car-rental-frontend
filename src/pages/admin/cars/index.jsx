import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { Car, Search, Filter, ShieldCheck, Clock, MapPin, User, Eye, Trash2, Edit, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminCarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchCars = async () => {
        try {
            const res = await axiosInstance.get('/admin/car');
            if (res.data?.success || res.data?.data) {
                setCars(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch cars", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleUpdateStatus = async (carId, updates) => {
        try {
            const res = await axiosInstance.patch(`/admin/car/${carId}/status`, updates);
            if (res.data?.success) {
                fetchCars();
            }
        } catch (err) {
            console.error("Failed to update car status", err);
        }
    };

    const filteredCars = cars.filter(car => {
        const matchesSearch = car.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            car.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-12 w-64 bg-white rounded-xl"></div>
                <div className="bg-white rounded-3xl h-96 w-full shadow-sm"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-tarmac-900 italic uppercase">Fleet Management</h1>
                    <p className="text-tarmac-500 font-medium">Monitor and manage all listed vehicles across the platform.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tarmac-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search cars or brands..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-tarmac-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all w-64 sm:w-80 text-sm font-medium"
                        />
                    </div>
                    
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-white border border-tarmac-100 rounded-xl focus:border-primary-500 outline-none transition-all text-sm font-bold text-tarmac-700 cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                <div className="bg-white border border-tarmac-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-tarmac-50/50 border-b border-tarmac-100">
                                    <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Vehicle Details</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Owner</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Pricing</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Listed On</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-tarmac-50">
                                {filteredCars.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center text-tarmac-400 italic font-medium">
                                            {searchTerm ? "No vehicles match your refined search..." : "No vehicles listed yet."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCars.map((car) => (
                                        <tr key={car._id} className="hover:bg-tarmac-50/30 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 rounded-xl bg-tarmac-100 overflow-hidden relative group-hover:scale-105 transition-transform">
                                                        <img 
                                                            src={car.coverImage} 
                                                            alt={car.name} 
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-tarmac-900 mb-0.5">{car.name}</h4>
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary-600 uppercase tracking-wider">
                                                            <Clock size={12} strokeWidth={3} />
                                                            <span>{car.brand?.name} · {car.transmission}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-tarmac-100 flex items-center justify-center">
                                                        <User size={12} className="text-tarmac-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-tarmac-900">{car.createdBy?.fullname || 'System'}</p>
                                                        <p className="text-[10px] font-medium text-tarmac-400">{car.createdBy?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-sm font-black text-tarmac-900">${car.pricePerDay || car.rentPrice}</p>
                                                <p className="text-[10px] font-bold text-tarmac-400 uppercase">per day</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className={`w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                        car.status === 'available' ? 'bg-green-100 text-green-600' : 
                                                        car.status === 'rented' ? 'bg-orange-100 text-orange-600' : 
                                                        'bg-red-100 text-red-600'
                                                    }`}>
                                                        {car.status}
                                                    </span>
                                                    <div className="flex items-center gap-1 group/toggle cursor-pointer" onClick={() => handleUpdateStatus(car._id, { isActive: !car.isActive })}>
                                                        <div className={`w-3 h-3 rounded-full ${car.isActive ? 'bg-primary-500' : 'bg-tarmac-300'}`}></div>
                                                        <span className="text-[9px] font-black uppercase text-tarmac-400 group-hover/toggle:text-primary-600 transition-colors">
                                                            {car.isActive ? 'Active' : 'Hidden'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-xs font-bold text-tarmac-500">
                                                {new Date(car.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link 
                                                        to={`/car/${car._id}`}
                                                        className="p-2 text-tarmac-600 hover:bg-tarmac-100 bg-white rounded-lg transition-all shadow-sm"
                                                        title="View Public Page"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    {car.status === 'available' ? (
                                                        <button 
                                                            onClick={() => handleUpdateStatus(car._id, { status: 'maintenance' })}
                                                            className="p-2 text-orange-500 hover:bg-orange-50 bg-white rounded-lg transition-all shadow-sm"
                                                            title="Set to Maintenance"
                                                        >
                                                            <Clock size={18} />
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleUpdateStatus(car._id, { status: 'available' })}
                                                            className="p-2 text-green-500 hover:bg-green-50 bg-white rounded-lg transition-all shadow-sm"
                                                            title="Set to Available"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

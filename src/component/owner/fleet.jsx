import React, { useState, useEffect } from 'react';
import { Car, MoreVertical, Edit2, Trash2, Eye, ShieldCheck, Clock, MapPin } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

export default function OwnerFleet() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCars = async () => {
        try {
            const res = await axiosInstance.get('/owner/cars');
            if (res.data?.success) {
                setCars(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch owner fleet", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const getStatusColor = (status, approvalStatus) => {
        if (approvalStatus === 'pending') return 'bg-orange-100 text-orange-600 border-orange-200';
        if (approvalStatus === 'rejected') return 'bg-red-100 text-red-600 border-red-200';
        if (status === 'available') return 'bg-green-100 text-green-600 border-green-200';
        if (status === 'booked') return 'bg-blue-100 text-blue-600 border-blue-200';
        return 'bg-tarmac-100 text-tarmac-500 border-tarmac-200';
    };

    if (loading) {
        return <div className="p-8 space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-24 w-full bg-white rounded-2xl shadow-sm"></div>)}
        </div>;
    }

    return (
        <div className="p-8 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                   <h1 className="text-3xl font-black tracking-tight text-tarmac-900">My Fleet</h1>
                   <p className="text-tarmac-500 font-medium">Manage and monitor all your listed vehicles.</p>
                </div>
                <Link to="/owner/cars/add" className="px-6 py-3 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 flex items-center gap-2">
                    <Plus size={20} />
                    <span>Add New Vehicle</span>
                </Link>
            </header>

            <div className="bg-white border border-tarmac-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-tarmac-50/50 border-b border-tarmac-100">
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Vehicle Details</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Price / Day</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Registration</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-tarmac-50">
                            {cars.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-tarmac-400 italic">
                                        No vehicles found. Start by listing your first car!
                                    </td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car._id} className="hover:bg-tarmac-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-xl bg-tarmac-100 overflow-hidden shadow-sm shrink-0 border border-white">
                                                    <img src={car.coverImage?.url} alt={car.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-tarmac-900 mb-0.5">{car.name}</h4>
                                                    <p className="text-[11px] font-bold text-tarmac-400 uppercase flex items-center gap-1">
                                                        {car.brand?.name} &bull; {car.carType}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-black text-tarmac-900">${car.pricePerDay}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-tarmac-800 uppercase bg-tarmac-100 border border-tarmac-200 px-2 py-0.5 rounded inline-block w-fit">
                                                    {car.registrationNumber}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${getStatusColor(car.status, car.approvalStatus)}`}>
                                                {car.approvalStatus === 'pending' ? 'Pending Approval' : (car.approvalStatus === 'rejected' ? 'Rejected' : car.status)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button title="View Details" className="p-2 text-tarmac-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all shadow-sm">
                                                    <Eye size={18} />
                                                </button>
                                                <button title="Edit Car" className="p-2 text-tarmac-400 hover:text-secondary-600 hover:bg-white rounded-lg transition-all shadow-sm">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button title="Delete Listing" className="p-2 text-tarmac-400 hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm">
                                                    <Trash2 size={18} />
                                                </button>
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
    );
}

const Plus = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;

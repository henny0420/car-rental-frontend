import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, CheckCircle, XCircle, Phone, Mail, MoreHorizontal } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function OwnerBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const res = await axiosInstance.get('/owner/bookings');
            if (res.data?.success) {
                setBookings(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch owner bookings", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleAction = async (bookingId, action) => {
        try {
            const endpoint = `/owner/bookings/${bookingId}/${action}`;
            const res = await axiosInstance.put(endpoint);
            if (res.data?.success) {
                fetchBookings(); // Refresh list
            }
        } catch (err) {
            console.error(`Failed to ${action} booking`, err);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-success/10 text-success border-success/20';
            case 'pending': return 'bg-orange-100 text-orange-600 border-orange-200';
            case 'cancelled': return 'bg-red-100 text-red-600 border-red-200';
            case 'completed': return 'bg-blue-100 text-blue-600 border-blue-200';
            default: return 'bg-tarmac-100 text-tarmac-500 border-tarmac-200';
        }
    };

    if (loading) {
        return <div className="p-8 space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-40 w-full bg-white rounded-3xl shadow-sm"></div>)}
        </div>;
    }

    return (
        <div className="p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-black tracking-tight text-tarmac-900">Manage Bookings</h1>
                <p className="text-tarmac-500 font-medium">Review and respond to vehicle reservation requests.</p>
            </header>

            <div className="space-y-4">
                {bookings.length === 0 ? (
                    <div className="bg-white border border-tarmac-100 p-12 rounded-3xl text-center shadow-sm">
                        <div className="w-16 h-16 bg-tarmac-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-tarmac-100">
                           <Calendar className="text-tarmac-300" size={32} />
                        </div>
                        <h3 className="text-lg font-black text-tarmac-900">No bookings yet</h3>
                        <p className="text-tarmac-500 max-w-xs mx-auto mt-1">Once users start booking your vehicles, they will appear here.</p>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking._id} className="bg-white border border-tarmac-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden relative group">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                {/* Car ID Info */}
                                <div className="w-24 h-24 rounded-2xl bg-tarmac-100 overflow-hidden border border-tarmac-50 shadow-sm shrink-0">
                                    <img src={booking.carId?.coverImage?.url} alt="Car" className="w-full h-full object-cover" />
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg font-black text-tarmac-900">{booking.carId?.name || 'Unknown Vehicle'}</h4>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-tarmac-500 font-medium">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-primary-500" />
                                            <span>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User size={16} className="text-primary-500" />
                                            <span className="font-bold text-tarmac-800">{booking.userId?.fullname || 'Guest'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-primary-500" />
                                            <span>{Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} Days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start lg:items-end justify-between self-stretch gap-4 border-t lg:border-t-0 lg:border-l border-tarmac-100 lg:pl-8 pt-4 lg:pt-0">
                                <div>
                                    <p className="text-[10px] font-black text-tarmac-400 uppercase tracking-widest mb-1 text-right">Total Payout</p>
                                    <h3 className="text-xl font-black text-success">${booking.totalPrice?.toLocaleString() || '0'}</h3>
                                </div>
                                
                                <div className="flex items-center gap-2 w-full lg:w-auto">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button 
                                                onClick={() => handleAction(booking._id, 'approve')}
                                                className="flex-1 lg:flex-none px-4 py-2 bg-success text-white rounded-xl font-bold text-xs ring-4 ring-success/10 hover:bg-success-dark transition-all flex items-center gap-2"
                                            >
                                                <CheckCircle size={16} />
                                                <span>Approve</span>
                                            </button>
                                            <button 
                                                onClick={() => handleAction(booking._id, 'reject')}
                                                className="flex-1 lg:flex-none px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2"
                                            >
                                                <XCircle size={16} />
                                                <span>Decline</span>
                                            </button>
                                        </>
                                    )}
                                    <button className="p-2 text-tarmac-400 hover:bg-tarmac-50 rounded-xl transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


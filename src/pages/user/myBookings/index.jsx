import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { Calendar, MapPin, Clock, CreditCard, ChevronRight, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axiosInstance.get('/booking/my-bookings');
                setBookings(response.data.bookings);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
                setError("Failed to load your bookings. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'booked':
            case 'approved':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'ongoing':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'completed':
                return 'bg-tarmac-100 text-tarmac-700 border-tarmac-200';
            default:
                return 'bg-tarmac-100 text-tarmac-600 border-tarmac-200';
        }
    };

    if (loading) return (
        <div className="min-h-screen py-24 text-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-tarmac-500 font-bold">Loading your bookings...</p>
        </div>
    );

    return (
        <div className="bg-tarmac-50 min-h-screen py-12 font-sans">
            <div className="container mx-auto px-4 max-w-5xl">

                <div className="mb-10">
                    <h1 className="text-4xl font-black text-tarmac-900 mb-2">My Bookings</h1>
                    <p className="text-tarmac-500 font-medium">Manage your current and past car rentals.</p>
                </div>

                {error ? (
                    <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl flex items-center gap-4">
                        <AlertCircle />
                        <p className="font-bold">{error}</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-tarmac-100 shadow-xl shadow-tarmac-900/5">
                        <div className="w-20 h-20 bg-tarmac-50 text-tarmac-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Clock size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-tarmac-900 mb-4">No bookings yet</h2>
                        <p className="text-tarmac-500 mb-8 max-w-md mx-auto">
                            When you rent a car, it will appear here. Ready to hit the road?
                        </p>
                        <button
                            onClick={() => navigate('/explore')}
                            className="px-8 py-4 bg-primary-600 text-white font-black rounded-2xl shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all"
                        >
                            Rent a Car Now
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-2xl border border-tarmac-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                <div className="flex flex-col md:flex-row">
                                    {/* Car Image (Left/Top) */}
                                    <div className="w-full md:w-64 h-48 md:h-auto bg-tarmac-100 overflow-hidden relative">
                                        <img
                                            src={booking.carId?.coverImage?.url || booking.carId?.image}
                                            alt={booking.carId?.name || 'Car'}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </div>
                                    </div>

                                    {/* Booking Info (Right/Bottom) */}
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                                            <div>
                                                <h3 className="text-xl font-black text-tarmac-900 mb-1">{booking.carId?.name || 'Car Details'}</h3>
                                                <p className="text-sm font-bold text-tarmac-400 flex items-center gap-1">
                                                    {booking.carId?.brand?.name} • {booking.carId?.model}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-primary-600">₹{booking.finalPrice}</p>
                                                <p className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest">Total Price</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-y border-tarmac-50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-tarmac-50 text-tarmac-600 rounded-lg"><Calendar size={18} /></div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest">Pickup Date</p>
                                                    <p className="font-bold text-tarmac-800 text-sm">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-tarmac-50 text-tarmac-600 rounded-lg"><Calendar size={18} /></div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest">Return Date</p>
                                                    <p className="font-bold text-tarmac-800 text-sm">{new Date(booking.endingDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-tarmac-50 text-tarmac-600 rounded-lg"><CreditCard size={18} /></div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-tarmac-400 uppercase tracking-widest">Payment Status</p>
                                                    <p className={`font-bold text-sm ${booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                                                        {booking.paymentStatus?.toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <button
                                                onClick={() => navigate(`/car/${booking.carId?._id || booking.carId?.id}`)}
                                                className="flex items-center gap-2 text-sm font-bold text-tarmac-600 hover:text-primary-600 transition-colors"
                                            >
                                                View Car Details <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useSession } from '../../../context/AuthContext';
import { CheckCircle, XCircle, Clock, MapPin, IndianRupee } from 'lucide-react';
import AdminLayout from '../index'; // Ensure it's exported and reachable

export default function AdminApprovalsPage() {
    const { data: session, status: authStatus } = useSession();
    const [pendingCars, setPendingCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPendingCars = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/admin/car/pending');
            if (res.data?.success) {
                setPendingCars(res.data.data || []);
            }
        } catch (err) {
            console.error("Failed to load pending cars", err);
            setError("Failed to load pending approvals.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authStatus === 'authenticated' && session?.user?.role === 'admin') {
            fetchPendingCars();
        } else if (authStatus === 'unauthenticated') {
            setLoading(false);
            setError("You must be an admin to view this page.");
        }
    }, [session, authStatus]);

    const handleApprove = async (carId) => {
        if (!window.confirm("Approve this car for public listing?")) return;
        try {
            const res = await axiosInstance.put(`/admin/car/${carId}/approve`);
            if (res.data?.success) {
                alert("Car approved! The user is now an Owner.");
                setPendingCars(prev => prev.filter(car => car._id !== carId));
            } else {
                alert(res.data?.message || "Failed to approve car.");
            }
        } catch (err) {
            console.error(err);
            alert("Error approving car.");
        }
    };

    const handleReject = async (carId) => {
        if (!window.confirm("Reject this car listing?")) return;
        try {
            // Reusing existing updateCarStatus if rejection is needed, 
            // or we just delete it/update approvalStatus to rejected.
            // For now, let's just make a generic update status call if such endpoint exists
            // Since we only made approve endpoint, we'll patch status to rejected using the existing endpoint:
            const res = await axiosInstance.patch(`/admin/car/${carId}/status`, {
                status: 'maintenance', // or maybe 'rejected' if we update DB to handle it
                isActive: false,
                approvalStatus: 'rejected'
            });
            if (res.data?.success) {
                setPendingCars(prev => prev.filter(car => car._id !== carId));
            }
        } catch (err) {
            alert("Error rejecting car.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-1">Pending <span className="text-primary-600">Approvals</span></h1>
                    <p className="text-slate-500 font-medium text-sm">Review cars submitted by users.</p>
                </div>
                <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                    <Clock size={18} />
                    {pendingCars.length} Pending
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl font-medium">{error}</div>
            )}

            {loading ? (
                <div className="text-center py-10 text-slate-500 font-medium">Loading pending applications...</div>
            ) : pendingCars.length === 0 ? (
                <div className="bg-white border text-center border-slate-200 rounded-3xl p-12 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">All Caught Up!</h2>
                    <p className="text-slate-500">There are no pending car submissions waiting for approval.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {pendingCars.map(car => (
                        <div key={car._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                            
                            <img 
                                src={car.coverImage?.url || "https://via.placeholder.com/300x200"} 
                                alt={car.name} 
                                className="w-full md:w-48 h-32 object-cover rounded-xl shrink-0 bg-slate-100" 
                            />
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-black text-slate-900 truncate">{car.name}</h3>
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase rounded-md">Pending</span>
                                </div>
                                <div className="text-sm text-primary-600 font-bold mb-3">{car.brand?.name} &bull; {car.carType}</div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                        <IndianRupee size={16} className="text-slate-400" />
                                        {car.pricePerHour}/hr | {car.pricePerDay}/day
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                        <MapPin size={16} className="text-slate-400" />
                                        {car.location?.city || "N/A"}
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 bg-primary-100 text-primary-700 font-bold rounded-full flex items-center justify-center shrink-0">
                                        {car.createdBy?.fullname?.[0] || 'U'}
                                    </div>
                                    <span className="font-bold text-slate-700">{car.createdBy?.fullname || "Unknown User"}</span>
                                    <span className="text-slate-400">({car.createdBy?.email})</span>
                                </div>
                            </div>

                            <div className="flex w-full md:w-auto md:flex-col gap-3 shrink-0">
                                <button onClick={() => handleApprove(car._id)} className="flex-1 md:w-32 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
                                    <CheckCircle size={18} /> Approve
                                </button>
                                <button onClick={() => handleReject(car._id)} className="flex-1 md:w-32 py-2.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 font-bold rounded-xl transition flex items-center justify-center gap-2">
                                    <XCircle size={18} /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

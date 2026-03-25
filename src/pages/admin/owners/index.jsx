import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { UserCog, Mail, Phone, Calendar, ShieldCheck, Trash2, UserX, UserCheck, Search, Car } from 'lucide-react';

export default function AdminOwnersPage() {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchOwners = async () => {
        try {
            const res = await axiosInstance.get('/admin/owners');
            if (res.data?.success || res.data?.data) {
                setOwners(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch owners", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            const res = await axiosInstance.patch(`/admin/user/${userId}/status`, {
                isActive: !currentStatus
            });
            if (res.data?.success) {
                fetchOwners();
            }
        } catch (err) {
            console.error("Failed to update owner status", err);
        }
    };

    const filteredOwners = owners.filter(owner => 
        owner.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h1 className="text-3xl font-black tracking-tight text-tarmac-900 italic uppercase">Fleet Owners</h1>
                    <p className="text-tarmac-500 font-medium">Manage and monitor vehicle owners and their account status.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tarmac-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search owners..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-tarmac-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all w-64 sm:w-80 text-sm font-medium"
                        />
                    </div>
                </div>
            </header>

            <div className="bg-white border border-tarmac-100 rounded-[2.5rem] shadow-sm overflow-hidden text-tarmac-950">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-tarmac-50/50 border-b border-tarmac-100">
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Owner Details</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Joined On</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-tarmac-50">
                            {filteredOwners.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center text-tarmac-400 italic font-medium">
                                        {searchTerm ? "No owners match your filter..." : "No owners found in system."}
                                    </td>
                                </tr>
                            ) : (
                                filteredOwners.map((owner) => (
                                    <tr key={owner._id} className="hover:bg-tarmac-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden ring-1 ring-tarmac-50 font-black text-primary-700">
                                                    {owner.fullname?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-tarmac-900 mb-0.5">{owner.fullname}</h4>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-tarmac-400">
                                                            <Mail size={12} />
                                                            <span>{owner.email}</span>
                                                        </div>
                                                        <div className="w-1 h-1 rounded-full bg-tarmac-200"></div>
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                                                            <ShieldCheck size={10} strokeWidth={3} />
                                                            <span>Verified Owner</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-tarmac-600">
                                            {new Date(owner.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                                owner.isActive ? 'bg-green-100 text-green-700 border-green-200/50' : 'bg-red-100 text-red-600 border-red-200/50'
                                            }`}>
                                                {owner.isActive ? 'Active' : 'Account Docked'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleToggleStatus(owner._id, owner.isActive)}
                                                    className={`p-2.5 rounded-xl transition-all shadow-sm ${
                                                        owner.isActive ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'
                                                    } bg-white border border-tarmac-50`}
                                                    title={owner.isActive ? "Deactivate Account" : "Activate Account"}
                                                >
                                                    {owner.isActive ? <UserX size={20} /> : <UserCheck size={20} />}
                                                </button>
                                                <button 
                                                    className="p-2.5 text-tarmac-400 hover:bg-tarmac-50 bg-white border border-tarmac-50 rounded-xl transition-all shadow-sm"
                                                    title="View Owned Vehicles (Coming Soon)"
                                                >
                                                    <Car size={20} />
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

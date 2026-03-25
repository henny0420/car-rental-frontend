import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { Users, Mail, Phone, Calendar, Shield, Trash2, UserX, UserCheck, Search, Filter } from 'lucide-react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get('/admin/user');
            if (res.data?.success || res.data?.data) {
                setUsers(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            const res = await axiosInstance.patch(`/admin/user/${userId}/status`, {
                isActive: !currentStatus
            });
            if (res.data?.success) {
                fetchUsers();
            }
        } catch (err) {
            console.error("Failed to update user status", err);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            const res = await axiosInstance.delete(`/admin/user/${userId}`);
            if (res.data?.success) {
                setUsers(prev => prev.filter(u => u._id !== userId));
            }
        } catch (err) {
            console.error("Failed to delete user", err);
        }
    };

    const filteredUsers = users.filter(user => 
        user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h1 className="text-3xl font-black tracking-tight text-tarmac-900 italic">User Management</h1>
                    <p className="text-tarmac-500 font-medium">Manage all registered members and their account status.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tarmac-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-tarmac-100 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all w-64 sm:w-80 text-sm font-medium"
                        />
                    </div>
                </div>
            </header>

            <div className="bg-white border border-tarmac-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-tarmac-50/50 border-b border-tarmac-100">
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Member Info</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Role</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Joined Date</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[11px] font-black text-tarmac-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-tarmac-50">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-tarmac-400 italic">
                                        {searchTerm ? "No users match your search..." : "No users found in database."}
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-tarmac-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-tarmac-50">
                                                    <span className="font-bold text-primary-700 text-xs">
                                                        {user.fullname?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-tarmac-900 mb-0.5">{user.fullname}</h4>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-tarmac-400">
                                                        <Mail size={12} />
                                                        <span>{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                                user.role === 'admin' ? 'bg-tarmac-900 text-white' : 
                                                user.role === 'owner' ? 'bg-primary-100 text-primary-700' : 
                                                'bg-tarmac-100 text-tarmac-600'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-xs font-bold text-tarmac-500">
                                                <Calendar size={14} className="text-tarmac-300" />
                                                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${
                                                user.isActive ? 'bg-green-100 text-green-600 border-green-200' : 'bg-red-100 text-red-600 border-red-200'
                                            }`}>
                                                {user.isActive ? 'Active' : 'Banned'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleToggleStatus(user._id, user.isActive)}
                                                    title={user.isActive ? "Deactivate User" : "Activate User"}
                                                    className={`p-2 rounded-lg transition-all shadow-sm ${
                                                        user.isActive ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'
                                                    } bg-white`}
                                                >
                                                    {user.isActive ? <UserX size={18} /> : <UserCheck size={18} />}
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    title="Delete User"
                                                    className="p-2 text-red-500 hover:bg-red-50 bg-white rounded-lg transition-all shadow-sm"
                                                >
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

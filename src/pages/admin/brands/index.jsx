import React, { useState, useEffect } from "react";
import AddBrandFrom from "../../../component/admin/addBrand";
import { Calendar, Search, Filter } from "lucide-react";
import axiosInstance from '../../../api/axiosInstance';

export default function AddBrandsPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBrands() {
            try {
                const response = await axiosInstance.get('/brand/brands');
                setBrands(Array.isArray(response.data) ? response.data : (response.data.brands || []));
            } catch (error) {
                console.error("Failed to fetch brands", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBrands();
    }, []);

    if (loading) return <div>Loading brands...</div>;

    return (
        <div className="h-screen bg-tarmac-50 font-sans text-tarmac-900 overflow-hidden relative">

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-125 h-125     bg-secondary-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="h-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col">

                {/* ===== PAGE HEADER ===== */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 shrink-0">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight uppercase italic mb-2">
                            Manage{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-secondary-600">
                                Brands
                            </span>
                        </h1>
                        <p className="text-tarmac-500 font-medium">
                            Add and edit vehicle manufacturers in the system.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-tarmac-200 rounded-full shadow-sm">
                            <Search size={18} className="text-tarmac-400" />
                            <input
                                type="text"
                                placeholder="Search brands..."
                                className="outline-none text-sm text-tarmac-700 placeholder-tarmac-400"
                            />
                        </div>

                        <button className="flex items-center gap-2 bg-white border border-tarmac-200 text-tarmac-700 px-4 py-2 rounded-full font-bold text-sm hover:bg-tarmac-50 transition-colors">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* ===== MAIN GRID ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">

                    {/* LEFT — ADD BRAND (STICKY) */}
                    <div className="lg:col-span-4 sticky top-0 self-start">
                        <AddBrandFrom />
                    </div>

                    {/* RIGHT — BRAND LIST (SCROLLABLE) */}
                    <div className="lg:col-span-8 overflow-y-auto pr-2">
                        <div className="bg-white rounded-3xl shadow-lg border border-tarmac-100 flex flex-col">

                            {/* List Header */}
                            <div className="p-6 border-b border-tarmac-100 flex justify-between items-center bg-tarmac-50 sticky top-0 z-10">
                                <h3 className="font-bold text-tarmac-800 text-lg">
                                    Active Brands
                                </h3>
                                <span className="bg-primary-100 text-primary-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                                    Total: {brands.length}
                                </span>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-tarmac-50/50 border-b border-tarmac-100">
                                        <tr>
                                            <th className="px-6 py-4 text-[11px] font-black text-tarmac-400 uppercase tracking-wider">Brand Details</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-tarmac-400 uppercase tracking-wider">Origin</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-tarmac-400 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-tarmac-100">
                                        {brands.map((brand) => (
                                            <tr
                                                key={brand._id}
                                                className="hover:bg-primary-50/30 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden border border-tarmac-200 shadow-sm group-hover:border-primary-200 group-hover:shadow-md transition-all">
                                                            {brand.logo ? (
                                                                <img
                                                                    src={brand.logo?.url || brand.logo}
                                                                    alt={brand.name}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <span className="text-tarmac-300 text-xs font-bold">
                                                                    N/A
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="block font-bold text-tarmac-900">
                                                                {brand.name}
                                                            </span>
                                                            <span className="text-xs text-tarmac-400 font-medium">
                                                                ID: {brand._id.toString().slice(-4)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-tarmac-600 bg-tarmac-100 px-2.5 py-1 rounded-md">
                                                        {brand.country || "Unknown"}
                                                    </span>
                                                </td>


                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-xs font-bold text-primary-600 hover:text-primary-800 hover:underline">
                                                        Delete
                                                    </button>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-xs font-bold text-primary-600 hover:text-primary-800 hover:underline">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {brands.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-16 text-center text-tarmac-400 italic"
                                                >
                                                    No brands found in the database.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

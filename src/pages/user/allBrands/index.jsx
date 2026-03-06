import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

export default function AllBrandsPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBrands() {
            try {
                // Address 304 caching issue by forcing no-cache
                const response = await axiosInstance.get('/brand/brands', {
                    headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' }
                });
                setBrands(Array.isArray(response.data) ? response.data : (response.data.brands || []));
            } catch (error) {
                console.error("Failed to fetch brands", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBrands();
    }, []);

    if (loading) return <div className="py-12 text-center text-tarmac-500">Loading brands...</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-black text-tarmac-900 mb-6 uppercase italic">
                All <span className="text-primary-600">Brands</span>
            </h1>
            <p className="text-tarmac-500 mb-8">
                Explore our fine selection of brands to find your perfect car.
            </p>

            {brands.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {brands.map((brand) => (
                        <div
                            key={brand._id || brand.id}
                            className="bg-white rounded-xl shadow-sm border border-tarmac-100 p-4 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-md hover:border-primary-100 transition-all duration-300 group"
                            onClick={() => navigate(`/brand/${brand._id || brand.id}`)}
                        >
                            <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img
                                    src={brand.logo?.url || brand.logo}
                                    alt={brand.name}
                                    className="max-w-full max-h-full object-contain drop-shadow-sm"
                                />
                            </div>
                            <span className="text-sm font-bold text-tarmac-700 group-hover:text-primary-600 transition-colors text-center w-full block">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-tarmac-400 py-12">No brands found.</p>
            )}
        </div>
    );
}

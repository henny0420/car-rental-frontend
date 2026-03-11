import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    ChevronDown,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import axiosInstance from '../../../api/axiosInstance';
import { CarCard } from '../../../component/cards/car';

export default function ExploreCars() {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [maxPrice, setMaxPrice] = useState(1000);
    const [transmission, setTransmission] = useState('All');
    const [sortBy, setSortBy] = useState('Recommended');

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await axiosInstance.get('/car/all-cars', {
                    headers: { 'Cache-Control': 'no-cache' }
                });
                const fetchedCars = response.data.cars || [];
                const mappedCars = fetchedCars.map(c => ({
                    id: c._id,
                    badge: c.carType || "Standard",
                    image: c.coverImage?.url || c.galleryImages?.[0]?.url || "https://via.placeholder.com/400x300",
                    name: c.name,
                    year: c.model,
                    subtitle: c.brand?.name || "Unknown Brand",
                    mileage: "10k ml",
                    fuel: c.features?.fuelType || "Petrol",
                    transmission: c.features?.transmission || "Auto",
                    price: c.pricePerHour,
                }));
                setCars(mappedCars);
            } catch (error) {
                console.error("Failed to fetch cars", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    }, []);

    // Derived Filtered & Sorted Array
    const filteredCars = cars
        .filter(car => {
            const matchesSearch = (car.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesType = selectedType === 'All' || car.badge?.toLowerCase() === selectedType.toLowerCase();
            const matchesPrice = car.price <= maxPrice;
            const matchesTrans = transmission === 'All' || car.transmission?.toLowerCase().includes(transmission.toLowerCase());

            return matchesSearch && matchesType && matchesPrice && matchesTrans;
        })
        .sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.price - b.price;
            if (sortBy === 'Price: High to Low') return b.price - a.price;
            // Return 0 for 'Recommended' / 'Newest Arrivals' unless backend supplies date/rating.
            return 0;
        });

    return (
        <div className="bg-slate-50 min-h-screen font-sans">

            {/* --- PAGE HEADER --- */}
            <div className="bg-slate-900 py-16 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tight mb-4">
                        Explore Our <span className="text-primary-500">Fleet</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                        Find the perfect vehicle for your next adventure. From rugged SUVs to exhilarating sports cars, our premium collection is ready for you.
                    </p>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">

                {/* --- SIDEBAR FILTERS --- */}
                {/* Mobile Filter Toggle */}
                <button
                    className="lg:hidden w-full flex items-center justify-center gap-2 bg-white p-4 rounded-xl shadow-sm border border-slate-200 font-bold text-slate-800"
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                    <SlidersHorizontal size={20} />
                    {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
                </button>

                <aside className={`w-full lg:w-1/4 lg:block flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                <Filter size={18} className="text-primary-500" /> Filters
                            </h2>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedType('All');
                                    setMaxPrice(1000);
                                    setTransmission('All');
                                    setSortBy('Recommended');
                                }}
                                className="text-xs font-bold text-slate-400 hover:text-primary-500 transition-colors"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Make or Model..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                                />
                                <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                            </div>
                        </div>

                        {/* Car Type */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Car Type</label>
                            <div className="flex flex-col gap-3">
                                {['All', 'Sports', 'SUV', 'Sedan', 'Coupe', 'Van'].map((type, idx) => {
                                    const isActive = selectedType === type;
                                    return (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedType(type)}>
                                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isActive ? 'bg-primary-500 border-primary-500' : 'bg-slate-50 border-slate-200 group-hover:border-primary-400'}`}>
                                                {isActive && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <span className={`text-sm font-medium ${isActive ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{type}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Price Range (Up to ${maxPrice}/Day)</label>
                            <input
                                type="range"
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                min="50" max="1000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                            <div className="flex justify-between text-xs font-bold text-slate-500 mt-2">
                                <span>$50</span>
                                <span>$1000+</span>
                            </div>
                        </div>

                        {/* Transmission */}
                        <div className="mb-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Transmission</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setTransmission(transmission === 'Auto' ? 'All' : 'Auto')}
                                    className={`py-2 font-bold text-sm rounded-xl transition-colors ${transmission === 'Auto' ? 'bg-primary-50 border border-primary-200 text-primary-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    Auto
                                </button>
                                <button
                                    onClick={() => setTransmission(transmission === 'Manual' ? 'All' : 'Manual')}
                                    className={`py-2 font-bold text-sm rounded-xl transition-colors ${transmission === 'Manual' ? 'bg-primary-50 border border-primary-200 text-primary-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    Manual
                                </button>
                            </div>
                        </div>

                    </div>
                </aside>

                {/* --- CAR GRID AREA --- */}
                <main className="w-full lg:w-3/4 flex flex-col">

                    {/* Top Bar: Results count & Sort */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <p className="text-slate-500 font-medium">
                            Showing <span className="font-bold text-slate-900">1-{filteredCars.length}</span> of <span className="font-bold text-slate-900">{filteredCars.length}</span> results
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-400">Sort by:</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-sm font-bold text-slate-800 focus:outline-none focus:border-primary-400 cursor-pointer shadow-sm"
                                >
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest Arrivals</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="text-center py-20 text-slate-500 font-bold">Loading cars...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                            {filteredCars.length > 0 ? (
                                filteredCars.map(car => (
                                    <CarCard key={car.id} car={car} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-white border border-slate-200 rounded-2xl text-slate-500 font-medium">
                                    No cars found matching your filters.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-auto">
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500 text-white font-bold shadow-md shadow-primary-500/20">
                            1
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors">
                            2
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    </div>

                </main>

            </div>
        </div>
    );
}
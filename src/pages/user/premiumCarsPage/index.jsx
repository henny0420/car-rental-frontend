import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { CarCard } from '../../../component/cards/car';

export default function PremiumCarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await axiosInstance.get('/car/all-cars', {
                    headers: { 'Cache-Control': 'no-cache' }
                });
                const fetchedCars = response.data.cars || [];
                const mappedCars = fetchedCars.map(c => ({
                    id: c._id,
                    badge: c.carType || "Premium",
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

    if (loading) return <div className="py-20 text-center text-tarmac-500 font-bold">Loading Premium Cars...</div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-tarmac-900 uppercase italic tracking-tighter">
                    Premium <span className="text-primary-600">Collection</span>
                </h1>
                <p className="text-tarmac-500 mt-2 font-medium">
                    Explore our complete inventory of top-tier vehicles.
                </p>
            </div>

            {cars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-tarmac-100 shadow-sm">
                    <p className="text-tarmac-500 font-medium">No cars currently available in this category.</p>
                </div>
            )}
        </div>
    );
}

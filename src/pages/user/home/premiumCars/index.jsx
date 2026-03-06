import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarCard } from '../../../../component/cards/car';
import axiosInstance from '../../../../api/axiosInstance';

export function PremiumCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await axiosInstance.get('/car/all-cars', {
                    headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' }
                });
                const fetchedCars = response.data.cars || [];
                // Map backend data to what CarCard expects
                const mappedCars = fetchedCars.map(c => ({
                    id: c._id,
                    badge: c.carType || "Premium",
                    image: c.coverImage?.url || c.galleryImages?.[0]?.url || "https://via.placeholder.com/400x300",
                    name: c.name,
                    year: c.model,
                    subtitle: c.brand?.name || "Unknown Brand",
                    mileage: "10k ml", // placeholder as not provided by backend
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

    if (loading) return <div className="py-12 text-center text-tarmac-500">Loading premium cars...</div>;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <section className="py-16 bg-tarmac-50 font-sans relative z-20">
            <div className="container mx-auto px-4">

                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-tarmac-900 italic tracking-tighter">
                            PREMIUM <span className="text-primary-600">COLLECTION</span>
                        </h2>
                        <p className="text-sm font-medium text-tarmac-500 mt-2">
                            Discover our most sought-after vehicles for your next adventure.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/premium-cars')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-tarmac-200 rounded-xl text-sm font-bold text-tarmac-700 hover:text-primary-600 hover:border-primary-200 shadow-sm transition-all"
                    >
                        See More <ChevronRight size={16} />
                    </button>
                </div>

                {/* Cars Slider */}
                <div className="w-full">
                    {cars.length > 0 ? (
                        <div className="-mx-4">
                            <Slider {...settings}>
                                {cars.map((car) => (
                                    <div key={car.id} className="px-3 py-2">
                                        <CarCard car={car} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <p className="text-center text-tarmac-400 py-10 bg-white rounded-2xl border border-tarmac-100">No premium cars found.</p>
                    )}
                </div>

            </div>
        </section>
    );
}

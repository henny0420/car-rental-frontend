import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, CalendarCheck, Car as CarIcon,
    ChevronLeft, Heart, Users, Settings2, Gauge, Fuel, Share2, Info, X, Calendar,
    CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';
import axiosInstance from '../../../api/axiosInstance';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFavourites } from '../../../context/FavouritesContext';
import { useSession } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function SingleCarPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toggleFavourite, isFavourite } = useFavourites();
    const { status } = useSession();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('specs');

    // Booking Modal State
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingData, setBookingData] = useState({
        bookingDate: '',
        endingDate: '',
        couponCode: ''
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingMessage, setBookingMessage] = useState({ type: '', text: '' });
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, [car]);

    useEffect(() => {
        async function fetchCarDetails() {
            try {
                const response = await axiosInstance.get(`/car/${id}`);
                setCar(response.data.car);
            } catch (error) {
                console.error("Failed to fetch car details", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCarDetails();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setBookingLoading(true);
        setBookingMessage({ type: '', text: '' });

        try {
            const response = await axiosInstance.post('/booking/book', {
                carId: car._id || car.id,
                ...bookingData
            });
            setBookingMessage({ type: 'success', text: response.data.message });
            setTimeout(() => {
                setIsBookingModalOpen(false);
                navigate('/my-bookings');
            }, 2000);
        } catch (error) {
            setBookingMessage({
                type: 'error',
                text: error.response?.data?.message || "Something went wrong. Please try again."
            });
        } finally {
            setBookingLoading(false);
        }
    };

    const isFav = car ? isFavourite(car._id || car.id) : false;

    if (loading) return <div className="py-24 text-center text-tarmac-500 font-bold text-xl">Loading car details...</div>;
    if (!car) return <div className="py-24 text-center text-red-500 font-bold text-xl">Car not found.</div>;

    // Combine images for the gallery slider.
    const galleryImages = [
        ...(car.coverImage ? [car.coverImage] : []),
        ...(car.galleryImages || [])
    ];

    // Set responsive slide count for thumbnails to avoid empty gaps
    const thumbCount = Math.min(galleryImages.length, 5);

    return (
        <div className="bg-tarmac-50 min-h-screen pt-12 pb-24 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-tarmac-500 hover:text-primary-600 font-bold mb-6 transition-colors"
                >
                    <ChevronLeft size={20} /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Gallery & Tabs */}
                    <div className="lg:col-span-2 flex flex-col gap-8">

                        {/* Title (Mobile only) */}
                        <div className="lg:hidden">
                            <h1 className="text-3xl font-black text-tarmac-900 leading-tight mb-2">{car.name}</h1>
                            <p className="text-lg text-tarmac-500 font-medium">{car.brand?.name} • {car.model}</p>
                        </div>

                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl shadow-sm border border-tarmac-100 p-4">
                            {galleryImages.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {/* Main Image Slider */}
                                    <Slider
                                        asNavFor={nav2}
                                        ref={sliderRef1}
                                        arrows={true}
                                        fade={true}
                                        className="w-full"
                                    >
                                        {galleryImages.map((img, idx) => (
                                            <div key={`main-${idx}`} className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-tarmac-100">
                                                <img src={img.url} alt={`${car.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </Slider>

                                    {/* Sub-images / Thumbnails nav slider */}
                                    {galleryImages.length > 1 && (
                                        <div className="-mx-2 pl-2 overflow-hidden">
                                            <Slider
                                                asNavFor={nav1}
                                                ref={sliderRef2}
                                                slidesToShow={thumbCount}
                                                swipeToSlide={true}
                                                focusOnSelect={true}
                                                arrows={false}
                                                centerMode={galleryImages.length > thumbCount}
                                            >
                                                {galleryImages.map((img, idx) => (
                                                    <div key={`thumb-${idx}`} className="px-2">
                                                        <div className="aspect-[16/9] rounded-lg overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all cursor-pointer opacity-70 hover:opacity-100 slick-current:opacity-100">
                                                            <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-[16/9] flex items-center justify-center bg-tarmac-100 rounded-xl text-tarmac-400">
                                    No images available
                                </div>
                            )}
                        </div>

                        {/* Details Tabs Segment */}
                        <div className="bg-white rounded-2xl shadow-sm border border-tarmac-100 overflow-hidden">
                            {/* Tab Headers */}
                            <div className="flex border-b border-tarmac-100">
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`flex-1 py-4 font-bold text-center border-b-2 transition-all ${activeTab === 'specs' ? 'border-primary-600 text-primary-600' : 'border-transparent text-tarmac-500 hover:text-tarmac-700'}`}
                                >
                                    Specifications
                                </button>
                                <button
                                    onClick={() => setActiveTab('features')}
                                    className={`flex-1 py-4 font-bold text-center border-b-2 transition-all ${activeTab === 'features' ? 'border-primary-600 text-primary-600' : 'border-transparent text-tarmac-500 hover:text-tarmac-700'}`}
                                >
                                    Features
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6 md:p-8">
                                {activeTab === 'specs' && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-tarmac-400">Body Type</span>
                                            <span className="font-bold text-tarmac-900 flex items-center gap-2"><CarIcon size={16} /> {car.carType || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-tarmac-400">Transmission</span>
                                            <span className="font-bold text-tarmac-900 flex items-center gap-2"><Settings2 size={16} /> {car.features?.transmission || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-tarmac-400">Fuel Type</span>
                                            <span className="font-bold text-tarmac-900 flex items-center gap-2"><Fuel size={16} /> {car.features?.fuelType || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-tarmac-400">Seating</span>
                                            <span className="font-bold text-tarmac-900 flex items-center gap-2"><Users size={16} /> {car.features?.seatingCapacity || 'N/A'} Persons</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-tarmac-400">Color</span>
                                            <span className="font-bold text-tarmac-900 flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full border border-tarmac-200" style={{ backgroundColor: car.features?.color?.toLowerCase() || '#ccc' }}></div>
                                                {car.features?.color || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-tarmac-400">Mileage (Est.)</span>
                                            <span className="font-bold text-tarmac-900 flex items-center gap-2"><Gauge size={16} /> 10,000 km</span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'features' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 p-4 bg-tarmac-50 rounded-xl">
                                            <div className={`w-3 h-3 rounded-full ${car.features?.hasAC ? 'bg-green-500' : 'bg-red-400'}`}></div>
                                            <span className="font-bold text-tarmac-700">Air Conditioning</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-tarmac-50 rounded-xl">
                                            <div className={`w-3 h-3 rounded-full ${car.features?.hasGPS ? 'bg-green-500' : 'bg-red-400'}`}></div>
                                            <span className="font-bold text-tarmac-700">GPS Navigation</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-tarmac-50 rounded-xl">
                                            <div className={`w-3 h-3 rounded-full ${car.features?.bluetooth ? 'bg-green-500' : 'bg-red-400'}`}></div>
                                            <span className="font-bold text-tarmac-700">Bluetooth</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Price & Booking */}
                    <div className="flex flex-col gap-6">

                        {/* Title (Desktop) */}
                        <div className="hidden lg:block bg-white rounded-2xl p-6 border border-tarmac-100 shadow-sm">
                            <h1 className="text-3xl font-black text-tarmac-900 leading-tight mb-2">{car.name}</h1>
                            <div className="flex flex-wrap items-center gap-3 text-tarmac-500 font-medium">
                                <span className="px-3 py-1 bg-tarmac-100 rounded-full text-xs font-bold text-tarmac-700 uppercase tracking-wide">{car.brand?.name}</span>
                                <span>•</span>
                                <span>{car.model}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {car.location?.city || 'Not Specified'}</span>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <div className="bg-white rounded-2xl shadow-lg shadow-tarmac-900/5 border border-primary-100 p-6 sticky top-24">
                            <div className="flex items-end gap-1 mb-6 pb-6 border-b border-tarmac-100">
                                <span className="text-4xl font-black text-primary-600">₹{car.pricePerDay || car.pricePerHour}</span>
                                <span className="text-tarmac-400 font-bold mb-1">/ per day</span>
                            </div>

                            <div className="flex flex-col gap-3 mb-6">
                                <button
                                    onClick={() => {
                                        if (status === 'authenticated') {
                                            setIsBookingModalOpen(true);
                                        } else {
                                            toast.info("Please sign in to book a car");
                                            navigate('/signin');
                                        }
                                    }}
                                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-xl shadow-lg shadow-primary-600/20 transition-all transform hover:-translate-y-1"
                                >
                                    Book This Car
                                </button>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            if (status === 'authenticated') {
                                                toggleFavourite(car);
                                            } else {
                                                toast.info("Please sign in to add to favourites");
                                                navigate('/signin');
                                            }
                                        }}
                                        className={`flex-1 py-3 border-2 rounded-xl flex items-center justify-center gap-2 transition-colors font-bold ${isFav ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-tarmac-200 text-tarmac-600 hover:border-primary-500 hover:text-primary-600'}`}
                                    >
                                        <Heart size={18} fill={isFav ? "currentColor" : "none"} /> {isFav ? 'Saved' : 'Save'}
                                    </button>
                                    <button className="flex-1 py-3 bg-white border-2 border-tarmac-200 hover:border-primary-500 hover:text-primary-600 text-tarmac-600 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                                        <Share2 size={18} /> Share
                                    </button>
                                </div>
                            </div>

                            {/* Owner Info block */}
                            <div className="p-4 bg-tarmac-50 rounded-xl border border-tarmac-100">
                                <p className="text-xs font-bold text-tarmac-400 uppercase tracking-widest mb-3">Owner Details</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-black text-lg">
                                        {car.createdBy?.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-tarmac-900">{car.createdBy?.name || 'Unknown Owner'}</p>
                                        <p className="text-xs font-medium text-tarmac-500">{car.createdBy?.email}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* BOOKING MODAL */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-tarmac-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-tarmac-50 flex justify-between items-center bg-tarmac-50/50">
                            <div>
                                <h3 className="text-xl font-black text-tarmac-900">Book Your Drive</h3>
                                <p className="text-xs font-bold text-tarmac-400 uppercase tracking-widest">{car.name}</p>
                            </div>
                            <button
                                onClick={() => setIsBookingModalOpen(false)}
                                className="p-2 hover:bg-white rounded-full text-tarmac-400 hover:text-tarmac-900 transition-colors shadow-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleBooking} className="p-8">
                            <div className="space-y-6">
                                {/* Date Range */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-tarmac-400 ml-1">Pickup Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-tarmac-400" size={16} />
                                            <input
                                                type="date"
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full pl-10 pr-4 py-3 bg-tarmac-50 border border-tarmac-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                                value={bookingData.bookingDate}
                                                onChange={(e) => setBookingData({ ...bookingData, bookingDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-tarmac-400 ml-1">Return Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-tarmac-400" size={16} />
                                            <input
                                                type="date"
                                                required
                                                min={bookingData.bookingDate || new Date().toISOString().split('T')[0]}
                                                className="w-full pl-10 pr-4 py-3 bg-tarmac-50 border border-tarmac-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                                value={bookingData.endingDate}
                                                onChange={(e) => setBookingData({ ...bookingData, endingDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-tarmac-600">Price per day</span>
                                        <span className="text-sm font-black text-primary-700">₹{car.pricePerDay || car.pricePerHour}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-primary-200/50">
                                        <span className="text-sm font-black text-tarmac-900">Estimated Total</span>
                                        <span className="text-lg font-black text-primary-600">Calculated at Checkout</span>
                                    </div>
                                </div>

                                {bookingMessage.text && (
                                    <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${bookingMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                        {bookingMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                        {bookingMessage.text}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={bookingLoading}
                                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-black rounded-2xl shadow-xl shadow-primary-600/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    {bookingLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Confirm Booking <ChevronRight size={18} /></>
                                    )}
                                </button>
                                <p className="text-[10px] text-center text-tarmac-400 font-bold uppercase tracking-widest">No credit card required to book</p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

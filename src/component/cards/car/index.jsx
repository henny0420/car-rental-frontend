import { useNavigate } from 'react-router-dom';
import { MapPin, CalendarCheck, Car, ChevronRight, Heart, Users, Settings2, Gauge, Fuel, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useFavourites } from '../../../context/FavouritesContext';
import { useSession } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
export function CarCard({ car }) {
    const navigate = useNavigate();
    const { toggleFavourite, isFavourite } = useFavourites();
    const { status } = useSession();
    const isFav = isFavourite(car.id || car._id);

    return (
        <div className="group bg-white rounded-2xl border border-tarmac-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-tarmac-200 transition-all duration-300 flex flex-col relative">

            {/* Image Container (Flush to edges) */}
            <div className="relative h-52 w-full bg-tarmac-50 overflow-hidden">

                {/* Top Left Badge */}
                {car.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-sm">
                        {car.badge}
                    </div>
                )}

                {/* Top Right Wishlist */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (status === 'authenticated') {
                            toggleFavourite(car);
                        } else {
                            toast.info("Please sign in to add to favourites");
                            navigate('/signin');
                        }
                    }}
                    className={`absolute top-3 right-3 z-10 p-2 backdrop-blur-sm rounded-full transition-all shadow-sm ${isFav ? 'bg-primary-600 text-white' : 'bg-white/90 text-tarmac-400 hover:text-primary-600 hover:bg-primary-50'}`}
                >
                    <Heart size={16} strokeWidth={2.5} fill={isFav ? "currentColor" : "none"} />
                </button>

                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Details Area */}
            <div className="p-5 flex flex-col flex-grow">

                {/* Car Name & Year */}
                <h3 className="text-lg font-black text-tarmac-900 mb-1 line-clamp-1">
                    {car.name} <span className="font-normal text-tarmac-500">– {car.year}</span>
                </h3>

                {/* Subtitle */}
                <p className="text-xs font-medium text-tarmac-400 mb-4 line-clamp-1">
                    {car.subtitle}
                </p>

                {/* Specs Row */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-tarmac-100 mb-5">
                    <div className="flex flex-col items-center justify-center gap-2 text-tarmac-500">
                        <Gauge size={18} strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-tarmac-600">{car.mileage}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 text-tarmac-500">
                        <Fuel size={18} strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-tarmac-600">{car.fuel}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 text-tarmac-500">
                        <Settings2 size={18} strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-tarmac-600">{car.transmission}</span>
                    </div>
                </div>

                {/* Bottom Row: Price & Book Now */}
                <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-tarmac-900">₹{car.price}<span className='text-tarmac-400 font-normal text-sm'>  /per day</span></span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/car/${car.id || car._id}`)}
                            className="px-4 py-2 bg-primary-600 text-white font-bold text-sm rounded-lg hover:bg-primary-700 shadow-md shadow-primary-600/20 transition-all duration-300"
                        >
                            Rent Now
                        </button>
                    </div>
                </div>
                <div className='flex gap-1 items-center justify-flex-end hover:underline'>
                    <button onClick={() => navigate(`/car/${car.id || car._id}`)}
                        className="  block ml-auto mt-2 text-tarmac-700  text-xs rounded-lg  transition-all duration-300"
                    >
                        View Details
                    </button>
                    <ArrowUpRight size={16} strokeWidth={2} className='mt-2' />
                </div>
            </div>
        </div>
    );
}
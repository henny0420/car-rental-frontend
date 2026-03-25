import React from 'react';
import { useFavourites } from '../../../context/FavouritesContext';
import { CarCard } from '../../../component/cards/car';
import { Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FavouritesPage() {
    const { favourites } = useFavourites();
    const navigate = useNavigate();

    return (
        <div className="bg-tarmac-50 min-h-screen py-12 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-tarmac-900 mb-2">My Favourites</h1>
                        <p className="text-tarmac-500 font-medium">Cars you've saved for later.</p>
                    </div>
                    {favourites.length > 0 && (
                        <button
                            onClick={() => navigate('/explore')}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-tarmac-200 rounded-xl font-bold text-tarmac-700 hover:border-primary-500 hover:text-primary-600 transition-all shadow-sm"
                        >
                            Explore More <ArrowRight size={18} />
                        </button>
                    )}
                </div>

                {favourites.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-tarmac-100 shadow-xl shadow-tarmac-900/5 max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-primary-50 text-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                            <Heart size={40} fill="currentColor" className="opacity-20" />
                        </div>
                        <h2 className="text-2xl font-black text-tarmac-900 mb-4">Your wishlist is empty</h2>
                        <p className="text-tarmac-500 mb-8 max-w-md mx-auto leading-relaxed">
                            Start exploring our premium collection and save your favorite cars to view them later.
                        </p>
                        <button
                            onClick={() => navigate('/explore')}
                            className="px-8 py-4 bg-primary-600 text-white font-black rounded-2xl shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all transform hover:-translate-y-1"
                        >
                            Start Exploring
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favourites.map((car) => (
                            <CarCard key={car.id || car._id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

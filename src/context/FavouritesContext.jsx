import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState([]);

    // Load favourites from LocalStorage on mount
    useEffect(() => {
        const storedFavourites = localStorage.getItem('car_favourites');
        if (storedFavourites) {
            try {
                setFavourites(JSON.parse(storedFavourites));
            } catch (error) {
                console.error("Failed to parse favourites from localStorage", error);
            }
        }
    }, []);

    // Save favourites to LocalStorage whenever they change
    useEffect(() => {
        localStorage.setItem('car_favourites', JSON.stringify(favourites));
    }, [favourites]);

    const toggleFavourite = (car) => {
        setFavourites(prev => {
            const isFav = prev.some(item => (item.id === car.id || item._id === car._id));
            if (isFav) {
                return prev.filter(item => (item.id !== car.id && item._id !== car._id));
            } else {
                return [...prev, car];
            }
        });
    };

    const isFavourite = (carId) => {
        return favourites.some(item => (item.id === carId || item._id === carId));
    };

    return (
        <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export const useFavourites = () => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
};

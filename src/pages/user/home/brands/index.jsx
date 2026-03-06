import React, { useState, useEffect } from 'react';
import { MapPin, CalendarCheck, Car, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosInstance';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function BrandsSlider() {
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <section className="py-12 bg-white border-b border-tarmac-100 font-sans relative z-20 shadow-sm overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8 px-4">
          <p className="text-xs font-bold text-primary-600 uppercase tracking-widest hidden md:block">
            Choose from the world's finest brands
          </p>
          <p className="text-xs font-bold text-primary-600 uppercase tracking-widest md:hidden">
            Finest Brands
          </p>
          <button
            onClick={() => navigate('/brands')}
            className="flex items-center gap-1 text-sm font-bold text-tarmac-500 hover:text-primary-600 transition-colors"
          >
            See More <ChevronRight size={16} />
          </button>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          {brands.length > 0 ? (
            <Slider {...settings}>
              {brands.map((brand) => (
                <div key={brand._id || brand.id} className="p-4 " onClick={() => navigate(`/brand/${brand._id || brand.id}`)}>
                  <div className="flex flex-col items-center gap-4 group cursor-pointer shadow-sm rounded-md p-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center   group-hover:grayscale group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                      <img
                        src={brand.logo?.url || brand.logo}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain drop-shadow-sm"
                      />
                    </div>
                    <span className="text-xs font-bold !text-tarmac-400 group-hover:!text-tarmac-900 transition-colors text-center w-full block">
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-tarmac-400">No brands found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
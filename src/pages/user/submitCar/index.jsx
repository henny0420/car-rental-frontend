import React, { useState, useEffect } from 'react';
import AddCarForm from "../../../component/owner/addCarForm";
import axiosInstance from '../../../api/axiosInstance';

export default function SubmitCarPage() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        async function fetchBrands() {
            try {
                const response = await axiosInstance.get('/brand/brands');
                setBrands(Array.isArray(response.data) ? response.data : (response.data.brands || []));
            } catch (error) {
                console.error("Failed to fetch brands", error);
            }
        }
        fetchBrands();
    }, []);

    return (
        <div className="pt-20">
            <AddCarForm brands={brands} />
        </div>
    )
}

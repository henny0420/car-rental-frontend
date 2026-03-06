import React from "react";
import HowItWorks from "./process";
import Herobanner from "./herobanner";
import { BrandsSlider } from "./brands";
import { PremiumCars } from "./premiumCars";
import WhyChooseUs from "./whyChooseUs.jsx";
import CustomerExperience from "./customerExperience/index.jsx";

export default function Home() {
    return (
        <div>
            <Herobanner />
            <BrandsSlider />
            <HowItWorks />
            <PremiumCars />
            <WhyChooseUs />
            <CustomerExperience />
        </div>
    );
}
'use client';

import React, { useState } from 'react';
import {
    Car,
    Check,
    Settings,
    DollarSign,
    Image as ImageIcon,
    Save,
    AlertCircle,
    FileText,
    MapPin,
    Gauge,
    ChevronRight,
    ChevronLeft,
    ShieldCheck,
    Clock,
    IndianRupee
} from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function AddCarForm({ brands = [] }) {
    console.log(brands);

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [coverFile, setCoverFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);

    const carTypes = ['sedan', 'suv', 'sports car', 'jeep', 'van', 'convertible', 'hatchback'];
    const fuelTypes = ['petrol', 'diesel', 'hybrid', 'ev', 'cng'];
    const transmissions = ['Manual', 'Automatic'];

    const initialFormState = {
        name: '',
        brand: '',
        model: '',
        carType: '',
        pricePerHour: '',
        registrationNumber: '',
        isActive: true,
        location: { city: '' },
        features: {
            color: '',
            transmission: '',
            fuelType: '',
            seatingCapacity: '',
            hasAC: false,
            hasGPS: false,
            bluetooth: false
        },
        documents: {
            insuranceValidTill: '',
            pollutionValidTill: ''
        },
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };



    const handleFeatureChange = (parentField, e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [parentField]: {
                ...prev[parentField],
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };


    const handleCoverChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCoverFile(e.target.files[0]); // Only ONE file
        }
    };

    const handleGalleryChange = (e) => {
        if (e.target.files) {
            if (e.target.files && e.target.files.length > 0) {
                const imagesToUpload = Array.from(e.target.files)
                setGalleryFiles(imagesToUpload);
                console.log(imagesToUpload);

            }
        }
    };

    const validateStep1 = () => {
        const required = [
            formData.name,
            formData.brand,
            formData.pricePerHour,
            formData.model,
            formData.registrationNumber,
            formData.location.city
        ];
        return required.every(field => field && field !== '');
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (validateStep1()) {
                setCurrentStep(2);
                window.scrollTo(0, 0);
            } else {
                alert("Please fill in all required basic details.");
            }
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submissionData = new FormData();

        submissionData.append("name", formData.name);
        submissionData.append("brand", formData.brand);
        submissionData.append("model", formData.model);
        submissionData.append("carType", formData.carType);
        submissionData.append("registrationNumber", formData.registrationNumber);
        submissionData.append("pricePerHour", formData.pricePerHour);
        submissionData.append("city", formData.location.city);
        submissionData.append("color", formData.features.color);
        submissionData.append("transmission", formData.features.transmission);
        submissionData.append("fuelType", formData.features.fuelType);
        submissionData.append("seatingCapacity", formData.features.seatingCapacity);

        if (formData.features.hasAC) submissionData.append("hasAC", "on");
        if (formData.features.hasGPS) submissionData.append("hasGPS", "on");
        if (formData.features.bluetooth) submissionData.append("bluetooth", "on");

        submissionData.append("insuranceValidTill", formData.documents.insuranceValidTill);
        submissionData.append("pollutionValidTill", formData.documents.pollutionValidTill);

        if (coverFile) {
            submissionData.append("cover", coverFile);
        }
        galleryFiles.forEach((file) => {
            submissionData.append("gallery", file);
        });

        try {
            const response = await axiosInstance.post('/car/add', submissionData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success || response.status === 201) {
                setCurrentStep(3); // Move to Success Step
                window.scrollTo(0, 0);
            } else {
                console.error(response.data.error || "Failed to create car");
                alert(response.data.error || "Failed to create car");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to create car");
        } finally {
            setLoading(false);
        }
    };

    // --- UI Components ---

    const Stepper = () => {
        const steps = [
            { num: 1, label: "Car Details", icon: Car },
            { num: 2, label: "Verify", icon: ShieldCheck },
            { num: 3, label: "Approval", icon: Clock },
        ];

        return (
            <div className="mb-12 relative">
                <div className="flex justify-between items-center relative z-10 max-w-2xl mx-auto">
                    {steps.map((step, idx) => {
                        const isActive = currentStep === step.num;
                        const isCompleted = currentStep > step.num;

                        return (
                            <div key={step.num} className="flex flex-col items-center gap-3">
                                <div
                                    className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500
                    ${isActive || isCompleted
                                            ? 'bg-white border-primary-600 shadow-lg shadow-primary-200 text-primary-600'
                                            : 'bg-white border-tarmac-200 text-tarmac-400'
                                        }
                  `}
                                >
                                    {isCompleted ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                                </div>
                                <span className={`text-sm font-medium tracking-wide ${isActive || isCompleted ? 'text-tarmac-900 font-bold' : 'text-tarmac-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Line */}
                <div className="absolute top-7 left-0 w-full h-[2px] bg-tarmac-200 -z-0">
                    <div
                        className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 transition-all duration-500 ease-out"
                        style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                    ></div>
                </div>
            </div>
        );
    };

    // Shared Styles using Theme Colors
    const inputClass = "w-full bg-white border border-tarmac-200 rounded-xl px-4 py-3 text-tarmac-900 placeholder-tarmac-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300 shadow-sm hover:border-tarmac-300";
    const labelClass = "text-tarmac-700 text-sm font-bold ml-1 mb-1 block uppercase tracking-wide text-[11px]";
    const sectionHeaderClass = "text-lg font-extrabold text-tarmac-900 border-b border-tarmac-100 pb-2 mb-6 mt-2 flex items-center gap-2";

    return (
        <div className="min-h-screen w-full relative bg-tarmac-50 p-4 md:p-12 font-sans overflow-hidden text-tarmac-800">

            {/* Background Effects using Primary/Secondary tints */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-100/40 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-2 tracking-tight text-tarmac-900 uppercase italic">
                        List Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Car</span>
                    </h1>
                    <p className="text-tarmac-500 font-medium">Add high-performance vehicles to the fleet.</p>
                </div>

                <Stepper />

                <div className="bg-white border border-tarmac-100 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-secondary-500"></div>

                    {/* STEP 1: FORM DETAILS */}
                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">

                            {/* --- Basic Info --- */}
                            <div>
                                <h2 className={sectionHeaderClass}>
                                    <Settings className="w-5 h-5 text-primary-600" /> Basic Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div>
                                        <label className={labelClass}>Car Name *</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="e.g. Tesla Model 3" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Brand *</label>
                                        <select name="brand" value={formData.brand} onChange={handleChange} className={`${inputClass} bg-white`}>
                                            <option value="">Select Brand</option>
                                            {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Model *</label>
                                        <input type="text" name="model" value={formData.model} onChange={handleChange} className={inputClass} placeholder="e.g. 2024 Long Range" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Registration No. *</label>
                                        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className={`${inputClass} uppercase`} placeholder="ABC-1234" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Body Type *</label>
                                        <select name="carType" value={formData.carType} onChange={handleChange} className={`${inputClass} bg-white capitalize`}>
                                            <option value="">Select Type</option>
                                            {carTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>City Location *</label>
                                        <input type="text" name="city" value={formData.location.city} onChange={(e) => handleFeatureChange('location', e)} className={inputClass} placeholder="e.g. New York" />
                                    </div>
                                </div>
                            </div>

                            {/* --- Specifications --- */}
                            <div>
                                <h2 className={sectionHeaderClass}>
                                    <Gauge className="w-5 h-5 text-secondary-600" /> Specifications
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className={labelClass}>Color</label>
                                        <input type="text" name="color" value={formData.features.color} onChange={(e) => handleFeatureChange('features', e)} className={inputClass} placeholder="e.g. Red" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Transmission *</label>
                                        <select name="transmission" value={formData.features.transmission} onChange={(e) => handleFeatureChange('features', e)} className={`${inputClass} bg-white`}>
                                            <option value="">Select</option>
                                            {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Fuel Type *</label>
                                        <select name="fuelType" value={formData.features.fuelType} onChange={(e) => handleFeatureChange('features', e)} className={`${inputClass} bg-white capitalize`}>
                                            <option value="">Select</option>
                                            {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Seats *</label>
                                        <input type="number" name="seatingCapacity" value={formData.features.seatingCapacity} onChange={(e) => handleFeatureChange('features', e)} className={inputClass} min="1" />
                                    </div>
                                </div>

                                {/* Feature Toggles */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                    {[
                                        { name: 'hasAC', label: 'Air Conditioning' },
                                        { name: 'hasGPS', label: 'GPS Navigation' },
                                        { name: 'bluetooth', label: 'Bluetooth' }
                                    ].map((feature) => (
                                        <label key={feature.name} className="relative flex items-center justify-between p-4 bg-tarmac-50 border border-tarmac-200 rounded-xl cursor-pointer hover:bg-primary-50 hover:border-primary-200 transition-all group">
                                            <span className="text-tarmac-600 group-hover:text-primary-700 transition-colors font-bold">{feature.label}</span>
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name={feature.name}
                                                    checked={formData.features[feature.name]}
                                                    onChange={(e) => handleFeatureChange('features', e)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-tarmac-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-tarmac-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* --- Documents & Images --- */}
                            <div>
                                <h2 className={sectionHeaderClass}>
                                    <FileText className="w-5 h-5 text-tarmac-700" /> Docs & Media
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className={labelClass}>Insurance Valid Till</label>
                                        <input type="date" name="insuranceValidTill" value={formData.documents.insuranceValidTill} onChange={(e) => handleFeatureChange('documents', e)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Pollution Valid Till</label>
                                        <input type="date" name="pollutionValidTill" value={formData.documents.pollutionValidTill} onChange={(e) => handleFeatureChange('documents', e)} className={inputClass} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Upload Cover Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleCoverChange}
                                        className="block w-full text-sm text-tarmac-500
                            file:mr-4 file:rounded-lg file:border-0
                            file:bg-primary-600 file:px-4 file:py-2
                            file:text-white hover:file:bg-primary-700
                            file:font-bold
                            cursor-pointer bg-white border border-tarmac-200 rounded-lg py-2 pl-2"
                                    />
                                    <p className="mt-2 text-xs text-tarmac-400 font-medium">Supported formats: JPG, PNG, GIF. Max size: 10MB per file.</p>
                                </div>
                                <div className='mt-4'>
                                    <label className={labelClass}>Upload Gallery Images</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryChange}
                                        className="block w-full text-sm text-tarmac-500
                            file:mr-4 file:rounded-lg file:border-0
                            file:bg-primary-600 file:px-4 file:py-2
                            file:text-white hover:file:bg-primary-700
                            file:font-bold
                            cursor-pointer bg-white border border-tarmac-200 rounded-lg py-2 pl-2"
                                    />
                                    <p className="mt-2 text-xs text-tarmac-400 font-medium">Supported formats: JPG, PNG, GIF. Max size: 10MB per file.</p>
                                </div>
                            </div>

                            {/* --- Pricing & Status --- */}
                            <div>
                                <h2 className={sectionHeaderClass}>
                                    <DollarSign className="w-5 h-5 text-success" /> Pricing
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>Price Per Hour ($) *</label>
                                        <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} className={inputClass} placeholder="0.00" />
                                    </div>
                                    {/* <div className="flex items-end">
                     <label className="w-full flex items-center justify-between p-3.5 bg-tarmac-50 border border-tarmac-200 rounded-xl cursor-pointer hover:border-success/30 transition-all">
                      <span className={`font-bold transition-colors ${formData.isActive ? 'text-success' : 'text-tarmac-400'}`}>
                        {formData.isActive ? 'Active Listing' : 'Inactive'}
                      </span>
                      <div className="relative">
                        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-tarmac-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-tarmac-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                      </div>
                    </label>
                  </div> */}
                                </div>
                            </div>

                            <div className="flex justify-end pt-8 border-t border-tarmac-100">
                                <button onClick={handleNext} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary-200 hover:shadow-primary-300 transform hover:-translate-y-0.5">
                                    Next Step <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: VERIFY */}
                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-tarmac-900 uppercase italic">
                                <ShieldCheck className="text-primary-600" /> Verify Specs
                            </h2>

                            <div className="bg-tarmac-50 rounded-2xl p-6 border border-tarmac-200 mb-8 space-y-4 text-sm md:text-base">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="col-span-1 md:col-span-2 border-b border-tarmac-200 pb-4">
                                        <h3 className="text-primary-600 font-bold mb-3 uppercase text-xs tracking-wider">Vehicle Identity</h3>
                                        <div className="flex justify-between mb-2"><span className="text-tarmac-500 font-medium">Name:</span> <span className="font-bold text-tarmac-900">{formData.name}</span></div>
                                        <div className="flex justify-between mb-2"><span className="text-tarmac-500 font-medium">Brand ID:</span> <span className="font-bold text-tarmac-900">{formData.brand}</span></div>
                                        <div className="flex justify-between mb-2"><span className="text-tarmac-500 font-medium">Model:</span> <span className="font-bold text-tarmac-900">{formData.model}</span></div>
                                        <div className="flex justify-between"><span className="text-tarmac-500 font-medium">Reg No:</span> <span className="uppercase font-bold text-tarmac-900 bg-tarmac-200 px-2 py-0.5 rounded">{formData.registrationNumber}</span></div>
                                    </div>

                                    <div className="col-span-1 md:col-span-2 border-b border-tarmac-200 pb-4">
                                        <h3 className="text-secondary-600 font-bold mb-3 uppercase text-xs tracking-wider">Specs & Location</h3>
                                        <div className="flex justify-between mb-2"><span className="text-tarmac-500 font-medium">Type:</span> <span className="capitalize font-bold text-tarmac-900">{formData.carType}</span></div>
                                        <div className="flex justify-between mb-2"><span className="text-tarmac-500 font-medium">Fuel/Trans:</span> <span className="capitalize font-bold text-tarmac-900">{formData.features.fuelType} / {formData.features.transmission}</span></div>
                                        <div className="flex justify-between mb-2"><span className="text-tarmac-500 font-medium">City:</span> <span className="font-bold text-tarmac-900">{formData.location.city}</span></div>
                                        <div className="flex justify-between"><span className="text-tarmac-500 font-medium">Features:</span>
                                            <div className="flex gap-2">
                                                {formData.features.hasAC && <span className="bg-tarmac-200 text-tarmac-800 px-2 py-0.5 rounded-md text-xs font-bold">AC</span>}
                                                {formData.features.hasGPS && <span className="bg-tarmac-200 text-tarmac-800 px-2 py-0.5 rounded-md text-xs font-bold">GPS</span>}
                                                {formData.features.bluetooth && <span className="bg-tarmac-200 text-tarmac-800 px-2 py-0.5 rounded-md text-xs font-bold">BT</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <h3 className="text-success font-bold mb-3 uppercase text-xs tracking-wider">Pricing & Status</h3>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-tarmac-500 font-medium">Rate:</span>
                                            <span className="font-black text-success text-xl"><IndianRupee />{formData.pricePerHour}<span className="text-sm font-bold text-tarmac-400">/hr</span></span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-tarmac-500 font-medium">Status:</span>
                                            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide bg-yellow-100 text-yellow-700 border border-yellow-200">
                                                Pending Approval
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-secondary-50 border border-secondary-200 rounded-xl mb-8">
                                <AlertCircle className="text-secondary-500 shrink-0" />
                                <p className="text-sm text-secondary-800 font-semibold">Please ensure all specs are correct. Once submitted, the listing will undergo an approval process.</p>
                            </div>

                            <div className="flex justify-between pt-4 border-t border-tarmac-100">
                                <button onClick={handleBack} className="text-tarmac-500 hover:text-tarmac-900 px-6 py-3 font-bold flex items-center gap-2 transition-colors">
                                    <ChevronLeft size={20} /> Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary-200 hover:shadow-primary-300 transform hover:-translate-y-0.5"
                                >
                                    {loading ? 'Submitting...' : 'Confirm & Submit'} <Save size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: APPROVAL */}
                    {currentStep === 3 && (
                        <div className="text-center py-12 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-xl shadow-green-50">
                                <Check className="w-12 h-12 text-success" strokeWidth={3} />
                            </div>
                            <h2 className="text-3xl font-black text-tarmac-900 mb-4 uppercase italic">Submission Successful!</h2>
                            <p className="text-tarmac-500 max-w-md mx-auto mb-8 leading-relaxed font-medium">
                                Your vehicle <span className="text-primary-600 font-bold">{formData.name}</span> has been sent for approval.
                                You will be notified once the admin team reviews the documents.
                            </p>

                            <div className="flex justify-center gap-4">
                                <button onClick={() => window.location.href = '/owner/dashboard'} className="px-6 py-3 rounded-xl bg-white border border-tarmac-200 text-tarmac-700 hover:bg-tarmac-50 font-bold transition-colors shadow-sm">
                                    Go to Dashboard
                                </button>
                                <button onClick={() => { setCurrentStep(1); setFormData(initialFormState); }} className="px-6 py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all">
                                    Add Another Car
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

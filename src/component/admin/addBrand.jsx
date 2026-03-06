import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react"
import { Plus, Globe, UploadCloud, Loader2 } from "lucide-react"
import axiosInstance from '../../api/axiosInstance';

export default function AddBrandFrom() {
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null)
    const navigate = useNavigate();

    const [brand, setBrand] = useState({})
    const [logoImage, setLogoImage] = useState(null)

    const handleInput = (ev) => {
        const { name, type, value } = ev.target
        setBrand(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImage = (ev) => {
        if (ev.target.files) {
            setLogoImage(ev.target.files[0])
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const brandFromData = new FormData()
        brandFromData.append('name', brand.name)
        brandFromData.append('country', brand.country)
        if (logoImage) {
            brandFromData.append('logo', logoImage)
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/brand/add', brandFromData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                setBrand({ name: '', country: '' });
                setLogoImage(null);
                if (fileInputRef.current) fileInputRef.current.value = "";

                // Refresh or navigate as needed
                alert("Brand added successfully!");
            } else {
                alert(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-tarmac-100 sticky top-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-600 to-secondary-500"></div>

            <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2 text-tarmac-900">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                </div>
                Add New Brand
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-tarmac-500 uppercase tracking-wider ml-1">Brand Name</label>
                    <input
                        name="name"
                        value={brand.name}
                        onChange={handleInput}
                        placeholder="e.g. Audi"
                        className="w-full bg-tarmac-50 border border-tarmac-200 rounded-xl px-4 py-3 text-tarmac-900 font-medium focus:outline-none focus:border-primary-500 transition-all placeholder-tarmac-400"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-tarmac-500 uppercase tracking-wider ml-1">Origin Country</label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-3.5 w-4 h-4 text-tarmac-400" />
                        <input
                            name="country"
                            value={brand.country}
                            onChange={handleInput}
                            placeholder="e.g. Germany"
                            className="w-full bg-tarmac-50 border border-tarmac-200 rounded-xl pl-10 pr-4 py-3 text-tarmac-900 font-medium focus:outline-none focus:border-primary-500 transition-all placeholder-tarmac-400"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-tarmac-500 uppercase tracking-wider ml-1">Logo Image</label>
                    <div className="mt-1 flex items-center justify-center w-full group">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-tarmac-200 border-dashed rounded-xl cursor-pointer bg-tarmac-50 group-hover:bg-primary-50 group-hover:border-primary-200 transition-all duration-300">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-5 h-5 text-primary-500" />
                                </div>
                                <p className="text-xs text-tarmac-500 font-medium group-hover:text-primary-700">
                                    {logoImage ? logoImage.name : "Click to upload logo"}
                                </p>
                                <p className="text-[10px] text-tarmac-400 mt-1">SVG, PNG, JPG (Max 2MB)</p>
                            </div>
                            <input
                                name="logo"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImage}
                                ref={fileInputRef}
                            />
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary-700 to-primary-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4" /> Save Brand</>}
                </button>
            </form>
        </div>
    );
}
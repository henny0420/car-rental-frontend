import React, { useState } from 'react';
import { Eye, EyeOff, Key, Car, Facebook, Gauge, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useSession } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

// Simple Google Icon Component
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// Simple Apple Icon Component (Updated color for Light Theme)
const AppleIcon = () => (
    <svg className="w-5 h-5 text-tarmac-900" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.87-3.08.48-1.06-.37-2.09-.37-3.2 0-1.39.46-2.25.32-3.08-.48-2.67-2.5-3.79-7.25-1.58-10.21 1.08-1.45 2.76-2.32 4.14-2.32 1.34 0 2.21.75 3.01.75.8 0 2.19-.75 3.44-.75 1.19 0 2.45.67 3.34 1.76-2.82 1.57-2.37 5.89.56 7.15-.6 1.45-1.37 2.65-2.55 3.62zM12.03 7.25c-.15-2.23 1.69-4.08 3.84-4.25.17 2.42-2.17 4.29-3.84 4.25z" />
    </svg>
);

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useSession();

    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/signin', {
                email,
                password
            });
            console.log("Success:", response.data);
            if (response.data.token) {
                signIn({
                    token: response.data.token,
                    role: response.data.role,
                    name: response.data.fullname || response.data.name || email.split('@')[0]
                });
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error("Login Failed:", error);
            if (error.response) {
                toast.error(error.response.data.message || 'Login failed');
            } else {
                toast.error('Network Error: Could not reach the server.');
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-tarmac-50 font-sans selection:bg-primary-100 selection:text-primary-900">
            <ToastContainer />

            {/* Background Gradients (Light/Sport Theme) */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-tarmac-50 to-tarmac-100 opacity-80 z-0"></div>

            {/* Animated Blobs (Red & Orange) */}
            <div className="absolute bottom-[-40%] left-[-20%] w-[140%] h-[80%] rounded-[100%] bg-primary-100/50 blur-[100px] opacity-60 z-0"></div>
            <div className="absolute bottom-[-40%] left-[-10%] w-[120%] h-[70%] rounded-[100%] bg-secondary-100/50 blur-[80px] opacity-40 z-0 animate-pulse"></div>

            {/* Floating Particles */}
            <div className="absolute top-10 left-10 w-1 h-1 bg-primary-400 rounded-full opacity-70 animate-ping"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-secondary-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-tarmac-400 rounded-full opacity-60"></div>

            {/* Decorative Lines */}
            <div className="absolute top-1/2 left-0 w-32 h-px bg-linear-to-r from-transparent via-primary-300 to-transparent opacity-30 transform -rotate-45"></div>
            <div className="absolute bottom-10 right-0 w-48 h-px bg-linear-to-r from-transparent via-secondary-300 to-transparent opacity-30 transform -rotate-12"></div>
            <div className="absolute top-20 right-1/4 w-24 h-px bg-linear-to-r from-transparent via-tarmac-300 to-transparent opacity-20 transform rotate-45"></div>


            {/* Floating Icons (Theme Colors) */}
            <div className="absolute bottom-[20%] left-[10%] text-primary-200 opacity-60 animate-bounce delay-1000 z-0 duration-4000">
                <Gauge size={48} className="transform -rotate-12 drop-shadow-sm" />
            </div>

            <div className="absolute top-[15%] right-[25%] text-secondary-200 opacity-60 animate-pulse delay-500 z-0 duration-3000">
                <MapPin size={36} className="transform rotate-12 drop-shadow-sm" />
            </div>

            <div className="absolute top-1/4 left-[15%] text-primary-300 opacity-40 animate-bounce delay-700 z-0">
                <Key size={32} className="transform -rotate-45 drop-shadow-sm" />
            </div>
            <div className="absolute top-[20%] right-[15%] text-secondary-300 opacity-40 animate-bounce delay-100 z-0">
                <Key size={28} className="transform rotate-12 drop-shadow-sm" />
            </div>

            <div className="relative z-10 w-full max-w-xl p-1 ">

                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative bg-white p-4 rounded-2xl border border-tarmac-100 shadow-xl">
                            <Car size={50} className="text-primary-600 drop-shadow-sm" />
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md border border-tarmac-200 rounded-3xl p-8 pt-12 shadow-2xl w-full">

                    <div className="text-center mb-8 mt-4">
                        <h1 className="text-3xl font-black text-tarmac-900 mb-2 tracking-tight italic">
                            Welcome back to <span className='text-primary-600'>Go</span>Drive
                        </h1>
                        <p className="text-tarmac-500 text-sm px-4 leading-relaxed font-medium">
                            Please Sign in to your account to continue
                        </p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-5">

                        <div className="space-y-1">
                            <label className="text-tarmac-600 text-sm font-bold ml-1">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="e.g. user@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border border-tarmac-200 rounded-xl px-4 py-3 text-tarmac-900 placeholder-tarmac-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-300 mt-2 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-tarmac-600 text-sm font-bold ml-1">Password</label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white border border-tarmac-200 rounded-xl px-4 py-3 text-tarmac-900 placeholder-tarmac-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-300 pr-10 mt-2 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tarmac-400 hover:text-primary-600 transition-colors mt-1"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-200 hover:shadow-primary-300 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            SIGN IN
                        </button>

                        <div className="flex items-center justify-between text-xs sm:text-sm pt-2">
                            <a href="#" className="text-primary-600 hover:text-primary-800 font-semibold transition-colors">
                                Forgot Password?
                            </a>
                            <p className="text-tarmac-500">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-primary-600 hover:text-primary-800 font-bold transition-colors">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className='flex items-center justify-center'>
                            <div className='w-37.5 h-0.5 bg-linear-to-r from-primary-200 to-secondary-200'></div>
                            <h1 className='text-tarmac-400 text-xs font-bold uppercase tracking-wider text-center my-4 mx-5'>or login with</h1>
                            <div className='w-37.5 h-0.5 bg-linear-to-r from-secondary-200 to-primary-200'></div>
                        </div>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                className="w-12 h-12 rounded-full bg-white border border-tarmac-200 hover:border-primary-400 flex items-center justify-center transition-all duration-300 hover:bg-primary-50 hover:shadow-md group"
                            >
                                <GoogleIcon />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white border border-tarmac-200 hover:border-primary-400 flex items-center justify-center transition-all duration-300 hover:bg-primary-50 hover:shadow-md group">
                                <AppleIcon />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white border border-tarmac-200 hover:border-primary-400 flex items-center justify-center transition-all duration-300 hover:bg-primary-50 hover:shadow-md group">
                                <Facebook className="w-5 h-5 text-blue-600" fill="currentColor" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
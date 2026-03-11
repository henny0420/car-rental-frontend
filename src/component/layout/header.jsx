import { useLocation, Link } from 'react-router-dom';
import { useSession } from '../../context/AuthContext';
import {
    Car, Menu, X, LogOut, User, MapPin, Phone, Mail,
    Facebook, Twitter, Instagram, Linkedin, Globe
} from 'lucide-react';
import { useState } from 'react';

// // --- Mocks for Preview Environment (DELETE THESE IN YOUR REAL PROJECT) ---
// const Link = ({ href, children, className }) => <a href={href} className={className}>{children}</a>;
// const mockSession = null; 
// // const mockSession = { user: { name: "Alex Racer", role: "user", email: "alex@example.com" } };
// const useSession = () => ({ data: mockSession, status: mockSession ? "authenticated" : "unauthenticated" });
// const signOut = () => console.log("Signed out");
// // ----------------------------------------------------------------------

export default function Header() {
    const { data: session, signOut } = useSession();
    const { pathname } = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (
        pathname === '/signin' ||
        pathname === '/signup' ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/owner')
    ) {
        return null;
    }

    const isActive = (path) => pathname === path
        ? "text-primary-600 font-bold"
        : "text-tarmac-600 hover:text-primary-600 font-medium transition-colors";


    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Cars", href: "/explore" },
        { name: "Booking", href: "/booking" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" }
    ];

    const socialLinks = [
        { icon: Facebook, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Instagram, href: "#" },
        { icon: Linkedin, href: "#" },
    ];

    return (
        <header className="sticky top-0 z-50 flex flex-col shadow-md shadow-tarmac-900/5">

            <div className="bg-white border-b border-primary-100 hidden md:block">
                <div className="container h-14 flex items-center justify-between">

                    {/* LEFT: LOGO */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-2.5 rounded-xl shadow-lg shadow-primary-600/20 group-hover:scale-105 transition-all duration-300">
                            <Car size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-black italic tracking-tighter text-tarmac-900">
                            GO<span className="text-primary-600">DRIVE</span>
                        </span>
                    </Link>

                    {/* RIGHT: CONTACT & SOCIALS */}
                    <div className="flex items-center gap-8">
                        {/* Contact Info */}
                        <div className="flex items-center gap-6 text-sm font-medium text-tarmac-500">
                            <div className="flex items-center gap-2 hover:text-primary-600 transition-colors cursor-pointer">
                                <Mail size={16} className="text-primary-500" />
                                <span>support@godrive.com</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-primary-600 transition-colors cursor-pointer">
                                <Phone size={16} className="text-primary-500" />
                                <span>+1 (800) 123-4567</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-px bg-tarmac-200"></div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="p-2 text-tarmac-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
          PART 2: NAVIGATION BAR (Links | Buttons)
          This part contains the specific actions requested.
      ========================================================== */}
            <div className="bg-white/95 backdrop-blur-xl border-b border-tarmac-100">
                <div className="container h-16 flex items-center justify-between">

                    {/* LEFT: NAV LINKS (Desktop) */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`px-5 py-2 rounded-full text-sm ${isActive(link.href)} hover:bg-tarmac-50`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* MOBILE ONLY: LOGO (Since Part 1 is hidden on mobile) */}
                    <Link to="/" className="md:hidden flex items-center gap-2">
                        <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                            <Car size={20} />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter text-tarmac-900">
                            GO<span className="text-primary-600">DRIVE</span>
                        </span>
                    </Link>

                    {/* RIGHT: ACTION BUTTONS (Rent a Car, Auth) */}
                    <div className="flex items-center gap-4">

                        {/* Primary Actions (Hidden on tiny screens if crowded, simplified on mobile menu) */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* "Book a Car" / Booking Link Button style */}
                            <Link to="/booking" className="px-5 py-2.5 text-sm font-bold text-tarmac-600 hover:text-primary-600 border border-transparent hover:border-tarmac-200 rounded-xl transition-all">
                                Book a Car
                            </Link>

                            {/* "Rent a Car" Primary Button */}
                            <Link to="/cars" className="group px-5 py-2.5 bg-primary-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:shadow-primary-600/30 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5">
                                <Car size={16} strokeWidth={3} />
                                <span>Rent a Car</span>
                            </Link>
                        </div>

                        {/* Divider (Desktop) */}
                        <div className="hidden md:block h-6 w-px bg-tarmac-200"></div>

                        {/* Auth / Profile Section */}
                        {session ? (
                            <div className="hidden md:flex items-center gap-3">
                                {/* Role Badge Button */}
                                {(session.user.role === 'admin' || session.user.role === 'owner') && (
                                    <Link to={`/${session.user.role}/dashboard`} className="px-3 py-1.5 bg-tarmac-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                                        {session.user.role}
                                    </Link>
                                )}

                                <div className="flex items-center gap-3 pl-2">
                                    <div className="text-right leading-none">
                                        <p className="text-sm font-bold text-tarmac-900">{session.user.name?.split(' ')[0]}</p>
                                    </div>
                                    <button onClick={() => signOut()} className="p-2 text-tarmac-400 hover:text-red-500 rounded-full transition-colors">
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Link to="/signin" className="px-4 py-2 text-sm font-bold text-tarmac-600 hover:text-tarmac-900">
                                    Log in
                                </Link>
                                <Link to="/signup" className="px-4 py-2 text-sm font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-tarmac-600 hover:bg-tarmac-50 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* =========================================================
          MOBILE MENU DROPDOWN
      ========================================================== */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[calc(4rem+1px)] left-0 w-full bg-white border-t border-tarmac-100 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 h-[calc(100vh-4rem)] overflow-y-auto">

                    {/* Mobile Contact Info */}
                    <div className="flex flex-col gap-2 pb-4 border-b border-tarmac-100">
                        <div className="flex items-center gap-3 text-tarmac-600">
                            <Phone size={16} className="text-primary-500" /> <span>+1 (800) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3 text-tarmac-600">
                            <Mail size={16} className="text-primary-500" /> <span>support@godrive.com</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="text-lg font-bold text-tarmac-900 py-3 border-b border-tarmac-50">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        <Link to="/booking" className="flex items-center justify-center py-3 rounded-xl border border-tarmac-200 font-bold text-tarmac-700 hover:bg-tarmac-50">
                            Book a Car
                        </Link>
                        <Link to="/cars" className="flex items-center justify-center gap-2 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-600/20">
                            <Car size={18} />
                            Rent a Car
                        </Link>
                    </div>

                    {/* Mobile Auth */}
                    {!session ? (
                        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-tarmac-100">
                            <Link to="/signin" className="flex items-center justify-center py-3 font-bold text-tarmac-600">Log in</Link>
                            <Link to="/signup" className="flex items-center justify-center py-3 font-bold text-primary-600 bg-primary-50 rounded-xl">Sign Up</Link>
                        </div>
                    ) : (
                        <div className="mt-4 pt-4 border-t border-tarmac-100 flex items-center justify-between bg-tarmac-50 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                                    {session.user.name?.[0] || 'U'}
                                </div>
                                <div>
                                    <p className="font-bold text-tarmac-900">{session.user.name}</p>
                                    <p className="text-xs text-tarmac-500">{session.user.role || 'Member'}</p>
                                </div>
                            </div>
                            <button onClick={() => signOut()} className="p-2 text-red-500 bg-white rounded-lg shadow-sm">
                                <LogOut size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
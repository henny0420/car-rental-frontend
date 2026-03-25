import React, { useState, useEffect } from 'react';
import { useSession } from '../../../context/AuthContext';
import { useFavourites } from '../../../context/FavouritesContext';
import axiosInstance from '../../../api/axiosInstance';
import { 
  User, 
  CalendarDays, 
  Heart, 
  Settings, 
  LogOut, 
  Edit, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CarFront,
  ShieldCheck,
  Ticket,
  Upload
} from 'lucide-react';

export default function UserProfile() {
  const { data: session, signOut } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Profile Form State
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    city: '',
    address: '',
    country: '',
    profilePictureFile: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Favourites and Bookings State
  const { favourites } = useFavourites();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Fetch Profile & Bookings on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/profile');
        if (res.data.success && res.data.user) {
          const u = res.data.user;
          setProfileData(prev => ({
            ...prev,
            firstName: u.firstName || '',
            lastName: u.lastName || '',
            email: u.email || '',
            mobileNumber: u.mobileNumber || '',
            city: u.city || '',
            address: u.address || '',
            country: u.country || ''
          }));
          
          if (u.profilePicture?.url) {
            setPreviewImage(u.profilePicture.url);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get('/booking/my-bookings');
        if (res.data && res.data.bookings) {
          setBookings(res.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchProfile();
    fetchBookings();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({ ...prev, profilePictureFile: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formData = new FormData();
      formData.append('firstName', profileData.firstName);
      formData.append('lastName', profileData.lastName);
      formData.append('city', profileData.city);
      formData.append('address', profileData.address);
      formData.append('mobileNumber', profileData.mobileNumber);
      formData.append('country', profileData.country);
      
      if (profileData.profilePictureFile) {
        formData.append('profilePicture', profileData.profilePictureFile);
      }

      const res = await axiosInstance.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        alert("Profile updated successfully!");
        setProfileData(prev => ({ ...prev, profilePictureFile: null })); // Reset file input state
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- DYNAMIC DATA COMPUTATION ---
  const user = {
    name: profileData.firstName ? `${profileData.firstName} ${profileData.lastName}`.trim() : session?.user?.name || "Loading...",
    email: profileData.email || session?.user?.email || "Loading...",
    phone: profileData.mobileNumber || "Add phone number",
    joinDate: "Member since 2024",
    avatar: previewImage || "https://ui-avatars.com/api/?name=" + (session?.user?.name || "User") + "&background=0D8ABC&color=fff",
  };

  const activeBooking = bookings.find(b => ['booked', 'approved', 'ongoing', 'pending'].includes(b.status?.toLowerCase()));
  const bookingHistory = bookings.filter(b => b._id !== activeBooking?._id);

  // --- HELPER COMPONENTS ---
  const StatusBadge = ({ status }) => {
    const s = status?.toLowerCase() || '';
    if (['booked', 'approved', 'ongoing', 'pending'].includes(s)) {
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold"><Clock size={14}/> {status}</span>;
    } else if (s === 'completed') {
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold"><CheckCircle2 size={14}/> {status}</span>;
    } else if (s === 'cancelled') {
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold"><XCircle size={14}/> {status}</span>;
    }
    return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">{status}</span>;
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: CalendarDays },
    { id: 'favorites', label: 'Saved Cars', icon: Heart },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans py-12">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 italic tracking-tight">
            My <span className="text-primary-500">Profile</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Manage your bookings, favorites, and account details.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT SIDEBAR --- */}
          <aside className="w-full lg:w-1/4 flex flex-col gap-6">
            
            {/* User Info Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-90"></div>
              
              <div className="relative mt-8 mb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto object-cover bg-slate-100"
                />
                <label className="absolute bottom-0 right-1/2 translate-x-10 bg-white p-1.5 rounded-full shadow-md text-slate-500 hover:text-primary-500 border border-slate-100 transition-colors cursor-pointer">
                  <Edit size={14} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
              
              <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
              <p className="text-sm font-medium text-slate-500 mb-4">{user.email}</p>
              
              <p className="text-xs text-slate-400 font-medium mt-2">{user.joinDate}</p>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 flex flex-col gap-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 w-full text-left
                    ${activeTab === item.id 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                  {item.label}
                </button>
              ))}
              
              <div className="h-px bg-slate-100 my-2 mx-4"></div>
              
              <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all duration-300 w-full text-left">
                <LogOut size={20} />
                Log Out
              </button>
            </nav>
          </aside>

          {/* --- RIGHT CONTENT AREA --- */}
          <main className="w-full lg:w-3/4 flex flex-col gap-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Welcome back, {user.name.split(' ')[0]}!</h3>
                
                {/* Active Booking Highlight */}
                {activeBooking && (
                  <div className="bg-slate-900 rounded-3xl p-1 shadow-xl border border-slate-800 mb-8 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="bg-slate-900 p-6 md:p-8 rounded-[22px] flex flex-col md:flex-row gap-6 relative z-10">
                      <div className="w-full md:w-1/3 bg-slate-800 rounded-2xl overflow-hidden relative">
                        <div className="absolute top-3 left-3 z-10">
                          <StatusBadge status={activeBooking.status} />
                        </div>
                        <img src={activeBooking.carId?.coverImage?.url || "https://via.placeholder.com/800x400"} alt={activeBooking.carId?.name || "Car"} className="w-full h-full object-cover min-h-[160px]" />
                      </div>
                    
                      <div className="w-full md:w-2/3 flex flex-col justify-center">
                        <p className="text-primary-400 font-bold text-xs uppercase tracking-widest mb-1">Upcoming Trip</p>
                        <h4 className="text-2xl font-black text-white mb-4">{activeBooking.carId?.name || "Your Car"}</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-start gap-2">
                            <Calendar className="text-slate-400 mt-0.5" size={16} />
                            <div>
                              <p className="text-xs text-slate-500 font-bold uppercase">Dates</p>
                              <p className="text-sm text-slate-200 font-medium">
                                {new Date(activeBooking.bookingDate).toLocaleDateString()} - <br/>
                                {new Date(activeBooking.endingDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="text-slate-400 mt-0.5" size={16} />
                            <div>
                              <p className="text-xs text-slate-500 font-bold uppercase">Pick-up</p>
                              <p className="text-sm text-slate-200 font-medium">{activeBooking.carId?.location?.city || "To be confirmed"}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                          <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Total Price</p>
                            <p className="text-xl font-black text-white">₹{activeBooking.finalPrice || activeBooking.baseAmount}</p>
                          </div>
                          <button onClick={() => setActiveTab('bookings')} className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-600/20">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                   <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
                         <CarFront size={24} />
                      </div>
                      <div>
                         <p className="text-2xl font-black text-slate-900">{bookings.length}</p>
                         <p className="text-xs font-bold text-slate-400 uppercase">Total Trips</p>
                      </div>
                   </div>
                   <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                         <ShieldCheck size={24} />
                      </div>
                      <div>
                         <p className="text-2xl font-black text-slate-900">Gold</p>
                         <p className="text-xs font-bold text-slate-400 uppercase">Status Level</p>
                      </div>
                   </div>
                   <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                         <Ticket size={24} />
                      </div>
                      <div>
                         <p className="text-2xl font-black text-slate-900">3</p>
                         <p className="text-xs font-bold text-slate-400 uppercase">Active Coupons</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-slate-900">Booking History</h3>
                  <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-primary-500">
                    <option>All Bookings</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div className="flex flex-col gap-4">
                  {loadingBookings ? (
                    <div className="text-center py-12 text-slate-500 font-medium">Loading bookings...</div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 font-medium">You have no bookings yet.</div>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking._id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-5 items-center hover:shadow-md transition-shadow">
                        <div className="w-full sm:w-40 h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                          <img src={booking.carId?.coverImage?.url || "https://via.placeholder.com/400x300"} alt={booking.carId?.name || "Car"} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-grow flex flex-col w-full">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-lg font-black text-slate-900">{booking.carId?.name || "Car"}</h4>
                            <StatusBadge status={booking.status} />
                          </div>
                          <p className="text-xs font-bold text-slate-400 mb-3">Booking ID: {booking._id?.slice(-8).toUpperCase()}</p>
                          
                          <div className="flex flex-wrap gap-y-2 gap-x-6 mt-auto border-t border-slate-100 pt-3">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-slate-400" />
                              <span className="text-sm font-medium text-slate-600">
                                {new Date(booking.bookingDate).toLocaleDateString()} - {new Date(booking.endingDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 font-bold">
                              <span className="text-slate-400 text-sm">Total:</span>
                              <span className="text-primary-600 text-sm">₹{booking.finalPrice || booking.baseAmount}</span>
                            </div>
                          </div>
                      </div>
                      
                        <div className="w-full sm:w-auto shrink-0 flex sm:flex-col gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-4">
                          <button className="flex-1 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-lg transition-colors border border-slate-200">
                            View Receipt
                          </button>
                          {booking.status?.toLowerCase() === 'completed' && (
                             <button className="flex-1 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold text-sm rounded-lg transition-colors border border-primary-100">
                               Book Again
                             </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === 'favorites' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Saved Cars</h3>
                
                {favourites.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 font-medium">You haven't saved any cars yet.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favourites.map((car, idx) => (
                      <div key={car.id || car._id || idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group relative">
                        <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full text-primary-500 hover:bg-primary-50 transition-colors shadow-sm">
                          <Heart size={16} fill="currentColor" />
                        </button>
                        
                        <div className="h-48 bg-slate-100 overflow-hidden">
                          <img src={car.image || car.coverImage?.url || "https://via.placeholder.com/800x400"} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        
                        <div className="p-5 flex justify-between items-end">
                          <div>
                            <h4 className="font-black text-slate-900 text-lg mb-1">{car.name}</h4>
                            <p className="text-primary-600 font-bold">₹{car.price || car.pricePerHour}/day</p>
                          </div>
                          <button className="px-4 py-2 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors">
                            Rent
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Account Settings</h3>
                
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8">
                  <h4 className="text-lg font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">Personal Information</h4>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSaveProfile}>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                      <input type="text" value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                      <input type="text" value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email Address (Read Only)</label>
                      <input type="email" value={profileData.email} disabled className="bg-slate-100 border border-transparent rounded-xl px-4 py-3 text-slate-500 font-medium cursor-not-allowed" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Mobile Number</label>
                      <input type="tel" value={profileData.mobileNumber} onChange={e => setProfileData({...profileData, mobileNumber: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">City</label>
                      <input type="text" value={profileData.city} onChange={e => setProfileData({...profileData, city: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Country</label>
                      <input type="text" value={profileData.country} onChange={e => setProfileData({...profileData, country: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                      <textarea value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} rows="2" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500 resize-none"></textarea>
                    </div>
                    <div className="flex items-end justify-end md:col-span-2 mt-2">
                       <button type="submit" disabled={isSaving} className="w-full md:w-auto bg-primary-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-70 flex items-center justify-center gap-2">
                         {isSaving ? "Saving..." : "Save Changes"}
                       </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <h4 className="text-lg font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">Security</h4>
                  <form className="flex flex-col gap-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                      <input type="password" placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                      <input type="password" placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <button className="bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                      Update Password
                    </button>
                  </form>
                </div>

              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
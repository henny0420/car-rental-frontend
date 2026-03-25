import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './component/layout/header';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import AdminLayout from './pages/admin/index';
import AddBrandsPage from './pages/admin/brands/index';
import AdminApprovalsPage from './pages/admin/approvals/index';
import AdminUsersPage from './pages/admin/users/index';
import AdminCarsPage from './pages/admin/cars/index';
import AdminOwnersPage from './pages/admin/owners/index';
import OwnerLayout from './pages/owner/index';
import AddCar from './pages/owner/addCar/index';
import OwnerDashboard from './component/owner/dashboard';
import OwnerFleet from './component/owner/fleet';
import OwnerBookings from './component/owner/bookings';
import Home from './pages/user/home';
import BrandCarsPage from './pages/user/brandCars';
import AllBrandsPage from './pages/user/allBrands';
import PremiumCarsPage from './pages/user/premiumCarsPage';
import SingleCarPage from './pages/user/singleCar';
import ExploreCarsPage from './pages/user/exploreCarPage';
import FavouritesPage from './pages/user/favourites';
import MyBookingsPage from './pages/user/myBookings';
import ProfilePage from './pages/user/profile';
import SubmitCarPage from './pages/user/submitCar';
import Footer from './component/layout/footer';
import AboutUs from './pages/user/aboutUs';
import ContactUs from './pages/user/contactUs';

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/signin', '/signup', '/admin', '/owner'];

  // Also check if the route starts with admin or owner for nested routes
  const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen bg-tarmac-50 font-sans text-tarmac-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/brands" element={<AllBrandsPage />} />
        <Route path="/brand/:brandId" element={<BrandCarsPage />} />
        <Route path="/premium-cars" element={<PremiumCarsPage />} />
        <Route path="/car/:id" element={<SingleCarPage />} />
        <Route path="/explore" element={<ExploreCarsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/submit-car" element={<SubmitCarPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AddBrandsPage /></AdminLayout>} />
        <Route path="/admin/brands" element={<AdminLayout><AddBrandsPage /></AdminLayout>} />
        <Route path="/admin/approvals" element={<AdminLayout><AdminApprovalsPage /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsersPage /></AdminLayout>} />
        <Route path="/admin/cars" element={<AdminLayout><AdminCarsPage /></AdminLayout>} />
        <Route path="/admin/owners" element={<AdminLayout><AdminOwnersPage /></AdminLayout>} />

        {/* Owner Routes */}
        <Route path="/owner" element={<OwnerLayout><OwnerDashboard /></OwnerLayout>} />
        <Route path="/owner/dashboard" element={<OwnerLayout><OwnerDashboard /></OwnerLayout>} />
        <Route path="/owner/cars" element={<OwnerLayout><OwnerFleet /></OwnerLayout>} />
        <Route path="/owner/cars/add" element={<OwnerLayout><AddCar /></OwnerLayout>} />
        <Route path="/owner/bookings" element={<OwnerLayout><OwnerBookings /></OwnerLayout>} />
        <Route path="/owner/earnings" element={<OwnerLayout><OwnerDashboard /></OwnerLayout>} /> {/* Redirect to dashboard for now */}

      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default App


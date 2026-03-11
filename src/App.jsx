import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './component/layout/header';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import AdminLayout from './pages/admin/index';
import AddBrandsPage from './pages/admin/brands/index';
import OwnerLayout from './pages/owner/index';
import AddCar from './pages/owner/addCar/index';
import Home from './pages/user/home';
import BrandCarsPage from './pages/user/brandCars';
import AllBrandsPage from './pages/user/allBrands';
import PremiumCarsPage from './pages/user/premiumCarsPage';
import SingleCarPage from './pages/user/singleCar';
import ExploreCarsPage from './pages/user/exploreCarPage';
import Footer from './component/layout/footer';

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

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AddBrandsPage /></AdminLayout>} />
        <Route path="/admin/brands" element={<AdminLayout><AddBrandsPage /></AdminLayout>} />

        {/* Owner Routes */}
        <Route path="/owner" element={<OwnerLayout><AddCar /></OwnerLayout>} />
        <Route path="/owner/cars/add" element={<OwnerLayout><AddCar /></OwnerLayout>} />

      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default App


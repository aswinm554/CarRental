import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import Bookings from './pages/MyBookings';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setCars } from './redux/carsSlice';
import SigninSignup from './components/SigninSignup';
import MyBookings from "./pages/MyBookings";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from './pages/AdminDshboard';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);


   const hideNavbarAndFooter =
  location.pathname.startsWith("/owner") ||
    location.pathname.startsWith("/admin-dashboard");
  useEffect(() => {
    console.log("Cars in Redux:", cars);
    if (cars.length === 0) {
      fetch('https://68fe440f7c700772bb135106.mockapi.io/api/v1/cars')
        .then((res) => res.json())
        .then((data) => dispatch(setCars(data)))
        .catch((err) => console.error('Error fetching cars:', err));
    }
  }, [dispatch]);


  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path="/signin" element={<SigninSignup />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/owner" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>

{!hideNavbarAndFooter && <Footer />}    </>
  );
};

export default App;

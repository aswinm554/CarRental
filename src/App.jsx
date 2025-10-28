import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import Bookings from './pages/Bookings';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setCars } from './redux/carsSlice';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

  useEffect(() => {
    console.log("Cars in Redux:", cars);
    if (cars.length === 0) {
      fetch('https://68fe440f7c700772bb135106.mockapi.io/api/v1/cars')
        .then((res) => res.json())
        .then((data) => dispatch(setCars(data)))
        .catch((err) => console.error('Error fetching cars:', err));
    }
  }, [cars, dispatch]);

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/bookings' element={<Bookings />} />
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;

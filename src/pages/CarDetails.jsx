import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useSelector } from 'react-redux';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const cars = useSelector((state) => state.cars.cars);
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    if (cars.length > 0) {
      const foundCar = cars.find((c) => c.id === id || c._id === id);
      setCar(foundCar);
    }
  }, [id, cars]);

  const handleBookNow = () => {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const start = new Date(pickupDate);
const end = new Date(returnDate);
const diffTime = end - start;
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
const totalAmount = diffDays * car.pricePerDay;


    if (!loggedInUser) {
      // Save current car and dates in localStorage before redirecting
      localStorage.setItem(
        'pendingBooking',
        JSON.stringify({ car, pickupDate, returnDate })
      );

      // Redirect to sign-in page but remember this page
      navigate('/signin', { state: { from: location.pathname } });
      return;
    }

    // If user is logged in, store booking details
    const booking = {
      userEmail: loggedInUser.email,
      car,
      pickupDate,
      returnDate,
       totalAmount,
      date: new Date().toISOString(),
    };
// ✅ Get existing bookings
const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
// ✅ Add new one
allBookings.push(booking);
// ✅ Save back
localStorage.setItem("bookings", JSON.stringify(allBookings));

    // Show popup confirmation
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (pickupDate && returnDate && car) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = end - start;

      // Convert milliseconds to days (+1 so both days included)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      // Calculate total
      const total = diffDays * car.pricePerDay;

      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [pickupDate, returnDate, car]);



  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <img
            src={car.image || ''}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-borderColor my-6" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['360 Camera', 'Bluetooth', 'GPS', 'Heated Seats'].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBookNow();
          }}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            ₹{car.pricePerDay}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>

          <hr className="border-borderColor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id="pickup-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          {totalAmount > 0 && (
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <span>Total ({pickupDate} → {returnDate})</span>
              <span>₹{totalAmount}</span>
            </div>
          )}


          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
          >
            Book Now
          </button>
        </form>
      </div>

      {/* ✅ Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-700 mb-4">
              Your payment has been received successfully.
            </p>
            <button
              onClick={closePopup}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CarDetails;

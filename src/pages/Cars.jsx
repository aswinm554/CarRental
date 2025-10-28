// src/pages/Cars.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setCars } from '../redux/carsSlice';
import CarCard from '../components/CarCard';
import Title from '../components/Title';

const Cars = () => {
  const cars = useSelector((state) => state.cars.cars);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
    const brands = ["All", ...new Set(cars.map((car) => car.brand))];

    const filteredCars = cars.filter((car) => {
    const matchesBrand =
      selectedBrand === "All" || car.brand === selectedBrand;

    const matchesPrice =
      selectedPrice === "All" ||
      (selectedPrice === "low" && car.pricePerDay <= 3000) ||
      (selectedPrice === "mid" && car.pricePerDay > 3000 && car.pricePerDay <= 6000) ||
      (selectedPrice === "high" && car.pricePerDay > 6000);

    return matchesBrand && matchesPrice;
  });


  return ( <div className="flex flex-col items-center py-10 px-6 md:px-16 lg:px-24">
      <Title
        title="Available Vehicles"
        subTitle="Explore our cars available for you."
      />

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-10 mt-6">
        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border border-borderColor rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="border border-borderColor rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All Prices</option>
          <option value="low">Below ₹3000</option>
          <option value="mid">₹3000 - ₹6000</option>
          <option value="high">Above ₹6000</option>
        </select>
      </div>

      {/* Cars Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard key={car.id || car._id} car={car} />
          ))
        ) : (
          <p>No cars found for this filter.</p>
        )}
      </div>
    </div>

          



  );
};

export default Cars;

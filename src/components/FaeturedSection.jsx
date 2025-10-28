import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FaeturedSection = () => {

    const cars = useSelector((state) => state.cars.cars)
    const featuredCars = cars.slice(0, 4)
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center py-15 px-6 md:px-16 lg:px-24 xl:px-32'>

            <div>
                <Title title='Featured Vehicles' subTitle='Explore our Cars available for you.' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10'>

                {featuredCars.map((car) => (
                    <CarCard key={car._id} car={car} />

                ))
                }

            </div>

            <button onClick={() => { navigate('/cars'); scrollTo(0, 0) }} className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
                Explore all the cars <img src={assets.arrow_icon} alt="arrow" />
            </button>

        </div>
    )
}

export default FaeturedSection
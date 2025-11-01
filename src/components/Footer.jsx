import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
<div className=" px-6 md:px-16 lg:px-24 xl:px-28 mt-80 text-sm text-gray-600 bg-gray-100">
            <div className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
                <div>
                    <h1 className='className="text-2xl font-bold leading-none tracking-tight md:text-3xl lg:text-4xl'
          style={{ color: "#0284c4" }}>CarRental</h1>
                    <p className='max-w-80 mt-3'>
                        Car Rental service with wide collection of cars for your driving needs.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                        <img src={assets.instagram_logo} className='w-5 h-5' alt="" />
                        <img src={assets.facebook_logo} className='w-5 h-5' alt="" />
                        <img src={assets.gmail_logo} className='w-5 h-5' alt="" />

                    </div>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-500 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>

                    </ul>
                </div>
                <div>
                    <h2 className='text-base font-medium text-gray-500 uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>

                    </ul>
                </div>
                <div>
                    <h2 className='text-base font-medium text-gray-500 uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li>AM Tower, Car Rental</li>
                        <li>Edappally, Ernakulam</li>
                        <li>+91 9897949556</li>
                        <li>info@carrental@gmail.com</li>

                    </ul>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-2 lg:flex-row items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
                
            </div>
        </div>
    )
}

export default Footer
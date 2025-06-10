import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div className=''>
                <img src={assets.crew1} className='mb-5 w-32' alt="" />
                <p className='w-96 md:w-2/3 text-gray-600'>
                Explore our café and discover the perfect harmony of comfort and creativity. Savor thoughtfully crafted beverages and bites that blend timeless flavors with a modern twist. Each visit is an invitation to unwind, connect, and enjoy quality moments in a space that feels like home—where tradition meets innovation, and every cup tells a story.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>HOME</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>CONTACT WITH US</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 8637756066</li>
                    <li>cafecrewwings@gmail.com</li>
                    <li><a href="https://www.instafram.com/cafe_crewwings">Instagram</a></li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ cafe-crew-wings.vercel.app - All Right Reserved.</p>
        </div>
    </div>
  )
}
 
export default Footer
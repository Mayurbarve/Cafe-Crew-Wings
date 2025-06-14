import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10'>
        <h2 className="text-3xl font-bold">
          Contact <span className="relative inline-block">
           Us
            <span className="absolute left-0 bottom-[-4px] w-full h-1 bg-red-300 rounded-full -z-10"></span>
          </span>
        </h2>
      </div>

      <div className='flex flex-col justify-center items-center gap-2 mt-6'>
        <p className='text-sm text-gray-600'>Email ID - mohadikarchandu123@gmail.com</p>
        <p className='text-sm text-gray-600'>(M) +91 8983399439</p>
        <p className='text-sm text-gray-600'> Near Sbi Atm, Anmol Nagar, Wathoda Road, Nagpur</p>
        <p className='text-sm text-gray-600'>Nagpur - Maharshtra - 440022</p>
        <p className='text-sm text-gray-600'>GST No. - 08ABYFA7653G1ZT</p>

      </div>

    </div>
  )
}

export default Contact
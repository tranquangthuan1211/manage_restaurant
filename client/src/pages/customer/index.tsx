import React from 'react';
import RootLayout from '../../layouts/customer/layout';
const Customer = () => {
    return (
        <RootLayout>
        <div>
            {/* Hero Start */}
            <div className="col-span-full bg-[url('/images/customer_bg1.jpg')] bg-cover bg-center h-[36rem] grid grid-cols-2">
                {/* Gretting */}
                <div className='col-span-1 pl-10 flex flex-col justify-center items-start'>
                    <p className='font-[Satisfy] text-6xl mb-4'>Baby Hippo</p>
                    <p className='text-xl mb-10'>The best place to enjoy your meal</p>
                    <div className='flex flex-row gap-4'>
                        <button className='button-green'>Book a table</button>
                        <button className='button-orange'>Write a review</button>
                    </div>
                </div>
                {/* Yummy dishes */}
                <div className='col-span-1 flex justify-start pl-1 items-center drop-shadow-lg'>
                    <div className='relative w-[24rem] h-[24rem]'>
                        {/* Main dish */}
                        <div className='absolute top-0 left-0 w-full h-full rounded-full border-2 border-dashed border-gray-400 bg-white'></div>
                        <div className='absolute top-4 left-4 w-[22rem] h-[22rem] rounded-full bg-gray-300'></div>
                        <img className='absolute top-0 left-0 w-full h-full rounded-full p-10' src='/images/dish_1.jpg'></img>
                        {/* Smaller dishes */}
                        <img className='absolute top-0 left-[-0.5rem] w-16 h-16 rounded-full object-cover object-center' src='/images/dish_2.jpg'></img>
                        <img className='absolute top-[10rem] left-[-4.25rem] w-16 h-16 rounded-full object-cover object-center' src='/images/dish_3.jpg' ></img>
                        <img className='absolute bottom-0 left-[-0.5rem] w-16 h-16 rounded-full object-cover object-center' src='/images/dish_4.jpg' ></img>
                    </div>
                </div>
            </div>
            {/* Hero End */}
        </div>
    </RootLayout>
    )
}

export default Customer;
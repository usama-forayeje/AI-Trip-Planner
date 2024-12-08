import React from 'react'
import { Button } from '../button'

function Hero() {
  return (
    <>
    <div className='flex flex-col gap-10 mt-12 mx-52'>
        <h2 className='text-center'>  
        <span className='my-2 text-4xl font-extrabold text-rose-500 '>Explore Your Dream with Forayaje AI Trip Planner!</span>
        <span className='text-3xl font-bold'>Get personalized travel plans, and enjoy hassle-free trips—powered by smart AI.</span>
        </h2>
        <span className='text-xl text-center text-gray-500'>Start your adventure today and make every journey unforgettable with Forayaje AI Trip Planner.
        </span>
    </div>
    <div className='flex items-center justify-center mt-6'>
        
        <Button className='px-4 py-2 '>Get Started, It's Free</Button>
    </div>
    </>
  )
}

export default Hero
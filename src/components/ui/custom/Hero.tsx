import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      <div className='flex flex-col gap-5 mt-12 mx-52'>
        <h2 className='text-center'>
          <span className='my-2 text-4xl font-extrabold text-rose-500'>
            Explore Your Dream with Forayaje AI Trip Planner!
          </span>
          <span className='text-3xl font-bold'>
            Get personalized travel plans, and enjoy hassle-free trips—powered by smart AI.
          </span>
        </h2>
        <span className='text-xl text-center text-gray-500'>
          Start your adventure today and make every journey unforgettable with Forayaje AI Trip Planner.
        </span>
      </div>
      <div className='flex items-center justify-center mt-7'>
        <Link to={'/create-trip'}>
          <Button className='px-4 py-2'>Get Started, It's Free</Button>
        </Link>
      </div>
      <div className='flex items-center justify-center mt-12 mb-14'>
        <div className='relative  w-[600px] h-[400px]'>
          <img
            src='/mockup-image.png' 
            alt='AI Trip Planner on Laptop Screen'
            className='w-full h-full mb-5 rounded-lg shadow-lg cursor-not-allowed'
          />
        </div>
      </div>
    </>
  );
}

export default Hero;

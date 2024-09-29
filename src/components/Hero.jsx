import React from 'react'
import { Link} from 'react-router-dom'
import {Button} from '../components/index'

function Hero() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center hero -mt-12 md:-mt-20">

  {/* Hero Content */}
  <div className="relative z-10 text-center  max-w-2xl">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg text-zinc-900">
  <span className="block">Welcome to</span>
  <span className="block text-teal-800">TechStream</span>
</h1>

    <div className=" glow "></div>
    <p className="mt-4 text-base sm:text-lg md:text-xl font-medium drop-shadow-lg text-zinc-800">
    Share your stories, insights, and knowledge with the world.
    </p>

    <div className="mt-8">
      <Link to="/add-post">
        <Button className='font-bold text-base sm:text-lg py-2 sm:py-3 px-5' textColor='text-white' bgColor='bg-teal-800'> Add a post </Button>
      </Link>
    </div>
  </div>
</div>

  )
}

export default Hero
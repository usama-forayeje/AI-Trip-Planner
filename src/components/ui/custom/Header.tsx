import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='flex items-center justify-between p-2 px-3 mx-2 shadow-sm '>
      <div className='flex items-center gap-1'>
      <img className='w-12 h-12 rounded-full' src="forayaje-ai-trip.jpg" alt="logo" />
        <h2 className='font-serif '>Forayaje AI Trip</h2>
      </div>
      <div>
        <Button>Sign In</Button>
      </div>
  </div>

  )
}

export default Header
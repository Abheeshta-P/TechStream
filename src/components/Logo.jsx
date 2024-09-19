import React from 'react'

function Logo({color = 'text-white'}) {
  return (
    <div className={`${color} font-bold text-xl md:text-2xl`}>TechStream</div>
  )
}

export default Logo
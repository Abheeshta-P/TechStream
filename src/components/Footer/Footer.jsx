import React from 'react'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className=" p-12 py-14 bg-zinc-800 w-full h-[100px] flex justify-center items-center">
            
                        <div className='flex flex-col md:flex-row gap-3 items-center'>
                            <div className="inline-flex items-center">
                                <Logo/>
                            </div>
                            <div>
                                <p className="text-xs md:text-sm ">
                                    &copy; Copyright 2024. All Rights Reserved Abheeshta-P
                                </p>
                            </div>
                        </div>
        </footer>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className=" py-20 bg-zinc-800  w-full">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo/>
                            </div>
                            <div>
                                <p className="text-sm">
                                    &copy; Copyright 2024. All Rights Reserved .
                                </p>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </footer>
  )
}

export default Footer
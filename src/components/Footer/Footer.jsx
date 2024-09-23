import React from 'react'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className=" p-20 bg-zinc-800  w-full">
            
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo/>
                            </div>
                            <div>
                                <p className="text-sm">
                                    &copy; Copyright 2024. All Rights Reserved Abheeshta-P
                                </p>
                            </div>
                        </div>
        </footer>
  )
}

export default Footer
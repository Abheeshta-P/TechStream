import React, { forwardRef, useId } from 'react'

// ref is forwarded to input tag from input component

/*
function Input({
  label,
  type = 'text',
  className = '',
  ...props
},ref) {
  const id = useId();
  return (
    <>
    {label && (<label htmlFor={id}>
      {label}
    </label>)}
    <input type={type} id={id} className={className} ref={ref} {...props}/>
    </>
  )
}
*/

const Input = forwardRef(({
  label,
  type = 'text',
  className = '',
  ...props
},ref)=>{
  const id = useId();
  return (
    <div className='w-full'>
    {label && (<label htmlFor={id} className='text-sm md:text-base inline-block mb-1 pl-1' >
      {label}
    </label>)}
    <input type={type} id={id}  className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full text-sm md:text-base  ${className}`} ref={ref} {...props}/>
    </div>
  )
});

export default Input
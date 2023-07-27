import React from 'react'

function Academicbutton() {
  return (
    <div className="flex cursor-pointer max-w-xs gap-2 bg-red-700 shadow rounded-lg py-3 px-16 items-center hover:bg-red-800">
    <p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-white">Add Post</p>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
</div>
  )
}

export default Academicbutton
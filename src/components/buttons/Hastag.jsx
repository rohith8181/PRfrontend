import React from 'react'

function Hastag({ hash }) {
  return (
    <span className="inline-block rounded-full text-white 
    bg-red-500 hover:bg-red-600 duration-300 
    text-xs font-bold 
    mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
    opacity-90 hover:opacity-100">
      {hash}
    </span>
  )
}

export default Hastag
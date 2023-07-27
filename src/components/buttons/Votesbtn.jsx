import React from 'react'

function Votesbtn({ color, score}) {
    return (
        <div className="flex ">
            <div className="flex items-center space-x-2">
                <button className={`p-1 border rounded-full border-${color}  hover:bg-green-600`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <span className={`text-lg text-${color} font-mono`}>
                    {score}
                </span>
                <button className={`p-1 border rounded-full border-${color} hover:bg-red-600`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Votesbtn
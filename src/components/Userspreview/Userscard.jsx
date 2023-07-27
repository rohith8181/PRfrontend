import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../helper'

function Userscard({ person }) {

    const navigate = useNavigate();

    const handleuser = () => {
        navigate(`/user/${person._id}`);
    }

    return (

        <li onClick={handleuser} key={person._id} className="flex pl-4 pr-4 cursor-pointer hover:bg-[#464646] justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`${BASE_URL}/images/defaultprofile.png`} alt="" />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-white ">{person.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-white">{person.role}</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">{person.reputation.toFixed(0)}</p>
                    <svg className="w-4 h-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                        <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                    </svg>
                </div>
            </div>
        </li>

    )
}

export default Userscard
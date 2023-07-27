import React from 'react'
import Time from '../buttons/Time'
import { useNavigate } from "react-router-dom"
import { BASE_URL } from '../../helper'


function Notficationcard({ person, printdate }) {
    const navigate = useNavigate();
    return (
        <>
            {printdate && <span className='text-white font-mono'><Time time={person.createdAt} /></span>}
            <li key={person.userId.email} className="mb-2 flex justify-start py-5 rounded-md shadow-xl px-4 bg-white text-black">
                <div className="flex justify-start items-center w-[100%] gap-5">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`${BASE_URL}/${person.userId.Profilepic}`} />
                    <div onClick={() => navigate(`${person.link}`)} className="min-w-0 flex">
                        <p className="text-sm leading-6 cursor-pointer hover:font-semibold">{person.content}</p>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Notficationcard
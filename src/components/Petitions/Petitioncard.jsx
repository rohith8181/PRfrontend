import React from 'react'
import { useNavigate } from 'react-router-dom';
import Rolebadge from '../buttons/Rolebadge';
import { BASE_URL } from '../../helper'


function Petitioncard({ item }) {
  const navigate = useNavigate();
  const options = { day: 'numeric', year: 'numeric', month: 'long' };
  return (
    <div key={item.id} className=" cursor-default hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 p-5 border rounded-md flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <span className="text-gray-500">
          {new Date(item.createdAt).toLocaleString(undefined, options)}
        </span>
        <a
          href=""
          className="relative z-10 rounded-full flex gap-1 bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {item.SignedBy.length}
          <svg className="w-4 h-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
            <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
          </svg>
        </a>
      </div>
      <div className="group relative break-words w-[100%]">
        <h3 onClick={() => navigate(`/petition/${item._id}`)} className="mt-3 hover:text-red-500 cursor-pointer text-lg font-semibold leading-6 text-gray-900">
          {item.title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {item.overview}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img src={`${BASE_URL}/${item.userId.Profilepic}`} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
        <div className="text-sm leading-6">
          <div className="font-semibold text-gray-900">
            <div onClick={() => navigate(`/user/${item.userId._id}`)} className=' cursor-pointer flex gap-1'>
              {item.userId.name}
              <Rolebadge role={item.userId.role} />
            </div>
          </div>
          <p className="text-gray-600">{item.userId.email}</p>
        </div>
      </div>
    </div>
  )
}

export default Petitioncard
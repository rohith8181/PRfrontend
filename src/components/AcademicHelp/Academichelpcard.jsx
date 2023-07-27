import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Time from "../buttons/Time"
import Rolebadge from "../buttons/Rolebadge"
import { BASE_URL } from '../../helper'

function Academichelpcard({ post }) {
  const navigate = useNavigate();
  const handleAcad = () => {
    navigate(`/post/${post._id}`);
  }
  return (
    <div key={post._id} className="flex max-w-xl flex-col border p-5  cursor-default hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <Time time={post.createdAt} />
      </div>
      <div className="group relative break-words w-[100%]">
        <h3 onClick={handleAcad} className="mt-3 cursor-pointer hover:text-red-600 text-lg  font-semibold leading-6 text-gray-900">
          {post.title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.Overview}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img src={`${BASE_URL}/${post.userId.Profilepic}`} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <span className='flex gap-1'>
              {post.userId.name}
              <Rolebadge role={post.userId.role} />
            </span>
          </p>
          <p className="text-gray-600">{post.userId.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Academichelpcard
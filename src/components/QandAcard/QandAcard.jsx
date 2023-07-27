import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import "./QandAcard.css";
import Time from "../buttons/Time"
import Likebtn from '../buttons/Likebtn';
import Dislikebtn from '../buttons/Dislikebtn';
import Hastag from '../buttons/Hastag';
import { useSelector, useDispatch } from 'react-redux';
import { Updatequestionstate } from "../../redux/Slices/QuestionSlice"
import Rolebadge from '../buttons/Rolebadge';
import { BASE_URL } from '../../helper'


function QandAcard({ item }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpvoted, setIsupvoted] = useState(false)
  const [isdownvoted, setIsdownvoted] = useState(false);
  const [Upscore, setUpscore] = useState(null);
  const [downscore, setdownscore] = useState(null);

  const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id);

  useEffect(() => {
    setIsupvoted(item.upvotes.includes(userid))
    setIsdownvoted(item.downvotes.includes(userid))
    setUpscore(item.upvotes.length)
    setdownscore(item.downvotes.length)
  }, [item])

  const handleupvote = () => {
    dispatch(Updatequestionstate({ type: "QuesUp", QuesID: item._id, userId: userid }));
  }

  const handledownvote = () => {
    dispatch(Updatequestionstate({ type: "QuesDown", QuesID: item._id, userId: userid }));
  }

  return (

    <div className="bg-white rounded-lg border shadow-sm hover:scale-105 duration-200 max-w-3xl mt-5 m-auto">
      <div className="flex flex-wrap justify-between items-center border-b border-b-gray-200">
        <div className='flex flex-wrap gap-2 p-4'>
          <img className="h-full object-cover rounded-full w-14" loading='lazy' src={`${BASE_URL}/${item.userId.Profilepic}`} alt="UserPropilepic" />
          <span className="flex grow-1 flex-col">
            <div onClick={() => navigate(`/user/${item.userId._id}`)} className=" cursor-pointer flex items-center flex-wrap gap-1 font-bold ">
              <span className="text-sm font-semibold">
                {item.userId.name}
              </span>
              <Rolebadge role={item.userId.role} />
            </div>
            <div className="font-thin color-gray-400">
              <Time time={item.createdAt} />
            </div>
          </span>
        </div>
        <div className='flex flex-wrap justify-center gap-10 pr-10 pl-4'>
          <Likebtn handleupvote={handleupvote} isUpvoted={isUpvoted} score={Upscore} />
          <Dislikebtn handledownvote={handledownvote} isdownvoted={isdownvoted} score={downscore} />
        </div>
      </div>
      <div className="py-4 px-4">
        <div className="forumContent break-words pb-2">
          <span onClick={() => navigate(`/question/${item._id}`)} className='hover:border-b border-black cursor-pointer'>
            {item.content}
          </span>
        </div>
        {
          item.hashtags.length > 0 ? (
            <p>
              {
                item.hashtags.map((hash) => (
                  <Hastag key={hash} hash={hash} />
                ))
              }
            </p>
          ) : (
            <>
            </>
          )
        }
      </div>

    </div>
  )
}

export default QandAcard
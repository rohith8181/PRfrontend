import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './Answercard.css';
import Likebtn from '../buttons/Likebtn';
import Dislikebtn from '../buttons/Dislikebtn';
import Time from '../buttons/Time';
import { UpdateAnswerAstate } from '../../redux/Slices/AnswerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../../helper'

function Answercard({ item }) {

    // console.log("item", item);

    const dispatch = useDispatch();
    const [isUpvoted, setIsupvoted] = useState(false)
    const [isDownvoted, setIsdownvoted] = useState(false);
    const [Upscore, setUpscore] = useState(null);
    const [Downscore, setDownscore] = useState(null);

    const rawHtml = `<div> 
    ${item.content}
    </div>`
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            setIsContentOverflowing(container.scrollHeight > container.clientHeight);
        }
    }, []);

    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    useEffect(() => {
        setIsupvoted(item.upvotes.includes(userid))
        setIsdownvoted(item.downvotes.includes(userid))
        setUpscore(item.upvotes.length)
        setDownscore(item.downvotes.length)
    }, [item])

    const handleupvote = () => {
        if (!isUpvoted) {
            dispatch(UpdateAnswerAstate({ type: "AnsUp", AnsID: item._id, userId: userid }));
        }
    }

    const handledownvote = () => {
        if (!isDownvoted) {
            dispatch(UpdateAnswerAstate({ type: "AnsDown", AnsID: item._id, userId: userid }));
        }
    }
    return (
        <div className="p-6 mb-6 border-t border-b border-gray-700  text-base bg-white rounded-lg dark:bg-gray-900">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={`${BASE_URL}/${item.userId.Profilepic}`}
                            alt="Michael Gough" />{item.userId.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <Time time={item.createdAt} />
                    </p>
                </div>
            </div>
            <div>
                <div
                    className={`overflow-hidden ${isExpanded ? 'max-h-full' : 'max-h-24'
                        }`}
                    ref={containerRef}
                >
                    <p className="text-base"
                        dangerouslySetInnerHTML={{ __html: rawHtml }}
                    />
                </div>
                {isContentOverflowing && (
                    <div className="flex justify-end mt-2 ">
                        {isExpanded ? (
                            <button
                                className="text-blue-500 text-sm hover:underline"
                                onClick={toggleExpanded}
                            >
                                Read Less
                            </button>
                        ) : (
                            <button
                                className="text-sm text-blue-500 hover:underline"
                                onClick={toggleExpanded}
                            >
                                Read More
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className=' mt-5 flex flex-wrap gap-10'>
                <Likebtn handleupvote={handleupvote} isUpvoted={isUpvoted} score={Upscore} />
                <Dislikebtn handledownvote={handledownvote} isdownvoted={isDownvoted} score={Downscore} />
            </div>
        </div>
    )
}

export default Answercard
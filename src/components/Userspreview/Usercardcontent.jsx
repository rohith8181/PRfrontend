import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'
import Time from '../buttons/Time';
import axios from 'axios';
import './Usercardcontent.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../helper'


function Usercardcontent({ content, type }) {

    const params = useParams();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    const [isloading, setisloading] = useState(false);
    const [deleted, setdeleted] = useState(false);
    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id)
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handlenavigate = () => {
            if (type !== "answer") {
                navigate(`/${type}/${content._id}`);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('click', handlenavigate);
        }

        return () => {
            if (container) {
                container.removeEventListener('click', handlenavigate);
            }
        };
    }, [navigate, content._id, type]);

    const handledelete = async () => {
        setisloading(true);
        const { data } = await axios.delete(`${BASE_URL}/request/${type}/${content._id}`);
        console.log(data);
        if (data.success) {
            setdeleted(true);
        }
        setisloading(false);
    }
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            setIsContentOverflowing(container.scrollHeight > container.clientHeight);
        }
    }, []);

    return (
        <div className={`p-6 mb-2 ${deleted ? 'hidden' : ''}  text-base bg-white rounded-lg`}>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Time time={content.createdAt} />
                </p>
            </div>
            <div>
                <div
                    className={`overflow-hidden ${(type !== "answer") ? 'hover:font-bold cursor-pointer' : ''} ${isExpanded ? 'max-h-full' : 'max-h-16'
                        }`}
                    ref={containerRef}
                >
                    {
                        content === null ? (
                            <p>No Data</p>
                        ) : (
                            <>
                                {
                                    content.content ? (
                                        <p>
                                            {content.content}
                                        </p>
                                    ) : (
                                        <p>
                                            {content.title}
                                        </p>
                                    )
                                }
                            </>
                        )
                    }

                </div>
                <div className='flex justify-between mt-2 flex-wrap'>
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
                    {
                        params.id === userid ? (
                            <div onClick={handledelete} className='flex cursor-pointer gap-1 items-center w-fit bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-2xl'>
                                {
                                    isloading ? (
                                        <div className="flex justify-center px-8 py-1">
                                            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <span>
                                                Delete
                                            </span>
                                            <RiDeleteBinLine />
                                        </>
                                    )
                                }

                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Usercardcontent
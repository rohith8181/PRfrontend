import React, { useEffect } from 'react'
import { useState } from 'react';

import Usercardcontent from './Usercardcontent'
import './UserFullcard.css'
import { useParams } from 'react-router-dom';
import { fetchSelecteduserdetails, fetchuserrecords, fetchsubed } from "../../redux/Slices/SearchuserSlice"
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import Page404 from '../Page404/Page404';
import axios from 'axios';
import { BASE_URL } from '../../helper'


function UserFullcard() {

    const params = useParams();
    const dispatch = useDispatch();

    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    const USER = useSelector((state) => state.SelectedUserInfo.SelectedUserdetails)
    const isloading = useSelector((state) => state.SelectedUserInfo.isLoading);
    const isRloading = useSelector((state) => state.SelectedUserInfo.isRLoading);
    const UserRecords = useSelector((state) => state.SelectedUserInfo.Userrecords);
    const idexists = useSelector((state) => state.SelectedUserInfo.isexists);
    const isSloading = useSelector((state) => state.SelectedUserInfo.isSloading);
    const isSubed = useSelector((state) => state.SelectedUserInfo.isSubed);
    const [activeTab, setActiveTab] = useState('questions');
    const [subed, setsubed] = useState(true);

    useEffect(() => {
        dispatch(fetchSelecteduserdetails(params.id));
        dispatch(fetchuserrecords(params.id));
    }, [params])

    useEffect(() => {

        if (USER && userid && USER.subscribers) {
            if (USER.subscribers.includes(userid)) {
                setsubed(true);
            }
            else {
                setsubed(false);
            }
        }
    }, [USER, userid, params])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlesubscribe = async () => {
        const { data } = await axios.post(`${BASE_URL}/request/subscribed`, {
            userId: userid,
            subId: USER._id,
        })
        if (data.success) {
            if (data.type === "sub") {
                setsubed(true);
            } else {
                setsubed(false);
            }
        } else {
            setsubed(false);
        }
    }



    const renderData = () => {
        if (UserRecords.length != 0) {

            switch (activeTab) {
                case 'questions':
                    if (UserRecords.Questionsasked.length === 0) {
                        return <p className='text-center'>No questions data</p>;
                    }
                    return (
                        <div>
                            {isRloading ? (
                                <Loading />
                            ) : (
                                UserRecords.Questionsasked.map((question) => {
                                    if (!question.isAnonymous) {
                                       return <Usercardcontent key={question._id} content={question} type="question" />
                                    }
                                })
                            )}
                        </div>
                    );
                case 'answers':
                    if (UserRecords.AnswersGiven.length === 0) {
                        return <p className='text-center'>No answers data</p>;
                    }
                    return (
                        <div>
                            {isRloading ? (
                                <Loading />
                            ) : (
                                UserRecords.AnswersGiven.map((answer) => {
                                    const parser = new DOMParser()
                                    const htmlDoc = parser.parseFromString(answer.content, 'text/html')
                                    const answerText = htmlDoc.body.textContent
                                    const updatedAnswer = { ...answer, content: answerText }
                                    return <Usercardcontent key={answer._id} content={updatedAnswer} type="answer" />
                                })
                            )}
                        </div>
                    );
                case 'petitions':
                    if (UserRecords.PetitionsAsked.length === 0) {
                        return <p className='text-center'>No petitions data</p>;
                    }
                    return (
                        <div>
                            {isRloading ? (
                                <Loading />
                            ) : (
                                UserRecords.PetitionsAsked.map((petition) => (
                                    <Usercardcontent key={petition._id} content={petition} type="Petition" />
                                ))
                            )}
                        </div>
                    );
                case 'posts':
                    if (UserRecords.PostsUploaded.length === 0) {
                        return <p className='text-center'>No posts data</p>;
                    }
                    return (
                        <div>
                            {isRloading ? (
                                <Loading />
                            ) : (
                                UserRecords.PostsUploaded.map((post) => (
                                    <Usercardcontent key={post._id} content={post} type="Post" />
                                ))
                            )}
                        </div>
                    );
                default:
                    return null;
            }
        }

    };

    return (
        <>
            {
                isloading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        {
                            idexists ? (
                                <>
                                    {
                                        USER !== undefined ? (
                                            <>
                                                <div className="container mx-auto my-40 w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6">
                                                    <div className="bg-white relative shadow rounded-lg  mx-auto">
                                                        <div className="flex justify-center">
                                                            <img src={`${BASE_URL}/${USER.Profilepic}`} className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white" />
                                                        </div>
                                                        <div onClick={handlesubscribe} className='absolute mt-10 right-5 cursor-pointer'>
                                                            {
                                                                isSloading ? (
                                                                    <div className="flex justify-center px-4 py-1">
                                                                        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            subed ? (
                                                                                <svg className="w-6 h-6 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM1.866 8.832a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"></path>
                                                                                </svg>
                                                                            ) : (
                                                                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
                                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"></path>
                                                                                </svg>
                                                                            )
                                                                        }
                                                                    </>
                                                                )

                                                            }

                                                        </div>
                                                        <div className="mt-16">
                                                            <div className='flex items-center flex-wrap justify-center gap-1'>
                                                                <h1 className="font-bold text-center text-3xl text-gray-900">{USER.name}</h1>
                                                                <p className="bg-green-100 h-fit text-center text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400">{USER.role}</p>
                                                                <div className=' font-semibold flex items-center gap-1'>
                                                                    <span>{USER.reputation.toFixed(0)}</span>
                                                                    <svg className="w-4 h-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                                                                        <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <p className="text-center text-sm text-gray-400 font-medium">{USER.email}</p>
                                                            <div className="flex justify-between flex-wrap items-center my-5 px-6">
                                                                <span
                                                                    className={`px-4 cursor-pointer text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center py-3 ${activeTab === 'questions' ? 'active' : ''}`}
                                                                    onClick={() => handleTabClick('questions')}
                                                                >
                                                                    Questions
                                                                </span>
                                                                <span
                                                                    className={`px-4 cursor-pointer text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center py-3 ${activeTab === 'answers' ? 'active' : ''}`}
                                                                    onClick={() => handleTabClick('answers')}
                                                                >
                                                                    Answers
                                                                </span>
                                                                <span
                                                                    className={`px-4 cursor-pointer text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center py-3 ${activeTab === 'petitions' ? 'active' : ''}`}
                                                                    onClick={() => handleTabClick('petitions')}
                                                                >
                                                                    Petitions
                                                                </span>
                                                                <span
                                                                    className={`px-4 cursor-pointer text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center py-3 ${activeTab === 'posts' ? 'active' : ''}`}
                                                                    onClick={() => handleTabClick('posts')}
                                                                >
                                                                    Posts
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {renderData()}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                refresh the page
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <Page404 />
                            )
                        }
                    </>
                )
            }

        </>
    )
}

export default UserFullcard
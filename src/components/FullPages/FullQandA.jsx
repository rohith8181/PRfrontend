import React, { useEffect } from 'react'
import { BsPencilSquare } from "react-icons/bs"
import Answercard from './Answercard'
import { useState } from 'react'
import AnswerModal from '../ReactModals/AnswerModal';
import { useParams } from 'react-router-dom'
import Page404 from '../Page404/Page404'
import Loading from '../LoadingComponent/Loading'
import Sortbtn from '../Sortbutton/Sortbtn'
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswers } from '../../redux/Slices/AnswerSlice'
import { fetchfullQues } from '../../redux/Slices/AnswerSlice'
import Likebtn from "../buttons/Likebtn"
import Dislikebtn from '../buttons/Dislikebtn'
import Time from '../buttons/Time'
import { UpdateAnswerQstate } from '../../redux/Slices/AnswerSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Rolebadge from '../buttons/Rolebadge';
import { toast, ToastContainer } from 'react-toastify'
import { BASE_URL } from '../../helper'


function FullQandA() {

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const dispatch = useDispatch();
    const params = useParams();
    const QuesId = params.id;
    const isQloading = useSelector((state) => state.Answers.isQLoading);
    const isAloading = useSelector((state) => state.Answers.isALoading);
    const idexists = useSelector((state) => state.Answers.Isexists);
    const question = useSelector((state) => state.Answers.question);
    const answers = useSelector((state) => state.Answers.answers);
    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    const Sort = useSelector((state) => state.Sort.sorttype);

    const [isUpvoted, setIsupvoted] = useState(false)
    const [isDownvoted, setIsdownvoted] = useState(false);
    const [Upscore, setUpscore] = useState(null);
    const [Downscore, setDownscore] = useState(null);
    const [reported, setreported] = useState(false);
    useEffect(() => {
        dispatch(fetchfullQues({ QuesId: QuesId }));
    }, [QuesId])

    useEffect(() => {
        dispatch(fetchAnswers({ QuesId: QuesId, sortType: Sort }));
    }, [idexists, Sort])

    useEffect(() => {
        if (question.length != 0) {
            setIsupvoted(question.upvotes.includes(userid));
            setIsdownvoted(question.downvotes.includes(userid));
            setUpscore(question.upvotes.length);
            setDownscore(question.downvotes.length);
            setreported(question.reports.includes(userid))
        }
    }, [question])


    const handleupvote = () => {
        if (!isUpvoted) {
            dispatch(UpdateAnswerQstate({ type: "QuesUp", QuesID: QuesId, userId: userid }));
        }
    }

    const handledownvote = () => {
        if (!isDownvoted) {
            dispatch(UpdateAnswerQstate({ type: "QuesDown", QuesID: QuesId, userId: userid }));
        }
    }

    const handlereport = async () => {
        const { data } = await axios.get(`${BASE_URL}/request/reportquestion`, {
            params: {
                questionId: question._id,
                userId: userid
            }
        })

        toast(data.message);
        if (data.code === 1) {
            setreported(true)
        } else {
            setreported(false)
        }
    }

    return (
        <>
            {
                isQloading ? (
                    <div>
                        <Loading />
                    </div>
                ) : (
                    <>
                        {
                            idexists ? (
                                <>
                                    {/* <Navbar /> */}
                                    <div className='flex justify-center mt-20'>
                                        <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 w-full sm:w-[75%]  lg:w-[65%] text-white bg-gray-900">
                                            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                                                <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                                                    <div className="mb-4 lg:mb-6 not-format">
                                                        <div className="flex items-center mb-6 not-italic">
                                                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 text-white">
                                                                <img className="mr-4 w-12 h-12 rounded-full" src={`${BASE_URL}/${question.userId.Profilepic}`} alt="Jese Leos" />

                                                                {
                                                                    question.isAnonymous ? (
                                                                        <div>
                                                                            <p className="text-lg cursor-pointer font-bold text-gray-900 text-white">Incognito</p>
                                                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                                                <Time time={question.createdAt} />
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <p onClick={() => navigate(`/user/${question.userId._id}`)} className="text-lg cursor-pointer font-bold text-gray-900 text-white">{question.userId.name}</p>
                                                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">{question.userId.email}</p>
                                                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                                                <Time time={question.createdAt} />
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                }

                                                            </div>
                                                        </div>
                                                        <h3 className="mb-4 break-words font-extrabold leading-tight text-gray-900 lg:mb-6 text-white">{question.content}</h3>
                                                        <div className='flex flex-wrap justify-between gap-5'>
                                                            <div className='flex gap-10'>
                                                                <Likebtn handleupvote={handleupvote} isUpvoted={isUpvoted} score={Upscore} />
                                                                <Dislikebtn handledownvote={handledownvote} isdownvoted={isDownvoted} score={Downscore} />
                                                            </div>
                                                            <span onClick={handlereport} className={`text-sm px-5 hover:font-bold hover:text-red-600 cursor-pointer`}>{reported ? "reported" : "report"}</span>

                                                            <button onClick={openModal}
                                                                className="inline-flex items-center py-2.5 px-4 gap-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-primary-800">
                                                                <BsPencilSquare className='text-[#ffffff] text-xl' />
                                                                Answer
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="not-format">
                                                        <Sortbtn />
                                                        <div className="mb-6">
                                                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 text-white">Answers ({answers.length})</h2>
                                                        </div>
                                                        {
                                                            isAloading ? (
                                                                <Loading />
                                                            ) : (
                                                                <>
                                                                    {
                                                                        answers.map((item) => (
                                                                            <Answercard key={item._id} item={item} />
                                                                        ))
                                                                    }
                                                                </>
                                                            )

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ToastContainer />
                                    <AnswerModal isOpen={modalOpen} closeModal={closeModal} question={question} />
                                </>
                            ) : (
                                <>
                                    <Page404 />
                                </>
                            )
                        }
                    </>
                )
            }
        </>

    )
}

export default FullQandA
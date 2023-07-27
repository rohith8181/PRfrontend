import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import Modal from "react-modal";
import { GrClose } from 'react-icons/gr';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import TQModal from './TQModal';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../helper'




function AnswerModal({ isOpen, closeModal, question }) {
    const [value, setValue] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [posted, setposted] = useState(false);
    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id)

    useEffect(() => {
        setValue('');
        setposted(false);
        setIsloading(false);
    }, [isOpen])
    const handleChange = (content) => {
        setValue(content);
    };
    const handlesubmit = async () => {
        if (value === '') {
            return toast("Answer cannot be null")
        }
        setIsloading(true);
        const { data } = await axios.post(`${BASE_URL}/request/answer`, {
            questionid: question._id,
            userid: userid,
            answer: value,
        })

        console.log(data);
        if (data.status === 200) {
            await axios.put(`${BASE_URL}/request/user/${userid}/reputation`)
            await axios.put(`${BASE_URL}/request/question/${question._id}/reputation`)
            await axios.put(`${BASE_URL}/request/answer/${data.answer._id}/reputation`);
            setposted(true);
        }
        setIsloading(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="custommodal"
            shouldCloseOnOverlayClick={true}
            overlayClassName="custom-overlay"
        >
            {
                posted ? (
                    <TQModal closeModal={closeModal} message={"Thanks for the Answer, Hope it will helps your Friends"} />
                ) : (
                    <div>
                        <GrClose onClick={closeModal} className=' cursor-pointer mt-4 ml-4' />
                        <p className='px-2 pt-5 font-bold'>
                            {question.content}
                        </p>
                        <div className='py-5 px-2 h-[300px] mb-8'>
                            <ReactQuill className='h-[80%]' value={value} onChange={handleChange} />
                        </div>
                        <div className="sumitques pb-2 flex float-right mr-5 gap-5 items-center">
                            <div className="cancelques cursor-pointer" onClick={closeModal}>
                                cancel
                            </div>
                            <div onClick={handlesubmit} className="submitquesbtn cursor-pointer   bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-2xl">
                                {
                                    isLoading ? (
                                        <div className="flex justify-center px-4 py-1">
                                            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
                                        </div>
                                    )
                                        : (
                                            <span>
                                                Submit
                                            </span>
                                        )
                                }
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                )
            }


        </Modal>

    );
}

export default AnswerModal
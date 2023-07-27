import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import Modal from "react-modal";
import { GrClose } from 'react-icons/gr';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import TQModal from './TQModal';
import { BASE_URL } from '../../helper'



function PetitionsModal({ isOpen, closeModal }) {

    const [value, setValue] = useState('');
    const [titlevalue, setTitlevalue] = useState('');
    const [Descvalue, setDescvalue] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [posted, setPosted] = useState(false);
    const [expiryTime, setExpiryTime] = useState('');


    useEffect(() => {
        if (!isOpen) {
            setValue('');
            setTitlevalue('');
            setPosted(false);
            setExpiryTime('');
        }
    }, [isOpen]);

    const userId = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    const handleChange = (content) => {
        setValue(content);
    };
    const handleChangetitle = (event) => {
        const title = event.target.value;
        setTitlevalue(title);
    };
    const handledescription = (event) => {
        const desc = event.target.value;
        setDescvalue(desc);
    }

    const handleExpiryChange = (event) => {
        setExpiryTime(event.target.value);
    };


    const notify = () => toast("All Fields are Mandatory");
    const handlesubmit = async () => {
        if (expiryTime === '' || titlevalue === '' || Descvalue === '' || value === '') {
            return notify();
        }
        setIsloading(true);
        try {
            const { data } = await axios.post(`${BASE_URL}/request/petitions`, {
                userId: userId,
                title: titlevalue,
                overview: Descvalue,
                content: value,
                expiretime: expiryTime,
            })
            if (data.status === 200) {
                await axios.put(`${BASE_URL}/request/user/${userId}/reputation`)
                await axios.put(`${BASE_URL}/request/petition/${data.petition._id}/reputation`)
                setPosted(true);
            }
            console.log(data);
        } catch (err) {
            console.log(err);
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
                    <TQModal closeModal={closeModal} message={"Thank you for your Petition, Hope You get a Great support😊"} />
                ) : (
                    <div>

                        <GrClose onClick={closeModal} className=' cursor-pointer mt-4 ml-4' />
                        <div className='py-2 px-2'>
                            <textarea onChange={handleChangetitle} value={titlevalue} className='border-b border-b-black w-full focus:outline-none' type="text" placeholder='Title' />
                            <textarea style={{ resize: 'none' }} onChange={handledescription} className='w-[100%] border-b focus:outline-none' value={Descvalue} placeholder='Small Overview' />
                        </div>
                        <span className='px-2'>Content : </span>
                        <div className='py-5 px-2 h-[300px] mb-8'>
                            <ReactQuill className='h-[80%]' value={value} onChange={handleChange} />
                        </div>
                        <span className='mx-2 font-bold text-red-700'>Expire time :</span>
                        <select className='border mb-5' value={expiryTime} onChange={handleExpiryChange}>
                            <option value="">Select</option>
                            <option value="3">3 hours</option>
                            <option value="6">6 hours</option>
                            <option value="12">12 hours</option>
                            <option value="24">1 day</option>
                        </select>
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

export default PetitionsModal
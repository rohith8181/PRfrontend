import React, { useEffect } from 'react'
import Modal from "react-modal"
import "./Addquestionmodal.css"
import { GrClose } from "react-icons/gr"
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserdetails } from "../../redux/Slices/UserSlice"
import { BASE_URL } from '../../helper'

import TQModal from './TQModal'
import axios from 'axios'

function Addquestionmodal({ isOpen, closeModal }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserdetails());
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setquestiondata('');
      setischecked(false);
      setHastags('');
      setPosted(false);
      setIsloading(false);
    }
  }, [isOpen]);
  const User = useSelector((state) => state.UserInfo.CurrentUserdetails);

  const [questiondata, setquestiondata] = useState('');
  const [ischeked, setischecked] = useState(false);
  const [Hastags, setHastags] = useState('');
  const [posted, setPosted] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const maxquestionlength = 200;
  const maxhastagslength = 50;

  const handleupdatequestion = (event) => {
    const questionvalue = event.target.value;
    if (questionvalue.length <= maxquestionlength) {
      setquestiondata(questionvalue);
    }
  }
  const handleupdateHastags = (event) => {
    const hastagsvalue = event.target.value;
    if (hastagsvalue.length <= maxhastagslength) {
      setHastags(hastagsvalue);
    }
  }
  const handleupdatecheckbox = (event) => {
    setischecked(event.target.checked);
  }
  const postquestion = async () => {
    if (questiondata === '') {
      return toast('Question cannot be null');
    }
    setIsloading(true);
    const hashtagsArray = Hastags
      .split(',')
      .map((tag) => tag.trim().replace(/\s/g, ''))
      .filter((tag) => tag !== '' && tag.length !== 0 && tag[0] === '#');

    const response = await fetch(`${BASE_URL}/request/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: User._id,
        question: questiondata,
        hashtags: hashtagsArray,
        isAnonymous: ischeked,
      }),
    })

    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      await axios.put(`${BASE_URL}/request/user/${User._id}/reputation`)
      setPosted(true);
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
          <TQModal closeModal={closeModal} message={"Thank you for your Question, Hope you find the answer Soon😊"} />
        ) : (
          <div className='modalques'>
            <GrClose onClick={closeModal} className=' cursor-pointer mt-4 ml-4' />
            <div className="profilecontent mt-16 ml-10 flex gap-2 items-center">
              <img className="w-10 h-10 rounded-full" src={`${BASE_URL}/images/defaultprofile.png`} />
              <div className="ml-2 mt-0.5 flex flex-col">
                <span className={`font-medium text-sm leading-snug text-black`}>{User.email}</span>
              </div>
            </div>
            <div className="inputsforques flex flex-col ml-10 mt-10 mr-10 gap-2">
              <textarea
                value={questiondata}
                style={{ resize: 'none' }}
                onChange={handleupdatequestion}
                type="text" placeholder='Ask Your Question' className='quesin focus:outline-none' />
              <span className='text-xs text-gray-400 text-right'>{questiondata.length}/{maxquestionlength}</span>
              <textarea
                onChange={handleupdateHastags}
                value={Hastags}
                style={{ resize: 'none' }}
                type="text" placeholder='Enter Hastags with comma separated' className='Hashin focus:outline-none ' />
              <span className='text-xs text-gray-400 text-right'>{Hastags.length}/{maxhastagslength}</span>
              <span className=' text-xs text-red-700'>Note : If you are entering multiple hastags please separate with comma</span>
            </div>
            <div className='flex items-center flex-wrap gap-1 ml-10 mt-10'>
              <input
                checked={ischeked}
                onChange={handleupdatecheckbox}
                type="checkbox" name="anonymos" />
              <p className=''>Ask Anonymously</p>
            </div>
            <div className="sumitques flex mt-24 mb-10 float-right mr-5 gap-5 items-center">
              <div className="cancelques cursor-pointer" onClick={closeModal}>
                cancel
              </div>
              <div
                onClick={postquestion}
                className="submitquesbtn cursor-pointer   bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-2xl">
                {
                  isLoading ? (
                    <div className="flex justify-center px-8 py-1">
                      <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
                    </div>
                  )
                    : (
                      <span>
                        Add question
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
  )
}

export default Addquestionmodal
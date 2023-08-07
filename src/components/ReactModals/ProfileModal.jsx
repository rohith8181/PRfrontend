import React, { useState } from 'react'
import Modal from 'react-modal'
import { CiLogout } from "react-icons/ci"
import "./ProfileModal.css"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import ForgotModal from './ForgotModal'


function ProfileModal({ isOpen, closeModal }) {

    const navigate = useNavigate();
    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails);
    const Logoutreq = () => {
        Cookies.remove('token');
        navigate('/', { replace: true });
    }
    const [modalOpen, setModalOpen] = useState(false);

    const openmodal = () => {
        setModalOpen(true);
    }
    const closemodal = () => {
        setModalOpen(false);
    }
    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example1 Modal"
            className="custommodalprofile"
            shouldCloseOnOverlayClick={true}
            overlayClassName="custom-overlay-profile"
        >

            <div className='w-[100%] shadow-2xl h-[100%] text-black flex flex-col items-center'>
                <span className='bg-white w-6 h-6 rotate-45 relative bottom-3'></span>
                <ul className='items-center flex flex-col gap-2'>
                    <li>
                        <span onClick={openmodal} className='text-sm  text-red-600 hover:text-red-800 font-semibold cursor-pointer'>Change Password</span>
                    </li>
                    <li>
                        <span onClick={() => navigate(`/user/${userid._id}`)} className='cursor-pointer font-bold hover:text-red-700'>
                            {userid.email}
                        </span>
                    </li>
                    <li onClick={Logoutreq} className='flex cursor-pointer gap-1 items-center w-fit bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-2xl'>
                        <CiLogout className='text-lg' />
                        <span>
                            Log out
                        </span>
                    </li>
                </ul>
            </div>
            <ForgotModal isopen={modalOpen} closemodal={closemodal} />

        </Modal>

    )
}

export default ProfileModal
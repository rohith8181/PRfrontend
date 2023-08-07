import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast, ToastContainer } from "react-toastify"
import { BASE_URL } from '../../helper';
import { useSelector } from 'react-redux';


function ForgotModal({ isopen, closemodal }) {

    const [isloading, setisloading] = useState(false);
    const [oldpass, setoldpass] = useState('');
    const [newpass, setnewpass] = useState('');
    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails);


    useEffect(() => {
        if (!isopen) {
            setoldpass('');
            setnewpass('');
            setisloading(false);
        }
    }, [isopen])
    const oldpasschange = (e) => {
        setoldpass(e.target.value);
    }
    const newpasschange = (e) => {
        setnewpass(e.target.value);
    }
    const handlepasswordchange = async () => {
        if (!oldpass || !newpass) {
            return toast("Fill All details!")
        }
        setisloading(true)

        const { data } = await axios.post(`${BASE_URL}/request/Updatepass`, {
            oldpass: oldpass,
            newpass: newpass,
            userid: userid._id
        })

        setisloading(false);
        toast(data.message);
        setoldpass('');
        setnewpass('');
    }
    return (

        <Modal
            isOpen={isopen}
            onRequestClose={closemodal}
            contentLabel="Example1 Modal"
            className="custommodal"
            shouldCloseOnOverlayClick={true}
            overlayClassName="custom-overlay"
        >

            <div className='bg-white flex flex-col h-44 authform items-center m-5'>
                <input onChange={oldpasschange} value={oldpass} type="text" placeholder='Current Password' />
                <input onChange={newpasschange} value={newpass} type="password" placeholder='New Password' />
                {
                    isloading ? (
                        <div className="flex justify-center px-8 py-1">
                            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
                        </div>
                    ) : (
                        <button onClick={handlepasswordchange} className="bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-2xl">
                            Submit
                        </button>
                    )
                }
            </div>
            <ToastContainer />

        </Modal>

    )
}

export default ForgotModal
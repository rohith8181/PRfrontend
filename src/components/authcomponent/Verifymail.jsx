import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../../helper';

function Verifymail() {
    const { token } = useParams();
    const [verified, setverified] = useState(false);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const verifymail = async () => {
            setloading(true);
            try {
                const response = await axios.get(`${BASE_URL}/verify/${token}`);
                console.log(response.data.message);
                if (response.data.status === 200) {
                    setverified(true);
                }
            } catch (error) {
                console.error(error);
            }
            setloading(false);
        };
        verifymail();
    }, [token])

    return (
        <>
            {
                loading ? (
                    <div className='text-3xl'>
                        Loading....
                    </div>
                ) : (
                    <>
                        {
                            verified ? (
                                <div className="bg-gray-100 h-screen">
                                    <div className="bg-white p-6  md:mx-auto">
                                        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                                            <path fill="currentColor"
                                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                            </path>
                                        </svg>
                                        <div className="text-center">
                                            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Mail Verified</h3>
                                            <p className="text-gray-600 my-2">Thank you for completing your Verification Process.</p>
                                            <p> Have a great day!  </p>
                                            <div className="py-10 text-center">
                                                <a href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                                    Login
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>) : (
                                <div className="flex h-[100vh] items-center justify-center p-5 bg-white w-full">
                                    <div className="text-center">
                                        <div className="inline-flex rounded-full bg-yellow-100 p-4">
                                            <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
                                                <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            </div>
                                        </div>
                                        <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">404 - Page not found</h1>
                                        <p className="text-slate-600 mt-5 lg:text-lg">The page you are looking for doesn't exist </p>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }

        </>

    )
}

export default Verifymail
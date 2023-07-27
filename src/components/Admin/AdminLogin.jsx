import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../helper';

function AdminLogin() {

    const navigate = useNavigate();

    const Adminexists = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/request/verifyauth`, {
                headers: {
                    "x-access-token": Cookies.get("Admintoken"),
                }
            });
            if (data.auth) {
                navigate('/admin', { replace: true })
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        Adminexists();
    }, []);

    const [name, setname] = useState('');
    const [password, setpassword] = useState('');

    const handlename = (e) => {
        setname(e.target.value);
    }

    const handlepassword = (e) => {
        setpassword(e.target.value)
    }

    const handleadminlogin = async (event) => {
        event.preventDefault();

        const { data } = await axios.post(`${BASE_URL}/request/adminLogin`, {
            name: name,
            password: password
        })

        if (data.success) {
            Cookies.set("Admintoken", data.admintoken)
            navigate('/admin', { replace: true })
        }
        else {
            toast('Login Failed check the Credentials')
        }
    }
    return (
        <div className="flex bg-gray-200 min-h-full flex-1 flex-col justify-center mt-20 px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="m-auto h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                <h2 className="mt-10 text-center text-red-700 text-2xl font-bold leading-9 tracking-tight">
                    Admin login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handlename}
                                value={name}
                                id="email"
                                name="email"
                                type="text"
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={handlepassword}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleadminlogin}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AdminLogin
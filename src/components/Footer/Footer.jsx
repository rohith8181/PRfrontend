import React from 'react'
import logo from '../../assests/logo.png'
import { useNavigate } from 'react-router-dom'
function Footer() {

    const navigate = useNavigate();
    return (
        <footer className="rounded-lg shadow bg-gray-800 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">StudentSupport</span>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <span onClick={() => navigate('/team')} className="hover:underline cursor-pointer">Team</span>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <span className="hover:underline">StudentSupport</span>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer




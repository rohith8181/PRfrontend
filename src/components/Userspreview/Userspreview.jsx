import React, { useEffect } from 'react'
import Userscard from './Userscard'
import './Userspreview.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAlluserdetails } from '../../redux/Slices/AlluserSlice'
import Loading from '../LoadingComponent/Loading'

function Userspreview() {

    const dispatch = useDispatch();


    const userresults = useSelector((state) => state.AllUserInfo.AllUserdetails);
    const isloading = useSelector((state) => state.AllUserInfo.isLoading);

    useEffect(() => {
        dispatch(fetchAlluserdetails("#"));
    }, [])


    const handleSearch = async (event) => {
        const useremail = event.target.value;
        if (useremail !== "") {
            dispatch(fetchAlluserdetails(useremail));
        }
    };


    return (
        <>
            <div className=' mt-48'>
                <div className="searchbar h-[50%] flex justify-center items-end">
                    <div className="w-[100%] flex items-center justify-center px-5 py-5">
                        <div className="w-full mx-auto rounded-xl bg-gray-100 shadow-lg p-10 text-gray-800 relative overflow-hidden resize-x min-w-80 max-w-3xl" x-data="app()" x-init="generatePassword()">
                            <div className="relative mt-1">
                                <input type="text" id="password" onChange={handleSearch} className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Search User by Email" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-2 flex">
                                <div className="h-2 bg-blue-500 flex-1"></div>
                                <div className="h-2 bg-red-500 flex-1"></div>
                                <div className="h-2 bg-yellow-500 flex-1"></div>
                                <div className="h-2 bg-blue-500 flex-1"></div>
                                <div className="h-2 bg-green-500 flex-1"></div>
                                <div className="h-2 bg-red-500 flex-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userresultscontainer mt-10 mb-20">
                    {
                        isloading ? (
                            <Loading />
                        ) :
                            (
                                <>
                                    {
                                        userresults !== undefined ? (
                                            <>
                                                {
                                                    userresults.length === 0 ? (
                                                        <h1 className='text-center text-xl text-red-800'>No results</h1>
                                                    ) : (
                                                        <ul role="list" className="divide-y divide-gray-100 max-w-2xl m-auto bg-black">
                                                            {userresults.map((person) => (
                                                                <Userscard person={person} key={person._id} />
                                                            ))}
                                                        </ul>
                                                    )
                                                }
                                            </>
                                        ) :
                                            (
                                                <>
                                                    refresh the page
                                                </>
                                            )
                                    }
                                </>
                            )
                    }
                </div>
            </div>
        </>
    )
}


export default Userspreview
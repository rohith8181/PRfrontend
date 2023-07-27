import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Rolebadge from "../buttons/Rolebadge"
import Time from "../buttons/Time"
import Footer from '../Footer/Footer';
import Loading from "../LoadingComponent/Loading"
import '../Userspreview/Userspreview.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAlluserdetails } from '../../redux/Slices/AlluserSlice'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../helper'
const adminimg = require("../../assests/logo.png");



const Usercard = ({ person }) => {

    const [deleted, setdeleted] = useState(false);
    const handleaddelete = async () => {
        const { data } = await axios.delete(`${BASE_URL}/request/addelete`, {
            params: {
                role: person.role,
                name: person.name
            }
        })
        toast(data.message);
        if (data.success) {
            setdeleted(true);
        }
    }
    return (
        <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                    <img
                        src={`${BASE_URL}/${person.Profilepic}`} className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10" />
                    <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">{person.name}</p>
                        <p className="text-gray-600 text-md">{person.role}</p>
                    </div>
                </div>
                <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                    <div onClick={handleaddelete} className={`bg-red-700 ${deleted ? "pointer-events-none opacity-50" : ""} cursor-pointer pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all duration-200 hover:bg-red-800 rounded-lg`}>{deleted ? "Removed" : "Delete"}</div>
                </div>
            </div>
        </div>
    )
}

const QuestionCard = ({ item }) => {

    const [isApproved, setisApproved] = useState(false);
    const [isdeleted, setisdeleted] = useState(false);

    const handleapprove = async () => {
        const { data } = await axios.get(`${BASE_URL}/request/qapprove`, {
            params: {
                questionId: item._id
            }
        })
        toast(data.message);
        if (data.success) {
            setisApproved(true);
        }
    }

    const handleQdelete = async () => {
        const { data } = await axios.delete(`${BASE_URL}/request/qdelete`, {
            params: {
                questionId: item._id
            }
        })

        toast(data.message);
        if (data.success) {
            setisdeleted(true);
        }
    }

    return (
        <>
            <div className="bg-white rounded-lg border shadow-sm max-w-3xl mt-5 m-auto">
                <div className="flex flex-wrap justify-between items-center border-b border-b-gray-200">
                    <div className='flex flex-wrap gap-2 p-4'>
                        <img className="h-full object-cover rounded-full w-14" loading='lazy' src={`${BASE_URL}/${item.userId.Profilepic}`} alt="UserPropilepic" />
                        <span className="flex grow-1 flex-col">
                            <div className=" cursor-pointer flex items-center flex-wrap gap-1 font-bold ">
                                <span className="text-sm font-semibold">
                                    {item.userId.name}
                                </span>
                                <Rolebadge role={"student"} />
                            </div>
                            <div className="font-thin color-gray-400">
                                <Time time={item.createdAt} />
                            </div>
                        </span>
                    </div>
                    <div>
                        <p className='px-5'>{item.content}</p>
                    </div>
                    <div className="p-3 flex">
                        <button onClick={handleapprove} className={`text-slate-800 ${isApproved || isdeleted ? "pointer-events-none" : ""} hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center`}>
                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            </span>
                            <span>{isApproved ? "Approved✅" : "Approve"}</span>
                        </button>
                        <button onClick={handleQdelete} className={`text-slate-800 hover:text-red-600 text-sm ${isApproved || isdeleted ? "pointer-events-none" : ""} bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center`}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </span>
                            <span>{isdeleted ? "Deleted✅" : "Delete"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

const DashBoard = () => {

    const [dashboard, setdashboard] = useState([]);
    const [isloading, setisloading] = useState(false);
    const fetchdashboard = async () => {
        setisloading(true);
        const { data } = await axios.get(`${BASE_URL}/request/dashboarddetails`)

        if (data.success) {
            setdashboard(data.dashboard);
        }
        setisloading(false)
    }

    useEffect(() => {
        fetchdashboard();
    }, [])

    return (
        <>
            <div className="max-w-4xl m-auto mt-10 bg-gray-900 py-6 sm:py-12">
                {
                    isloading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="flex flex-wrap mb-2">
                                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
                                    <div className="bg-green-600 border rounded shadow p-2">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pl-1 pr-4"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                                            <div className="flex-1 text-right">
                                                <h5 className="text-white">Total Questions</h5>
                                                <h3 className="text-white text-3xl">
                                                    {dashboard.questionCount}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
                                    <div className="bg-blue-600 border rounded shadow p-2">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                                            <div className="flex-1 text-right">
                                                <h5 className="text-white">Total Users</h5>
                                                <h3 className="text-white text-3xl"> {dashboard.userCount}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
                                    <div className="bg-orange-600 border rounded shadow p-2">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                                            <div className="flex-1 text-right pr-1">
                                                <h5 className="text-white">Total Petitions</h5>
                                                <h3 className="text-white text-3xl"> {dashboard.petitionCount}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
                                    <div className="bg-purple-600 border rounded shadow p-2">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                                            <div className="flex-1 text-right">
                                                <h5 className="text-white">Total Posts</h5>
                                                <h3 className="text-white text-3xl"> {dashboard.academicCount}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
                                    <div className="bg-red-600 border rounded shadow p-2">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                                            <div className="flex-1 text-right">
                                                <h5 className="text-white">Total Answers</h5>
                                                <h3 className="text-white text-3xl"> {dashboard.answerCount}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
                                    <div className="bg-pink-600 border rounded shadow p-2">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                                            <div className="flex-1 text-right">
                                                <h5 className="text-white">Total reported Questions</h5>
                                                <h3 className="text-white text-3xl">{dashboard.reportcount} <span className="text-pink-400"><i className="fas fa-caret-up"></i></span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>

        </>
    )
};

const Users = () => {
    const dispatch = useDispatch()


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
            <div className=' mt-24'>
                <div className="searchbar h-[50%] flex justify-center items-end">
                    <div className="w-[100%] flex items-center justify-center px-5 py-5">
                        <div className="w-full mx-auto rounded-xl bg-gray-100 shadow-lg p-10 text-gray-800 relative overflow-hidden resize-x min-w-80 max-w-3xl" x-data="app()" x-init="generatePassword()">
                            <div className="relative mt-1">
                                <input type="text" id="password" onChange={handleSearch} className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Search User by Email" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-2 flex">
                                <div className="h-2 bg-black flex-1"></div>
                                <div className="h-2 bg-red-500 flex-1"></div>
                                <div className="h-2 bg-black flex-1"></div>
                                <div className="h-2 bg-red-500 flex-1"></div>
                                <div className="h-2 bg-black flex-1"></div>
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
                                                        // <ul role="list" className="divide-y divide-gray-100 max-w-2xl m-auto bg-black">
                                                        <div className="shadow-xl max-w-xl m-auto pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
                                                            <div className="pt--10 pr-0 pb-10 pl-0">
                                                                {userresults.map((person) => (
                                                                    <Usercard person={person} key={person._id} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        // </ul>
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
};

const ApproveQuestions = () => {

    const [AnonyQuestions, setAnonyQuestinos] = useState([])
    const [isloading, setisloading] = useState(false);

    const fetchAnonyQuestions = async () => {
        const { data } = await axios.get(`${BASE_URL}/request/Anonyquestions`)
        setAnonyQuestinos(data.questions);
    }
    useEffect(() => {
        setisloading(true);
        fetchAnonyQuestions();
        setisloading(false);
    }, [])
    return (
        <div>
            {
                isloading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        {
                            AnonyQuestions !== undefined && AnonyQuestions.length > 0 ? (
                                <>
                                    {
                                        AnonyQuestions.map((item) => (
                                            <QuestionCard key={item.id} item={item} />
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    <p className='ml-20 font-bold text-red-700 mt-20'>No Questions Need to be Approved</p>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

const Admins = () => {
    const [alladmins, setalladmins] = useState([]);
    const [adname, setadname] = useState('');
    const [adpassword, setadpassword] = useState('');
    const [isloading, setisloading] = useState(false);
    const [fun, setfun] = useState(false);

    const fetchalladmins = async () => {
        setisloading(true);
        const { data } = await axios.get(`${BASE_URL}/request/getadmins`)
        if (data.success) {
            setalladmins(data.admins);
        }
        setisloading(false);
    }

    useEffect(() => {
        fetchalladmins();
    }, [])
    useEffect(() => {
        fetchalladmins();
    }, [fun])
    const handlname = (event) => {
        setadname(event.target.value)
    }
    const handlepassword = (event) => {
        setadpassword(event.target.value)
    }

    const handlesubmit = async (event) => {
        event.preventDefault();
        setfun(false);
        if (adname === '' || adpassword === '') {
            toast("All details are mandatory")
        } else {
            const { data } = await axios.post(`${BASE_URL}/request/addadmin`, {
                adname: adname,
                adpassword: adpassword,
            })
            toast(data.message)
            setadname('');
            setadpassword('');
        }
        setfun(true);
    }

    return (
        <>

            <div className="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
                <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
                        <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xl font-bold text-gray-900">Admins</p>
                            </div>
                        </div>
                        <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
                            <div className="pt--10 pr-0 pb-10 pl-0">
                                {
                                    isloading ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            {
                                                alladmins.map((item) => (
                                                    <Usercard key={item._id} person={item} />
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-lg mx-auto mt-20">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your Name</label>
                            <input type="text" onChange={handlname} value={adname} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name" required="" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Your password</label>
                            <input type="password" onChange={handlepassword} value={adpassword} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
                        </div>
                        <button type="submit" onClick={handlesubmit} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Admin</button>
                    </form>
                </div>
            </div>
        </>
    );
};

const ReportedQuestions = () => {
    const [reportquestions, setreportquestions] = useState([])
    const [isloading, setisloading] = useState(false);

    const fetchreportquestions = async () => {
        const { data } = await axios.get(`${BASE_URL}/request/reportedquestions`)
        setreportquestions(data.reportedquestions);
    }
    useEffect(() => {
        setisloading(true);
        fetchreportquestions();
        setisloading(false);
    }, [])
    return (
        <div>
            {
                isloading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        {
                            reportquestions !== undefined && reportquestions.length > 0 ? (
                                <>
                                    {
                                        reportquestions.map((item) => (
                                            <QuestionCard key={item.id} item={item} />
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    <p className='ml-20 font-bold text-red-700 mt-20'>No Questions Need to be Approved</p>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}

function Admin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activenav, setactivenav] = useState('DashBoard');
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleactive = (navname) => {
        setactivenav(navname);
    }
    const navigate = useNavigate();

    const handlelogout = () => {
        Cookies.remove('Admintoken');
        navigate('/admin/login', { replace: true });
    }
    return (
        <>

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center cursor-pointer" onClick={() => { window.location.reload() }}>
                        <img src={adminimg} className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Admin</span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isSidebarOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isSidebarOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium  flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <span
                                    onClick={handlelogout}
                                    className={` text-white cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0`}
                                >
                                    Admin : Rohith
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => handleactive('DashBoard')}
                                    className={` ${activenav === 'DashBoard' ? 'text-red-600' : 'text-white'} cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0`}
                                >
                                    DashBoard
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => handleactive('ReportedQuestions')}
                                    className={` ${activenav === 'ReportedQuestions' ? 'text-red-600' : 'text-white'} cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0`}
                                >
                                    reportedQ
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => handleactive('ApproveQuestions')}
                                    className={` ${activenav === 'ApproveQuestions' ? 'text-red-600' : 'text-white'} cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0`}
                                >
                                    ApproveQ
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => handleactive('Users')}
                                    className={` ${activenav === 'Users' ? 'text-red-600' : 'text-white'} cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0`}
                                >
                                    Users
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => handleactive('Admins')}
                                    className={` ${activenav === 'Admins' ? 'text-red-600' : 'text-white'} cursor-pointer block py-2 pl-3 pr-4 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0`}
                                >
                                    Admins
                                </span>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <div className='min-h-[400px]'>
                <div className="Contentloader">
                    {activenav === 'DashBoard' && <DashBoard />}
                    {activenav === 'Users' && <Users />}
                    {activenav === 'ReportedQuestions' && <ReportedQuestions />}
                    {activenav === 'ApproveQuestions' && <ApproveQuestions />}
                    {activenav === 'Admins' && <Admins />}
                </div>
                <ToastContainer />
            </div>

            <Footer />
        </>

    );
}

export default Admin;

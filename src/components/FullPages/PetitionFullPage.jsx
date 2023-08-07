import React, { useEffect } from 'react'
import { useState } from 'react'
import Page404 from '../Page404/Page404'
import Loading from '../LoadingComponent/Loading'
import Time from '../buttons/Time'
import SupportAnimation from '../buttons/SupportAnimation'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchfullpetition, Signpetition } from '../../redux/Slices/PetitionSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../helper'
import moment from 'moment';

function PetitionFullPage() {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const PETID = params.id;
    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    const isFLoading = useSelector((state) => state.Petitions.isFLoading);
    const isSLoading = useSelector((state) => state.Petitions.isSLoading);
    const Petition = useSelector((state) => state.Petitions.FullPetition);
    const Isexists = useSelector((state) => state.Petitions.Isexists);

    const [Issigned, setIssigned] = useState(false);
    const [score, setscore] = useState(null);


    useEffect(() => {
        dispatch(fetchfullpetition(PETID));
    }, [PETID])

    useEffect(() => {
        if (Petition.length !== 0) {
            setscore(Petition.SignedBy.length);
            setIssigned(Petition.SignedBy.includes(userid));
        }
    }, [Petition])
    let rawHtml = ``;
    if (Isexists) {
        rawHtml = `${Petition.content}`
    }
    const handlesignPet = async () => {
        dispatch(Signpetition({ petid: params.id, userid: userid }))
    }

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const expirationDate = moment(Petition.createdAt).add(Petition.expiretime, 'hours');
        const interval = setInterval(() => {
            const now = moment();
            const diff = expirationDate.diff(now);
            const duration = moment.duration(diff);
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft('Expired');
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [Petition]);
    return (
        <>
            {
                isFLoading ? (
                    <Loading />
                ) : (
                    <>
                        {
                            Isexists ? (
                                <>
                                    <div className='flex justify-center mt-20'>
                                        <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 w-full sm:w-[75%] md:w-[65%] text-white bg-gray-900">
                                            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                                                <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                                                    <div className="mb-4 lg:mb-6 not-format">
                                                        <div className="flex items-center mb-6 not-italic">
                                                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 text-white">
                                                                <img className="mr-4 w-12 h-12 rounded-full" src={`${BASE_URL}/${Petition.userId.Profilepic}`} alt="Jese Leos" />
                                                                <div>
                                                                    <p onClick={() => navigate(`/user/${Petition.userId._id}`)} className="text-lg font-bold cursor-pointer text-gray-900 text-white">{Petition.userId.name}</p>
                                                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">{Petition.userId.email}</p>
                                                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                                        <Time time={Petition.createdAt} />
                                                                    </p>
                                                                    <span className='text-lg font-semibold'>Count down: </span> <span className=' text-sm font-thin'>{timeLeft}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3 className="mb-4 break-words font-extrabold leading-tight text-gray-900 lg:mb-6 text-white">
                                                            {Petition.title}
                                                        </h3>
                                                        <p className="text-base border-t border-b py-5 border-gray-700"
                                                            dangerouslySetInnerHTML={{ __html: rawHtml }}
                                                        />
                                                        <div className='flex mt-10 flex-wrap items-center justify-between'>
                                                            {
                                                                isSLoading ? (
                                                                    <div className="flex justify-center px-8 py-1">
                                                                        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-6 w-6"></div>
                                                                    </div>) : (
                                                                    <>
                                                                        <SupportAnimation Support={score} />
                                                                        {
                                                                            Petition.isexpired ? (
                                                                                <p className='text-red-500'>Expired</p>
                                                                            ) : (
                                                                                <div onClick={handlesignPet} className={`flex w-fit h-fit cursor-pointer gap-1 items-center ${Issigned ? 'bg-white text-black' : 'bg-red-700 hover:bg-red-800 text-white'} py-1 px-4 rounded-2xl`}>
                                                                                    <span>
                                                                                        {Issigned ? 'Signed' : 'Sign'}
                                                                                    </span>
                                                                                    {
                                                                                        Issigned ? (
                                                                                            <svg className="w-4 h-4 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                                                <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                                                                                                <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                                                                                            </svg>
                                                                                        ) : (
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width="18"
                                                                                                height="18"
                                                                                                viewBox="0 0 24 24"
                                                                                            >
                                                                                                <path
                                                                                                    className="icon_svg-fill_as_stroke"
                                                                                                    d="M20.582 1.469c.951.255 1.694.998 1.949 1.949.238.888.017 1.831-.58 2.519l-.134.143L7.594 20.299c-.039.039-.082.072-.129.099l-.073.036-1.238.514.006.006-.1.033-3.82 1.59c-.247.103-.495.037-.662-.116l-.058.019.019-.058c-.134-.146-.201-.354-.147-.569l.031-.093 1.592-3.831.031-.089.005.005.515-1.237c.021-.05.048-.098.081-.141l.054-.061L17.92 2.182c.696-.696 1.711-.968 2.662-.713zm.918 8.406c.314 0 .574.231.618.533l.007.092v11c0 .314-.231.574-.533.618l-.092.007h-11c-.345 0-.625-.28-.625-.625 0-.314.231-.574.533-.618l.092-.007h10.375V10.5c0-.314.231-.574.533-.618l.092-.007zm-2.577-6.916l-.119.107L4.673 17.201l-.666 1.6 1.19 1.19 1.601-.665 14.136-14.13c.304-.304.46-.72.439-1.14l-.016-.158-.033-.157c-.139-.52-.545-.926-1.065-1.065-.468-.125-.964-.018-1.335.283zM13.5 1.875c.345 0 .625.28.625.625 0 .314-.231.574-.533.618l-.092.007H3.124L3.125 13.5c0 .314-.231.574-.533.618l-.092.007c-.314 0-.574-.231-.618-.533l-.007-.092v-11c0-.314.231-.574.533-.618l.092-.007h11z"
                                                                                                    fill="currentColor"
                                                                                                />
                                                                                            </svg>

                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }

                                                                    </>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Page404 />
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default PetitionFullPage
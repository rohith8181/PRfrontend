import React, { useEffect, useState } from 'react'
import Commentcard from './Commentcard'
import Time from '../buttons/Time'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../LoadingComponent/Loading'
import Page404 from '../Page404/Page404'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../helper'


function AcadmicFullPage() {

    const params = useParams();
    const [post, setpost] = useState([]);
    const [exists, setexists] = useState(false);
    const [isloading, setisloading] = useState(false);
    const [commentvalue, setcommentvalue] = useState('');
    const [postcomments, setpostcomments] = useState([]);
    const userid = useSelector((state) => state.UserInfo.CurrentUserdetails._id);
    const handlecomment = (event) => {
        const value = event.target.value;
        setcommentvalue(value);
    }

    const handlesubmit = async () => {
        if (commentvalue.length > 10) {
            const { data } = await axios.post(`${BASE_URL}/request/postcomment`, {
                comment: commentvalue,
                userId: userid,
                PostId: params.id,
            })
            setcommentvalue('');
            if (data.status === 200) {
                await axios.put(`${BASE_URL}/request/academicpost/${params.id}/reputation`)
            }
        }
    }
    const fetchComments = async () => {
        const { data } = await axios.get(`${BASE_URL}/request/getcomments`, {
            params: {
                PostId: params.id
            }
        })
        setpostcomments(data.comments);
    }
    const fetchpost = async () => {
        setisloading(true);
        const { data } = await axios.get(`${BASE_URL}/request/post`, {
            params: {
                PostId: params.id,
            }
        })

        if (data.status === 200) {
            setexists(true);
            setpost(data.post);
        }
        setisloading(false);
    }
    useEffect(() => {
        fetchComments();
        setcommentvalue('');
        setisloading(false);
        setexists(false)
        fetchpost();
    }, [params])

    useEffect(() => {
        fetchComments();
    }, [handlesubmit])
    let rawHtml = '';
    if (exists) {
        rawHtml = `${post[0].content}`
    }
    return (
        <>
            {
                isloading ? (
                    <Loading />
                ) : (
                    <>
                        {
                            exists ? (
                                <>
                                    <div className='flex justify-center mt-20'>
                                        <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 w-full sm:w-[75%] md:w-[65%] text-white bg-gray-900">
                                            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                                                <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                                                    <div className="mb-4 lg:mb-6 not-format">
                                                        <div className="flex items-center mb-6 not-italic">
                                                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 text-white">
                                                                <img className="mr-4 w-16 h-16 rounded-full" src={`${BASE_URL}/${post[0].userId.Profilepic}`} alt="Jese Leos" />
                                                                <div>
                                                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 text-white">{post[0].userId.name}</a>
                                                                    <p className="text-base font-light text-gray-500 dark:text-gray-400">{post[0].userId.email}</p>
                                                                    <p className="text-base font-light text-gray-500 dark:text-gray-400"><Time time={post[0].createdAt} /></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-red-400 lg:mb-6 lg:text-4xl">{post[0].title}</h1>
                                                    </div>
                                                    <p
                                                        className='lead border-t border-b border-gray-500 py-5'
                                                        dangerouslySetInnerHTML={{ __html: rawHtml }}
                                                    />
                                                    <div className="not-format mt-10">
                                                        <div className="flex justify-between items-center mb-6">
                                                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 text-white">Discussion ({postcomments.length})</h2>
                                                        </div>
                                                        <div className="mb-6">
                                                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                                                <textarea id="comment" rows="6"
                                                                    onChange={handlecomment}
                                                                    value={commentvalue}
                                                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                                    placeholder="Write a comment..." required></textarea>
                                                            </div>
                                                            <div onClick={handlesubmit}
                                                                className="inline-flex cursor-pointer items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-primary-800">
                                                                Post comment
                                                            </div>
                                                        </div>
                                                        {
                                                            postcomments.map((item) => (
                                                                <Commentcard comment={item} key={item._id} />
                                                            ))
                                                        }
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
export default AcadmicFullPage
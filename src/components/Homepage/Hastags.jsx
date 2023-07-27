import React, { useEffect, useState } from 'react';
import "./Hastags.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestiondetails } from "../../redux/Slices/QuestionSlice";
import { BASE_URL } from '../../helper'


const Hashtags = () => {
    const dispatch = useDispatch();
    const Sort = useSelector((state) => state.Sort.sorttype);
    const currentPage = useSelector((state) => state.Questions.currentPage);

    const [isloading, setisloading] = useState(false);
    const [popularHashtags, setPopularHashtags] = useState([]);
    const [selectedHashtag, setSelectedHashtag] = useState('');

    useEffect(() => {
        fetchPopularHashtags();
    }, []);

    const fetchPopularHashtags = async () => {
        setisloading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}/request/hashtags/popular`);
            if (data.success) {
                setPopularHashtags(data.popularHashtags);
            }
        } catch (error) {
            console.error(error);
        }
        setisloading(false);
    };

    const handleHashtagClick = async (hashtag) => {
        try {
            setSelectedHashtag(hashtag);
            const { data } = await axios.get(`${BASE_URL}/request/questions/search`, {
                params: { hashtag: hashtag }
            });
            if (data.success) {
                dispatch(fetchQuestiondetails({ page: currentPage, sorttype: Sort, hashtag: hashtag }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='ml-5'>
            <div className=' max-w-2xl m-auto text-center'>
                <p className='title text-xl  text-[#7c2525] font-bold'> Trending Hashtags 🔥</p>
                <div className="hashtag-list pt-2 justify-center flex flex-wrap">
                    {
                        isloading ? (
                            <div className="flex justify-center px-4 py-1">
                                <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
                            </div>
                        ) : (
                            <>
                                {popularHashtags.length > 0 ? (
                                    <>
                                        <span onClick={() => handleHashtagClick("")} className="text-xs cursor-pointer hover:bg-red-800 font-medium mr-2 px-2.5 py-0.5 my-1 rounded-full bg-black text-red-100">All</span>
                                        {popularHashtags.map((hashtag, index) => (
                                            <span onClick={() => handleHashtagClick(hashtag._id)} key={index} className="text-xs cursor-pointer hover:bg-red-800 font-medium mr-2 px-2.5 py-0.5 my-1 rounded-full bg-red-700 text-red-100">{hashtag._id}</span>
                                        ))}
                                    </>
                                ) : (
                                    <p className='text-center font-semibold'>No popular hashtags found.</p>
                                )}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Hashtags;

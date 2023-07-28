import React, { useEffect, useState } from 'react'
import Academichelpcard from './Academichelpcard'

import AddAcdemichelpModal from '../ReactModals/AddAcdemichelpModal'
import Academicbutton from './Academicbutton'
import { useSelector } from 'react-redux'
import Sortbtn from '../Sortbutton/Sortbtn';
import axios from 'axios'
import { BASE_URL } from '../../helper'


function Academichelppreview() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const Sort = useSelector((state) => state.Sort.sorttype);
  const [Posts, setPosts] = useState([]);
  const [postLimit, setPostLimit] = useState(5);
  const [loadedPosts, setLoadedPosts] = useState(0);


  useEffect(() => {
    fetchPosts();
  }, [loadedPosts, Sort]);
  useEffect(() => {
    setLoadedPosts(0);
  }, [Sort])

  const fetchPosts = async () => {
    if (loadedPosts === 0) {
      // Fetch initial posts
      const { data } = await axios.get(`${BASE_URL}/request/posts?limit=${postLimit}&skip=${loadedPosts}&sortType=${Sort}`);
      setPosts(data.Posts);
    } else {
      // Fetch additional posts
      const { data } = await axios.get(`${BASE_URL}/request/posts?limit=${postLimit}&skip=${loadedPosts}&sortType=${Sort}`);
      const newPosts = data.Posts.filter(newPost => !Posts.some(existingPost => existingPost._id.toString() === newPost._id.toString()));
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    }
  };

  const handleLoadMore = () => {
    setLoadedPosts((prevLoadedPosts) => prevLoadedPosts + postLimit);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className='mt-20 lg:mx-5'>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className='lg:flex justify-between items-center'>
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Academic Help</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Learn and grow your Knowledge with Your Seniors.
                </p>
              </div>
              <div className='mx-auto max-w-2xl lg:mx-0' onClick={openModal}>
                <Academicbutton />
              </div>
            </div>
            <div className='max-w-2xl m-auto mt-10'>
              <Sortbtn />
            </div>

            <div className=" border-t border-gray-200 mx-auto mt-10 grid max-w-2xl  grid-cols-1 gap-x-8 gap-y-14  pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
              {
                Posts && Posts.length > 0 ? (
                  <>
                    {Posts.map((post) => (
                      <Academichelpcard key={post._id} post={post} />
                    ))}
                  </>
                ) : (
                  <p className='text-red-700 font-bold text-xl'>
                    No Post Has been Published
                  </p>
                )
              }
            </div>
            <div className='flex justify-center mt-20'>
              {Posts.length % postLimit === 0 && (
                <button className='border px-2 py-2 font-semibold hover:bg-red-800 bg-red-600 text-white' onClick={handleLoadMore}>Load More</button>
              )}
            </div>
          </div>
        </div>
        <AddAcdemichelpModal isOpen={modalOpen} closeModal={closeModal} />
      </div>
    </>
  )
}

export default Academichelppreview
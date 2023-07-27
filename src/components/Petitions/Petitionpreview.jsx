import React, { useEffect, useState } from 'react'
import Petitioncard from './Petitioncard'
import PetitionsModal from '../ReactModals/PetitionsModal';
import PetitionButton from './PetitionButton';
import { useDispatch, useSelector } from "react-redux"
import { fetchPetitions } from '../../redux/Slices/PetitionSlice';

function Petitionpreview() {

  const dispatch = useDispatch();

  const Petitions = useSelector((state) => state.Petitions.Petitions);
  useEffect(() => {
    dispatch(fetchPetitions());
  }, [])
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Petitions</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Support the Petitions Raised By the Users.
                </p>
              </div>
              <div className='mx-auto max-w-2xl lg:mx-0' onClick={openModal}>
                <PetitionButton />
              </div>
            </div>
            <div className=" border-t border-gray-200 mx-auto mt-10 grid max-w-2xl  grid-cols-1 gap-x-8 gap-y-14  pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
              {
                Petitions !== undefined && Petitions.length > 0 ? (
                  <>
                    {Petitions.map((item) => (
                      <Petitioncard key={item._id} item={item} />
                    ))}
                  </>
                ) : (
                  <p className='text-red-700 font-bold text-xl'>
                    No Petitions are currently Live
                  </p>
                )
              }
            </div>
          </div>
        </div>
        <PetitionsModal isOpen={modalOpen} closeModal={closeModal} />
      </div>
    </>
  )
}

export default Petitionpreview
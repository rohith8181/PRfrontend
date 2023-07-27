import React, { useRef, useState } from 'react'
import "../Navbar/Navbar.css";
import { IoMdNotificationsOutline } from "react-icons/io"
import { GrClose } from "react-icons/gr"
import { HiOutlineBars3 } from "react-icons/hi2"
import { FaHandsHelping } from 'react-icons/fa'
import { NavLink, Link } from "react-router-dom"
import Addquestionmodal from '../ReactModals/Addquestionmodal';
import ProfileModal from '../ReactModals/ProfileModal';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../helper'
const img = require("../../assests/logo.png");

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);

  const userId = useSelector((state) => state.UserInfo.CurrentUserdetails);
  const openModal = () => {
    setModalOpen(true);
  };

  const closemodal = () => {
    setModalOpen(false);
  };
  const openModal1 = () => {
    setModalOpen1(true);
  };

  const closeModal1 = () => {
    setModalOpen1(false);
  };

  const navref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClick = () => {
    const classlist = navref.current.classList;
    if (isOpen === false) {
      classlist.add('menuactive');
    }
    if (isOpen === true) {
      classlist.remove('menuactive');
    }
    setIsOpen(!isOpen);
    setMenuOpen(!menuOpen);
  }
  return (
    <>
      <div className="Nav fixed top-0 w-[100%] bg-[white] max-h-16 z-50">
        <div className="qNav flex items-center justify-around">
          <Link to="/home">
            <div className="qNav_logo w-14 py-1">
              <img
                src={img}
                alt="clg_logo"
              />
            </div>
          </Link>
          <div ref={navref} className="qNav_icons flex md:flex-row md:static md:gap-0 gap-4 items-center md:w-auto md:bg-[white] absolute flex-col duration-500 top-[-380%] w-[100%] bg-[#f8f8f8] ">
            <NavLink
              to="/home"
            >
              <div className="qNav_icon">
                <div className="svgIcon hover:bg-[#f1f0f0] hover:rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <g className="icon_svg-fill_as_stroke">
                      <path
                        d="M0.308058262,12.0580583 L0.245478344,12.130247 C-0.051901591,12.5286585 0.225938323,13.125 0.75,13.125 L3.875,13.125 L3.875,22.5 C3.875,22.845178 4.15482203,23.125 4.5,23.125 L9.5,23.125 C9.84517797,23.125 10.125,22.845178 10.125,22.5 L10.125,17.5 C10.125,16.4644661 10.9644661,15.625 12,15.625 C13.0355339,15.625 13.875,16.4644661 13.875,17.5 L13.875,22.5 C13.875,22.845178 14.154822,23.125 14.5,23.125 L19.5,23.125 L19.5923579,23.1182234 C19.8937421,23.0735831 20.125,22.8137982 20.125,22.5 L20.125,13.125 L23.25,13.125 C23.8068155,13.125 24.0856698,12.4517863 23.6919417,12.0580583 L12.4419417,0.808058262 C12.1978641,0.563980579 11.8021359,0.563980579 11.5580583,0.808058262 L0.308058262,12.0580583 Z M12,2.133 L21.742,11.875 L19.5,11.875 L19.4076421,11.8817766 C19.1062579,11.9264169 18.875,12.1862018 18.875,12.5 L18.875,21.875 L15.125,21.875 L15.125,17.5 C15.125,15.7741102 13.7258898,14.375 12,14.375 L11.8226693,14.3799469 C10.1792834,14.4718789 8.875,15.8336236 8.875,17.5 L8.875,21.875 L5.125,21.875 L5.125,12.5 L5.1182234,12.4076421 C5.07358314,12.1062579 4.81379815,11.875 4.5,11.875 L2.257,11.875 L12,2.133 Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/petitions"
            >
              <div className="qNav_icon">
                <div className="svgIcon hover:bg-[#f1f0f0] hover:rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="icon_svg-fill_as_stroke"
                      d="M20.582 1.469c.951.255 1.694.998 1.949 1.949.238.888.017 1.831-.58 2.519l-.134.143L7.594 20.299c-.039.039-.082.072-.129.099l-.073.036-1.238.514.006.006-.1.033-3.82 1.59c-.247.103-.495.037-.662-.116l-.058.019.019-.058c-.134-.146-.201-.354-.147-.569l.031-.093 1.592-3.831.031-.089.005.005.515-1.237c.021-.05.048-.098.081-.141l.054-.061L17.92 2.182c.696-.696 1.711-.968 2.662-.713zm.918 8.406c.314 0 .574.231.618.533l.007.092v11c0 .314-.231.574-.533.618l-.092.007h-11c-.345 0-.625-.28-.625-.625 0-.314.231-.574.533-.618l.092-.007h10.375V10.5c0-.314.231-.574.533-.618l.092-.007zm-2.577-6.916l-.119.107L4.673 17.201l-.666 1.6 1.19 1.19 1.601-.665 14.136-14.13c.304-.304.46-.72.439-1.14l-.016-.158-.033-.157c-.139-.52-.545-.926-1.065-1.065-.468-.125-.964-.018-1.335.283zM13.5 1.875c.345 0 .625.28.625.625 0 .314-.231.574-.533.618l-.092.007H3.124L3.125 13.5c0 .314-.231.574-.533.618l-.092.007c-.314 0-.574-.231-.618-.533l-.007-.092v-11c0-.314.231-.574.533-.618l.092-.007h11z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/academichelp"
            >
              <div className="svgIcon hover:bg-[#f1f0f0] hover:rounded-lg px-4 py-0.5">
                <FaHandsHelping className='text-2xl' />
              </div>
            </NavLink>
            <NavLink
              to="/users"
            >
              <div className="qNav_icon">
                <div className="svgIcon hover:bg-[#f1f0f0] hover:rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.7 9.25C16.75 9.25 15.98 9.52 15.37 9.92C15.8 10.23 16.18 10.6 16.49 11.01C16.83 10.85 17.23 10.75 17.7 10.75C19.48 10.75 20.25 12.12 20.25 12.81V20.25H17.55V21C17.55 21.26 17.5 21.51 17.41 21.75H21C21.41 21.75 21.75 21.41 21.75 21V12.81C21.75 11.32 20.34 9.25 17.7 9.25Z" fill="currentColor" className="icon_svg-fill_as_stroke"></path>
                    <path d="M17.7 2.73C16.77 2.73 15.95 3.16 15.4 3.82C15.78 4.26 16.07 4.77 16.25 5.34C16.42 4.7 17 4.23 17.69 4.23C18.52 4.23 19.19 4.9 19.19 5.73C19.19 6.56 18.52 7.23 17.69 7.23C17.19 7.23 16.75 6.98 16.48 6.61C16.48 6.65 16.49 6.69 16.49 6.74C16.49 7.3 16.38 7.83 16.19 8.32C16.63 8.58 17.14 8.74 17.69 8.74C19.34 8.74 20.69 7.39 20.69 5.74C20.69 4.09 19.35 2.73 17.7 2.73Z" fill="currentColor" className="icon_svg-fill_as_stroke"></path>
                    <path d="M7.5 6.73C7.5 6.69 7.51 6.65 7.51 6.6C7.24 6.98 6.8 7.23 6.3 7.23C5.47 7.23 4.8 6.56 4.8 5.73C4.8 4.9 5.47 4.23 6.3 4.23C6.99 4.23 7.57 4.7 7.74 5.34C7.93 4.77 8.22 4.26 8.6 3.82C8.04 3.16 7.23 2.73 6.3 2.73C4.65 2.73 3.3 4.08 3.3 5.73C3.3 7.38 4.65 8.73 6.3 8.73C6.85 8.73 7.36 8.57 7.8 8.31C7.61 7.81 7.5 7.28 7.5 6.73Z" fill="currentColor" className="icon_svg-fill_as_stroke"></path>
                    <path d="M12 3.73C10.35 3.73 9 5.08 9 6.73C9 8.38 10.35 9.73 12 9.73C13.65 9.73 15 8.38 15 6.73C15 5.08 13.65 3.73 12 3.73ZM12 8.23C11.17 8.23 10.5 7.56 10.5 6.73C10.5 5.9 11.17 5.23 12 5.23C12.83 5.23 13.5 5.9 13.5 6.73C13.5 7.56 12.83 8.23 12 8.23Z" fill="currentColor" className="icon_svg-fill_as_stroke"></path>
                    <path d="M6.45 21V20.25H3.75V12.81C3.75 12.11 4.52 10.75 6.3 10.75C6.79 10.75 7.18 10.86 7.5 11.01C7.81 10.6 8.19 10.23 8.63 9.92C7.97 9.49 7.17 9.25 6.3 9.25C3.66 9.25 2.25 11.32 2.25 12.81V21C2.25 21.41 2.59 21.75 3 21.75H6.59C6.5 21.51 6.45 21.26 6.45 21Z" fill="currentColor" className="icon_svg-fill_as_stroke"></path>
                    <path d="M7.95 21C7.95 21.41 8.29 21.75 8.7 21.75H15.3C15.71 21.75 16.05 21.41 16.05 21V13.91C16.05 12.42 14.64 10.35 12 10.35C9.36 10.35 7.95 12.42 7.95 13.91V21ZM9.45 13.91C9.45 13.21 10.22 11.85 12 11.85C13.78 11.85 14.55 13.22 14.55 13.91V20.25H9.45V13.91Z" fill="currentColor" className="icon_svg-fill_as_stroke"></path>
                  </svg>
                </div>
              </div>
            </NavLink>

            <NavLink
              to="/notifications"
            >
              <div className="svgIcon hover:bg-[#f1f0f0] hover:rounded-lg px-4 py-0.5">
                <IoMdNotificationsOutline className='notispecial text-3xl text-[#7c7c7c]' />
              </div>
            </NavLink>

          </div>

          <div className="qNav_morebtns flex items-center space-x-4">
            <div className="menu-container">
              <div className="menu-trigger" onClick={openModal1}>
                <img className="cursor-pointer h-full object-cover rounded-full w-10" loading='lazy' src={`${BASE_URL}/${userId.Profilepic}`} alt="UserPropilepic" />
              </div>
              <ProfileModal isOpen={modalOpen1} closeModal={closeModal1} />
            </div>
            <div>
              <button onClick={openModal} className="bg-red-700 hover:bg-red-800 text-white py-1 px-4 rounded-2xl">
                Add Question
              </button>
              <Addquestionmodal isOpen={modalOpen} closeModal={closemodal} />
            </div>
          </div>
          <div className=' md:hidden'>
            {
              !menuOpen ? <HiOutlineBars3 className=' cursor-pointer text-3xl' onClick={handleClick} /> : <GrClose className=' cursor-pointer text-2xl' onClick={handleClick} />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar
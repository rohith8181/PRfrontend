import React from 'react'
import { useState } from 'react'
import "./Add.css"
import Addquestionmodal from '../ReactModals/Addquestionmodal'

function Add({ text }) {
 const [Isopen,setIsopen] = useState(false);
 
 const click = ()=>{
  console.log(Isopen,"1");
  setIsopen(true);
  console.log(Isopen,'2');
}

const closeModal = ()=>{
   console.log(Isopen,'3');
   setIsopen(false);
   console.log(Isopen,'4');
 }

  return (
    <div onClick={click} className='flex gap-2 items-center m-auto max-w-lg'>
      <Addquestionmodal isOpen={Isopen} closeModal={closeModal}/>
      <div>
        <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
      </div>
      <div className="inputbtn">
        {text}
      </div>
    </div>
  )
}

export default Add
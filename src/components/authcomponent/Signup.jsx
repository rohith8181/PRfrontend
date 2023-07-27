import React from "react";
import { Link } from "react-router-dom";
import Signupform from "./Signupform";

import "./authenticate.css";


function Signup() {
  return (
    <>
      <div className="Signuppage  h-[100vh] flex justify-center items-center bgimage">
        <div className="Singupcontainer lg:w-[868px] md:w-[750px] sm:w-[650px] w-[550px] h-[500px]  flex justify-center">
          <div className="overlay-panel basis-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-[#ff4b2b] to-[#ff416c]">
            <h1 className="text-xl">Welcome Back!!</h1>
            <p className="text-center">To keep connected with us please login with your personal info</p>
            <Link to={"/"} className="authbtn ghost mt-9">Sign In</Link>
          </div>
          <div className="sform basis-1/2">
            <Signupform />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

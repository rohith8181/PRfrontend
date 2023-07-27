import React from "react";
import Loginform from "./Loginform";
import { Link } from "react-router-dom";

import "./authenticate.css";

function Login() {
  return (
    <div className="Loginpage bgimage h-[100vh] flex justify-center items-center">
      <div className="Logincontainer lg:w-[868px] md:w-[750px] sm:w-[650px] w-[550px] h-[500px]  flex justify-center">
        <div className="lform basis-1/2">
          <Loginform />
        </div>
        <div className="overlay-panel basis-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-[#ff4b2b] to-[#ff416c]">
          <h1 className=" text-xl">Hello, Friend!</h1>
          <p className=" text-center">Enter your personal details and start journey with us</p>

          <Link to={"/signup"} className="authbtn ghost mt-9">
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

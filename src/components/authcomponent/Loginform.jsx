import { React, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { BASE_URL } from '../../helper'




function Loginform() {
  const navigate = useNavigate();
  const userexists = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/request/verifyauth`, {
        headers: {
          "x-access-token": Cookies.get("token"),
        }
      });
      if (data.auth) {
        navigate('/home', { replace: true });
      }

    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    userexists();
  }, []);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const emailref = useRef();
  const passwordref = useRef();



  const loginrequest = async (event) => {
    event.preventDefault();
    setisloading(true);
    const response = await fetch(`${BASE_URL}/request/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    const data = await response.json();
    Cookies.set("token", data.token);
    if (data.status === 200) {
      navigate("/home", { replace: true });
    }
    else if (data.status === 201) {
      toast("An email has been sent, please verify")
    }
    else if (data.status === 304) {
      toast("Password incorrect")
      passwordref.current.innerText = "Password incorrect";
      passwordref.current.style.color = "red";
    }
    else if (data.status === 204) {
      toast("Email doesn't exists");
    }
    setisloading(false);
  };




  return (
    <div className="sign-in-container bg-[white] h-[100%]">
      <form className="authform gap-2">
        <h1 className="mb-8">Sign in</h1>
        <span> use your account</span>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setemail(e.target.value)
            emailref.current.innerText = "";
          }
          }
        />
        <span ref={emailref}></span>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value)
            passwordref.current.innerText = "";
          }
          }
        />
        <span ref={passwordref}></span>
        {
          isloading ? (
            <div className="flex justify-center px-8 py-1">
              <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-4 w-4"></div>
            </div>
          ) : (
            <button className="authbtn" onClick={loginrequest}>Sign In</button>
          )
        }
        <br />
        <Link to={"/signup"} className="hover:font-bold SIGNUP">
          Sign up
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Loginform;

import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from '../../helper'



function Signupform() {
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

  const navigate = useNavigate();
  const emailinputref = useRef(null);
  const nameinputref = useRef(null);
  const passwordinputref = useRef(null);

  const emailspanref = useRef(null);
  const namespanref = useRef(null);
  const passwordspanref = useRef(null);
  const verifyemailref = useRef(null);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signuprequest = async (event) => {
    event.preventDefault();
    if (!name) {
      namespanref.current.innerText = "this feild is required";
      namespanref.current.style.color = "red";
    }
    if (!email) {
      emailspanref.current.innerText = "this feild is required";
      emailspanref.current.style.color = "red";
    }
    if (!password) {
      passwordspanref.current.innerText = "this feild is required";
      passwordspanref.current.style.color = "red";
    }
    if (!email.match("[A-z0-9]+@iiitdmj.ac.in")) {
      invalidemailformat();
    } else if (name && password && email) {

      validemailformat();
      const emailParts = email.split('@');
      const username = emailParts[0];

      const numbersCount = username.replace(/[^0-9]/g, '').length;
      const charactersCount = username.replace(/[^a-zA-Z]/g, '').length;
      let category = "";
      if (numbersCount > charactersCount) {
        category = "Student";
      } else {
        category = "Professor"
      }
      const response = await fetch(`${BASE_URL}/request/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: category,
        }),
      });

      const data = await response.json();
      nameinputref.current.value = "";
      emailinputref.current.value = "";
      passwordinputref.current.value = "";


      setname(null)
      setemail(null)
      setpassword(null)
      if (data.status === 304) {
        toast('Veification Email has sent')
      }
      if (data.status === 301) {
        toast('User Already Exists')
      }
    }
  };

  const invalidemailformat = () => {
    emailinputref.current.style.border = "2px solid red";
    emailspanref.current.innerText = "invalid email format"
    emailspanref.current.style.color = "red"
  };
  const validemailformat = () => {
    emailinputref.current.style.border = "0px solid black";
    emailspanref.current.innerText = "";
  };

  return (
    <div className="sign-up-container bg-[white] h-[100%]">
      <form className="authform">
        <h1 style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>
          Create Account
        </h1>
        <span>use your email for registration</span>
        <br />
        <input
          ref={nameinputref}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            namespanref.current.innerText = ""
            setname(e.target.value)
          }}
        />
        <span ref={namespanref}></span>
        <input
          ref={emailinputref}
          type="email"
          placeholder="College mail"
          value={email}
          onChange={(e) => {
            emailinputref.current.style.border = "";
            emailspanref.current.innerText = ""
            setemail(e.target.value)
          }}

        />
        <span ref={emailspanref}></span>
        <input
          ref={passwordinputref}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            passwordspanref.current.innerText = ""
            setpassword(e.target.value)
          }}
        />
        <span ref={passwordspanref}></span>
        <button className="authbtn mt-5" onClick={signuprequest}>Sign Up</button>
        <br />
        <Link to={"/"} className="hover:font-bold SIGNIN">
          Sign In
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signupform;

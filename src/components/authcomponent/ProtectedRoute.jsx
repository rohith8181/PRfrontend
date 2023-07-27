import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import { BASE_URL } from '../../helper'


const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userexists = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/request/verifyauth`, {
        headers: {
          "x-access-token": Cookies.get("token"),
        }
      });
      if (data.auth) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
        navigate('/', { replace: true });
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    userexists();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {
        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
}
export default ProtectedRoute;
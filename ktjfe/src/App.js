import React, { useState,useContext } from 'react';
import {
  Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useEffect,
} from "react-router-dom";

import "./App.css";
import UserContext from "./Context/UserContext";
import Modal2 from "./Components/Login copy/components/Modal.js";
import Toast from "./Components/Toast/Toast";

function App() {
  // const navigate = useNavigate();
  const [eveToast, setEveToast] = useState(false);
  const [toast, setToast] = useState({
    istrue: false,
    message: "",
    type: "",
  });

  function showToast(ist, msg, type) {
    setToast({
      istrue: false,
      message: "",
      type: "",
    });
    setTimeout(() => {
      setToast({
        istrue: ist,
        message: msg,
        type: type,
      });
    }, 10);
    const mytimeout = setTimeout(() => {
      setToast({
        istrue: false,
        message: "",
        type: "",
      });
    }, 5000);
    return () => {
      clearTimeout(mytimeout);
    };
  }
  //login-signup
  const [loginSignup, setLoginSignup] = useState(false);

  const toggleLoginModal = () => {
    setLoginSignup(!loginSignup);
  };

  // const log = () => {
  //   // alert(1);
  //   toggleLoginModal();
  // };
  const [ModalLandingPage, setModalLandingPage] = useState(false);
  const [preview, setPreview] = useState(false);
  const usercontext = useContext(UserContext);
  const {
    setuser,
    setUserToken,
    userToken,
    Isloggedin,
    group,
    solo,
    setIsloggedin,
    setGroup,
    setSolo,
  } = usercontext;

  // const log = () => {
  //   // alert(1);
  //   toggleLoginModal();
  // };
  return (
    <div className="App">
      {/* <Routes>

      </Routes> */}
      {loginSignup && (
        <Modal2 showToast={showToast} setOpenModal={toggleLoginModal} />
      )}

      <button className="button-landingpage" onClick={toggleLoginModal}>
        Login/Register
      </button>
      
    </div>
  );
}

export default App;

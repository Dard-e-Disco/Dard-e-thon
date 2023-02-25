import React, { useState } from "react";
import Landingpage from "./Components/Landingpage/Landingpage";
import Postedevents from "./Components/PostedEvents/Postedevents";
import Eventrequests from "./Components/EventRequests/Eventrequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login_Signin/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Login_Signin/Signin";
import Modal from "./Components/Modal/Modal"
const App = () => {
  const [msg, setMsg] = useState("Success!");
  const [Open_Modal, setOpen_Modal] = useState(false);
  const closeModal = () => {
    setOpen_Modal(false);
  };
  const Show_Modal = () => {
    setOpen_Modal(true);
  };

  const [OpenLogin_Modal, setOpenLogin_Modal] = useState(false);
  const closeLoginModal = () => {
    setOpenLogin_Modal(false);
  };
  const ShowLogin_Modal = () => {
    setOpenLogin_Modal(true);
  };

  const [OpenSignup_Modal, setOpenSignup_Modal] = useState(false);
  const closeSignupModal = () => {
    setOpenSignup_Modal(false);
  };
  const ShowSignup_Modal = () => {
    setOpenSignup_Modal(true);
  };
  const [isloggedin, setIsloggedin] = useState(false);

  const showToastMessage = (msg) => {
    toast.success(
      { msg },
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };

  return (
    <div>
      <Navbar
        OpenLogin_Modal={OpenLogin_Modal}
        closeLoginModal={closeLoginModal}
        ShowLogin_Modal={ShowLogin_Modal}
        isloggedin={isloggedin}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Landingpage
              Open_Modal={Open_Modal}
              closeModal={closeModal}
              Show_Modal={Show_Modal}
              OpenLogin_Modal={OpenLogin_Modal}
              closeLoginModal={closeLoginModal}
              ShowLogin_Modal={ShowLogin_Modal}
              OpenSignup_Modal={OpenSignup_Modal}
              closeSignupModal={closeSignupModal}
              ShowSignup_Modal={ShowSignup_Modal}
        isloggedin={isloggedin}

            />
          }
        />
        <Route exact path="/postedEvents" element={<Postedevents />} />
        <Route
          exact
          path="/requests"
          element={
            <Eventrequests
              showToastMessage={showToastMessage}
              setMsg={setMsg}
            />
          }
        />
      </Routes>
      <Login
        show={OpenLogin_Modal}
        closeLogin_modal={closeLoginModal}
        setIsloggedin={setIsloggedin}
        ShowSignup_Modal={ShowSignup_Modal}
        setMsg={setMsg}
        showToastMessage={showToastMessage}
      ></Login>
      <Signup
        show={OpenSignup_Modal}
        closeSignup_modal={closeSignupModal}
        ShowLogin_Modal={ShowLogin_Modal}
      ></Signup>

      <ToastContainer />
    </div>
  );
};

export default App;

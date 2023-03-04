import React, { useState } from "react";
import Landingpage from "./Components/Landingpage/Landingpage";
import Postedevents from "./Components/PostedEvents/Postedevents";
import Eventrequests from "./Components/EventRequests/Eventrequests";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login_Signin/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Login_Signin/Signin";
import Modal from "./Components/Modal/Modal";
import PostEventsModal from "./Components/Landingpage/PostModal/PostModal";
import Logout from "./Components/Logout/Logout";
import { Link, useNavigate } from "react-router-dom";
const App = () => {
  //modal states
  const [loginModal, setloginModal] = useState(false);
  const [logoutModal, setlogoutModal] = useState(false);
  const [SignupModal, setSignupModal] = useState(false);
  const [PostModal, setPostModal] = useState(false);
  //modal control functions
  const close_modal = () => {
    setloginModal(false);
    setPostModal(false);
    setSignupModal(false);
    setlogoutModal(false);
  };
  const showLogin = () => {
    setloginModal(true);
  };
  const showSignup = () => {
    setSignupModal(true);
  };
  const showPost = () => {
    setPostModal(true);
  };
  const showLogout = () => {
    setlogoutModal(true);
  };
  //modalcontrols functions ended here
  const [isloggedin, setIsloggedin] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    localStorage.setItem("logstat", false);
    close_modal();
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <Navbar
        isloggedin={isloggedin}
        close_modal={close_modal}
        loginM={loginModal}
        loginMF={showLogin}
        logoutM={logoutModal}
        logoutMF={showLogout}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Landingpage
              isloggedin={isloggedin}
              close_modal={close_modal}
              PostM={PostModal}
              PostMF={showPost}
            />
          }
        />
        <Route exact path="/postedEvents" element={<Postedevents />} />
        <Route exact path="/requests" element={<Eventrequests />} />
      </Routes>
      <Modal show={loginModal} close_modal={close_modal}>
        <Login
          showSignup={showSignup}
          close_modal={close_modal}
          showLogin={showLogin}
        />
      </Modal>
      <Modal show={SignupModal} close_modal={close_modal}>
        <Signup
          showSignup={showSignup}
          close_modal={close_modal}
          showLogin={showLogin}
        />
      </Modal>
      <Modal show={PostModal} close_modal={close_modal}>
        <PostEventsModal />
      </Modal>
      <Modal show={logoutModal} close_modal={close_modal}>
        <Logout logoutFunc={logout} close_modal={close_modal} />
      </Modal>
    </div>
  );
};

export default App;

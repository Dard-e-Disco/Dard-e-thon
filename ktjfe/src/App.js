import React, { useState } from "react";
import Landingpage from "./Components/Landingpage/Landingpage";
import Postedevents from "./Components/PostedEvents/Postedevents";
import Eventrequests from "./Components/EventRequests/Eventrequests";
import { Routes, Route } from "react-router-dom";
// import Login from "./Components/Login_Signin/Login";
import Navbar from "./Components/Navbar/Navbar";
// import Signup from "./Components/Login_Signin/Signup";

const App = () => {
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
    setOpenLogin_Modal(false);
  };
  const ShowSignup_Modal = () => {
    setOpenSignup_Modal(true);
  };
  const [isloggedin, setIsloggedin] = useState(false)

  return (
    <div>
      <Navbar OpenLogin_Modal={OpenLogin_Modal}
              closeLoginModal={closeLoginModal}
              ShowLogin_Modal={ShowLogin_Modal}
              isloggedin={isloggedin}/>{/* <Signin /> */}
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
            />
          }
        />
        <Route exact path="/postedEvents" element={<Postedevents />} />
        <Route exact path="/requests" element={<Eventrequests />} />
      </Routes>
      <Login
            show={OpenLogin_Modal}
            closeLogin_modal={closeLoginModal}
            setIsloggedin={setIsloggedin}
          ></Login>
    </div>
  );
};

export default App;

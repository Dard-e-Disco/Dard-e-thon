import React, { useState } from "react";
import Landingpage from "./Components/Landingpage/Landingpage";
import Postedevents from "./Components/PostedEvents/Postedevents";
import Eventrequests from "./Components/EventRequests/Eventrequests";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login_Signin/Login";
const App = () => {
  const [msg, setMsg] = useState("Success!")
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
  const showToastMessage = (msg) => {
    toast.success({ msg }, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div>
      {/* <button onClick={showToastMessage}>Notify</button> */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Landingpage
              Open_Modal={Open_Modal}
              closeModal={closeModal}
              Show_Modal={Show_Modal}
              setMsg={setMsg}
              showToastMessage={showToastMessage}
              OpenLogin_Modal={OpenLogin_Modal}
              closeLoginModal={closeLoginModal}
              ShowLogin_Modal={ShowLogin_Modal}
            />
          }
        />
        <Route exact path="/postedEvents" element={<Postedevents />} />
        <Route exact path="/requests" element={<Eventrequests showToastMessage={showToastMessage} setMsg={setMsg} />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;

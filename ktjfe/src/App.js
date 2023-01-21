import React, { useState } from 'react';
import Event from"./Components/Events/Event"

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
      <Event/>
    </div>
  );
}

export default App;

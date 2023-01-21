import React, { useState } from "react";
import Event from "./Components/Events/Event";
import "./App.css";

import Modal2 from "./Components/Login/components/Modal.js";

function App() {
  //login-signup
  const [loginSignup, setLoginSignup] = useState(false);
  const toggleLoginModal = () => {
    setLoginSignup(!loginSignup);
  };

  return (
    <div className="App">
      {loginSignup && <Modal2 setOpenModal={toggleLoginModal} />}
      <button className="button-landingpage" onClick={toggleLoginModal}>
        Login/Register
      </button>
      <Event />
    </div>
  );
}

export default App;

import React, { useState } from 'react';


import "./App.css";
import UserContext from "./Context/UserContext";
import Modal2 from "./Components/Login copy/components/Modal.js";

function App() {
  // const navigate = useNavigate();

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
        <Modal2 setOpenModal={toggleLoginModal} />
      )}

      <button className="button-landingpage" onClick={toggleLoginModal}>
        Login/Register
      </button>
      
    </div>
  );
}

export default App;

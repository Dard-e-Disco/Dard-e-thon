import React from "react";
import "./Logout.css"
function Logout(props) {
  return (
    <div className="LogoutModalContent">
      <p>Are you sure you want to log Out?</p>
      <div className="Buttons">
        <button className="btn-3"
          onClick={() => {
            props.logoutFunc();
          }}
        >
          <span>Logout</span>
        </button>
        <button className="btn-3"
          onClick={() => {
            props.close_modal();
          }}
        >
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export default Logout;

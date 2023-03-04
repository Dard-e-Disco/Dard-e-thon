import React from "react";

function Logout(props) {
  return (
    <div>
      <p>Are you sure you want to log Out?</p>
      <button
        onClick={() => {
          props.logoutFunc();
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          props.close_modal();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default Logout;

import React from "react";
import "./Modal.css";
function Modal(props) {
  
  return (
    props.show && (
      <div>
        <section className="Modal-Parent active">
          <span className="overlay" onClick={() => {
            props.closeLogin_modal();
          }}></span>
          <div className="modal-box">
            {/* <i className="fa-regular fa-circle-check"></i> */}
            <p>{props.children}</p>
          </div>
        </section>
      </div>)
  );
}

export default Modal;

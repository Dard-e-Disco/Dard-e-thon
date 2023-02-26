import React from "react";
import "./Modal.css";
function Modal(props) {
    const CloseModal=()=>{
        document.querySelector(".Modal-Parent").classList.remove("active");
    }
  return (
    props.show && (
    <div>
      <section className="Modal-Parent">
        <span className="overlay" onClick={()=>{
            CloseModal();
        }}></span>
        <div className="modal-box">
          <i className="fa-regular fa-circle-check"></i>
          <p>{props.children}</p>
        </div>
      </section>
    </div>)
  );
}

export default Modal;

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
          {props.children}
          <div className="buttons">
            <button className="close-btn" onClick={()=>{
                CloseModal()
            }}>Close</button>
          </div>
        </div>
      </section>
    </div>)
  );
}

export default Modal;

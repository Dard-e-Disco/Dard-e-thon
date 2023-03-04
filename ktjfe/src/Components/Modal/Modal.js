import React from "react";
import "./Modal.css";
function Modal(props) {
  return (
    props.show && (
      <div
        className="modal-parent"
        onClick={(event) => {
          const isOutside = (!event.target.closest(".modal-content") & !event.target.closest(".heading-of-modal"));
          if (isOutside) {
            props.close_modal();
          }
        }}
      >
        <div className="modal-content">
          <div class="modal-external-content">{props.children}</div>
        </div>
      </div>
    )
  );
}

export default Modal;

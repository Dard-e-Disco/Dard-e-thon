import React from "react";
import "./Modal.css";
import { useFormik } from "formik";
import * as Yup from "yup";
function Modal(props) {
  const formik = useFormik({
    initialValues: {
      evename: "",
      evedisc: "",
      parti: "",
    },
    validationSchema: Yup.object({
      evename: Yup.string().required("Required"),
      evedisc: Yup.string().required("Required"),
      parti: Yup.number()
        .min(2, "Enter A valid participant number")
        .typeError("That doesn't look like a participant number")
        .integer("A participant number can't include a decimal point")
        .required("Required"),
    }),
    onSubmit: (values) => {},
  });
  return (
    props.show && (
      <div className="modal-parent">
        <div
          className="closing-cross"
          onClick={() => {
            props.close_modal();
          }}
        >
          X
        </div>
        <div
          className="post-form"
          onClick={(event) => {
            //   const isOutside =
            //     event.target.closest(".modal-parent") &
            //     !event.target.closest(".post-form");
            //   if (isOutside) {
            //     props.close_modal();
            //   }
          }}
        >
          <form onSubmit={formik.handleSubmit} className="profile">
            <div className="inputfield">
              <label for="evename" class="">
                EVENT NAME
              </label>
              <input
                type="text"
                id="evename"
                class=""
                required
                autoComplete="off"
                value={formik.values.evename}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.evename && formik.errors.evename ? (
              <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
                <span class="font-medium">{formik.errors.evename}</span>
              </p>
            ) : (
              <br />
            )}

            <div className="inputfield">
              <label for="evedisc" class="">
                EVENT DISCRIPTION
              </label>
              <input
                type="text"
                id="evedisc"
                class=""
                required
                autoComplete="off"
                value={formik.values.evedisc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.evedisc && formik.errors.evedisc ? (
              <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
                <span class="font-medium">{formik.errors.evedisc}</span>
              </p>
            ) : (
              <br />
            )}

            <div className="inputfield">
              <label for="parti" class="">
                NUMBER OF PARTICIPANT
              </label>
              <input
                type="text"
                id="parti"
                class=""
                required
                autoComplete="off"
                value={formik.values.parti}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.parti && formik.errors.parti ? (
              <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
                <span class="font-medium">{formik.errors.parti}</span>
              </p>
            ) : (
              <br />
            )}

            <button type="submit" className="post-button">
              Post
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;

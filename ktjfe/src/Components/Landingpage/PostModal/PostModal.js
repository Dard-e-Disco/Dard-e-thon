import React from "react";
import "./PostModal.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
function PostModal(props) {
  const data = JSON.parse(localStorage.getItem("user"));
  
  const formik = useFormik({
    initialValues: {
      EventName: "",
      desc: "",
      np: "",
    },
    validationSchema: Yup.object({
      EventName: Yup.string().required("Required"),
      desc: Yup.string().required("Required"),
      np: Yup.number()
        .min(2, "Enter A valid npcipant number")
        .typeError("That doesn't look like a npcipant number")
        .integer("A npcipant number can't include a decimal point")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(
          "http://localhost:5000/api/event/PostEvent",
          {
            CreatorID: data._id,
            EventName: formik.values.EventName,
            desc: formik.values.desc,
            np: formik.values.np,
            npremaining: formik.values.np,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2NlODczODlmMWU5Zjc5ZmM5NzZhNSIsImlhdCI6MTY3NDM3Nzc1OH0.RiHQ4XxhaoBPmnOl_RPOEQMQZSOXtItUyIpR4QFGEfc",
            },
          }
        )
        .then(function (response) {
          if (response.data.code === 0) {
            console.log("successful");
            props.close_modal();
          } else {
          }
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
  return (
    props.show && (
      <div className="modal-parent">
        
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
          <div
          className="closing-cross"
          onClick={() => {
            props.close_modal();
          }}
        >
          X
        </div>
          <form onSubmit={formik.handleSubmit} className="profile">
            <div className="inputfield">
              <label for="EventName" class="">
                EVENT NAME
              </label>
              <input
                type="text"
                id="EventName"
                class=""
                required
                autoComplete="off"
                value={formik.values.EventName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.EventName && formik.errors.EventName ? (
              <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
                <span class="font-medium">{formik.errors.EventName}</span>
              </p>
            ) : (
              <br />
            )}

            <div className="inputfield">
              <label for="desc" class="">
                EVENT DISCRIPTION
              </label>
              <input
                type="text"
                id="desc"
                class=""
                required
                autoComplete="off"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.desc && formik.errors.desc ? (
              <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
                <span class="font-medium">{formik.errors.desc}</span>
              </p>
            ) : (
              <br />
            )}

            <div className="inputfield">
              <label for="np" class="">
                NUMBER OF PARTICIPANT
              </label>
              <input
                type="text"
                id="np"
                class=""
                required
                autoComplete="off"
                value={formik.values.np}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.np && formik.errors.np ? (
              <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
                <span class="font-medium">{formik.errors.np}</span>
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

export default PostModal;

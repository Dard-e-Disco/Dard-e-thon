import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const Signup = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(6, "Password length must be atleast than 8 letters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/api/auth/signup", {
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
        })
        .then(function (response) {
          localStorage.setItem("token", response.data.authToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("logstat", true);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
  });

  return (
    props.show && (
      <div className="modal-parent">
        <div
          className="login-form"
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
              props.closeSignup_modal();
            }}
          >
            X
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="inputfield">
              <span>{/* <FaIcons.FaUserTie /> */}</span>
              <label>Name</label>
              <input
                type="text"
                id="name"
                className=""
                required
                autoComplete="off"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="inputfield">
              <span>{/* <FaIcons.FaUserTie /> */}</span>
              <label>EMAIL</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="inputfield" id="signin-password">
              <span>{/* <RiIcons.RiLockPasswordFill /> */}</span>
              <label>PASSWORD</label>
              <input
                name="password"
                type="password"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <button className="sgnbutton" id="sign-in-button-id" type="submit">
              Sign In
            </button>
          </form>
          <button className="post-button" onClick={() => {
              props.closeSignup_modal();
              props.ShowLogin_Modal();
              console.log("Login-button-clicked");
            }}>
             Login
            </button>
        </div>
      </div>
    )
  );
};

export default Signup;

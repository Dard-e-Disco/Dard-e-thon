import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";
const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(6, "Password length must be atleast than 8 letters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/api/auth/login", {
          email: formik.values.email,
          password: formik.values.password,
        })
        .then(function (response) {
          localStorage.setItem("token", response.data.authToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("logstat", true);
          props.setIsloggedin(true);
          console.log("Succesfully Logged in");
          props.setMsg("Successfully Signed In!");

          props.showToastMessage();
          props.closeLogin_modal();

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
              props.closeLogin_modal();
            }}
          >
            X
          </div>
          <form onSubmit={formik.handleSubmit}>
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
            <br />
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
            <br />
            <button className="login" type="submit">
              Log In
            </button>
          </form>
          <button
            className="signup"
            onClick={() => {
              props.ShowSignup_Modal();
              props.closeLogin_modal();
              console.log("Signup-button-clicked");
            }}
          >
            Signup
          </button>
        </div>
      </div>
    )
  );
};

export default Login;

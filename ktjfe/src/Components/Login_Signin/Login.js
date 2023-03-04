import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Signup from "./Signin";
const Login = (props) => {
  const [privacy, setPrivacy] = useState("password");
  const togglePrivacy = () => {
    if (privacy == "password") {
      setPrivacy("text");
    }
    else {
      setPrivacy("password");
    }
  }
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

      <div
        className="login-form"
      >
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
          <br /><br />
          <div className="inputfield" id="signin-password">
            <span>{/* <RiIcons.RiLockPasswordFill /> */}</span>
            <label>PASSWORD</label>
            <input
              name="password"
              type={privacy}
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {privacy == "password" ? <span className="privacy-eye"><AiOutlineEyeInvisible onClick={togglePrivacy} /></span> : <span className="privacy-eye"><AiOutlineEye onClick={togglePrivacy} /></span>}

          </div>
          <br />
          <button className="login" type="submit">
            Log In
          </button>
        </form>
        <button
          className="signup"
          onClick={() => {
            props.close_modal();
            props.showSignup();
            console.log("Signup-button-clicked");
          }}
        >
          Signup
        </button>
      </div>
  );
};

export default Login;

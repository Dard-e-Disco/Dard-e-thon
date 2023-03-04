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
    <div className="login-form">
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
        <button className="post-button" type="submit">
          Sign In
        </button>
      </form>
      <button
        className="post-button"
        onClick={() => {
          props.close_modal();
          props.showLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Signup;

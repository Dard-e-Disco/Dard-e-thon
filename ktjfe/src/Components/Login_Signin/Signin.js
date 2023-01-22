import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const Signin = (props) => {
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
          localStorage.setItem("token",response.data.authToken)
          localStorage.setItem("user",JSON.stringify(response.data.user))
          localStorage.setItem("logstat",true)
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputfield">
          <span>{/* <FaIcons.FaUserTie /> */}</span>
          <label>Name</label>
          <input
            type="text"
            id="name"
            class=""
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
    </>
  );
};

export default Signin;

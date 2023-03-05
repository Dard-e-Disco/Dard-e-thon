import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useEffect,useState } from "react";
const Signup = (props) => {
  const [ph1, setPh1] = useState("");
  const [ph2, setPh2] = useState("");
  const [ph3, setPh3] = useState("");
  useEffect(() => {

    if (window.innerWidth < 800) {
      setPh1("EMAIL");
      setPh2("PASSWORD");
      setPh3("Name");
    }
  }, []);
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
          props.close_modal();
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
  });

  return (
    <div className="login-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="inputfield signin-field">
          <label>Name</label>
          <input
            type="text"
            id="name"
            className=""
            required
            placeholder={ph3}
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{margin:"7px 0px 7px 0px"}}
          />
        </div>
        <div className="inputfield signin-field">
          <label>EMAIL</label>
          <input
            name="email"
            type="email"
            required
            placeholder={ph1}
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{margin:"7px 0px 7px 0px"}}
          />
        </div>
        <div className="inputfield signin-field" id="signin-password">
          <label>PASSWORD</label>
          <input
            name="password"
            type="password"
            placeholder={ph2}
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{margin:"7px 0px 7px 0px"}}
          />
        </div>
        <button className="login-modal-button " type="submit" style={{margin:"17px 0px 17px 0px"}}>
          Sign In
        </button>
      </form>
      <span>Already have an account? </span>
      <span
        onClick={() => {
          props.close_modal();
          props.showLogin();
        }}
      >
        <span style={{cursor:"pointer"}}>Login</span>
      </span>
    </div>
  );
};

export default Signup;

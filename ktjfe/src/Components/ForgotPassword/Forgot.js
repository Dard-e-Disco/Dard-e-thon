import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Forgot.css";
// import * as RiIcons from "react-icons/ri";
// import * as FaIcons from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
// const axios = require("axios");
var Recaptcha = require("react-recaptcha");
const Forgot = (props) => {
  const [captcha, setCaptcha] = useState("");
  const [question, setQuestion] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      captcha: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      captcha: Yup.string().required("Required"),
    }),
    onSubmit: () => {
      axios
        .post("https://mainapi.springfest.in/api/user/get_security_qn", {
          email: formik.values.email,
          captcha: captcha,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            props.setEmail(formik.values.email);
            props.setQuestion(res.data.message.security_qn);
            props.setActive("forgot2");
          } else {
            props.showToast(true, res.data.message, "Unsuccessful");
          }
        })
        .catch((err) => {
          props.showToast(true, "Something went Wrong", "Server Error");
        });
    },
  });

  return (
    <div className="forgot-form-box1">
      <div className="forgot-password-heading">
        <button
          className="close-btn-signin-1"
          id="close-btn-signin-11"
          onClick={() => {
            props.setOpenModal(false);
          }}
        >
          X
        </button>
        <h2>Forgot Password</h2>
        <button
          className="close-btn-signin-1"
          onClick={() => {
            props.setOpenModal(false);
          }}
        >
          X
        </button>
      </div>

      <div className="forgot-password-content">
        <div className="forgot">
          <form onSubmit={formik.handleSubmit}>
            <div className="inputfield">
              <span>{/* <FaIcons.FaUserTie /> */}</span>
              <label>EMAIL</label>
              <input
                id="email-forgot1"
                name="email"
                type="email"
                required
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
            <br />
            <div className="captcha">
              <Recaptcha
                sitekey="6Ldpbz0UAAAAAHWONmYJCv8nbMwG4w-htCr8iC1p"
                secretkey="6LdaqAUaAAAAADDxBzlEOWodcZDpymVMc_C-oW4f"
                render="explicit"
                theme="dark"
                verifyCallback={(response) => {
                  formik.setFieldValue("captcha", response);
                  setCaptcha(response);
                }}
              />
            </div>
            {formik.touched.captcha && formik.errors.captcha ? (
              <p>{formik.errors.captcha}</p>
            ) : null}
            <br />

            <button type="submit" className="sgnbutton">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;

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
const Forgot2 = (props) => {
  const email = props.email;
  const question = props.question;
  const [captcha, setCaptcha] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      security_ans: "",
      new_pass: "",
      c_new_pass: "",
      captcha: "",
    },

    validationSchema: Yup.object({
      security_ans: Yup.string().required("Required"),
      new_pass: Yup.string()
        .min(8, "Password length must be greater than 8 letters")
        .required("Required"),
      c_new_pass: Yup.string()
        .min(8, "Password length must be greater than 8 letters")
        .required("Required")
        .oneOf([Yup.ref("new_pass"), null], "Passwords must match"),
      captcha: Yup.string().required("Required"),
    }),
    onSubmit: () => {
      axios
        .post("https://mainapi.springfest.in/api/user/forgot_password_nwp", {
          email: email,
          security_ans: formik.values.security_ans,
          new_pass: formik.values.new_pass,
          captcha: captcha,
        })
        .then((res) => {
          if (res.data.code === 0) {
            console.log(res);
            props.showToast(true, res.data.message, "Success");
            props.setOpenModal(false);
          } else {
            console.log(res);
            props.showToast(true, res.data.message, "Unsuccessful");
          }
        })
        .catch((err) => {
          props.showToast(true, "Something Went Wrong", "Server Error");
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
            <div id="forgot2-email" className="inputfield">
              {/* <span className="fix">
                <FaIcons.FaUserTie />
              </span> */}
              <label className="fix">EMAIL</label>
              <div className="fix">
                <p>

                {email}
                </p>
                </div>
            </div>

            <br />
            <div id="forgot2-question" className="inputfield">
              {/* <span className="fix">
                <FaIcons.FaUserTie />
              </span> */}
              <label className="fix">QUESTION</label>
              <div className="fix">
                <p>

                {question}
                </p>

                {/* </p> */}
                </div>
            </div>

            <br />
            <div className="inputfield">
              {/* <span>
                <FaIcons.FaUserTie />
              </span> */}
              <label>ANSWER</label>
              <input
                name="security_ans"
                type="password"
                required
                autoComplete="off"
                value={formik.values.security_ans}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.security_ans && formik.errors.security_ans ? (
              <p>{formik.errors.security_ans}</p>
            ) : null}
            <br />
            <div className="inputfield">
              {/* <span>
                <FaIcons.FaUserTie />
              </span> */}
              <label>NEW PASSWORD</label>
              <input
                name="new_pass"
                type="password"
                required
                autoComplete="off"
                value={formik.values.new_pass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.new_pass && formik.errors.new_pass ? (
              <p>{formik.errors.new_pass}</p>
            ) : null}
            <br />
            <div className="inputfield">
              {/* <span>
                <FaIcons.FaUserTie />
              </span> */}
              <label>CONFIRM PASSWORD</label>
              <input
                name="c_new_pass"
                type="password"
                required
                autoComplete="off"
                value={formik.values.c_new_pass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.c_new_pass && formik.errors.c_new_pass ? (
              <p>{formik.errors.c_new_pass}</p>
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
              {formik.touched.captcha && formik.errors.captcha ? (
                <p>{formik.errors.captcha}</p>
              ) : null}
              <br />
            </div>

            <button type="submit" className="sgnbutton">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot2;

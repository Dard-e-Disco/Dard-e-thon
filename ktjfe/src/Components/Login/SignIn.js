import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignIn.css";
// import * as RiIcons from "react-icons/ri";
// import * as FaIcons from "react-icons/fa";
import UserContext from "../../Context/UserContext";
import { useContext } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import GoogleLogin1 from "../GoogleLogin/GoogleLogin";
import { prop } from "dom7";
function SignIn(props) {
  // let navigate = useNavigate();
  const usercontext = useContext(UserContext);
  const { setuser, setUserToken,setIsloggedin } = usercontext;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(6, "Password length must be greater than 6 letters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("https://mainapi.springfest.in/api/user/login/password", {
          email: formik.values.email,
          password: formik.values.password,
        })
        .then(function (response) {
          // console.log(response);
          if (response.data.code === 0) {
            // alert(1);
            setUserToken(response.data.message.token);
            // alert(2);

            // console.log("success");
            props.showToast(true, "Successfully Logged In", "Success");
            setuser(response.data.message);
                setIsloggedin(true)
                // console.log("data", response.data.message);
                sessionStorage.setItem(
                  "user",
                  JSON.stringify({
                    token: response.data.message.token,
                    data: response.data.message,
                  })
                );        
            // sessionStorage.setItem('logstat',true)
            props.setOpenModal(false);
          } else {
            props.showToast(true, response.data.message, "Unsuccessful");
          }
          return response.data;
        })
        .catch(function (error) {
          console.log(error.message);
          // console.log(values);
          // alert(error);
          props.showToast(true, "Unable to Sign In", "Unsuccessful");
        });
    },
  });

  return (
    <>
      <div className="form-box1">
        <div className="form-sigin-heading">
          <button className="close-btn-signin-1" id="close-btn-signin-11"
          

          >
            X
          </button>
          <h2>Log In</h2>
          <button  className="close-btn-signin-1"
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="sigin-content-container">
        <div className="sigin-content-container-2">
          

        <form className="signin" onSubmit={formik.handleSubmit}>
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
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}

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
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}

          <br />
          <button className="sgnbutton" id="sign-in-button-id" type="submit">
            Sign In
          </button>
        </form>
        {/* <GoogleLogin1 setOpenModal={props.setOpenModal} showToast={props.showToast}/> */}
        </div>
      </div>
      </div>
    </>
  );
}

export default SignIn;

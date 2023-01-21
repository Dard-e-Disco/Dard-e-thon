import React, { useEffect, useState, useContext, createContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import data from "./city.json";
import UserContext from "../../Context/UserContext";
import "./SignUp.css";
import axios from "axios";
var Recaptcha = require("react-recaptcha");
// import { useNavigate } from "react-router-dom";
const Profile = (props) => {
  // let navigate = useNavigate();
  const [statecity, setStatecity] = useState([]);

  function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    // console.log(Math.abs(ageDate.getUTCFullYear() - 1970));

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const usercontext = useContext(UserContext);
  const { setuser, setUserToken, setIsloggedin } = usercontext;
  const [captcha, setCaptcha] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "", //
      name: "", //
      security_qn: "",
      security_ans: "",
      // captcha: "",
      password: "",
      c_password: "",
      college: "", //
      phone: "", //mobile
      gender: "", //
      dob: "", //
      yop: "", //yop
      // por: "",
      // address: "",
      city: "", //
      state: "", //
      captcha: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      security_qn: Yup.string().required("Required"),
      security_ans: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      // a_email: Yup.string().email("Invalid Email").required("Required"),
      phone: Yup.number()
        .min(1000000000, "Enter A valid Phone Number")
        .max(9999999999, "Enter A valid Phone Number")
        .typeError("That doesn't look like a phone number")
        // .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .required("Required"),
      college: Yup.string().required("Required"),
      dob: Yup.string()
        .required("Required")
        .test(
          "dob",
          "You must be older than 16 years to register.",
          function (dob) {
            return calculateAge(new Date(dob)) > 16;
          }
        ),
      gender: Yup.string().required("Required"),
      // por: Yup.string().required("Required"),
      yop: Yup.number()
        .required("Required")
        .typeError("That doesn't look like a Year of Passing")
        .integer("A phone number can't include a decimal point")
        .max(2029, "Invalid Input")
        .min(2023, "Invalid Input"),
      password: Yup.string()
        .min(8, "Password length must be greater than 8 letters")
        .required("Required"),
      c_password: Yup.string()
        .min(8, "Password length must be greater than 8 letters")
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      // address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      captcha: Yup.mixed().required("Captcha Required"),
    }),

    onSubmit: (values) => {
      // console.log("99");
      const req1 = {
        name: values.name,
        email: values.email,
        password: values.password,
        // c_password: values.c_password,


        mobile: values.phone,
        college: values.college,
        city: values.city,
        state: values.state,
        dob: values.dob,
        gender: values.gender,
        yop: values.yop,
        security_qn: values.security_qn,
        security_ans: values.security_ans,
        captcha: captcha,
      };
      // {
      //   email: formik.values.email,
      //   password: "NA",
      // }
      axios
        .post("https://mainapi.springfest.in/api/user/register_user", req1)
        .then((res) => {
          // console.log("res", res);
          // alert(res.data.message);
          // console.log("step1=passed");
          // alert("step1");
          // if (
          //   res.data.message.email !==
          //   "Email already registered with Spring Fest 2023."
          // ) {
          if (res.data.code !== -1) {
            // alert("step2");
            // console.log("hell");
            const req = {
              isRegistered: 0,
              email: values.email,
              // alt_email: values.a_email,
              password: values.password,
              dob: values.dob,
              gender: values.gender,
              name: values.name,
              college: values.college,
              yop: values.yop,
              mobile: values.phone,
              // addr: values.address,
              city: values.city,
              state: values.state,
              // por: values.por,
              security_qn: values.security_qn,
              security_ans: values.security_ans,
              captcha: captcha,
            };

            // console.log(res);
            if (res.data.code === 0) {
              setUserToken(res.data.message.token);
              setIsloggedin(true)
              // console.log("success");
              props.showToast(
                true,
                "You have Successfully Registered",
                "Success"
              );
              setuser(res.data.message);
              sessionStorage.setItem(
                "user",
                JSON.stringify({
                  token: res.data.message.token,
                  data: res.data.message,
                })
              );

              props.setOpenModal(false);
            } else {
              // console.log("req", req);
              console.log("step3=failed");
              props.showToast(true, res.data.message, "Unsuccessful");
            }
          } else {
            props.showToast(true, "You are already registered", "failure");
            console.log("fail");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    data.states.forEach((element) => {
      if (formik.values.state === element.state) {
        setStatecity(element.districts);
      }
    });
  }, [formik.values.state]);

  return (
    <div className="form-boxp">
      <div className="sign-up-heading">
      <button  className="close-btn-signin-1"  id="close-btn-signin-11"
           
          >
            X
          </button>
      <h2>Sign Up </h2>
      <button  className="close-btn-signin-1"
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            X
          </button>
      </div>
      <br />

      <div className="sign-up-content-container">

      <form onSubmit={formik.handleSubmit} className="profile">
        {/* Name */}
        <div className="inputfield">
          <label for="name" class="">
            NAME
          </label>
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
        {formik.touched.name && formik.errors.name ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.name}</span>
          </p>
        ) : (
          <br />
        )}

        {/* Email */}
        <div className="inputfield">
          <label for="email" class="">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            class=""
            placeholder="xyz@abc.klm"
            required
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p class="">
            <span class="font-medium">{formik.errors.email}</span>
          </p>
        ) : (
          <br />
        )}

        {/* Phone-number */}
        <div className="inputfield">
          <label for="phone" class="">
            PHONE NUMBER
          </label>
          <input
            type="text"
            id="phone"
            class=""
            required
            autoComplete="off"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.phone && formik.errors.phone ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.phone}</span>
          </p>
        ) : (
          <br />
        )}

        {/* College  */}
        <div className="inputfield">
          <label for="college" class="">
            COLLEGE
          </label>
          <input
            type="text"
            id="college"
            class=""
            required
            autoComplete="off"
            value={formik.values.college}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.college && formik.errors.college ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.college}</span>
          </p>
        ) : (
          <br />
        )}

        {/* State  */}
        <div className="inputfield">
          <label for="state" class="">
            STATE
          </label>
          <select
            type="text"
            id="state"
            class=""
            required
            autoComplete="off"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select your State">
              Select your State
            </option>
            {data.states.map((e) => {
              return (
                <option value={e.state} label={e.state}>
                  {e.state}
                </option>
              );
            })}{" "}
          </select>
        </div>
        {formik.touched.city && formik.errors.city ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.city}</span>
          </p>
        ) : (
          <br />
        )}

        {/* City  */}
        <div className="inputfield">
          <label for="city" class="">
            CITY
          </label>
          <select
            type="text"
            id="city"
            class=""
            required
            autoComplete="off"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select your City">
              Select your City
            </option>
            {statecity.map((ele) => {
              return (
                <option value={ele} label={ele}>
                  {ele}
                </option>
              );
            })}{" "}
          </select>
        </div>
        {formik.touched.city && formik.errors.city ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.city}</span>
          </p>
        ) : (
          <br />
        )}

        {/* dob  */}
        <div
          className="inputfield calender"
          onClick={() => {
            document.getElementById("datepicker-signup").showPicker();
          }}
        >
          <label htmlFor="dob">DATE OF BIRTH</label>
          <input
            type="date"
            name="dob"
            required
            autoComplete="off"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="dateinput"
            id="datepicker-signup"
          />
        </div>
        {formik.touched.dob && formik.errors.dob ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.dob}</span>
          </p>
        ) : (
          <br />
        )}

        {/* gender  */}
        <div className="inputfield">
          <label for="gender" class="">
            GENDER
          </label>
          <select
            type="text"
            id="gender"
            class=""
            required
            autoComplete="off"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select your Gender">
              Select your Gender
            </option>
            <option value="M" label="Male">
              Male
            </option>
            <option value="F" label="Female">
              Female
            </option>
            <option value="Other" label="Other">
              Other
            </option>
          </select>
        </div>
        {formik.touched.gender && formik.errors.gender ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.gender}</span>
          </p>
        ) : (
          <br />
        )}

        {/* yop  */}
        <div className="inputfield">
          <label for="yop" class="">
            YEAR OF GRADUATION
          </label>
          <select
            type="text"
            id="yop"
            class=""
            autoComplete="off"
            value={formik.values.yop}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select Year Of Passing ">
              Select Year Of Passing
            </option>
            <option value="2023" label="2023">
              2023
            </option>
            <option value="2024" label="2024">
              2024
            </option>
            <option value="2025" label="2025">
              2025
            </option>
            <option value="2026" label="2026">
              2026
            </option>
            <option value="2027" label="2027">
              2027
            </option>
            <option value="2028" label="2028">
              2028
            </option>
            <option value="2029" label="2029">
              2029
            </option>
          </select>
        </div>
        {formik.touched.yop && formik.errors.yop ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.yop}</span>
          </p>
        ) : (
          <br />
        )}

        {/* password  */}
        <div className="inputfield">
          <label for="password" className="">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className=""
            required
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span className="font-medium">{formik.errors.password}</span>
          </p>
        ) : (
          <br />
        )}

        {/* confirm-password */}
        <div className="inputfield">
          <label for="c_password" className="">
            CONFIRM PASSWORD
          </label>
          <input
            type="password"
            id="c_password"
            className=""
            required
            autoComplete="off"
            value={formik.values.c_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.c_password && formik.errors.c_password ? (
          <p className="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span className="font-medium">{formik.errors.c_password}</span>
          </p>
        ) : (
          <br />
        )}

        {/* security_ans  */}
        <div className="inputfield sel">
          <label>SECURITY QUESTION</label>
          <input
            type="text"
            name="security_qn"
            required
            autoComplete="off"
            value={formik.values.security_qn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* <option value="Select your Security Question" label="Security Question"></option>
               <option value="A" label="A"></option>
               <option value="B" label="B"></option>
               <option value="C" label="C"></option>
               </select> */}
        </div>

        {formik.touched.security_qn && formik.errors.security_qn ? (
          <p>{formik.errors.security_qn}</p>
        ) : null}
        <br />

        <div className="inputfield">
          <label>SECURITY ANSWER</label>
          <input
            type="text"
            name="security_ans"
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

        {/* captcha  */}
        <div className="captcha">
          <Recaptcha
            sitekey="6Ldpbz0UAAAAAHWONmYJCv8nbMwG4w-htCr8iC1p"
            secretkey="6LdaqAUaAAAAADDxBzlEOWodcZDpymVMc_C-oW4f"
            render="explicit"
            theme="dark"
            verifyCallback={(response) => {
              // console.log("response", response);
              formik.setFieldValue("captcha", response);
              setCaptcha(response);
            }}
            onloadCallback={() => {
              // console.log("done loading!");
            }}
          />
        </div>
        {formik.touched.captcha && formik.errors.captcha ? (
          <p>{formik.errors.captcha}</p>
        ) : null}

        <br />

        {/* <div className="inputfield">
            <label for="a_email" class="">
              Alt-Email
            </label>
            <input
              type="email"
              id="a_email"
              class=""
              placeholder="xyz@abc.klm"
              required
              autoComplete="off"
              value={formik.values.a_email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.a_email && formik.errors.a_email ? (
            <p class="">
              <span class="font-medium">{formik.errors.a_email}</span>
            </p>
          ) : (
            <br />
          )}

        <div className="inputfield">
          <label for="por" class="">
            Position Of Responsibility
          </label>
          <input
            type="text"
            id="por"
            class=""
            autoComplete="off"
            value={formik.values.por}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.por && formik.errors.por ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.por}</span>
          </p>
        ) : (
          <br />
        )}

        <div className="inputfield">
          <label for="address" class="">
            Address
          </label>
          <input
            type="text"
            id="address"
            class=""
            autoComplete="off"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.address && formik.errors.address ? (
          <p class="mt-2 text-sm text-right text-red-600 dark:text-red-500">
            <span class="font-medium">{formik.errors.address}</span>
          </p>
        ) : (
          <br />
        )} */}

        <button type="submit" class="sgnbutton">
          Sign Up
        </button>
      </form>
      </div>
      <div className="my-8"></div>
    </div>
  );
};

export default Profile;

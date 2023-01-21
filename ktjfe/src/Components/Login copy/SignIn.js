import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignIn.css";
// import * as RiIcons from "react-icons/ri";
// import * as FaIcons from "react-icons/fa";
import UserContext from "../../Context/UserContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin1 from "../GoogleLogin/GoogleLogin";
import { prop } from "dom7";

function SignIn(props) {
  let navigate = useNavigate();
  const usercontext = useContext(UserContext);
  // const[event,setEvent]=useState([]);
  const[teamid,setTeamid]=useState();
  var event=[];
  const {user, setuser, setUserToken,setIsloggedin,setsf_ID,setregEventsGrp,evID,setregStat } = usercontext;
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
            // alert(1);s
            setUserToken(response.data.message.token);
            // alert(2);
            
            // console.log("success");
            props.showToast(true, "Successfully Logged In", "Success");
            setuser(response.data.message);
            // console.log("user",user);
            // console.log('user', response.data.message)
            // setsf_ID(response.data.message.sf_id); 
            // setsf_ID(response.data.message.sf_id); 
                // setIsloggedin(true)
                console.log("data", response.data.message.token);
                sessionStorage.setItem(
                  "user",
                  JSON.stringify({
                    token: response.data.message.token,
                    data: response.data.message,
                  })
                );   
                sessionStorage.setItem("logstat",true) ;   
            // localStorage.setItem('logstat',true)
            
            axios
              .post(
                "https://mainapi.springfest.in/api/user/get_registered_events",
                {
                  token: response.data.message.token,
                }
              )
              .then(function (data) {
                sessionStorage.setItem(
                  "registered-event",
                  JSON.stringify(data.data)
                );
                // console.log(data.data); 
                // console.log(data.data.message.group); 
                
                for (let i = 0; i < data.data.message.group.length; i++) {
                  if (evID == data.data.message.group.event_id) {
                    console.log("found in sign in"); 
                    setregStat(true);
                    break;
                  }
                }
                setregEventsGrp(data.data.message.group); 

                const events=JSON.parse(sessionStorage.getItem("registered-event")).message.group;
                // console.log(events);
                event=events?.filter((item, i) => {
                return item.event_name == "Labyrinth";
                })
                console.log(event);
                
                   // console.log(teamid);
                  //  setTeamid(event[0]?.group_id);  
                  
                    console.log(event[0]?.group_id);
                    sessionStorage.setItem("teamid",event[0]?.group_id)
                    axios.post("http://localhost:8000/getInfo/",{
                      Team_ID:event[0]?.group_id
                    })
                    .then((res)=>{
                      console.log('res', res)
                      // console.log(res.data.message);
                       sessionStorage.setItem("Q_id",res.data.Current_qid);
                     
                       sessionStorage.setItem("Q_no",res.data.Current_qno);
                    
                       sessionStorage.setItem("wrong_attempt",res.data.Wrong_attempts);

                       sessionStorage.setItem('registered-event',null);
                       props.setOpenModal(false);
                     
                    })
                    .catch((err)=>{
                      console.log(err);
                    })
                      
                    
                    
              })
              .catch((err2)=>{
                console.log("error while 2nd API req",err2)
              }); 
            


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
        <GoogleLogin1 setOpenModal={props.setOpenModal} showToast={props.showToast}/>
        </div>
      </div>
      </div>
    </>
  );
}

export default SignIn;


import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import UserContext from "../../Context/UserContext";
import { useContext } from "react";
import { useFormik } from "formik";


function GoogleLogin1(props) {
    const usercontext = useContext(UserContext);
  const { setuser, setUserToken,setIsloggedin } = usercontext;
    const [ profile, setProfile ] = useState([]);
    const clientId = '866436313854-dpc0isf1g5qo24odjo6f5h6cps42j2fr.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        console.log('res.prodileObj', res)
        axios.post("https://mainapi.springfest.in/api/user/login/google",{token:res.tokenId})
        .then(function (response) {
            console.log(response);
            if (response.data.code === 0) {
              // alert(1);
              setUserToken(response.data.message.token);
              // alert(2);
  
              console.log("success");
              props.showToast(true, "Successfully Logged In", "Success");
              setuser(response.data.message);
                  setIsloggedin(true)
                  console.log("data", response.data.message);
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
                gapi.auth2.getAuthInstance().signOut()
              props.showToast(true, response.data.message, "Unsuccessful");
            }
            return response.data;
          })
          .catch(function (error) {
            console.log(error.message);
            // console.log(values);
            // alert(error);
            gapi.auth2.getAuthInstance().signOut()
            props.showToast(true, "Unable to Sign In", "Unsuccessful");
          });
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div className='flex landingPagegooglelogin justify-center'>
            
                <GoogleLogin
                    clientId={clientId}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    theme={"dark"}
                    isSignedIn={true}
                    style={{backgroundColor:"none",border:"2px solid wheat"}}
                />
            
        </div>
    );
}
export default GoogleLogin1;
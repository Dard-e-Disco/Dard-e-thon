import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login_Signin/Login";
import Signup from "../Login_Signin/Signin";
import "./Landingpage.css";
import PostModal from "./PostModal/PostModal";

const Landingpage = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    localStorage.setItem("logstat", false);
    window.location.reload();
  };
  return (
    <div className="landing-page-parent">
      <main className="container">
        <section className="hero container">
          <h1 className="hero-title-primary">
            Connect, Collaborate, Conquer - Build your dream team and conquer
            any event.
          </h1>
          <p className="hero-title-sub">
            The website allows users to create and join teams for various
            events. Users can request to join existing teams or create their
            own. It provides a platform for users to connect and collaborate
            with like-minded individuals.
          </p>

          <button
            className="post-button-main"
            onClick={() => {
              props.PostMF();
              document.querySelector(".post-button-main").style.opacity = "0";
            }}
          >
            Post
          </button>
        </section>
      </main>
    </div>
  );
};

export default Landingpage;

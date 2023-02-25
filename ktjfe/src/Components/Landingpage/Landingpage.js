import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login_Signin/Login";
import Signup from "../Login_Signin/Signin";
import "./Landingpage.css";
import PostModal from "./PostModal/PostModal";

const Landingpage = (props) => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    localStorage.setItem("logstat", false)
    window.location.reload();
  }
  return (
    <div className="landing-page-parent">
      <main className="container">
        <section className="hero container">
          <h1 className="hero-title-primary">Search Teams</h1>
          <p className="hero-title-sub">
            Place to search for the team members to participate in various events
          </p>

          <button
            className="post-button"
            onClick={() => {
              props.Show_Modal();
            }}
          >
            Post
          </button>


          <PostModal
            show={props.Open_Modal}
            close_modal={props.closeModal}
          ></PostModal>

        </section>
      </main>
    </div>
  );
};

export default Landingpage;

import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./PostedEvent.css";
const Postedevents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event/getAllEvents")
      .then((response) => {
        setEvents(response.data.filter(function(element){
          return element.np>0
        }));
      });
  }, []);
  const JoinRequest = (eventID) => {
    axios
      .post(
        "http://localhost:5000/api/event/EventJoinRequest",
        {
          EventID: eventID,
          UserID: JSON.parse(localStorage.getItem("user"))._id,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        if (response.data.code === 0) {
          alert("Your request is sent successfully");
        }
      });
  };

  return (
    <>
      <section className="Posted-Events-Parent">
        <h1>Events</h1>
      {events.map((element)=>{
        return <div className="event">
          <h2>Lorem, ipsum dolor.</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae laudantium adipisci sed placeat perspiciatis fugit iure atque dolore ratione similique.</p>
          <button className="primary-btn primary-btn_ripple">Request</button>
        </div>
      })}
      </section>
    </>
  );
};

export default Postedevents;

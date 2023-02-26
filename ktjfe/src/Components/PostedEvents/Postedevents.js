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
      {events.map((element,index)=>{
        return <div className="event">
          <div class="parent">
            <div class="card">
                <div class="content-box">
                    <h2 class="card-title">{element.EventName}</h2>
                    <p class="card-content">
                        {element.desc}
                    </p>
                    <span class="see-more" onClick={()=>{
                      JoinRequest(element.EventID)
                    }}>Request</span>
                </div>
                <div class="date-box">
                    <span class="date">{index}</span>
                </div>
            </div>
        </div>

        </div>
      })}
      </section>
    </>
  );
};

export default Postedevents;

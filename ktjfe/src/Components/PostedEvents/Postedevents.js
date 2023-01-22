import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Postedevents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event/getAllEvents")
      .then((response) => {
        setEvents(response.data);
      });
  }, []);
  const JoinRequest=(eventID)=>{
    axios.post("http://localhost:5000/api/event/EventJoinRequest",{
        Headers:{
            'auth-token':localStorage.getItem("user").token
        }
    },
    {
        EventID:eventID,
        UserID:localStorage.getItem("user").UserID
    })
  }

  return (
    <>
      {events.map((element,index) => {
        return (
          <div key={index}>
            <p>{element.EventName}</p>
            <p>{element.desc}</p>
            <button onClick={()=>{
                JoinRequest(element._id)
            }}>Request To Join</button>
          </div>
        );
      })}
    </>
  );
};

export default Postedevents;

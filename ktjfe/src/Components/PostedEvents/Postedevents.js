import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./PostedEvent.css"
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
      EventID:eventID,
      UserID:JSON.parse(localStorage.getItem("user"))._id
  },{
        headers:{
            'auth-token':localStorage.getItem("token")
        }
    },).then(response=>{
      console.log('response', response)
    })
  }

  return (
    <>
      
          <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="-my-8 divide-y-2 divide-gray-100">
    {events.map((element,index) => {
        return (<div class="py-8 flex flex-wrap md:flex-nowrap">
        
        <div class="md:flex-grow">
          <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">{element.EventName}</h2>
          <p class="leading-relaxed">{element.desc}</p>
          <button class="text-indigo-500 inline-flex items-center mt-4" onClick={()=>{
            JoinRequest(element._id)
          }}>Request To Join
          </button>
        </div>
      </div> );
      })}
   
    </div>
  </div>
</section>
       
    </>
  );
};

export default Postedevents;

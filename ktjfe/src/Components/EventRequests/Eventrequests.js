import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EventRequests.css";

const Eventrequests = (props) => {
  const [event, setEvent] = useState([]);
  const [requests, setRequests] = useState();
  const userID = JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    axios.get("http://localhost:5000/api/event/getAllEvents").then((res) => {
      const eventcreated = res.data.filter((item) => {
        return item.CreatorID == userID;
      });
      setEvent(eventcreated);
      console.log(res);
    });
  }, []);
  const response = (e, tof, item) => {
    axios
      .post(
        "http://localhost:5000/api/event/RequestResponse",
        {
          EventID: item._id,
          UserID: e.UserID,
          Response: tof,
        },
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2QwZTk4NTI1ZDUyMTY0ZWY1MWJmYSIsImlhdCI6MTY3NDM4NTIyNX0.37DdOiJEJEUNEgrzAVhf1mCnSG-Oq9VS1S-COwmBHSc",
          },
        }
      )
      .then((res) =>
        axios
          .get("http://localhost:5000/api/event/getAllEvents")
          .then((res) => {
            const eventcreated = res.data.filter((item) => {
              return item.CreatorID == userID;
            });
            setEvent(JSON.parse(JSON.stringify(eventcreated)));
            console.log(res);
            if (tof == true) props.setMsg("Accepted");
            else props.setMsg("Rejected");
            props.showToastMessage();
          })
      );
  };

  return (
    <div className="Eventrequests">
      <h1>Requests</h1>
      {event.map((item, i) => {
        // { request(item) }
        return (
          <div className="EventCard">
            <h2 className="EventName">{item.EventName}</h2>
            <div className="users">
              <div className="user">
                <span className="name">Naam</span>
                <div className="req">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quos unde alias nostrum doloribus repudiandae natus facilis numquam molestias! Saepe</div>
                <button
                  onClick={() => {
                    // response(item1, false, item);
                  }}
                >
                  REJECT
                </button>
                <button
                  onClick={() => {
                    // response(item1, true, item);
                  }}
                >
                  ACCEPT
                </button>
              </div>
              <div className="user">
                <span className="name">Naam</span>
                <div className="req">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quos unde alias nostrum doloribus repudiandae natus facilis numquam molestias!</div>
                <button
                  onClick={() => {
                    // response(item1, false, item);
                  }}
                >
                  REJECT
                </button>
                <button
                  onClick={() => {
                    // response(item1, true, item);
                  }}
                >
                  ACCEPT
                </button>
              </div>
              <div className="user">
                <span className="name">Naam</span>
                <div className="req">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quos unde alias nostrum doloribus repudiandae natus facilis numquam molestias!.</div>
                <button
                  onClick={() => {
                    // response(item1, false, item);
                  }}
                >
                  REJECT
                </button>
                <button
                  onClick={() => {
                    // response(item1, true, item);
                  }}
                >
                  ACCEPT
                </button>
              </div>
              <div className="user">
                <span className="name">Naam</span>
                <div className="req">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quos unde alias nostrum doloribus repudiandae natus facilis numquam molestias!</div>
                <button
                  onClick={() => {
                    // response(item1, false, item);
                  }}
                >
                  REJECT
                </button>
                <button
                  onClick={() => {
                    // response(item1, true, item);
                  }}
                >
                  ACCEPT
                </button>
              </div>
              <div className="user">
                <span className="name">Naam</span>
                <div className="req">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quos unde alias nostrum doloribus repudiandae natus facilis numquam molestias!</div>
                <button
                  onClick={() => {
                    // response(item1, false, item);
                  }}
                >
                  REJECT
                </button>
                <button
                  onClick={() => {
                    // response(item1, true, item);
                  }}
                >
                  ACCEPT
                </button>
              </div>
              {/* {item.UserRequested.map((item1, i) => {
                return (
                  <div className="user">
                    {item1.UserID}
                    <button
                      onClick={() => {
                        response(item1, false, item);
                      }}
                    >
                      REJECT
                    </button>
                    <button
                      onClick={() => {
                        response(item1, true, item);
                      }}
                    >
                      ACCEPT
                    </button>
                  </div>
                );
              })} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Eventrequests;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Eventrequests = () => {
    const [event, setEvent] = useState([]);
    const [requests, setRequests] = useState();
    // const userID = localStorage.getItem("user");
    const userID = "63cbbf79681fad285f88b3e1";
    useEffect(() => {

        axios
            .get('http://localhost:5000/api/event/getAllEvents')
            .then((res) => {
                const eventcreated = res.data.filter((item) => {
                    return (item.CreatorID == userID)
                })
                setEvent(eventcreated);
                console.log(res)

            })

    }, []);
    const response = (e, tof, item) => {
        axios
            .post(('http://localhost:5000/api/event/RequestResponse'), {
                Headers: {
                    'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2QwZTk4NTI1ZDUyMTY0ZWY1MWJmYSIsImlhdCI6MTY3NDM4MzAwMH0.jfM1XQQ4DpA0NFVZq-6Q1eJSyYKQzVqhZZn6XsEF68A"
                }
            }, {
                EventID: item._id,
                UserID: e.UserID,
                Response: tof
            })
            .then(
                console.log()
            )
    }


    return (
        <div className="Eventrequests">
            {event.map((item, i) => {
                // { request(item) }
                return (<div className="EventCard">
                    <h2>{item.EventName}</h2>
                    <div className="EventDescription">
                        {item.desc}
                    </div>
                    <div className="users">
                        {item.UserRequested.map((item1, i) => {
                            return (<div className="user">
                                {item1.UserID}
                                <button onClick={(item1) => { response(item1, true, item) }}>ACCEPT</button>
                                <button onClick={(item1) => { response(item1, false, item) }}>REJECT</button>
                            </div>

                            )
                        })
                        }
                    </div>

                </div>)
            })}
        </div>
    );
}

export default Eventrequests;

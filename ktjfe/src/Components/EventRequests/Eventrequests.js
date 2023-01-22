import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Eventrequests = () => {
    const [event, setEvent] = useState();
    const [requests, setRequests] = useState();
    useEffect(() => {

        axios
            .get('/getAllEvents')
            .then((res) => {
                setEvent(res.data)
            })
    }, []);
    const request = (e) => {
        axios
            .post('/EventJoinRequest', {
                EventID: e.eventid,
                UserID: e.userid
            })
            .then((res) => {
                setRequests(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <div>
            {event.map(function (item, i) {
                { request(item) }
                <div className="EventCard">
                    <h2>{item.eventname}</h2>
                    <div className="EventDescription">
                        {item.description}
                    </div>
                    {requests.map(function (item1, i) {
                        <div className="">
                            <div className="username">{item1.username}</div>
                            <button className='accept'>Accept</button>
                            <button className='reject'>Reject</button>
                        </div>
                    })}
                </div>
            })}
        </div>
    );
}

export default Eventrequests;

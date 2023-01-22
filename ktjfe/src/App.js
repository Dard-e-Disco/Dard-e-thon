import React, { useState } from "react";
import Landingpage from "./Components/Landingpage/Landingpage";
import PostedEvents from "./Components/PostedEvents/Postedevents";
import EventRequests from "./Components/EventRequests/Eventrequests";
import AllEvents from "./Components/AllEvents/Allevents";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const [Open_Modal, setOpen_Modal] = useState(false);
  const closeModal = () => {
    setOpen_Modal(false);
  };
  const Show_Modal = () => {
    setOpen_Modal(true);
  };
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Landingpage
              Open_Modal={Open_Modal}
              closeModal={closeModal}
              Show_Modal={Show_Modal}
            />
          }
        />
        <Route exact path="/postedEvents" element={<PostedEvents />} />
        <Route exact path="/requests" element={<EventRequests />} />
        <Route exact path="/allevents" element={<AllEvents />} />
      </Routes>
    </div>
  );
};

export default App;

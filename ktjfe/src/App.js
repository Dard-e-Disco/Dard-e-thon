import React, { useState } from "react";
import Landingpage from "./Components/Landingpage/Landingpage";
import Postedevents from "./Components/PostedEvents/Postedevents";
import EventRequests from "./Components/EventRequests/Eventrequests";
import Modal from "./Components/Modal/Modal";

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
        <Route exact path="/postedEvents" element={<Postedevents />} />
        <Route exact path="/requests" element={<EventRequests />} />
      </Routes>
    </div>
  );
};

export default App;

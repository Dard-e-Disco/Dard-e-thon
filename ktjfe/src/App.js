import React from 'react'
import Landingpage from './Components/Landingpage/Landingpage'
import PostedEvents from './Components/PostedEvents/Postedevents'
import EventRequests from './Components/EventRequests/Eventrequests'
import AllEvents from './Components/AllEvents/Allevents'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landingpage/>}/>
        <Route exact path="/postedEvents" element={<PostedEvents/>}/>
        <Route exact path="/requests" element={<EventRequests/>}/>
        <Route exact path="/allevents" element={<AllEvents/>}/>
      </Routes>
    </div>
  )
}

export default App

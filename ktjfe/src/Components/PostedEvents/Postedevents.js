import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Postedevents = () => {
    useEffect(() => {
        axios.get("http://localhost:5000/api/event/getAllEvents").then((response)=>{
            console.log(response);
        })
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default Postedevents

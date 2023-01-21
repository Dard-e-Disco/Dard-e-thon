import UserContext from './UserContext'
import { useState } from 'react'


const UserState = (props) => {
    const [user, setuser] = useState();
    const[userToken, setUserToken] = useState("");
    const[Isloggedin, setIsloggedin] = useState(false);
    const [solo, setSolo] = useState([]);
    const [group, setGroup] = useState([]);
  return (
    <UserContext.Provider value={{user,setuser,userToken, setUserToken,Isloggedin, setIsloggedin, solo, group, setSolo, setGroup}}>
                  {props.children}
    </UserContext.Provider>
  )
}

export default UserState
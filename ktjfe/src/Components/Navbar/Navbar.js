import { prop } from 'dom7';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"
const Navbar = (props) => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    localStorage.setItem("logstat", false)
    navigate("/")
    window.location.reload();
  }
  return (
    <header class="text-gray-600 body-font Navbar-Parent">
      <div class="mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center w-full ">
        <Link to={"/"} class="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0">
          <img src="https://i.pinimg.com/originals/0a/1f/82/0a1f820e29719c7b67e9d5aa44241155.png" className='w-16 h-16 text-white p-2 rounded-full' alt="" />
        </Link>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-white-400	flex flex-wrap items-center text-base justify-center text-white">
          {JSON.parse(localStorage.getItem('logstat')) == true && <Link to={"/requests"} class="mr-5 hover:text-gray-900">Dashboard</Link>}
          {JSON.parse(localStorage.getItem('logstat')) == true && <Link to={"/postedEvents"} class="mr-5 hover:text-gray-900">PostedEvents</Link>}


        </nav>
        <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={() => {
          if (JSON.parse(localStorage.getItem('logstat')) == true) {
            logout()
          } else {
            props.ShowLogin_Modal();
            console.log("login-button-clicked");
          }
        }}>{JSON.parse(localStorage.getItem('logstat')) == true ? "Logout" : "Login"}
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Navbar
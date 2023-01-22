import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = (props) => {
  return (
    <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src="https://m.springfest.in/static/media/SF%20logo.3df9998d1cc066ea9bd5.png" className='w-16 h-16 text-white p-2 rounded-full' alt="" />
        <span class="ml-3 text-xl">SPRINGFEST</span>
      </a>
      <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        {props.isloggedin&&<Link to={"/requests"} class="mr-5 hover:text-gray-900">Dashboasrd</Link>}
        <Link class="mr-5 hover:text-gray-900">PostedEvents</Link>
        <a class="mr-5 hover:text-gray-900">Third Link</a>
        <a class="mr-5 hover:text-gray-900">Fourth Link</a>
      </nav>
      <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={() => {
              props.ShowLogin_Modal();
              console.log("login-button-clicked");
            }}>Login
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";                      
import { HostAuthContext } from '../contexts/host-auth.context';


function Navbar() {
    const { logoutHost } = useContext(HostAuthContext);  

  return (
    <>
    <p>Jam Sessions Events</p>
    <p>Jam Sessions Locations</p>
    <div>
        <Link to="/user/signup">Signup</Link>
        <Link to="/user/login">Login</Link>
    </div>
    <div>
        <Link to="/host/signup">Signup as a host</Link>
        <Link to="/host/login">Login as a host</Link>
        <button onClick={logoutHost}>Logout</button>
    </div>

    </>
  )
}

export default Navbar
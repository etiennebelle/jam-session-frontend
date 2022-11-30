import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";                      
import { HostAuthContext } from '../contexts/host-auth.context';
import { UserAuthContext } from '../contexts/user-auth.context';


function Navbar() {
  const { logoutHost, host } = useContext(HostAuthContext);
  const { logOutUser, user } = useContext(UserAuthContext);

  return (
    <>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/events'>Jam Sessions Events</Link>
        <Link to='/locations'>Jam Sessions Locations</Link>
      </div>
    <div>
      {user ? 
          <div> 
            <p>{user.data.username}</p>
            <button onClick={logOutUser}>Logout User</button>
          </div>
        : host ?
          <div> 
            <p>{host.data.username}</p>
            <button onClick={logoutHost}>Logout</button>
          </div>
          : 
          <div>
            <div> 
              <Link to="/user/signup">Signup</Link>
              <Link to="/user/login">Login</Link>
            </div>
            <div>
              <Link to="/host/signup">Signup as a host</Link>
              <Link to="/host/login">Login as a host</Link>
            </div>
          </div>
      }

       
    </div>
    </>
  )
}

export default Navbar
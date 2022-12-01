import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";                      
import { HostAuthContext } from '../contexts/host-auth.context';
import { UserAuthContext } from '../contexts/user-auth.context';
import { Burger } from '@mantine/core';


function Navbar() {
  const { logoutHost, host } = useContext(HostAuthContext);
  const { logOutUser, user } = useContext(UserAuthContext);
  return (
    <div className='navbar'>
      <div className='nav-left'>
        <div className='nav-home'>
          <Link to='/'>Home</Link>
        </div>
        <div className='nav-jam-list'>
          <Link to='/events'>Jam Sessions</Link>
        </div>
      </div>
      <div className='nav-right'>
          {user ? 
            <div className='user-nav-ctn'>
              <Link className='user-profile profile-link' to="/user/profile">Your Profile</Link>
              <button className='nav-btn user-btn' onClick={logOutUser}>Logout User</button>
            </div>
          : host ?
            <div className='host-nav-ctn'>
              <Link className='host-profile profile-link' to="/host/profile">Your Profile</Link>
              <button className='nav-btn host-btn' onClick={logoutHost}>Logout Host</button>
            </div>
          : 
          <ul className='nav-links'>
                <li className='user-signup signup-link'><Link to="/user/signup">Signup</Link></li>
                <li className='user-login login-link'><Link to="/user/login">Login</Link></li>
                <li className='host-signup signup-link'><Link to="/host/signup">Host Signup</Link></li>
                <li className='host-login login-link'><Link to="/host/login">Host Login</Link></li>
          </ul>
          }
        

        {/* {user ? 
            <div> 
              <button onClick={logOutUser}>Logout User</button>
              <Link to="/user/profile">Your Profile</Link>
            </div>
          : host ?
            <div> 
              <Link to="/host/profile">Your Profile</Link>
              <button onClick={logoutHost}>Logout Host</button>
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
        } */}

      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from "react";                      
import { HostAuthContext } from '../contexts/host-auth.context';
import { UserAuthContext } from '../contexts/user-auth.context';
import { Burger, Menu } from '@mantine/core';


function Navbar() {
  const { logoutHost, host } = useContext(HostAuthContext);
  const { logOutUser, user } = useContext(UserAuthContext);
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';

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
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Burger
                  size='md'
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  title={title}
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label> User </Menu.Label>
                <Menu.Item><div className='user-signup signup-link'><Link to="/user/signup">Signup</Link></div></Menu.Item>
                <Menu.Item><div className='user-login login-link'><Link to="/user/login">Login</Link></div></Menu.Item>
                <Menu.Label> Host </Menu.Label>
                <Menu.Item><div className='host-signup signup-link'><Link to="/host/signup">Host Signup</Link></div></Menu.Item>
                <Menu.Item><div className='host-login login-link'><Link to="/host/login">Host Login</Link></div></Menu.Item>
              </Menu.Dropdown>
            </Menu>
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
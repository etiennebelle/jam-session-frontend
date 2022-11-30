import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HostSignupPage from './pages/HostSignupPage';
import UserSignupPage from './pages/UserSignupPage';
import UserLoginPage from './pages/UserLoginPage';
import HostLoginPage from './pages/HostLoginPage';
import HostProfilePage from './pages/HostProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Navbar';
import IsPrivateUser from './components/IsPrivateUser';
import IsPrivateHost from './components/IsPrivateHost';
import IsAnonymous from './components/IsAnonymous';
import Home from './pages/Home';
import CreateJamSession from './pages/CreateJamSession';
import JamSessions from './pages/JamSessions';
import JamSessionDetails from './pages/JamSessionDetails';
import LocationPage from './pages/LocationPage';
import AllLocationsPage from './pages/AllLocationsPage';


function App() {
  // const API_URL = "http://localhost:5005";
  const [events, setEvents] = useState([]);

  const fetchEvents = async() => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}events`);
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
  };
  
  useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/events" element={<JamSessions events={events} /> } />
        <Route path="/events/:id" element={<JamSessionDetails /> } />
        <Route path="/locations" element={<AllLocationsPage /> } />
        <Route path="/locations/:id" element={<LocationPage /> } />
        <Route path="/user/signup" element={ <IsAnonymous><UserSignupPage /></IsAnonymous> } />
        <Route path="/user/login" element={<IsAnonymous><UserLoginPage /></IsAnonymous>} />
        <Route path="/user/profile" element={<IsPrivateUser> <UserProfilePage /> </IsPrivateUser>} />
        <Route path="/host/signup" element={<IsAnonymous><HostSignupPage /></IsAnonymous>} />
        <Route path="/host/login" element={<IsAnonymous><HostLoginPage /></IsAnonymous>} />
        <Route path="/host/profile" element={<IsPrivateHost><HostProfilePage /></IsPrivateHost>} />
        <Route path="/host/create-jam-session" element={<IsPrivateHost><CreateJamSession /></IsPrivateHost>} />
      </Routes>
    </div>
  );
}

export default App;

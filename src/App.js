import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import HostSignupPage from './pages/HostSignupPage';
import UserSignupPage from './pages/UserSignupPage';
import UserLoginPage from './pages/UserLoginPage';
import HostLoginPage from './pages/HostLoginPage';
import HostProfilePage from './pages/HostProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Navbar';
import IsPrivateUser from './components/IsPrivateUser';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/profile" element={<IsPrivateUser> <UserProfilePage /> </IsPrivateUser>} />
        <Route path="/host/signup" element={<HostSignupPage />} />
        <Route path="/host/login" element={<HostLoginPage />} />
        <Route path="/host/profile" element={<HostProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;

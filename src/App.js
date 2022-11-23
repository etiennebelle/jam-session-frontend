import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import HostSignupPage from './pages/HostSignupPage';
import UserSignupPage from './pages/UserSignupPage';
import HostLoginPage from './pages/HostLoginPage';
import HostProfilePage from './pages/HostProfilePage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/host/signup" element={<HostSignupPage />} />
        <Route path="/host/login" element={<HostLoginPage />} />
        <Route path="/host/profile" element={<HostProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;

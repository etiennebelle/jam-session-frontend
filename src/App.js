import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import HostSignupPage from './pages/HostSignupPage';
import UserSignupPage from './pages/UserSignupPage';
import UserLoginPage from './pages/UserLoginPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/host/signup" element={<HostSignupPage />} />
      </Routes>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import HostSignupPage from './pages/HostSignupPage';
import UserSignupPage from './pages/UserSignupPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/host/signup" element={<HostSignupPage />} />
      </Routes>
    </div>
  );
}

export default App;

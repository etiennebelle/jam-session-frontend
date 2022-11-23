import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import HostSignupPage from './pages/HostSignupPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/host/signup" element={<HostSignupPage />} />
      </Routes>
    </div>
  );
}

export default App;

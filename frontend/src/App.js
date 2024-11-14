import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/User/LandingPage';
import Login from './screens/User/Login';
import Register from './screens/User/Register';
import Home from './screens/User/Home';
import MainPage from './screens/User/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/mainpage" element={<MainPage />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import AddCar from './components/AddCar';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" exact element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/add-car" element={<AddCar />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
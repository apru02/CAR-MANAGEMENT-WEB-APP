import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cars/add" element={<AddCar />} />
            <Route path="/cars/edit/:id" element={<EditCar />} />
            <Route path="/cars/:id" element={<CarDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

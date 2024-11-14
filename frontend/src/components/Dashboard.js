import React, { useState } from 'react';
import UserProfile from './UserProfile';
import CarSearch from './CarSearch';
import CarList from './CarList';
import CarDetails from './CarDetails';
import AddCar from './AddCar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();

  const handleCarClick = (car) => {
    setSelectedCar(car);
    navigate(`/car-details/${car.id}`);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('User logged out');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <UserProfile onLogout={handleLogout} />
      </header>
      
      <main className="dashboard-main">
        <section className="search-section">
          <CarSearch />
        </section>
        
        <section className="car-list-section">
          <CarList onCarClick={handleCarClick} />
        </section>

        {selectedCar && (
          <section className="car-details-section">
            <CarDetails car={selectedCar} />
          </section>
        )}

        <section className="add-car-section">
          <AddCar />
        </section>
      </main>
    </div>
  );
}
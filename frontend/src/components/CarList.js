// frontend/src/components/CarList.js
import React, { useEffect, useState } from 'react';
import { getCars } from '../api';
import { Link } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await getCars();
      setCars(data);
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    [car.title, car.description, ...car.tags].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white shadow-md rounded-md max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Car List</h2>
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <ul className="space-y-2">
        {filteredCars.map((car) => (
          <li key={car._id}>
            <Link
              to={`/cars/${car._id}`}
              className="block bg-gray-100 p-4 rounded hover:bg-gray-200"
            >
              {car.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
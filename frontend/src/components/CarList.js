import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function CarList() {
  const { authToken } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    } else {
      setAuthToken(authToken);
      fetchCars();
    }
  }, [authToken]);

  const fetchCars = async () => {
    try {
      const res = await api.get('/cars');
      setCars(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCars = cars.filter((car) =>
    [car.title, car.description, ...car.tags]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search cars..."
          className="border px-3 py-2 rounded w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/cars/add"
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Car
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCars.map((car) => (
          <div key={car._id} className="border rounded p-4">
            <img
              src={car.images[0]}
              alt={car.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-xl font-bold">{car.title}</h3>
            <p className="text-gray-600">{car.description}</p>
            <Link
              to={`/cars/${car._id}`}
              className="text-blue-600 mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;

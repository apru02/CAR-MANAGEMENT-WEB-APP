import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function CarDetail() {
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    } else {
      setAuthToken(authToken);
      fetchCar();
    }
  }, [authToken]);

  const fetchCar = async () => {
    try {
      const res = await api.get(`/cars/${id}`);
      setCar(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cars/${id}`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        {car.images.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt={`${car.title} ${idx + 1}`}
            className="w-full h-64 object-cover mb-2"
          />
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-2">{car.title}</h2>
      <p className="text-gray-600 mb-4">{car.description}</p>
      <div className="mb-4">
        {car.tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex">
        <Link
          to={`/cars/edit/${car._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CarDetail;

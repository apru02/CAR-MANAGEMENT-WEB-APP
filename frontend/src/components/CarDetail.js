// frontend/src/components/CarDetail.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCar, deleteCar } from '../api';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await getCar(id);
      setCar(data);
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    await deleteCar(id);
    navigate('/cars');
  };

  return car ? (
    <div className="bg-white shadow-md rounded-md max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{car.title}</h2>
      <p>{car.description}</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {car.images.map((img, idx) => (
          <img key={idx} src={img} alt={`car-${idx}`} className="w-full h-auto" />
        ))}
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => navigate(`/cars/edit/${id}`)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  ) : null;
};

export default CarDetail;
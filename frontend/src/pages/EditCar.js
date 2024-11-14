import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar } from '../api/cars';
import { FiEdit2, FiUploadCloud, FiX, FiImage, FiLoader } from 'react-icons/fi';
import CarForm from '../components/CarForm';
// EditCar Component
const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const data = await getCarById(id);
      setCar(data);
    } catch (error) {
      alert('Failed to fetch car details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateCar(id, formData);
      alert('Car updated successfully');
      navigate(`/cars/${id}`);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update car');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="w-8 h-8 animate-spin text-[#60B6CA]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-8">
        <FiEdit2 className="w-6 h-6 text-[#60B6CA]" />
        <h2 className="text-3xl font-bold text-gray-800">Edit Car</h2>
      </div>
      <CarForm onSubmit={handleSubmit} initialData={car} loading={loading} />
    </div>
  );
};

export default EditCar;
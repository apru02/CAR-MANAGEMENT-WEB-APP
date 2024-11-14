import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../api/cars';
import toast from 'react-hot-toast';
import CarForm from '../components/CarForm';

const CreateCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createCar(formData);
      toast.success('Car created successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create car');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <CarForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateCar;
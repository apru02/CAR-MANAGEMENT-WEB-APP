import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, deleteCar } from '../api/cars';
import { FiEdit2, FiTrash2, FiCalendar, FiMapPin, FiDollarSign, FiPackage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const data = await getCarById(id);
      setCar(data);
    } catch (error) {
      console.error('Failed to fetch car details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete car');
    }
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const LoadingSkeleton = () => (
    <div className="max-w-6xl mx-auto p-4 animate-pulse">
      <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );

  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Delete Car</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this car? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      {showDeleteModal && <DeleteModal />}
      
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiChevronLeft className="mr-1" />
          Back to listings
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-[500px] bg-gray-100">
          <img
            src={car.images[activeImage]}
            alt={car.title}
            className="w-full h-full object-cover"
          />
          
          {car.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <FiChevronRight size={24} />
              </button>
            </>
          )}
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {car.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImage === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-2" />
                  <span>{car.location}</span>
                </div>
                <div className="flex items-center">
                  <FiPackage className="mr-2" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="mr-2" />
                  <span className="font-semibold">{car.price}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/cars/${id}/edit`)}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FiEdit2 className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {car.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-[#60B6CA] px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {car.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative rounded-lg overflow-hidden aspect-video ${
                  activeImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${car.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCars, searchCars } from '../api/cars';
import { FiSearch, FiPackage, FiDollarSign, FiCalendar, FiMapPin } from 'react-icons/fi';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
    } catch (error) {
      console.error('Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!searchTerm.trim()) {
      return fetchCars();
    }
    try {
      const data = await searchCars(searchTerm);
      setCars(data);
    } catch (error) {
      console.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-4 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="flex gap-2">
              {[1, 2].map((tag) => (
                <div key={tag} className="h-6 w-16 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Available Cars
        </h1>
        <p className="text-gray-600">Find your perfect ride from our collection</p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by make, model, or features..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Link
                  key={car._id}
                  to={`/cars/${car._id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={car.images[0]}
                      alt={car.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <h3 className="text-xl font-semibold text-white">{car.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 line-clamp-2 mb-4">{car.description}</p>
                    
                    {/* <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FiCalendar className="mr-2" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="mr-2" />
                        <span>{car.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiPackage className="mr-2" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiDollarSign className="mr-2" />
                        <span>{car.price}</span>
                      </div>
                    </div> */}

                    <div className="flex flex-wrap gap-2">
                      {car.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-[#60B6CA] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FiPackage className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-600">
                Try adjusting your search or browse our available vehicles
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarList;
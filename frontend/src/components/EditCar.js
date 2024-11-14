import React, { useEffect, useState, useContext } from 'react';
import api, { setAuthToken } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

function EditCar() {
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

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
      setTitle(res.data.title);
      setDescription(res.data.description);
      setTags(res.data.tags.join(', '));
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      tags.split(',').forEach((tag) => formData.append('tags', tag.trim()));
      images.forEach((image) => formData.append('images', image));

      await api.put(`/cars/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/cars/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Tags (separated by commas):
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Add Images (max 10):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full"
            onChange={handleImageChange}
          />
          <p className="text-sm text-gray-500">
            Uploading new images will replace existing ones.
          </p>
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 rounded">
          Update Car
        </button>
      </form>
    </div>
  );
}

export default EditCar;

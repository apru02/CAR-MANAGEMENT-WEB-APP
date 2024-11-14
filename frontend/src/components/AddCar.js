import React, { useState, useContext } from 'react';
import api, { setAuthToken } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddCar() {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      navigate('/login');
    } else {
      setAuthToken(authToken);
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        tags.split(',').forEach((tag) => formData.append('tags', tag.trim()));
        images.forEach((image) => formData.append('images', image));

        await api.post('/cars/create/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Car</h2>
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
          <label className="block mb-1">Images (max 10):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full"
            onChange={handleImageChange}
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Add Car
        </button>
      </form>
    </div>
  );
}

export default AddCar;

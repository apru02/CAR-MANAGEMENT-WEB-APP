// frontend/src/components/AddCar.js
import React, { useState } from 'react';
import { createCar } from '../api';

const AddCar = () => {
  const [form, setForm] = useState({ title: '', description: '', tags: [], images: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    form.images.forEach((img) => formData.append('images', img));
    form.tags.forEach((tag) => formData.append('tags', tag));

    try {
      await createCar(formData);
      window.location = '/cars';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setForm({ ...form, images: [...e.target.files] })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags.join(',')}
          onChange={(e) => setForm({ ...form, tags: e.target.value.split(',') })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
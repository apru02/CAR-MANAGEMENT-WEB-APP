import { useState, useEffect } from "react";
import { FiEdit2, FiLoader } from "react-icons/fi";
import ImageUpload from "./ImageUpload";


const CarForm = ({ onSubmit, initialData, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    images: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData({ ...formData, tags });
  };

  const handleImageUpload = (images) => {
    setFormData({ ...formData, images });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-6">
        <div>
          <label className="text-gray-700 text-sm font-semibold mb-2 block">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-semibold mb-2 block">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none h-32 resize-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-semibold mb-2 block">
            Tags
          </label>
          <input
            type="text"
            value={formData.tags.join(", ")}
            onChange={handleTagChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            placeholder="e.g., SUV, Toyota, Dealer"
            required
          />
        </div>

        <ImageUpload
          images={formData.images}
          onChange={handleImageUpload}
          maxImages={10}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FiEdit2 className="w-5 h-5" />
              <span>Save Car</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CarForm;

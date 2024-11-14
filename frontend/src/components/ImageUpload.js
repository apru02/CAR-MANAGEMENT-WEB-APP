import React, { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";


const ImageUpload = ({ images, onChange, maxImages }) => {
  const fileInputRef = React.useRef();
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages = await Promise.all(
      imageFiles.map((file) => convertToBase64(file))
    );

    onChange([...images, ...newImages]);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        <FiUploadCloud className="w-12 h-12 mx-auto text-blue-500 mb-4" />
        <p className="text-gray-700 font-medium">
          Drag and drop images here or click to select
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {images.length}/{maxImages} images uploaded
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg shadow-md group-hover:opacity-75 transition-opacity duration-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
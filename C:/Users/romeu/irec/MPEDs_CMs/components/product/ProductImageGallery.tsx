import React from 'react';

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

const ProductImageGallery = ({ images, selectedImage, onImageSelect }: ProductImageGalleryProps) => {
  return (
    <div className="space-y-4">
      {/* Main Product Image */}
      <div className="relative">
        <img 
          src={images[selectedImage]} 
          alt="Product" 
          className="w-full h-auto rounded-lg"
        />
        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all ${
              selectedImage === index 
                ? 'border-green-500' 
                : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
import React, { useState } from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import CognitiveProfile from './CognitiveProfile';
import PurchaseOptions from './PurchaseOptions';
import QuantitySelector from './QuantitySelector';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState('one-time');
  const [quantity, setQuantity] = useState(1);

const product = {
  id: 'deep-work-blend',
  name: 'Deep Work Blend',
  price: 24.99,
  rating: 5,
  reviews: 127,
  description: 'Premium single-origin coffee optimized for deep focus sessions. Bold flavor with notes of dark chocolate and hazelnut. Perfect for 2-4 hour coding sessions.',
  images: [
    '/images/deep-work-blend-main.jpg',
    '/images/deep-work-blend-1.jpg',
    '/images/deep-work-blend-2.jpg',
    '/images/deep-work-blend-3.jpg',
    '/images/deep-work-blend-4.jpg'
  ],
  cognitiveProfile: {
    energyLevel: 'High' as const,
    focusDuration: 'Long' as const,
    intensity: 'Medium' as const
  },
  purchaseOptions: {
    oneTime: 24.99,
    subscription: 24,
    savings: 21
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <ProductImageGallery 
            images={product.images} 
            selectedImage={selectedImage} 
            onImageSelect={setSelectedImage} 
          />
          
          {/* Product Information */}
          <div className="space-y-6">
            <ProductInfo product={product} />
            <CognitiveProfile profile={product.cognitiveProfile} />
            <PurchaseOptions 
              product={product} 
              selectedOption={selectedOption} 
              onOptionChange={setSelectedOption} 
            />
            <QuantitySelector 
              quantity={quantity} 
              onQuantityChange={setQuantity} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
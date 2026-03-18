import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Quantity</h3>
      
      <select 
        value={quantity} 
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value={1}>1 bag</option>
        <option value={2}>2 bags</option>
        <option value={3}>3 bags</option>
        <option value={4}>4 bags</option>
        <option value={5}>5 bags</option>
      </select>
      
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default QuantitySelector;
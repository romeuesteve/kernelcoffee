import React from 'react';

interface PurchaseOptionsProps {
  product: {
    purchaseOptions: {
      oneTime: number;
      subscription: number;
      savings: number;
    };
  };
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const PurchaseOptions = ({ product, selectedOption, onOptionChange }: PurchaseOptionsProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Purchase Option</h3>
      
      <div className="space-y-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="purchaseOption"
            value="one-time"
            checked={selectedOption === 'one-time'}
            onChange={() => onOptionChange('one-time')}
            className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 focus:ring-green-500"
          />
          <div className="flex-1">
            <div className="font-medium text-white">One time purchase</div>
            <div className="text-green-500 font-semibold">${product.purchaseOptions.oneTime}</div>
          </div>
        </label>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="purchaseOption"
            value="subscription"
            checked={selectedOption === 'subscription'}
            onChange={() => onOptionChange('subscription')}
            className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 focus:ring-green-500"
          />
          <div className="flex-1">
            <div className="font-medium text-white">Subscribe & Save</div>
            <div className="text-green-500 font-semibold">${product.purchaseOptions.subscription}/month</div>
            <div className="text-sm text-gray-400">Save ${product.purchaseOptions.savings}/year</div>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
            Save 20%
          </button>
        </label>
      </div>
    </div>
  );
};

export default PurchaseOptions;
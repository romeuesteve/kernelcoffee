import React from 'react';

interface CognitiveProfileProps {
  profile: {
    energyLevel: 'High' | 'Medium' | 'Low';
    focusDuration: 'Long' | 'Medium' | 'Short';
    intensity: 'High' | 'Medium' | 'Low';
  };
}

const CognitiveProfile = ({ profile }: CognitiveProfileProps) => {
  const getProgressColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-green-500';
      case 'Medium': return 'bg-green-400';
      case 'Low': return 'bg-green-300';
      default: return 'bg-green-500';
    }
  };

  const getProgressWidth = (level: string) => {
    switch (level) {
      case 'High': return 'w-full';
      case 'Medium': return 'w-3/4';
      case 'Low': return 'w-1/2';
      default: return 'w-full';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'High': return 'High';
      case 'Medium': return 'Medium';
      case 'Low': return 'Low';
      case 'Long': return 'Long';
      case 'Short': return 'Short';
      default: return level;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Cognitive Profile</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Energy Level</span>
            <span className="text-gray-300">{getLevelText(profile.energyLevel)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full ${getProgressColor(profile.energyLevel)} ${getProgressWidth(profile.energyLevel)}`}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Focus Duration</span>
            <span className="text-gray-300">{getLevelText(profile.focusDuration)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full ${getProgressColor(profile.focusDuration)} ${getProgressWidth(profile.focusDuration)}`}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Intensity</span>
            <span className="text-gray-300">{getLevelText(profile.intensity)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full ${getProgressColor(profile.intensity)} ${getProgressWidth(profile.intensity)}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveProfile;
'use client';

import { useState } from 'react';
import { DemographicProfile } from '@/app/page';

interface DemographicFormProps {
  onProfileCreate: (profile: Omit<DemographicProfile, 'id'>) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const PLATFORMS = ['Instagram', 'TikTok', 'Facebook', 'Twitter/X', 'LinkedIn', 'YouTube'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const INCOME_RANGES = [
  'Under $25k',
  '$25k - $50k', 
  '$50k - $75k',
  '$75k - $100k',
  '$100k - $150k',
  'Over $150k'
];

const INTEREST_OPTIONS = [
  'Fashion', 'Technology', 'Travel', 'Food', 'Fitness', 'Gaming',
  'Music', 'Art', 'Sports', 'Business', 'Education', 'Health',
  'Beauty', 'Parenting', 'Finance', 'Entertainment', 'Politics',
  'Environment', 'Cars', 'Books', 'Photography', 'DIY'
];

export function DemographicForm({ onProfileCreate, isGenerating, setIsGenerating }: DemographicFormProps) {
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    gender: '',
    income: '',
    interests: [] as string[],
    platform: ''
  });

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.location || !formData.gender || 
        !formData.income || formData.interests.length === 0 || !formData.platform) {
      alert('Please fill in all fields and select at least one interest');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      onProfileCreate({
        age: parseInt(formData.age),
        location: formData.location,
        gender: formData.gender,
        income: formData.income,
        interests: formData.interests,
        platform: formData.platform
      });
      
      setIsGenerating(false);
      
      // Reset form
      setFormData({
        age: '',
        location: '',
        gender: '',
        income: '',
        interests: [],
        platform: ''
      });
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Create Audience Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Age
          </label>
          <input
            type="number"
            min="13"
            max="100"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., 25"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., New York, USA or London, UK"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select gender</option>
            {GENDERS.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        {/* Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Income Range
          </label>
          <select
            value={formData.income}
            onChange={(e) => setFormData(prev => ({ ...prev, income: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select income range</option>
            {INCOME_RANGES.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Platform
          </label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select platform</option>
            {PLATFORMS.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Interests ({formData.interests.length} selected)
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
            {INTEREST_OPTIONS.map(interest => (
              <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestToggle(interest)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Feed...
            </>
          ) : (
            'Generate Audience Feed'
          )}
        </button>
      </form>
    </div>
  );
}

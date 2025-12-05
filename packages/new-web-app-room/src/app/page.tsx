'use client';

import { useState } from 'react';
import { DemographicForm } from '@/components/DemographicForm';
import { FeedSimulator } from '@/components/FeedSimulator';
import { ComparisonView } from '@/components/ComparisonView';

export interface DemographicProfile {
  id: string;
  age: number;
  location: string;
  gender: string;
  income: string;
  interests: string[];
  platform: string;
}

export default function Home() {
  const [profiles, setProfiles] = useState<DemographicProfile[]>([]);
  const [activeView, setActiveView] = useState<'single' | 'compare'>('single');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProfileCreate = (profile: Omit<DemographicProfile, 'id'>) => {
    const newProfile = {
      ...profile,
      id: Date.now().toString()
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const handleProfileDelete = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Audience Feed Simulator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Generate realistic social media feeds based on demographic data. 
            Understand what your target audience actually sees and engages with.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveView('single')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeView === 'single'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Single Profile
            </button>
            <button
              onClick={() => setActiveView('compare')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeView === 'compare'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Compare Profiles
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demographic Input */}
          <div className="lg:col-span-1">
            <DemographicForm 
              onProfileCreate={handleProfileCreate}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
            
            {/* Saved Profiles */}
            {profiles.length > 0 && (
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Saved Profiles ({profiles.length})
                </h3>
                <div className="space-y-3">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {profile.age}yr {profile.gender} from {profile.location}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {profile.platform} • {profile.interests.slice(0, 2).join(', ')}
                        </p>
                      </div>
                      <button
                        onClick={() => handleProfileDelete(profile.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Feed Display */}
          <div className="lg:col-span-2">
            {activeView === 'single' ? (
              <FeedSimulator 
                profiles={profiles}
                isGenerating={isGenerating}
              />
            ) : (
              <ComparisonView 
                profiles={profiles}
                isGenerating={isGenerating}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


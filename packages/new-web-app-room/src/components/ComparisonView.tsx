'use client';

import { useState } from 'react';
import { DemographicProfile } from '@/app/page';
import { FeedSimulator } from '@/components/FeedSimulator';

interface ComparisonViewProps {
  profiles: DemographicProfile[];
  isGenerating: boolean;
}

export function ComparisonView({ profiles, isGenerating }: ComparisonViewProps) {
  const [selectedProfiles, setSelectedProfiles] = useState<[DemographicProfile | null, DemographicProfile | null]>([null, null]);

  const handleProfileSelect = (index: 0 | 1, profileId: string) => {
    const profile = profiles.find(p => p.id === profileId) || null;
    const newSelection: [DemographicProfile | null, DemographicProfile | null] = [...selectedProfiles];
    newSelection[index] = profile;
    setSelectedProfiles(newSelection);
  };

  if (profiles.length < 2) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Need More Profiles
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Create at least 2 audience profiles to compare their feeds side-by-side
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1].map((index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Profile {index === 0 ? 'A' : 'B'}
            </label>
            <select
              value={selectedProfiles[index]?.id || ''}
              onChange={(e) => handleProfileSelect(index as 0 | 1, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Choose a profile...</option>
              {profiles.map(profile => (
                <option key={profile.id} value={profile.id}>
                  {profile.age}yr {profile.gender} from {profile.location} ({profile.platform})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Side-by-Side Feed Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedProfiles.map((profile, index) => (
          <div key={index} className="space-y-4">
            {profile ? (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    index === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    Profile {index === 0 ? 'A' : 'B'}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p><span className="font-medium">Demographics:</span> {profile.age}-year-old {profile.gender} from {profile.location}</p>
                    <p><span className="font-medium">Income:</span> {profile.income}</p>
                    <p><span className="font-medium">Platform:</span> {profile.platform}</p>
                    <p><span className="font-medium">Interests:</span> {profile.interests.join(', ')}</p>
                  </div>
                </div>
                <FeedSimulator profiles={[profile]} isGenerating={isGenerating} />
              </>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a profile to view their feed
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Insights */}
      {selectedProfiles[0] && selectedProfiles[1] && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Profile Comparison Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Age Demographics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Profile A ({selectedProfiles[0].age}yr) vs Profile B ({selectedProfiles[1].age}yr) 
                will see different content priorities and brand messaging styles.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Geographic Targeting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedProfiles[0].location} vs {selectedProfiles[1].location} markets 
                show distinct regional preferences and local brand presence.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Behavior</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedProfiles[0].platform} vs {selectedProfiles[1].platform} users 
                engage with different content formats and interaction patterns.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Key Takeaway</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              These profiles represent different audience segments that would require 
              tailored content strategies, messaging approaches, and platform-specific optimizations 
              to maximize engagement and conversion rates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


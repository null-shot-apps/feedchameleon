'use client';

import { useState, useEffect } from 'react';
import { DemographicProfile } from '@/app/page';

interface FeedPost {
  id: string;
  type: 'brand' | 'influencer' | 'content' | 'ad';
  author: string;
  content: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  reasoning: string;
  imageUrl?: string;
}

interface FeedSimulatorProps {
  profiles: DemographicProfile[];
  isGenerating: boolean;
}

export function FeedSimulator({ profiles, isGenerating }: FeedSimulatorProps) {
  const [selectedProfile, setSelectedProfile] = useState<DemographicProfile | null>(null);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [showReasonings, setShowReasonings] = useState(false);

  useEffect(() => {
    if (profiles.length > 0 && !selectedProfile) {
      setSelectedProfile(profiles[profiles.length - 1]);
    }
  }, [profiles, selectedProfile]);

  useEffect(() => {
    if (selectedProfile) {
      generateFeedPosts(selectedProfile);
    }
  }, [selectedProfile]);

  const generateFeedPosts = (profile: DemographicProfile) => {
    // Simulate AI-generated feed based on demographic data
    const posts: FeedPost[] = [];
    
    // Generate posts based on profile characteristics
    if (profile.age >= 18 && profile.age <= 35) {
      posts.push({
        id: '1',
        type: 'influencer',
        author: profile.platform === 'TikTok' ? '@trendy_lifestyle' : '@lifestyle_guru',
        content: profile.interests.includes('Fashion') 
          ? 'Just dropped my summer wardrobe essentials! 🌞 Link in bio for 20% off'
          : 'Morning routine that changed my life ✨ Who else is trying this?',
        engagement: { likes: 12400, comments: 234, shares: 89 },
        reasoning: `Young adults (${profile.age}) in ${profile.location} typically engage with lifestyle influencers who promote aspirational content and exclusive deals.`,
        imageUrl: '/api/placeholder/400/300'
      });
    }

    if (profile.income.includes('$100k') || profile.income.includes('Over')) {
      posts.push({
        id: '2',
        type: 'brand',
        author: 'Tesla',
        content: 'Experience the future of driving. Model Y now available with enhanced autopilot.',
        engagement: { likes: 8900, comments: 156, shares: 234 },
        reasoning: `High-income individuals (${profile.income}) are targeted by premium brands like Tesla, especially in tech-forward markets like ${profile.location}.`,
        imageUrl: '/api/placeholder/400/300'
      });
    }

    if (profile.interests.includes('Technology')) {
      posts.push({
        id: '3',
        type: 'content',
        author: profile.platform === 'LinkedIn' ? 'Tech Weekly' : '@techreview',
        content: 'AI is reshaping every industry. Here are 5 ways it might affect your career in 2024 🤖',
        engagement: { likes: 5600, comments: 89, shares: 167 },
        reasoning: `Technology interest indicates engagement with AI and career-focused content, especially relevant for ${profile.age}-year-olds in the current job market.`,
        imageUrl: '/api/placeholder/400/300'
      });
    }

    if (profile.location.includes('UK') || profile.location.includes('London')) {
      posts.push({
        id: '4',
        type: 'ad',
        author: 'Tesco',
        content: 'Fresh groceries delivered to your door. Free delivery on orders over £40 this week!',
        engagement: { likes: 234, comments: 12, shares: 8 },
        reasoning: `UK residents see localized ads from major retailers like Tesco, especially targeting convenience and value propositions.`,
        imageUrl: '/api/placeholder/400/300'
      });
    }

    if (profile.interests.includes('Fitness')) {
      posts.push({
        id: '5',
        type: 'influencer',
        author: '@fitnessmotivation',
        content: '30-day transformation challenge starts Monday! Who\'s joining me? 💪 #FitnessJourney',
        engagement: { likes: 3400, comments: 78, shares: 45 },
        reasoning: `Fitness interest drives engagement with transformation content and community challenges, popular across all age groups.`,
        imageUrl: '/api/placeholder/400/300'
      });
    }

    if (profile.age >= 35 && profile.interests.includes('Parenting')) {
      posts.push({
        id: '6',
        type: 'content',
        author: 'Modern Parent',
        content: 'Screen time guidelines by age: What pediatricians actually recommend 📱👶',
        engagement: { likes: 1200, comments: 234, shares: 89 },
        reasoning: `Parents aged ${profile.age} actively seek evidence-based parenting advice, especially around technology and child development.`,
        imageUrl: '/api/placeholder/400/300'
      });
    }

    setFeedPosts(posts);
  };

  const getPostTypeColor = (type: FeedPost['type']) => {
    switch (type) {
      case 'brand': return 'bg-blue-100 text-blue-800';
      case 'influencer': return 'bg-purple-100 text-purple-800';
      case 'content': return 'bg-green-100 text-green-800';
      case 'ad': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (profiles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Profiles Created Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Create your first audience profile to see their simulated social media feed
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Selector */}
      {profiles.length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Profile to View
          </label>
          <select
            value={selectedProfile?.id || ''}
            onChange={(e) => {
              const profile = profiles.find(p => p.id === e.target.value);
              setSelectedProfile(profile || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {profiles.map(profile => (
              <option key={profile.id} value={profile.id}>
                {profile.age}yr {profile.gender} from {profile.location} ({profile.platform})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Feed Display */}
      {selectedProfile && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {/* Feed Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {selectedProfile.platform} Feed Simulation
              </h2>
              <button
                onClick={() => setShowReasonings(!showReasonings)}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {showReasonings ? 'Hide' : 'Show'} AI Reasoning
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Profile:</span> {selectedProfile.age}-year-old {selectedProfile.gender} from {selectedProfile.location}
              <br />
              <span className="font-medium">Income:</span> {selectedProfile.income} • 
              <span className="font-medium"> Interests:</span> {selectedProfile.interests.join(', ')}
            </div>
          </div>

          {/* Feed Posts */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {isGenerating ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Generating personalized feed...</p>
              </div>
            ) : (
              feedPosts.map((post) => (
                <div key={post.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {post.author.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author}
                        </p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPostTypeColor(post.type)}`}>
                          {post.type}
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-white mb-3">
                        {post.content}
                      </p>
                      
                      {/* Engagement Stats */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span>{post.engagement.likes.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{post.engagement.comments}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          <span>{post.engagement.shares}</span>
                        </span>
                      </div>

                      {/* AI Reasoning */}
                      {showReasonings && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <span className="font-medium">AI Insight:</span> {post.reasoning}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

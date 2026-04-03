import React from 'react';

export const RoomCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    {/* Image Skeleton */}
    <div className="h-64 bg-gray-200"></div>
    
    {/* Content Skeleton */}
    <div className="p-4">
      {/* Title and Price */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="text-right">
          <div className="h-8 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

export const FeatureCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
    <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
    <div className="flex items-center mb-4">
      <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded mb-1 w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="flex text-yellow-400">
      {'★'.repeat(5)}
    </div>
  </div>
);

export const PageHeaderSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
  </div>
);

export const SearchSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-gray-200 rounded-lg mb-6"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <RoomCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

// Loading spinner component
export const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin`}></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
};

// Full page loader
export const FullPageLoader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <div className="text-lg font-semibold text-gray-800">Loading LuxeHotel...</div>
      <div className="text-sm text-gray-600">Preparing your experience</div>
    </div>
  </div>
);

// Progress bar loader
export const ProgressBar = ({ progress = 0, showPercentage = true }) => (
  <div className="w-full">
    {showPercentage && (
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Loading</span>
        <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
      </div>
    )}
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default {
  RoomCardSkeleton,
  FeatureCardSkeleton,
  TestimonialSkeleton,
  PageHeaderSkeleton,
  SearchSkeleton,
  LoadingSpinner,
  FullPageLoader,
  ProgressBar
};

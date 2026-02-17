import React from 'react';

interface AdPlaceholderProps {
  text: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ text }) => {
  return (
    <div className="w-full bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-24 flex items-center justify-center text-gray-400 text-sm my-4 rounded">
      {text}
    </div>
  );
};

export default AdPlaceholder;
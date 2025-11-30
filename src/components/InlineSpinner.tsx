import React from 'react';

const InlineSpinner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default InlineSpinner;

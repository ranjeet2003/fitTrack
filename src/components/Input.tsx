import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  className?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className = '', error, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-textSecondary text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full p-2 bg-background border border-border rounded-sm text-text placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
          error ? 'border-error focus:ring-error' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default Input;

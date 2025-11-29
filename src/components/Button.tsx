import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';

  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#5f2c82] to-[#49a09d] text-white hover:from-[#5f2c82]/90 hover:to-[#49a09d]/90 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus:ring-primary',
    ghost: 'text-textSecondary hover:bg-surface focus:ring-textSecondary',
    link: 'text-primary hover:underline focus:ring-primary',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;

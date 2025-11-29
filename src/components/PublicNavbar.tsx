import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Sun, Moon } from 'lucide-react'; // Import Sun and Moon icons
import Button from './Button';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

const PublicNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Use theme context

  return (
    <nav className="bg-surface shadow-lg py-3 px-4 sm:px-5 flex justify-between items-center sticky top-0 z-50 border-b border-border backdrop-blur-sm bg-opacity-80">
      <Link to="/welcome" className="flex items-center space-x-2 text-text text-xl font-bold">
        <Dumbbell className="text-primary" size={28} />
        <span>FitTrack</span>
      </Link>
      <div className="flex items-center space-x-2">
        <Button variant="link" to="/auth" className="text-sm px-2 py-1">
          Login
        </Button>
        <Button to="/auth" className="px-3 py-1 text-sm">
          Sign Up
        </Button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-text hover:bg-surface/50 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;

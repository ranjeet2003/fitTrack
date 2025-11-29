import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Home, Target, History, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-surface shadow-lg py-4 px-4 md:px-6 flex justify-between items-center sticky top-0 z-50 border-b border-border">
      <Link to="/" className="flex items-center space-x-2 text-text text-2xl font-bold">
        <Dumbbell className="text-primary" size={32} />
        <span>FitTrack</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink to="/">
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/goal-setup">
          <Target size={20} />
          <span>Goal Setup</span>
        </NavLink>
        <NavLink to="/history">
          <History size={20} />
          <span>History</span>
        </NavLink>
        <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2 !py-1 !px-4">
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle menu"
          className="p-2 rounded-md text-text hover:bg-surface/50"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute left-4 right-4 top-20 bg-surface border border-border rounded-lg shadow-lg p-4 md:hidden">
          <div className="flex flex-col space-y-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center space-x-3 text-textSecondary hover:text-primary">
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/goal-setup" onClick={() => setMenuOpen(false)} className="flex items-center space-x-3 text-textSecondary hover:text-primary">
              <Target size={18} />
              <span>Goal Setup</span>
            </Link>
            <Link to="/history" onClick={() => setMenuOpen(false)} className="flex items-center space-x-3 text-textSecondary hover:text-primary">
              <History size={18} />
              <span>History</span>
            </Link>
            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="flex items-center space-x-3 text-textSecondary hover:text-primary">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-textSecondary hover:text-primary transition-colors duration-200"
  >
    {children}
  </Link>
);

export default Navbar;

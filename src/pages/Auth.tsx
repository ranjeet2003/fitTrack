import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './Auth.css';
import OAuth from '../components/OAuth';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || (isSignUp && !username)) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await API.post('/auth/signup', { username, email, password });
        setIsSignUp(false);
        setError('Signup successful! Please log in.');
      } else {
        const res = await API.post('/auth/login', { email, password });
        login(res.data.userId, res.data.username);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="auth-container">
      <div className="auth-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? 'signup' : 'login'}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="form-wrapper"
          >
            {isSignUp ? (
              <SignUpForm
                onSubmit={handleSubmit}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                error={error}
                toggleForm={toggleForm}
              />
            ) : (
              <LoginForm
                onSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                error={error}
                toggleForm={toggleForm}
              />
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="overlay-section">
            <h1 className="auth-title">Track Your Fitness</h1>
            <p className="auth-text">Join us and start your journey to a healthier life. Log your meals, track your progress, and reach your goals!</p>
        </div>
      </div>
    </div>
  );
};

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  email?: string;
  setEmail?: (value: string) => void;
  password?: string;
  setPassword?: (value: string) => void;
  loading: boolean;
  error: string;
  toggleForm: () => void;
}

interface SignUpFormProps extends FormProps {
    username?: string;
    setUsername?: (value: string) => void;
}

const LoginForm: React.FC<FormProps> = ({ onSubmit, email, setEmail, password, setPassword, loading, error, toggleForm }) => (
    <div className="form-section">
        <h1 className="form-title">Sign In</h1>
        <OAuth />
        <form onSubmit={onSubmit}>
            <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail?.(e.target.value)} />
            </div>
            <div className="input-group">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword?.(e.target.value)} />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="auth-button" disabled={loading}>
                {loading ? <div className="loading-spinner"></div> : 'Sign In'}
            </button>
        </form>
        <p className="toggle-text">
            Don't have an account? <button onClick={toggleForm}>Sign Up</button>
        </p>
    </div>
);

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, username, setUsername, email, setEmail, password, setPassword, loading, error, toggleForm }) => (
    <div className="form-section">
        <h1 className="form-title">Create Account</h1>
        <OAuth />
        <form onSubmit={onSubmit}>
            <div className="input-group">
                <FaUser className="input-icon" />
                <input type="text" placeholder="Username" className="auth-input" value={username} onChange={(e) => setUsername?.(e.target.value)} />
            </div>
            <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail?.(e.target.value)} />
            </div>
            <div className="input-group">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword?.(e.target.value)} />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="auth-button" disabled={loading}>
                {loading ? <div className="loading-spinner"></div> : 'Sign Up'}
            </button>
        </form>
        <p className="toggle-text">
            Already have an account? <button onClick={toggleForm}>Sign In</button>
        </p>
    </div>
);

export default Auth;


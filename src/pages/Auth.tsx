import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import OAuth from '../components/OAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const formVariants = {
    initial: { opacity: 0, x: isSignUp ? '-100%' : '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isSignUp ? '100%' : '-100%' },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden border border-border">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-surface relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? 'signup' : 'login'}
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, type: 'tween' }}
              className="w-full"
            >
              {isSignUp ? (
                <SignUpForm toggleForm={() => setIsSignUp(false)} />
              ) : (
                <LoginForm toggleForm={() => setIsSignUp(true)} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlay Section */}
        <div className="hidden md:flex w-1/2 p-12 flex-col justify-center items-center text-center text-white bg-gradient-to-r from-primary to-secondary">
          <h1 className="text-4xl font-bold mb-4">Track Your Fitness</h1>
          <p className="text-lg leading-relaxed">
            Join us and start your journey to a healthier life. Log your meals, track your progress, and reach your goals!
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Login Form ---
const LoginForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.userId, res.data.username);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-text text-center mb-4">Sign In</h1>
      <OAuth />
      <p className="text-center text-textSecondary text-sm my-4">or use your email</p>

      <form onSubmit={handleSubmit}>
        <Input id="login-email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={error && error.includes('email') ? error : ''} />
        <Input id="login-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} error={error && !error.includes('email') ? error : ''} />
        {error && <p className="text-center text-error text-sm min-h-[1.25rem] mb-4">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Sign In'}
        </Button>
      </form>
      <p className="text-center mt-8 text-textSecondary">
        Don't have an account?{' '}
        <Button variant="link" onClick={toggleForm}>
          Sign Up
        </Button>
      </p>
    </div>
  );
};

// --- Sign Up Form ---
const SignUpForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/signup', { username, email, password });
      setError('Signup successful! Please sign in.');
      setTimeout(toggleForm, 1500); // Toggle back to login form after a delay
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-text text-center mb-4">Create Account</h1>
      <OAuth />
      <p className="text-center text-textSecondary text-sm my-4">or use your email for registration</p>

      <form onSubmit={handleSubmit}>
        <Input id="signup-username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input id="signup-email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input id="signup-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className={`text-center ${error.includes('successful') ? 'text-success' : 'text-error'} text-sm min-h-[1.25rem] mb-4`}>{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Sign Up'}
        </Button>
      </form>

      <p className="text-center mt-8 text-textSecondary">
        Already have an account?{' '}
        <Button variant="link" onClick={toggleForm}>
          Sign In
        </Button>
      </p>
    </div>
  );
};

export default Auth;

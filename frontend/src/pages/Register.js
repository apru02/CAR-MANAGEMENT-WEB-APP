import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../api/auth';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await register(formData);
      login(response.authToken);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">Start your journey with us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-2 ml-1">
              Must be at least 8 characters long
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-blue-500 hover:text-[#60B6CA]">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-500 hover:text-[#60B6CA]">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium 
                     flex items-center justify-center space-x-2 hover:opacity-90 transition-all
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>{isLoading ? 'Creating account...' : 'Create account'}</span>
            {!isLoading && <FiArrowRight className="animate-bounce" />}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-[#60B6CA] font-medium">
              Sign in
            </a>
          </p>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            By creating an account, you agree to our Terms & Conditions and confirm that you have read our
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
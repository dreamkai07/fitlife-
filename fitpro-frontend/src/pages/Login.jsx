import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearError } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({
    username: '', password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Welcome back! 💪');
      navigate('/');
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error('Please fill all fields');
      return;
    }
    dispatch(loginUser(form));
  };

  return (
    <div className="min-h-screen flex items-center
      justify-center bg-background relative overflow-hidden px-4">

      {/* Background Blobs */}
      <div className="absolute top-20 left-20 w-80 h-80
        bg-primary/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-20 w-80 h-80
        bg-secondary/20 rounded-full blur-3xl animate-blob
        animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Fit<span className="text-primary">Pro</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Welcome back! Log in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2
                -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={e => setForm({
                  ...form, username: e.target.value
                })}
                className="w-full bg-slate-800/50
                  border border-slate-700 rounded-xl
                  pl-12 pr-4 py-3 text-white
                  placeholder-slate-500 focus:outline-none
                  focus:ring-2 focus:ring-primary
                  focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2
                -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({
                  ...form, password: e.target.value
                })}
                className="w-full bg-slate-800/50
                  border border-slate-700 rounded-xl
                  pl-12 pr-4 py-3 text-white
                  placeholder-slate-500 focus:outline-none
                  focus:ring-2 focus:ring-primary
                  focus:border-transparent transition-all"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-600
                text-white font-bold py-3 rounded-xl
                flex items-center justify-center gap-2
                transition-colors disabled:opacity-50
                disabled:cursor-not-allowed shadow-lg
                shadow-primary/30 mt-2"
            >
              <FiLogIn className="w-5 h-5" />
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register"
              className="text-primary font-semibold hover:underline">
              Sign Up Free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import { FiUserPlus, FiUser, FiMail, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({
    username: '', email: '', password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Account created! Welcome to FitPro! 🎉');
      navigate('/');
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      toast.error('Please fill all fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(registerUser(form));
  };

  return (
    <div className="min-h-screen flex items-center
      justify-center bg-background relative overflow-hidden px-4">

      <div className="absolute top-20 right-20 w-80 h-80
        bg-secondary/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-20 w-80 h-80
        bg-accent/10 rounded-full blur-3xl animate-blob
        animation-delay-2000" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Join <span className="text-secondary">FitPro</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Create your account and start your fitness journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2
                -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text" placeholder="Username"
                value={form.username}
                onChange={e => setForm({
                  ...form, username: e.target.value
                })}
                className="w-full bg-slate-800/50
                  border border-slate-700 rounded-xl
                  pl-12 pr-4 py-3 text-white
                  placeholder-slate-500 focus:outline-none
                  focus:ring-2 focus:ring-secondary
                  focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2
                -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email" placeholder="Email"
                value={form.email}
                onChange={e => setForm({
                  ...form, email: e.target.value
                })}
                className="w-full bg-slate-800/50
                  border border-slate-700 rounded-xl
                  pl-12 pr-4 py-3 text-white
                  placeholder-slate-500 focus:outline-none
                  focus:ring-2 focus:ring-secondary
                  focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2
                -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password" placeholder="Password"
                value={form.password}
                onChange={e => setForm({
                  ...form, password: e.target.value
                })}
                className="w-full bg-slate-800/50
                  border border-slate-700 rounded-xl
                  pl-12 pr-4 py-3 text-white
                  placeholder-slate-500 focus:outline-none
                  focus:ring-2 focus:ring-secondary
                  focus:border-transparent transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-violet-600
                text-white font-bold py-3 rounded-xl
                flex items-center justify-center gap-2
                transition-colors disabled:opacity-50
                shadow-lg shadow-secondary/30 mt-2"
            >
              <FiUserPlus className="w-5 h-5" />
              {loading ? 'Creating Account...' : 'Sign Up Free'}
            </motion.button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login"
              className="text-primary font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
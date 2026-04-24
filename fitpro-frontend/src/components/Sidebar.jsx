import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import {
  FiHome, FiActivity, FiHeart,
  FiMapPin, FiUser, FiLogOut
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const navLinks = [
  { name: 'Dashboard', icon: FiHome, path: '/' },
  { name: 'Workouts', icon: FiActivity, path: '/workouts' },
  { name: 'Diet Plan', icon: FiHeart, path: '/diet' },
  { name: 'Find Gyms', icon: FiMapPin, path: '/gyms' },
  { name: 'Profile', icon: FiUser, path: '/profile' },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out!');
    navigate('/login');
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64
      bg-surface border-r border-slate-700/50
      flex flex-col justify-between p-6 z-50">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white">
            Fit<span className="text-primary">Pro</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your Fitness Journey
          </p>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 p-3
          bg-slate-700/30 rounded-xl mb-6">
          <div className="w-9 h-9 rounded-full
            bg-gradient-to-br from-primary to-secondary
            flex items-center justify-center
            text-white font-bold text-sm">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">
              {user?.username || 'User'}
            </p>
            <p className="text-slate-500 text-xs">
              Fitness Enthusiast
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 text-sm font-semibold
                ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3
          rounded-xl text-slate-400 hover:bg-red-500/20
          hover:text-red-400 transition-all text-sm font-semibold"
      >
        <FiLogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
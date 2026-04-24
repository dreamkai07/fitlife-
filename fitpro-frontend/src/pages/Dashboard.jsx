import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fitproApi from '../api/fitproApi';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import WeeklyChart from '../components/WeeklyChart';
import { FiArrowRight } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [workoutRes, nutritionRes] = await Promise.all([
          fitproApi.get('/workouts/stats'),
          fitproApi.get('/diet/nutrition'),
        ]);
        setStats({
          ...workoutRes.data,
          ...nutritionRes.data,
        });
      } catch (err) {
        console.error('Stats error:', err);
        setStats({});
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const quickActions = [
    {
      label: 'Log Workout',
      icon: '💪',
      desc: 'Track your exercise session',
      path: '/workouts',
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-400/50',
    },
    {
      label: 'Add Meal',
      icon: '🥗',
      desc: 'Log your nutrition intake',
      path: '/diet',
      color: 'from-green-500/20 to-green-600/10 border-green-500/30 hover:border-green-400/50',
    },
    {
      label: 'Find Gym',
      icon: '🏟️',
      desc: 'Discover gyms near you',
      path: '/gyms',
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 hover:border-amber-400/50',
    },
    {
      label: 'My Profile',
      icon: '👤',
      desc: 'Update your fitness goals',
      path: '/profile',
      color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30 hover:border-violet-400/50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center
        h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary
            border-t-transparent rounded-full animate-spin
            mx-auto mb-4" />
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 space-y-8 min-h-screen bg-background"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white"
          >
            Good Morning! 👋
          </motion.h1>
          <p className="text-slate-400 mt-1">
            <span className="text-primary font-semibold">
              {user?.username || 'User'}
            </span>
            {' '}• Let's crush your goals today
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-slate-300 font-medium">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
            })}
          </p>
          <p className="text-slate-500 text-sm">
            {new Date().toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2
        lg:grid-cols-4 gap-5">
        <StatCard
          title="Calories Burned"
          value={`${stats?.todayCaloriesBurned || 0} kcal`}
          icon="🔥"
          color="amber"
        />
        <StatCard
          title="Calories Consumed"
          value={`${stats?.totalCalories || 0} kcal`}
          icon="🥗"
          color="green"
        />
        <StatCard
          title="Monthly Workouts"
          value={`${stats?.monthlyWorkouts || 0} sessions`}
          icon="💪"
          color="blue"
        />
        <StatCard
          title="Fitness Goal"
          value={user?.fitnessGoal || 'Not Set'}
          icon="🎯"
          color="violet"
        />
      </div>

      {/* Chart + Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart */}
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface rounded-2xl p-6
            border border-slate-700/50 shadow-lg"
        >
          <h3 className="text-lg font-bold text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.path)}
                className={`w-full flex items-center
                  justify-between p-4 rounded-xl border
                  bg-gradient-to-r transition-all
                  duration-200 ${action.color}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">
                      {action.label}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {action.desc}
                    </p>
                  </div>
                </div>
                <FiArrowRight className="text-slate-500 w-4 h-4
                  flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
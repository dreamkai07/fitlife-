import { motion } from 'framer-motion';

const colorMap = {
  blue:   'from-blue-500 to-blue-700 shadow-blue-500/20',
  violet: 'from-violet-500 to-violet-700 shadow-violet-500/20',
  amber:  'from-amber-400 to-amber-600 shadow-amber-500/20',
  green:  'from-green-400 to-green-600 shadow-green-500/20',
  red:    'from-red-400 to-red-600 shadow-red-500/20',
};

const StatCard = ({ title, value, icon, color = 'blue' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ duration: 0.4 }}
      className="bg-surface p-6 rounded-2xl
        border border-slate-700/50 shadow-lg
        flex items-center gap-5
        hover:border-slate-600 transition-all
        hover:shadow-xl cursor-default"
    >
      <div className={`w-14 h-14 rounded-xl flex
        items-center justify-center text-2xl
        bg-gradient-to-br shadow-lg
        flex-shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400 font-medium">
          {title}
        </p>
        <p className="text-2xl font-bold text-white mt-1">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
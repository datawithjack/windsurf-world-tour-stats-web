import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
}

const FeatureCard = ({ title, children, isLoading = false }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/60 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
        </div>
      ) : (
        <div className="text-white">{children}</div>
      )}
    </motion.div>
  );
};

export default FeatureCard;

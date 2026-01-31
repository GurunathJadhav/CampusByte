import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

const StatCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-primary-600',
  iconBgColor = 'bg-primary-100 dark:bg-primary-900/30',
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive && <TrendingUp className="w-4 h-4 text-green-500" />}
              {isNegative && <TrendingDown className="w-4 h-4 text-red-500" />}
              <span
                className={`text-sm font-medium ${
                  isPositive
                    ? 'text-green-600 dark:text-green-400'
                    : isNegative
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-500'
                }`}
              >
                {isPositive ? '+' : ''}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-slate-500 dark:text-slate-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${iconBgColor}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}
      </div>
      {/* Decorative gradient */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-2xl" />
    </Card>
  );
};

export default StatCard;

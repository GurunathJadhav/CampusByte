const variants = {
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  gray: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
};

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  dot = false,
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `.trim()}
      {...props}
    >
      {dot && (
        <span
          className={`
            w-1.5 h-1.5 rounded-full
            ${variant === 'success' ? 'bg-green-500' : ''}
            ${variant === 'warning' ? 'bg-amber-500' : ''}
            ${variant === 'danger' ? 'bg-red-500' : ''}
            ${variant === 'primary' ? 'bg-primary-500' : ''}
            ${variant === 'secondary' ? 'bg-secondary-500' : ''}
            ${variant === 'info' ? 'bg-blue-500' : ''}
            ${variant === 'gray' ? 'bg-slate-500' : ''}
          `}
        />
      )}
      {children}
    </span>
  );
};

// Helper function to get status badge
export const getStatusBadge = (status) => {
  const statusMap = {
    ACTIVE: { variant: 'success', label: 'Active' },
    INACTIVE: { variant: 'gray', label: 'Inactive' },
    PENDING: { variant: 'warning', label: 'Pending' },
    SUSPENDED: { variant: 'danger', label: 'Suspended' },
    PRESENT: { variant: 'success', label: 'Present' },
    ABSENT: { variant: 'danger', label: 'Absent' },
    LATE: { variant: 'warning', label: 'Late' },
    EXCUSED: { variant: 'info', label: 'Excused' },
  };

  const config = statusMap[status] || { variant: 'gray', label: status };
  return <Badge variant={config.variant} dot>{config.label}</Badge>;
};

export default Badge;

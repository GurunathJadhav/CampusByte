const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-2xl
        border border-slate-200 dark:border-slate-700
        shadow-sm
        p-6
        transition-all duration-200
        ${hover ? 'hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-0.5 cursor-pointer' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-slate-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
export default Card;

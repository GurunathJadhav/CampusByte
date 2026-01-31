import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  placeholder = 'Select an option',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 pr-10
            bg-white dark:bg-slate-800
            border rounded-xl
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
            transition-all duration-200
            appearance-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error 
              ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
              : 'border-slate-300 dark:border-slate-600'
            }
            ${className}
          `.trim()}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>
      {(error || helperText) && (
        <p className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

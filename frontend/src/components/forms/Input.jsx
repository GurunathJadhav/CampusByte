import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <LeftIcon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`
            w-full px-4 py-3
            ${LeftIcon ? 'pl-11' : ''}
            ${RightIcon || isPassword ? 'pr-11' : ''}
            bg-white dark:bg-slate-800
            border rounded-xl
            text-slate-900 dark:text-white
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error 
              ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
              : 'border-slate-300 dark:border-slate-600'
            }
            ${className}
          `.trim()}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        {RightIcon && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <RightIcon className="w-5 h-5" />
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

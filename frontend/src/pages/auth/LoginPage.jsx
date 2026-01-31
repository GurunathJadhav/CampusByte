import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import { login, clearError } from '../../store/slices/authSlice';
import { addToast } from '../../store/slices/uiSlice';
import Button from '../../components/common/Button';
import Input from '../../components/forms/Input';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      dispatch(addToast({ type: 'success', message: 'Login successful!' }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err || 'Login failed' }));
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome back
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Sign in to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          leftIcon={Mail}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          leftIcon={Lock}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" loading={isLoading}>
          Sign In
        </Button>
      </form>

      <p className="text-center mt-6 text-slate-600 dark:text-slate-400">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Create account
        </Link>
      </p>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <p><strong>Admin:</strong> admin@campusbyte.edu / Admin@123</p>
          <p><strong>Faculty:</strong> faculty@campusbyte.edu / Faculty@123</p>
          <p><strong>Student:</strong> student@campusbyte.edu / Student@123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

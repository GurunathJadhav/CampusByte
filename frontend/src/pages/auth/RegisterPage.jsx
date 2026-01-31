import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User } from 'lucide-react';
import { register as registerUser } from '../../store/slices/authSlice';
import { addToast } from '../../store/slices/uiSlice';
import Button from '../../components/common/Button';
import Input from '../../components/forms/Input';
import Select from '../../components/forms/Select';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
  });

  const password = watch('password');

  const roleOptions = [
    { value: 'STUDENT', label: 'Student' },
    { value: 'FACULTY', label: 'Faculty' },
  ];

  const onSubmit = async (data) => {
    const { confirmPassword, ...submitData } = data;
    try {
      await dispatch(registerUser(submitData)).unwrap();
      dispatch(addToast({ type: 'success', message: 'Registration successful!' }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err || 'Registration failed' }));
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Create an account
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Join CampusByte to get started
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            leftIcon={User}
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'Must be at least 2 characters',
              },
            })}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Must be at least 2 characters',
              },
            })}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
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

        <Select
          label="Role"
          options={roleOptions}
          placeholder="Select your role"
          error={errors.role?.message}
          {...register('role', { required: 'Role is required' })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          leftIcon={Lock}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              message: 'Must include uppercase, lowercase, number, and special character',
            },
          })}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          leftIcon={Lock}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" loading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="text-center mt-6 text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

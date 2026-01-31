import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import { authService } from '../../services';
import Button from '../../components/common/Button';
import Input from '../../components/forms/Input';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(data.email);
      setIsSubmitted(true);
      dispatch(addToast({ type: 'success', message: 'Password reset link sent!' }));
    } catch (error) {
      dispatch(
        addToast({
          type: 'error',
          message: error.response?.data?.message || 'Failed to send reset link',
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Check your email
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          We've sent password reset instructions to your email address.
        </p>
        <Link to="/login">
          <Button variant="secondary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Forgot password?
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          No worries, we'll send you reset instructions.
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

        <Button type="submit" className="w-full" loading={isLoading}>
          Send Reset Link
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

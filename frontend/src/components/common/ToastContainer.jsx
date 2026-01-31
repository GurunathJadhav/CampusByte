import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { removeToast } from '../../store/slices/uiSlice';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

const Toast = ({ toast }) => {
  const dispatch = useDispatch();
  const Icon = icons[toast.type] || icons.info;

  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [dispatch, toast.id, toast.duration]);

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border shadow-lg
        animate-slide-up
        ${colors[toast.type] || colors.info}
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[toast.type]}`} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-semibold">{toast.title}</p>
        )}
        <p className="text-sm">{toast.message}</p>
      </div>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="flex-shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const toasts = useSelector((state) => state.ui.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)]">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;

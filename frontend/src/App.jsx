import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

// Toast Container
import ToastContainer from './components/common/ToastContainer';

// Dashboard Router - routes based on user role
const DashboardRouter = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || 'STUDENT';

  switch (role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'FACULTY':
      return <FacultyDashboard />;
    case 'STUDENT':
    default:
      return <StudentDashboard />;
  }
};

// Placeholder component for routes not yet implemented
const ComingSoon = ({ title }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400">This feature is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/students" element={<ComingSoon title="Student Management" />} />
          <Route path="/faculty" element={<ComingSoon title="Faculty Management" />} />
          <Route path="/subjects" element={<ComingSoon title="Subject Management" />} />
          <Route path="/attendance" element={<ComingSoon title="Attendance Management" />} />
          <Route path="/reports" element={<ComingSoon title="Reports" />} />
          <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
          <Route path="/users" element={<ComingSoon title="User Management" />} />
          <Route path="/profile" element={<ComingSoon title="Profile" />} />
          <Route path="/notifications" element={<ComingSoon title="Notifications" />} />
          <Route path="/settings" element={<ComingSoon title="Settings" />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

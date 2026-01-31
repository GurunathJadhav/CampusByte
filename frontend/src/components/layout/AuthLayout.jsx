import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GraduationCap, BookOpen, Users, CalendarCheck } from 'lucide-react';

const AuthLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full w-full max-w-lg mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CB</span>
            </div>
            <span className="text-2xl font-bold text-white">CampusByte</span>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                Enterprise Student Database Management
              </h1>
              <p className="text-white/80 text-lg">
                Streamline academic operations with our comprehensive platform for managing students, faculty, and attendance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: GraduationCap, label: 'Student Management' },
                { icon: Users, label: 'Faculty Portal' },
                { icon: BookOpen, label: 'Course Tracking' },
                { icon: CalendarCheck, label: 'Attendance System' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-lg rounded-xl"
                >
                  <feature.icon className="w-6 h-6 text-white" />
                  <span className="text-white font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/60 text-sm">
            © 2026 CampusByte. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">CB</span>
            </div>
            <span className="text-2xl font-bold gradient-text">CampusByte</span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

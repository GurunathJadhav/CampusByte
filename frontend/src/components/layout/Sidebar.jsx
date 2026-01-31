import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
  { path: '/students', label: 'Students', icon: GraduationCap, roles: ['ADMIN', 'FACULTY'] },
  { path: '/faculty', label: 'Faculty', icon: Users, roles: ['ADMIN'] },
  { path: '/subjects', label: 'Subjects', icon: BookOpen, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
  { path: '/attendance', label: 'Attendance', icon: CalendarCheck, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
  { path: '/reports', label: 'Reports', icon: BarChart3, roles: ['ADMIN', 'FACULTY'] },
  { path: '/settings', label: 'Settings', icon: Settings, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || 'STUDENT';

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole));

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen
        bg-white dark:bg-slate-800
        border-r border-slate-200 dark:border-slate-700
        transition-all duration-300 ease-in-out
        z-40
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
        <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">CB</span>
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-xl gradient-text">CampusByte</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${sidebarCollapsed ? 'justify-center px-2' : ''}`
            }
            title={sidebarCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className={`
              sidebar-link text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20
              ${sidebarCollapsed ? 'justify-center px-2 w-full' : 'flex-1'}
            `}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
          {!sidebarCollapsed && (
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>
          )}
          {sidebarCollapsed && (
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

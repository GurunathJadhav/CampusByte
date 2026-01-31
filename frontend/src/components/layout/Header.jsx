import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { toggleDarkMode, toggleSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { Avatar } from '../common/Avatar';

const Header = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New student registered', time: '5 min ago', unread: true },
    { id: 2, title: 'Attendance report generated', time: '1 hour ago', unread: true },
    { id: 3, title: 'System maintenance scheduled', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl px-4 py-2 w-80">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, courses..."
            className="bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 animate-fade-in">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                      notification.unread ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                    }`}
                  >
                    <p className="text-sm text-slate-900 dark:text-white">{notification.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700">
                <Link
                  to="/notifications"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <Avatar name={user?.firstName + ' ' + user?.lastName} size="sm" />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <p className="font-medium text-slate-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </Link>
              <div className="border-t border-slate-100 dark:border-slate-700 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

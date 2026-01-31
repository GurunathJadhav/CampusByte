import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  AlertTriangle,
  Clock,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

// Mock data
const attendanceData = [
  { name: 'Mon', attendance: 92 },
  { name: 'Tue', attendance: 88 },
  { name: 'Wed', attendance: 95 },
  { name: 'Thu', attendance: 90 },
  { name: 'Fri', attendance: 85 },
  { name: 'Sat', attendance: 78 },
];

const departmentData = [
  { name: 'Computer Science', value: 350, color: '#3B82F6' },
  { name: 'Electrical', value: 280, color: '#8B5CF6' },
  { name: 'Mechanical', value: 220, color: '#10B981' },
  { name: 'Civil', value: 180, color: '#F59E0B' },
  { name: 'Others', value: 120, color: '#6B7280' },
];

const enrollmentTrend = [
  { month: 'Jan', students: 1200 },
  { month: 'Feb', students: 1350 },
  { month: 'Mar', students: 1280 },
  { month: 'Apr', students: 1420 },
  { month: 'May', students: 1380 },
  { month: 'Jun', students: 1500 },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Marked attendance for CS101', time: '2 min ago' },
  { id: 2, user: 'Jane Smith', action: 'Registered for new course', time: '5 min ago' },
  { id: 3, user: 'Mike Johnson', action: 'Updated profile information', time: '10 min ago' },
  { id: 4, user: 'Sarah Williams', action: 'Submitted leave request', time: '15 min ago' },
];

const lowAttendanceStudents = [
  { id: 1, name: 'Alex Turner', department: 'CS', attendance: 62, status: 'warning' },
  { id: 2, name: 'Emma Watson', department: 'EE', attendance: 58, status: 'danger' },
  { id: 3, name: 'Chris Evans', department: 'ME', attendance: 65, status: 'warning' },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="2,847"
          change={12.5}
          changeLabel="vs last month"
          icon={GraduationCap}
          iconColor="text-primary-600 dark:text-primary-400"
          iconBgColor="bg-primary-100 dark:bg-primary-900/30"
        />
        <StatCard
          title="Total Faculty"
          value="156"
          change={3.2}
          changeLabel="vs last month"
          icon={Users}
          iconColor="text-secondary-600 dark:text-secondary-400"
          iconBgColor="bg-secondary-100 dark:bg-secondary-900/30"
        />
        <StatCard
          title="Active Courses"
          value="48"
          change={8.1}
          changeLabel="vs last semester"
          icon={BookOpen}
          iconColor="text-accent-600 dark:text-accent-400"
          iconBgColor="bg-accent-100 dark:bg-accent-900/30"
        />
        <StatCard
          title="Avg Attendance"
          value="87.5%"
          change={-2.3}
          changeLabel="vs last week"
          icon={CalendarCheck}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBgColor="bg-amber-100 dark:bg-amber-900/30"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="name" className="text-slate-500" />
                  <YAxis domain={[70, 100]} className="text-slate-500" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgb(30, 41, 59)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Students by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgb(30, 41, 59)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Trend & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="month" className="text-slate-500" />
                  <YAxis className="text-slate-500" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgb(30, 41, 59)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Bar dataKey="students" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Activity className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar name={activity.user} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-white truncate">
                      <span className="font-medium">{activity.user}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Attendance Alert */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <CardTitle>Low Attendance Alert</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lowAttendanceStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} size="sm" />
                        <span className="font-medium text-slate-900 dark:text-white">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-slate-600 dark:text-slate-400">{student.department}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              student.attendance < 60 ? 'bg-red-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{student.attendance}%</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={student.status === 'danger' ? 'danger' : 'warning'}>
                        {student.status === 'danger' ? 'Critical' : 'Warning'}
                      </Badge>
                    </td>
                    <td>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

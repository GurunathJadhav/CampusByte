import { useSelector } from 'react-redux';
import {
  BookOpen,
  CalendarCheck,
  Award,
  Clock,
  AlertTriangle,
  FileText,
  Calendar,
  MapPin,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

// Mock data
const enrolledCourses = [
  { id: 1, code: 'CS101', name: 'Introduction to Programming', instructor: 'Dr. John Smith', credits: 4, time: 'Mon, Wed 10:00 AM', room: 'Room 101' },
  { id: 2, code: 'CS201', name: 'Data Structures', instructor: 'Prof. Jane Doe', credits: 4, time: 'Tue, Thu 2:00 PM', room: 'Lab 3' },
  { id: 3, code: 'MATH101', name: 'Calculus I', instructor: 'Dr. Mike Johnson', credits: 3, time: 'Mon, Fri 11:00 AM', room: 'Room 205' },
  { id: 4, code: 'ENG101', name: 'Technical Writing', instructor: 'Prof. Sarah Williams', credits: 2, time: 'Wed 3:00 PM', room: 'Room 302' },
];

const attendanceData = [
  { subject: 'CS101', attended: 28, total: 30, percentage: 93 },
  { subject: 'CS201', attended: 24, total: 28, percentage: 86 },
  { subject: 'MATH101', attended: 22, total: 30, percentage: 73 },
  { subject: 'ENG101', attended: 14, total: 15, percentage: 93 },
];

const attendanceTrend = [
  { week: 'W1', attendance: 95 },
  { week: 'W2', attendance: 90 },
  { week: 'W3', attendance: 85 },
  { week: 'W4', attendance: 88 },
  { week: 'W5', attendance: 92 },
  { week: 'W6', attendance: 87 },
];

const upcomingDeadlines = [
  { id: 1, title: 'CS101 Assignment 3', date: 'Feb 5, 2026', type: 'assignment' },
  { id: 2, title: 'CS201 Mid-term Exam', date: 'Feb 10, 2026', type: 'exam' },
  { id: 3, title: 'MATH101 Quiz 4', date: 'Feb 12, 2026', type: 'quiz' },
  { id: 4, title: 'ENG101 Essay Submission', date: 'Feb 15, 2026', type: 'assignment' },
];

const grades = [
  { subject: 'CS101', grade: 'A', marks: 92 },
  { subject: 'CS201', grade: 'B+', marks: 85 },
  { subject: 'MATH101', grade: 'B', marks: 78 },
  { subject: 'ENG101', grade: 'A-', marks: 88 },
];

const todaySchedule = [
  { time: '10:00 AM', course: 'CS101', room: 'Room 101', instructor: 'Dr. John Smith' },
  { time: '2:00 PM', course: 'CS201', room: 'Lab 3', instructor: 'Prof. Jane Doe' },
];

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const overallAttendance = Math.round(
    attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length
  );
  const lowAttendanceSubjects = attendanceData.filter((a) => a.percentage < 75);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white border-0">
        <CardContent className="py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {user?.firstName || 'Student'}! 👋
              </h2>
              <p className="text-white/80">
                You have {todaySchedule.length} classes today. Keep up the great work!
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">3.65</p>
                <p className="text-sm text-white/80">Current GPA</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-bold">{overallAttendance}%</p>
                <p className="text-sm text-white/80">Attendance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Enrolled Courses"
          value={enrolledCourses.length.toString()}
          icon={BookOpen}
          iconColor="text-primary-600 dark:text-primary-400"
          iconBgColor="bg-primary-100 dark:bg-primary-900/30"
        />
        <StatCard
          title="Overall Attendance"
          value={`${overallAttendance}%`}
          change={overallAttendance >= 75 ? 2.1 : -3.5}
          icon={CalendarCheck}
          iconColor={overallAttendance >= 75 ? 'text-green-600' : 'text-amber-600'}
          iconBgColor={overallAttendance >= 75 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}
        />
        <StatCard
          title="Current CGPA"
          value="3.65"
          change={5.2}
          changeLabel="improvement"
          icon={Award}
          iconColor="text-secondary-600 dark:text-secondary-400"
          iconBgColor="bg-secondary-100 dark:bg-secondary-900/30"
        />
        <StatCard
          title="Pending Tasks"
          value={upcomingDeadlines.length.toString()}
          icon={FileText}
          iconColor="text-accent-600 dark:text-accent-400"
          iconBgColor="bg-accent-100 dark:bg-accent-900/30"
        />
      </div>

      {/* Low Attendance Warning */}
      {lowAttendanceSubjects.length > 0 && (
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="py-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                  Low Attendance Warning
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  Your attendance in{' '}
                  <span className="font-medium">
                    {lowAttendanceSubjects.map((s) => s.subject).join(', ')}
                  </span>{' '}
                  is below 75%. Please improve your attendance to avoid academic penalties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Schedule & Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-500" />
              <CardTitle>Today's Classes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((cls, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-l-4 border-primary-500"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{cls.course}</span>
                    <Badge variant="primary">{cls.time}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {cls.room}
                    </span>
                    <span>{cls.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrend}>
                  <defs>
                    <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="week" className="text-slate-500" />
                  <YAxis domain={[70, 100]} className="text-slate-500" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgb(30, 41, 59)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#attendanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses & Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((subject) => (
                <div key={subject.subject} className="flex items-center gap-4">
                  <span className="w-20 font-medium text-slate-900 dark:text-white">
                    {subject.subject}
                  </span>
                  <div className="flex-1">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          subject.percentage >= 75
                            ? 'bg-green-500'
                            : subject.percentage >= 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      subject.percentage >= 75
                        ? 'text-green-600 dark:text-green-400'
                        : subject.percentage >= 60
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {subject.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grades */}
        <Card>
          <CardHeader>
            <CardTitle>Current Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grades.map((grade) => (
                <div
                  key={grade.subject}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{grade.subject}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{grade.marks} / 100</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        grade.grade.startsWith('A')
                          ? 'success'
                          : grade.grade.startsWith('B')
                          ? 'primary'
                          : 'warning'
                      }
                      size="md"
                    >
                      {grade.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  {deadline.type === 'exam' ? (
                    <FileText className="w-5 h-5 text-red-500" />
                  ) : deadline.type === 'quiz' ? (
                    <FileText className="w-5 h-5 text-amber-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-primary-500" />
                  )}
                  <Badge
                    variant={
                      deadline.type === 'exam'
                        ? 'danger'
                        : deadline.type === 'quiz'
                        ? 'warning'
                        : 'primary'
                    }
                  >
                    {deadline.type}
                  </Badge>
                </div>
                <p className="font-medium text-slate-900 dark:text-white truncate">
                  {deadline.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-2">
                  <Calendar className="w-4 h-4" />
                  {deadline.date}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

import {
  BookOpen,
  Users,
  CalendarCheck,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

// Mock data
const assignedCourses = [
  { id: 1, code: 'CS101', name: 'Introduction to Programming', students: 45, time: 'Mon, Wed 10:00 AM' },
  { id: 2, code: 'CS201', name: 'Data Structures', students: 38, time: 'Tue, Thu 2:00 PM' },
  { id: 3, code: 'CS301', name: 'Algorithms', students: 32, time: 'Mon, Fri 11:00 AM' },
];

const weeklySchedule = [
  { day: 'Monday', classes: [{ time: '10:00 AM', course: 'CS101', room: 'Room 101' }, { time: '11:00 AM', course: 'CS301', room: 'Room 205' }] },
  { day: 'Tuesday', classes: [{ time: '2:00 PM', course: 'CS201', room: 'Lab 3' }] },
  { day: 'Wednesday', classes: [{ time: '10:00 AM', course: 'CS101', room: 'Room 101' }] },
  { day: 'Thursday', classes: [{ time: '2:00 PM', course: 'CS201', room: 'Lab 3' }] },
  { day: 'Friday', classes: [{ time: '11:00 AM', course: 'CS301', room: 'Room 205' }] },
];

const attendanceTrend = [
  { date: 'Week 1', CS101: 94, CS201: 88, CS301: 92 },
  { date: 'Week 2', CS101: 91, CS201: 85, CS301: 90 },
  { date: 'Week 3', CS101: 88, CS201: 90, CS301: 88 },
  { date: 'Week 4', CS101: 92, CS201: 87, CS301: 91 },
];

const coursePerformance = [
  { grade: 'A', count: 15 },
  { grade: 'B', count: 25 },
  { grade: 'C', count: 18 },
  { grade: 'D', count: 8 },
  { grade: 'F', count: 2 },
];

const topStudents = [
  { id: 1, name: 'Alice Johnson', grade: 'A+', attendance: 98 },
  { id: 2, name: 'Bob Smith', grade: 'A', attendance: 95 },
  { id: 3, name: 'Charlie Brown', grade: 'A', attendance: 92 },
];

const atRiskStudents = [
  { id: 1, name: 'David Wilson', attendance: 62, grade: 'D' },
  { id: 2, name: 'Eva Martinez', attendance: 58, grade: 'C' },
];

const FacultyDashboard = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = weeklySchedule.find((d) => d.day === today)?.classes || [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Courses"
          value="3"
          icon={BookOpen}
          iconColor="text-primary-600 dark:text-primary-400"
          iconBgColor="bg-primary-100 dark:bg-primary-900/30"
        />
        <StatCard
          title="Total Students"
          value="115"
          change={5.2}
          changeLabel="this semester"
          icon={Users}
          iconColor="text-secondary-600 dark:text-secondary-400"
          iconBgColor="bg-secondary-100 dark:bg-secondary-900/30"
        />
        <StatCard
          title="Avg Attendance"
          value="89.3%"
          change={2.1}
          changeLabel="vs last week"
          icon={CalendarCheck}
          iconColor="text-accent-600 dark:text-accent-400"
          iconBgColor="bg-accent-100 dark:bg-accent-900/30"
        />
        <StatCard
          title="Classes Today"
          value={todaySchedule.length.toString()}
          icon={Clock}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBgColor="bg-amber-100 dark:bg-amber-900/30"
        />
      </div>

      {/* Today's Schedule & Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {todaySchedule.length > 0 ? (
              <div className="space-y-4">
                {todaySchedule.map((cls, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white">{cls.course}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {cls.time} • {cls.room}
                      </p>
                    </div>
                    <Button size="sm">Mark Attendance</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-slate-600 dark:text-slate-400">No classes scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assigned Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Assigned Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {course.code} - {course.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {course.students} students • {course.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      View Students
                    </Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Trend & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Class Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="date" className="text-slate-500" />
                  <YAxis domain={[80, 100]} className="text-slate-500" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgb(30, 41, 59)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Line type="monotone" dataKey="CS101" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="CS201" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="CS301" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">CS101</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">CS201</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">CS301</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution (CS101)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coursePerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="grade" className="text-slate-500" />
                  <YAxis className="text-slate-500" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgb(30, 41, 59)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top & At-Risk Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <CardTitle>Top Performers</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={student.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <Avatar name={student.name} size="md" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Attendance: {student.attendance}%
                    </p>
                  </div>
                  <Badge variant="success">{student.grade}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* At-Risk Students */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <CardTitle>At-Risk Students</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atRiskStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
                >
                  <Avatar name={student.name} size="md" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-red-600 dark:text-red-400">
                        Attendance: {student.attendance}%
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Grade: {student.grade}
                      </span>
                    </div>
                  </div>
                  <Button variant="danger" size="sm">
                    Contact
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;

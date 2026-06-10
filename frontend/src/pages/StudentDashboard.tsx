import React from 'react';
import { useStudents } from '../context/StudentContext';
import { Users, BookOpen, Star, Clock, AlertTriangle, ArrowRight, GraduationCap } from 'lucide-react';

interface StudentDashboardProps {
  setCurrentPage: (page: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ setCurrentPage }) => {
  const { students, courses } = useStudents();

  // Calculations
  const totalStudents = students.length;
  const totalCourses = courses.length;
  
  const avgGpa = totalStudents > 0
    ? (students.reduce((acc, s) => acc + s.gpa, 0) / totalStudents).toFixed(2)
    : '0.00';

  const avgAttendance = totalStudents > 0
    ? Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / totalStudents)
    : 0;

  // Find students with low attendance (< 80) or low GPA (< 3.0)
  const alertStudents = students.filter(s => s.attendanceRate < 80 || s.gpa < 3.0);

  // Top Performing Students
  const topStudents = [...students]
    .sort((a, b) => b.gpa - a.gpa)
    .slice(0, 3);

  // Major distribution
  const majorDistribution = students.reduce((acc: { [key: string]: number }, student) => {
    acc[student.major] = (acc[student.major] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-650/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Academic Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time stats, warning flags, and departmental analytics.</p>
        </div>
        <button
          onClick={() => setCurrentPage('roster')}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-505 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/10"
        >
          View Full Roster
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric 1 */}
        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enrollment</p>
            <h3 className="text-3xl font-bold text-white mt-1">{totalStudents}</h3>
            <span className="text-[10px] text-emerald-400 mt-1 block">Active Student Profiles</span>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Courses</p>
            <h3 className="text-3xl font-bold text-white mt-1">{totalCourses}</h3>
            <span className="text-[10px] text-indigo-400 mt-1 block" onClick={() => setCurrentPage('courses')}>Manage Syllabus</span>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average GPA</p>
            <h3 className="text-3xl font-bold text-white mt-1">{avgGpa} / 4.0</h3>
            <span className="text-[10px] text-yellow-400 mt-1 block">Academic Performance</span>
          </div>
          <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400 border border-yellow-500/20">
            <Star className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Attendance Rate</p>
            <h3 className="text-3xl font-bold text-white mt-1">{avgAttendance}%</h3>
            <span className="text-[10px] text-emerald-400 mt-1 block">Classroom Engagement</span>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Grid: Alert Students & Top Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Academic Flags / Alerts */}
        <div className="lg:col-span-2 glass rounded-2xl border border-slate-900 flex flex-col">
          <div className="p-6 border-b border-slate-900 bg-slate-900/30 flex justify-between items-center">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Academic Warning Flags
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {alertStudents.length} Flagged
            </span>
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[300px]">
            {alertStudents.length === 0 ? (
              <div className="text-center text-slate-500 py-10">No academic or attendance warnings flags detected.</div>
            ) : (
              <div className="space-y-4">
                {alertStudents.map(student => (
                  <div key={student.id} className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-slate-850">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{student.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{student.major} &bull; {student.rollNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      {student.gpa < 3.0 && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-red-500/15 text-red-400 border border-red-500/20">
                          GPA: {student.gpa}
                        </span>
                      )}
                      {student.attendanceRate < 80 && (
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/20">
                          Attendance: {student.attendanceRate}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Performers */}
        <div className="glass rounded-2xl border border-slate-900 flex flex-col">
          <div className="p-6 border-b border-slate-900 bg-slate-900/30">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-400" />
              Top Scholars
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center gap-4">
            {topStudents.map((student, idx) => (
              <div key={student.id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-sm">
                  #{idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-white">{student.name}</h4>
                  <p className="text-xs text-slate-400">{student.major}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-indigo-300">{student.gpa.toFixed(2)}</span>
                  <p className="text-[10px] text-slate-500">GPA</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Major breakdowns */}
      <div className="glass rounded-2xl border border-slate-900 p-6 mt-8">
        <h3 className="font-bold text-lg text-white mb-6">Enrollment by Major / Department</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(majorDistribution).map(([major, count]) => {
            const pct = Math.round((count / totalStudents) * 100);
            return (
              <div key={major} className="p-4 bg-slate-900/40 rounded-xl border border-slate-850">
                <h5 className="font-semibold text-sm text-slate-300 truncate">{major}</h5>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-2xl font-bold text-white">{count}</span>
                  <span className="text-xs text-slate-400">{pct}% Load</span>
                </div>
                <div className="w-full bg-slate-850 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-550 h-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

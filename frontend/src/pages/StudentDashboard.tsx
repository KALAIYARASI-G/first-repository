import React from 'react';
import { useStudents } from '../context/StudentContext';
import { Users, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

interface StudentDashboardProps {
  setCurrentPage: (page: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ setCurrentPage }) => {
  const { students, loading } = useStudents();

  // Metrics
  const totalStudents = students.length;

  // Extract unique courses
  const uniqueCourses = Array.from(new Set(students.map(s => s.course).filter(Boolean)));
  const totalCourses = uniqueCourses.length;

  // Department / Course distribution
  const courseDistribution = students.reduce((acc: { [key: string]: number }, student) => {
    if (student.course) {
      acc[student.course] = (acc[student.course] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-650/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Academic Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time statistics connected to PostgreSQL database backend.</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enrollment</p>
            <h3 className="text-3xl font-bold text-white mt-1">{loading ? '...' : totalStudents}</h3>
            <span className="text-[10px] text-emerald-400 mt-1 block">Active Student Profiles</span>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Programs</p>
            <h3 className="text-3xl font-bold text-white mt-1">{loading ? '...' : totalCourses}</h3>
            <span className="text-[10px] text-indigo-400 mt-1 block">Registered syllabus fields</span>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Grid: Course distributions & roster preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Roster Preview */}
        <div className="lg:col-span-2 glass rounded-2xl border border-slate-900 flex flex-col">
          <div className="p-6 border-b border-slate-900 bg-slate-900/30 flex justify-between items-center">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-400" />
              Recent Registrations
            </h2>
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[300px]">
            {loading ? (
              <div className="text-slate-500 text-center py-6">Loading data...</div>
            ) : students.length === 0 ? (
              <div className="text-center text-slate-500 py-10">No students registered yet.</div>
            ) : (
              <div className="space-y-4">
                {students.slice(0, 5).map(student => (
                  <div key={student.id} className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-slate-850">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{student.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{student.email} &bull; {student.phone}</p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                      {student.course}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Academic program load chart/overview */}
        <div className="glass rounded-2xl border border-slate-900 p-6 flex flex-col">
          <h3 className="font-bold text-lg text-white mb-6">Program Load</h3>
          {loading ? (
            <div className="text-slate-500 text-center flex-1 flex items-center justify-center">Loading distributions...</div>
          ) : Object.keys(courseDistribution).length === 0 ? (
            <div className="text-slate-500 text-center flex-1 flex items-center justify-center">No assignments.</div>
          ) : (
            <div className="space-y-4 flex-1 overflow-y-auto">
              {Object.entries(courseDistribution).map(([course, count]) => {
                const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
                return (
                  <div key={course} className="p-3 bg-slate-900/40 rounded-xl border border-slate-850">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{course}</span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-indigo-500 h-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

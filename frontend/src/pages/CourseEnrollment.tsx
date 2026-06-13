import React from 'react';
import { useStudents } from '../context/StudentContext';
import { BookOpen, HelpCircle } from 'lucide-react';

export const CourseEnrollment: React.FC = () => {
  const { students, loading } = useStudents();
  
  // Extract unique courses and student counts
  const courseCounts = students.reduce((acc: { [key: string]: number }, student) => {
    if (student.course) {
      acc[student.course] = (acc[student.course] || 0) + 1;
    }
    return acc;
  }, {});

  const courseList = Object.entries(courseCounts).map(([name, count]) => ({
    name,
    count,
    code: name.split(' ').map(w => w[0]).join('').toUpperCase() + '-101'
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Course Syllabus Programs</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of registered courses and dynamic database student counts.</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading programs database...</div>
      ) : courseList.length === 0 ? (
        <div className="glass rounded-2xl border border-slate-900 p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-slate-650" />
          <span>No students enrolled in any courses yet. Register students and assign tracks.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course, idx) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl border border-slate-900 hover:border-slate-800 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-indigo-400 font-semibold">{course.code}</span>
                  <h4 className="font-bold text-white text-lg mt-1">{course.name}</h4>
                  <p className="text-xs text-slate-450 mt-1">EduPortal Academic Syllabus</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {course.count} Active
                </span>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" /> Core Curriculum
                </span>
                <span>3 Credits</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

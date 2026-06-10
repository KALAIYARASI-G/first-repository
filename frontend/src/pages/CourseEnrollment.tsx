import React, { useState } from 'react';
import { useStudents } from '../context/StudentContext';
import { BookOpen, UserMinus, Plus } from 'lucide-react';

export const CourseEnrollment: React.FC = () => {
  const { students, courses, enrollInCourse, unenrollFromCourse } = useStudents();
  
  // Selected course context
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  // Filter students who are in the selected course
  const enrolledStudents = students.filter(student =>
    student.enrolledCourses.includes(selectedCourseId)
  );

  // Filter students who are NOT in the selected course (and are eligible to join)
  const nonEnrolledStudents = students.filter(student =>
    student.status === 'Active' && !student.enrolledCourses.includes(selectedCourseId)
  );

  const handleEnroll = (studentId: string) => {
    enrollInCourse(studentId, selectedCourseId);
    setIsEnrollModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Course Syllabus & Enrollment</h1>
        <p className="text-slate-400 text-sm mt-1">Assign academic courses, enroll student units, and manage lecture rosters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Course List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Available Courses</h3>
          {courses.map(course => {
            const isActive = course.id === selectedCourseId;
            const count = students.filter(s => s.enrolledCourses.includes(course.id)).length;
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isActive
                    ? 'glass border-indigo-500/25 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs text-indigo-400 font-semibold">{course.code}</span>
                    <h4 className="font-bold text-white text-base mt-1">{course.name}</h4>
                    <p className="text-xs text-slate-450 mt-1">{course.instructor}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/60 text-slate-350 border border-slate-850">
                    {count} Enrolled
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-900 text-xs text-slate-500">
                  <span>Dept: {course.department}</span>
                  <span>Credits: {course.credits}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Enrolled Students */}
        <div className="lg:col-span-2 flex flex-col">
          {selectedCourse ? (
            <div className="glass rounded-2xl border border-slate-900 flex-1 flex flex-col">
              <div className="p-6 border-b border-slate-900 bg-slate-900/30 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <span className="font-mono text-xs text-indigo-400 font-bold">{selectedCourse.code}</span>
                  <h2 className="font-bold text-xl text-white mt-1">{selectedCourse.name}</h2>
                  <p className="text-xs text-slate-400 mt-1">Instructor: {selectedCourse.instructor}</p>
                </div>
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  disabled={nonEnrolledStudents.length === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    nonEnrolledStudents.length === 0
                      ? 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-850'
                      : 'bg-indigo-650 hover:bg-indigo-505 text-white shadow-lg hover:shadow-indigo-500/10'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  Enroll Student
                </button>
              </div>

              {/* Students List */}
              <div className="p-6 flex-1 overflow-y-auto max-h-[500px]">
                {enrolledStudents.length === 0 ? (
                  <div className="text-center text-slate-500 py-16 flex flex-col items-center justify-center gap-3">
                    <BookOpen className="h-8 w-8 text-slate-650" />
                    <span>No students registered in this course syllabus.</span>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-900">
                    {enrolledStudents.map(student => (
                      <div key={student.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                        <div>
                          <h4 className="font-semibold text-white text-sm">{student.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{student.rollNumber} &bull; {student.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-xs font-semibold text-slate-350">GPA: {student.gpa.toFixed(2)}</span>
                            <p className="text-[10px] text-slate-500">Attendance: {student.attendanceRate}%</p>
                          </div>
                          <button
                            onClick={() => unenrollFromCourse(student.id, selectedCourse.id)}
                            className="p-2 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/30 hover:text-white rounded-lg transition-all"
                            title="Unenroll Student"
                          >
                            <UserMinus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl border border-slate-900 p-12 text-center text-slate-500">
              Select a course from the syllabus to manage enrollments.
            </div>
          )}
        </div>
      </div>

      {/* Enrollment Modal */}
      {isEnrollModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass w-full max-w-md rounded-2xl border border-slate-850 overflow-hidden shadow-2xl animate-pulse-slow">
            <div className="p-6 border-b border-slate-900 bg-slate-900/30 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-white">Enroll Student</h3>
                <p className="text-xs text-slate-400 mt-0.5">Syllabus: {selectedCourse.code}</p>
              </div>
              <button onClick={() => setIsEnrollModalOpen(false)} className="p-1 text-slate-500 hover:text-white rounded-lg">
                <Plus className="h-5 w-5 transform rotate-45" />
              </button>
            </div>
            
            <div className="p-6 max-h-[300px] overflow-y-auto divide-y divide-slate-900">
              {nonEnrolledStudents.map(student => (
                <div key={student.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                  <div>
                    <h5 className="font-semibold text-sm text-white">{student.name}</h5>
                    <p className="text-[10px] text-slate-400">{student.rollNumber} &bull; {student.major}</p>
                  </div>
                  <button
                    onClick={() => handleEnroll(student.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

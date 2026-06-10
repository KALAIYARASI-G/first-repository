import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  major: string;
  gpa: number;
  status: 'Active' | 'Suspended' | 'Graduated';
  attendanceRate: number; // percentage (e.g. 94)
  enrolledCourses: string[]; // Course IDs
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  department: string;
  credits: number;
}

interface StudentContextType {
  students: Student[];
  courses: Course[];
  addStudent: (student: Omit<Student, 'id' | 'enrolledCourses'>) => void;
  updateStudent: (id: string, updatedStudent: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  enrollInCourse: (studentId: string, courseId: string) => void;
  unenrollFromCourse: (studentId: string, courseId: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {
    id: 's1',
    name: 'Alice Vance',
    email: 'alice.vance@eduportal.com',
    phone: '555-0192',
    rollNumber: 'CS-2024-001',
    major: 'Computer Science',
    gpa: 3.82,
    status: 'Active',
    attendanceRate: 97,
    enrolledCourses: ['c1', 'c2']
  },
  {
    id: 's2',
    name: 'Blake Sterling',
    email: 'b.sterling@eduportal.com',
    phone: '555-0143',
    rollNumber: 'EE-2024-032',
    major: 'Electrical Engineering',
    gpa: 3.45,
    status: 'Active',
    attendanceRate: 91,
    enrolledCourses: ['c3']
  },
  {
    id: 's3',
    name: 'Chloe Thorne',
    email: 'chloe.t@eduportal.com',
    phone: '555-0187',
    rollNumber: 'BIO-2023-015',
    major: 'Bioinformatics',
    gpa: 3.91,
    status: 'Active',
    attendanceRate: 98,
    enrolledCourses: ['c1', 'c4']
  },
  {
    id: 's4',
    name: 'Daniel Kim',
    email: 'd.kim@eduportal.com',
    phone: '555-0211',
    rollNumber: 'CS-2024-012',
    major: 'Computer Science',
    gpa: 2.78,
    status: 'Suspended',
    attendanceRate: 74,
    enrolledCourses: ['c2']
  },
  {
    id: 's5',
    name: 'Elena Rostova',
    email: 'e.rostova@eduportal.com',
    phone: '555-0164',
    rollNumber: 'MAT-2022-005',
    major: 'Mathematics',
    gpa: 3.98,
    status: 'Graduated',
    attendanceRate: 99,
    enrolledCourses: []
  }
];

const initialCourses: Course[] = [
  { id: 'c1', name: 'Introduction to Algorithms', code: 'CS-301', instructor: 'Dr. Evelyn Martinez', department: 'Computer Science', credits: 4 },
  { id: 'c2', name: 'Web Application Development', code: 'CS-320', instructor: 'Prof. Jordan Blake', department: 'Computer Science', credits: 3 },
  { id: 'c3', name: 'Signals & Systems', code: 'EE-210', instructor: 'Dr. Arthur Pendelton', department: 'Electrical Engineering', credits: 4 },
  { id: 'c4', name: 'Computational Genomics', code: 'BIO-450', instructor: 'Dr. Sarah Jenkins', department: 'Biology', credits: 3 }
];

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [courses] = useState<Course[]>(initialCourses);

  const addStudent = (studentData: Omit<Student, 'id' | 'enrolledCourses'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `s${Date.now()}`,
      enrolledCourses: []
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updatedFields: Partial<Student>) => {
    setStudents(prev =>
      prev.map(student => (student.id === id ? { ...student, ...updatedFields } : student))
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const enrollInCourse = (studentId: string, courseId: string) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.id === studentId && !student.enrolledCourses.includes(courseId)) {
          return { ...student, enrolledCourses: [...student.enrolledCourses, courseId] };
        }
        return student;
      })
    );
  };

  const unenrollFromCourse = (studentId: string, courseId: string) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.id === studentId) {
          return { ...student, enrolledCourses: student.enrolledCourses.filter(cid => cid !== courseId) };
        }
        return student;
      })
    );
  };

  return (
    <StudentContext.Provider value={{ students, courses, addStudent, updateStudent, deleteStudent, enrollInCourse, unenrollFromCourse }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};

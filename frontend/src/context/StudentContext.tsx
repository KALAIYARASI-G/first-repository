import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL } from '../config';

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
}

interface StudentContextType {
  students: Student[];
  loading: boolean;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (id: number, updatedStudent: Partial<Student>) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students from API');
      }
    } catch (error) {
      console.error('Network error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        await fetchStudents();
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (id: number, updatedFields: Partial<Student>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      if (response.ok) {
        await fetchStudents();
      } else {
        console.error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchStudents();
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <StudentContext.Provider value={{ students, loading, addStudent, updateStudent, deleteStudent }}>
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
export type { Student as StudentType };
export type Course = any;

import React, { useState } from 'react';
import { useStudents, Student } from '../context/StudentContext';
import { Search, UserPlus, Trash2, Edit, X, ArrowUpDown } from 'lucide-react';

export const StudentRoster: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'gpa' | 'attendance'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [major, setMajor] = useState('Computer Science');
  const [gpa, setGpa] = useState(3.5);
  const [status, setStatus] = useState<'Active' | 'Suspended' | 'Graduated'>('Active');
  const [attendance, setAttendance] = useState(95);

  const openAddModal = () => {
    setEditingStudent(null);
    setName('');
    setEmail('');
    setPhone('');
    setRollNumber(`REG-${Date.now().toString().slice(-4)}`);
    setMajor('Computer Science');
    setGpa(3.5);
    setStatus('Active');
    setAttendance(95);
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
    setRollNumber(student.rollNumber);
    setMajor(student.major);
    setGpa(student.gpa);
    setStatus(student.status);
    setAttendance(student.attendanceRate);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(editingStudent.id, {
        name,
        email,
        phone,
        rollNumber,
        major,
        gpa: Number(gpa),
        status,
        attendanceRate: Number(attendance)
      });
    } else {
      addStudent({
        name,
        email,
        phone,
        rollNumber,
        major,
        gpa: Number(gpa),
        status,
        attendanceRate: Number(attendance)
      });
    }
    setIsModalOpen(false);
  };

  // Sort & Filter logic
  const filteredStudents = students
    .filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'gpa') {
        comparison = a.gpa - b.gpa;
      } else if (sortBy === 'attendance') {
        comparison = a.attendanceRate - b.attendanceRate;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const toggleSort = (field: 'name' | 'gpa' | 'attendance') => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Student Roster</h1>
          <p className="text-slate-400 text-sm mt-1">Manage registration profile data, department tracks, and GPAs.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-505 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all transform hover:-translate-y-0.5"
        >
          <UserPlus className="h-4 w-4" />
          Register Student
        </button>
      </div>

      {/* Control panel: Search / Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toggleSort('name')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              sortBy === 'name' ? 'bg-indigo-600/15 border-indigo-500/30 text-indigo-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <ArrowUpDown className="h-3 w-3" /> Name
          </button>
          <button
            onClick={() => toggleSort('gpa')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              sortBy === 'gpa' ? 'bg-indigo-600/15 border-indigo-500/30 text-indigo-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <ArrowUpDown className="h-3 w-3" /> GPA
          </button>
          <button
            onClick={() => toggleSort('attendance')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              sortBy === 'attendance' ? 'bg-indigo-600/15 border-indigo-500/30 text-indigo-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <ArrowUpDown className="h-3 w-3" /> Attendance
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="glass rounded-2xl border border-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40 border-b border-slate-900 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Student Profile</th>
                <th className="px-6 py-4">ID Number</th>
                <th className="px-6 py-4">Major / Track</th>
                <th className="px-6 py-4">Metrics</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-12">No records found matching search filters.</td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-900/20 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-indigo-400">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{student.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-350">{student.rollNumber}</td>
                    <td className="px-6 py-4 text-slate-300 font-medium">{student.major}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-slate-400">GPA:</span>
                          <span className="font-semibold text-yellow-400">{student.gpa.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-slate-400">Attendance:</span>
                          <span className="font-semibold text-slate-300">{student.attendanceRate}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        student.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : student.status === 'Suspended'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openEditModal(student)}
                          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
                          title="Edit Profile"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="p-2 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/30 hover:text-white rounded-lg transition-all"
                          title="Delete Profile"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal overlays */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass w-full max-w-lg rounded-2xl border border-slate-850 overflow-hidden shadow-2xl animate-pulse-slow">
            <div className="p-6 border-b border-slate-900 bg-slate-900/30 flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">
                {editingStudent ? 'Edit Student Profile' : 'Register New Student'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-500 hover:text-white rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">ID Number</label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Major / Department</label>
                  <select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 text-sm"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Bioinformatics">Bioinformatics</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Initial GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    required
                    value={gpa}
                    onChange={(e) => setGpa(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Attendance %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={attendance}
                    onChange={(e) => setAttendance(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-350 focus:outline-none focus:border-indigo-500 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-505 rounded-lg text-white text-xs font-bold uppercase tracking-wider"
                >
                  {editingStudent ? 'Save Changes' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

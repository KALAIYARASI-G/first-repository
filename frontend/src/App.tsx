import { useState } from 'react';
import { StudentProvider } from './context/StudentContext';
import { Header } from './components/Header';
import { StudentDashboard } from './pages/StudentDashboard';
import { StudentRoster } from './pages/StudentRoster';
import { CourseEnrollment } from './pages/CourseEnrollment';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StudentDashboard setCurrentPage={setCurrentPage} />;
      case 'roster':
        return <StudentRoster />;
      case 'courses':
        return <CourseEnrollment />;
      default:
        return <StudentDashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <StudentProvider>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        {/* Navigation */}
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Main Content Area */}
        <main className="flex-grow">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              &copy; 2026 EduPortal Administration Systems. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span className="hover:text-slate-200 cursor-pointer">Security Policies</span>
              <span className="hover:text-slate-200 cursor-pointer">System Logs</span>
              <span className="hover:text-slate-200 cursor-pointer">Academic Regulations</span>
            </div>
          </div>
        </footer>
      </div>
    </StudentProvider>
  );
}

export default App;

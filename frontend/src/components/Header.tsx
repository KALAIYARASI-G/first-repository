import React, { useState } from 'react';
import { GraduationCap, Menu, X, LayoutDashboard, Users, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roster', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
            <div className="p-2 bg-indigo-600/10 rounded-xl border border-indigo-500/25">
              <GraduationCap className="h-6 w-6 text-indigo-400 animate-pulse-slow" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              Edu<span className="font-light text-slate-400">Portal</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage('roster')}
              className="ml-4 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Add Student
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-lg px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setCurrentPage('roster');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-4 px-4 py-3 text-center text-sm font-semibold tracking-wider text-white uppercase bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all"
          >
            Add Student
          </button>
        </div>
      )}
    </nav>
  );
};

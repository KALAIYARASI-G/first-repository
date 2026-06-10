import React from 'react';
import { Home, HelpCircle } from 'lucide-react';

interface NotFoundProps {
  setCurrentPage: (page: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ setCurrentPage }) => {
  return (
    <div className="relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center px-4">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center relative z-10">
        <div className="inline-flex p-4 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-3xl mb-6 scale-110">
          <HelpCircle className="h-10 w-10 animate-bounce" />
        </div>
        <h1 className="text-6xl sm:text-8xl font-black text-white tracking-tight">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mt-4">Page Not Found</h2>
        <p className="max-w-md mx-auto text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
          The S3 Object or CloudFront path you are looking for does not exist, or has been rewritten to client-side routing.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 text-slate-200 hover:text-white rounded-lg transition-all"
          >
            <Home className="h-4 w-4" />
            Back to Safety
          </button>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all"
          >
            Open Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

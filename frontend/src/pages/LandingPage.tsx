import React from 'react';
import { Shield, Cpu, CloudLightning, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  setCurrentPage: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage }) => {
  const features = [
    {
      icon: Shield,
      title: 'Zero Trust Security',
      desc: 'All resources are locked down out-of-the-box. Integrated with modern IAM and OAC standards.',
      color: 'text-indigo-400'
    },
    {
      icon: Cpu,
      title: 'Global Performance',
      desc: 'Leverage global edge locations with integrated Amazon CloudFront CDN networks for minimal latency.',
      color: 'text-purple-400'
    },
    {
      icon: CloudLightning,
      title: 'Immutable Deployment',
      desc: 'Deploy fast, versioned assets directly into encrypted storage. Instant rollbacks and multi-region availability.',
      color: 'text-pink-400'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 text-xs font-semibold tracking-wide mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          Production-Ready Cloud Infrastructure
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 font-sans">
          Deploy Secure Static Apps <br />
          <span className="text-gradient">With AWS Cloud Infrastructure</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl leading-relaxed mb-10">
          A highly secure, performant template combining React, TypeScript, Tailwind, and automated IaC. Spin up S3, CloudFront OAC, and edge routing in minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Access the Console
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="https://github.com/KALAIYARASI-G/first-repository"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
          >
            View Repository
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">Engineered For Production</h2>
          <p className="text-slate-400 mt-2">Built with best practices across development & cloud architecture.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="glass p-8 rounded-2xl hover:border-slate-700 hover:bg-slate-900/40 transition-all duration-300 group"
              >
                <div className={`p-3 w-fit rounded-xl bg-slate-900 border border-slate-800 ${feat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-3">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Checklist */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 mb-20 glass rounded-3xl border border-indigo-500/20 relative">
        <div className="grid sm:grid-cols-2 gap-4 p-4">
          <div className="flex items-center gap-3 text-slate-350 text-sm">
            <CheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
            <span>S3 Private Buckets (All Public Blocked)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-350 text-sm">
            <CheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
            <span>HTTPS & Security Headers (TLS 1.2+)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-350 text-sm">
            <CheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
            <span>CloudFront Origin Access Control (OAC)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-350 text-sm">
            <CheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
            <span>Strict Client-Side Router Redirects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

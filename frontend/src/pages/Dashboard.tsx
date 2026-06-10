import React, { useState, useEffect } from 'react';
import { Play, RotateCw, Database, Server, Globe, ShieldCheck, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';

interface Deployment {
  id: string;
  version: string;
  timestamp: string;
  status: 'Live' | 'Building' | 'Deploying' | 'Failed';
}

export const Dashboard: React.FC = () => {
  // States
  const [deployments, setDeployments] = useState<Deployment[]>([
    { id: '1', version: 'v1.0.2', timestamp: '2026-06-09 10:24', status: 'Live' },
    { id: '2', version: 'v1.0.1', timestamp: '2026-06-08 15:43', status: 'Live' },
    { id: '3', version: 'v1.0.0', timestamp: '2026-06-08 09:12', status: 'Live' },
  ]);
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[INFO] System initialized.', '[INFO] Connection to origin secure.']);
  
  // Real-time metric states
  const [metrics, setMetrics] = useState({
    requests: 12489,
    latency: 18,
    errorRate: 0.02,
  });

  // Randomize metrics slightly to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        requests: prev.requests + Math.floor(Math.random() * 5),
        latency: Math.max(12, Math.min(35, prev.latency + (Math.random() > 0.5 ? 1 : -1))),
        errorRate: Math.max(0, Math.min(1.5, prev.errorRate + (Math.random() > 0.5 ? 0.01 : -0.01))),
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 10)]);
  };

  const handleDeploy = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setDeploymentProgress(0);
    addLog('Triggering build pipeline...');
  };

  // Deployment simulator effect
  useEffect(() => {
    if (!isDeploying) return;

    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        const next = prev + 5;
        if (next === 20) {
          addLog('Vite building production assets...');
        } else if (next === 50) {
          addLog('Uploading assets to S3 bucket...');
        } else if (next === 80) {
          addLog('Invalidating CloudFront edge cache...');
        } else if (next >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          setDeployments(current => [
            {
              id: String(Date.now()),
              version: `v1.0.${current.length + 1}`,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              status: 'Live',
            },
            ...current,
          ]);
          addLog('Deployment completed successfully. App is live!');
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isDeploying]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">AWS Cloud Console</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time status monitoring and deployment console.</p>
        </div>
        
        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isDeploying
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/10'
          }`}
        >
          <Play className="h-4 w-4" />
          {isDeploying ? 'Deploying...' : 'Deploy Update'}
        </button>
      </div>

      {/* Deployment Progress Bar */}
      {isDeploying && (
        <div className="glass p-6 rounded-2xl border border-indigo-500/20 mb-8 animate-pulse">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-indigo-400">Deploying New Release</span>
            <span className="text-sm text-slate-350">{deploymentProgress}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-200"
              style={{ width: `${deploymentProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CloudFront Requests</p>
            <h3 className="text-2xl font-bold text-white mt-1">{metrics.requests.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
            <Globe className="h-5 w-5" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Edge Latency</p>
            <h3 className="text-2xl font-bold text-white mt-1">{metrics.latency} ms</h3>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
            <Cpu className="h-5 w-5" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Error Rate (CF)</p>
            <h3 className="text-2xl font-bold text-white mt-1">{metrics.errorRate.toFixed(2)}%</h3>
          </div>
          <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400 border border-pink-500/20">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Status</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">OAC Active</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Deployments List */}
        <div className="lg:col-span-2 glass rounded-2xl border border-slate-900 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-900 bg-slate-900/30 flex justify-between items-center">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-indigo-400" />
              Deployment History
            </h2>
            <button
              onClick={() => {
                setDeployments([
                  { id: '1', version: 'v1.0.2', timestamp: '2026-06-09 10:24', status: 'Live' },
                  { id: '2', version: 'v1.0.1', timestamp: '2026-06-08 15:43', status: 'Live' },
                  { id: '3', version: 'v1.0.0', timestamp: '2026-06-08 09:12', status: 'Live' },
                ]);
                addLog('Reset deployment history.');
              }}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-all"
              title="Reset history"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>
          <div className="p-6 divide-y divide-slate-900">
            {deployments.map((dep) => (
              <div key={dep.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                <div>
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    {dep.version}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      Active
                    </span>
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">Committed at {dep.timestamp}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-slate-300">Region: us-east-1</span>
                  <p className="text-xs text-slate-500 mt-1">Target: S3 Bucket</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Console Logs */}
        <div className="glass rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-[400px]">
          <div className="p-6 border-b border-slate-900 bg-slate-900/30">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-400" />
              Infrastructure Logs
            </h2>
          </div>
          <div className="p-6 flex-1 bg-slate-950/70 overflow-y-auto font-mono text-xs text-indigo-300/80 space-y-2 flex flex-col-reverse">
            {logs.map((log, index) => (
              <div key={index} className="leading-relaxed border-l-2 border-indigo-500/35 pl-2 py-0.5">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

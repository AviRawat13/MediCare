import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { Doctor } from '../types';
import { DOCTORS } from '../data';

interface LoginScreenProps {
  onLoginSuccess: (doctor: Doctor) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0); // Sarah Jenkins by default
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePresetSelect = (index: number) => {
    setSelectedPresetIndex(index);
    setEmail(DOCTORS[index].username);
    setPassword('••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(DOCTORS[selectedPresetIndex]);
    }, 1200);
  };

  return (
    <div className="w-full max-w-6xl min-h-[600px] md:min-h-[750px] bg-white md:rounded-2xl md:shadow-xl overflow-hidden flex flex-col md:grid md:grid-cols-12">
      {/* Left Side: Visual Illustration Section */}
      <section className="hidden md:flex md:col-span-7 flex-col justify-center items-center bg-blue-900 text-white relative p-12 overflow-hidden">
        {/* Subtle decorative grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-md flex flex-col items-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-white text-blue-900 rounded-2xl shadow-md">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Advancing Care with Precision.</h1>
          <p className="text-blue-100/90 text-sm mb-8 leading-relaxed">
            Access your professional medical dashboard to manage patient records, schedules, and clinical insights with enterprise-grade security and HIPAA compliance.
          </p>
          
          <div className="relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] w-full max-w-sm">
            <img 
              alt="Medical Professional using Tablet" 
              className="rounded-xl shadow-xl w-full object-cover aspect-video" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSNL_toh-lfpXWZxD5UKqhf028FBzEl9J5p63Q6R2uTPk_lFmtd7K-qnXx_dqNdWGceCd_RMH74ZRljWGdeRUXju4xF1S0YB9hgDKO3DuNzTAT-qgqfbRyimziM71lIS577J0-5OINk9Wxxqr1iZM9ZVX78Tcga0AlRVJDdmtFHkAVtNrdzP9LOdyaWqJkPyEfshehnLjityRXhfV5aelI6Exy4IiXNMlsr6Kl9d7bE2AqH78CGcsUvoAF-Ma0RsCg-OIjXgf2_uw"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent rounded-xl"></div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="mt-10 flex gap-2">
          <div className="w-8 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
        </div>
      </section>

      {/* Right Side: Login Form Section */}
      <section className="col-span-12 md:col-span-5 flex flex-col justify-center items-center p-8 md:p-12 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-blue-800" />
            <span className="text-2xl font-bold text-blue-950 tracking-tight">MediCare</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-500 text-sm">Please enter your clinical credentials or select a test role.</p>
          </div>

          {/* Test Accounts Picker to help user explore different views */}
          <div className="mb-6 bg-blue-50/50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-900 mb-2">Sign in as:</p>
            <div className="grid grid-cols-2 gap-2">
              {DOCTORS.map((doc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetSelect(idx)}
                  className={`p-2 rounded text-[11px] font-medium transition-all text-left flex flex-col justify-between border ${
                    selectedPresetIndex === idx 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="font-semibold block truncate leading-tight">{doc.name}</span>
                  <span className={`text-[9px] block truncate mt-0.5 ${selectedPresetIndex === idx ? 'text-blue-100' : 'text-slate-400'}`}>
                    {doc.specialty}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 ml-1" htmlFor="email">
                Professional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-sm outline-none text-slate-900 placeholder:text-slate-400"
                  id="email"
                  type="email"
                  placeholder={DOCTORS[selectedPresetIndex].username}
                  value={email || DOCTORS[selectedPresetIndex].username}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-slate-700 ml-1" htmlFor="password">
                  Password
                </label>
                <a className="text-xs font-medium text-blue-700 hover:underline" href="#forgot">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-sm outline-none text-slate-900"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password || '••••••••'}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center gap-2 py-0.5">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer select-none">
                Stay logged in for this shift
              </label>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:bg-blue-800 disabled:bg-blue-600/75 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Secure Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Support Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500 mb-3">New to the network?</p>
            <button 
              type="button" 
              onClick={() => alert('Access request submitted to Medicare EHR Administrators. We will review your clinical NPI matching details.')}
              className="text-xs font-semibold text-blue-800 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Request Staff Access
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-6">
            <div className="flex items-center gap-1 text-slate-400">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">256-bit AES</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

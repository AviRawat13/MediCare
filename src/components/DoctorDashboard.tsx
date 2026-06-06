import React from 'react';
import { Users, Activity, Calendar as CalendarIcon, ChevronRight, Bell, AlertCircle, Plus, Sparkles } from 'lucide-react';
import { Appointment, Alert, Doctor, Patient, View } from '../types';

interface DoctorDashboardProps {
  currentDoctor: Doctor;
  appointments: Appointment[];
  alerts: Alert[];
  patients: Patient[];
  onNavigateToView: (view: View, payload?: string) => void;
}

export default function DoctorDashboard({ 
  currentDoctor, 
  appointments, 
  alerts, 
  patients, 
  onNavigateToView 
}: DoctorDashboardProps) {

  // Extract count of remaining appointments (e.g. status === 'Confirmed' or 'Pending')
  const remainingCount = appointments.filter(a => a.status !== 'Cancelled').length;
  const urgentReportsCount = alerts.filter(al => al.unread).length;

  // Render priority pills styling
  const getPriorityBadgeClass = (priority: string) => {
    switch(priority) {
      case 'High Priority':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Stable':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Follow-up':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const getAlertDotClass = (category: string) => {
    switch (category) {
      case 'Critical Results':
        return 'bg-red-600';
      case 'Appointments':
        return 'bg-blue-600';
      case 'Follow-up Alerts':
      default:
        return 'bg-amber-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message Column */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-900 to-blue-950 p-6 rounded-2xl text-white shadow-sm relative overflow-hidden">
        {/* Abstract shape */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-blue-800/10 rounded-l-full blur-2xl pointer-events-none"></div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Good morning, {currentDoctor.name}.</h2>
          <p className="text-slate-100/80 text-sm mt-1 max-w-xl">
            You have {remainingCount} patient consults scheduled for today. There are <span className="text-red-300 font-semibold">{urgentReportsCount} critical alerts</span> requiring immediate review.
          </p>
        </div>
        <button 
          onClick={() => {
            const eleanor = patients.find(p => p.name === 'Eleanor Fitzgerald');
            if (eleanor) onNavigateToView(View.ACTIVE_CONSULTATION, eleanor.id);
          }}
          className="bg-white text-blue-900 hover:bg-slate-50 font-medium px-4 py-2.5 rounded-xl shadow-md text-xs transition-all active:scale-[0.98] flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>Start Active Consultation</span>
        </button>
      </section>

      {/* Bento Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Summary Stats & Calendar */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 lg:flex lg:flex-col lg:gap-6 space-y-6 lg:space-y-0">
          
          {/* Stat Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm hover:border-blue-600 transition-colors cursor-pointer group flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Patients</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">1,284</h3>
              <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-2.5 inline-block">
                +4% this month
              </span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm hover:border-blue-600 transition-colors cursor-pointer group flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Consultations</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                42 <span className="text-sm font-normal text-slate-400">/ mo</span>
              </h3>
              <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full mt-2.5 inline-block">
                On Track
              </span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          {/* Stat Card 3: Mini Medical Calendar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900">Calendar Widget</h4>
              <button 
                onClick={() => onNavigateToView(View.SCHEDULE)}
                className="text-[11px] font-bold text-blue-700 hover:underline"
              >
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center font-medium text-xs mb-2">
              <div className="text-slate-400">M</div>
              <div className="text-slate-400">T</div>
              <div className="text-slate-400">W</div>
              <div className="text-slate-400">T</div>
              <div className="text-slate-400">F</div>
              <div className="text-slate-400">S</div>
              <div className="text-slate-400">S</div>

              <div className="py-1 text-slate-700">12</div>
              <div className="py-1 text-slate-700">13</div>
              <div className="py-1 bg-blue-700 text-white rounded-full font-bold shadow-sm">14</div>
              <div className="py-1 text-slate-700">15</div>
              <div className="py-1 text-slate-700">16</div>
              <div className="py-1 text-slate-400">17</div>
              <div className="py-1 text-slate-400">18</div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex gap-2 items-center p-2 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-100 cursor-pointer">
                <div className="w-1 h-8 bg-red-500 rounded-full shrink-0"></div>
                <div className="truncate">
                  <p className="text-[11px] font-bold text-slate-900 truncate">Surgery Slot: RM 402</p>
                  <p className="text-[9px] font-semibold text-slate-400 mt-0.5">02:30 PM (Dr. Alexander Chen)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Today's Interactive Appointments */}
        <div className="col-span-12 md:col-span-8 lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-150 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Today's Appointments</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Monday, October 14, 2026</p>
                </div>
                <span className="bg-blue-100 text-blue-900 border border-blue-200 text-[11px] px-3 py-1 rounded-full font-bold shadow-xs">
                  {remainingCount} Remaining
                </span>
              </div>

              <div className="p-4 space-y-2">
                {appointments.map((appointment) => {
                  // Find if we have a profile to match this specific patient
                  const patientRecord = patients.find(p => p.name === appointment.patientName);
                  
                  return (
                    <div 
                      key={appointment.id}
                      onClick={() => {
                        if (patientRecord) {
                          onNavigateToView(View.PATIENT_DETAIL, patientRecord.id);
                        } else {
                          alert(`Viewing brief for placeholder patient: ${appointment.patientName}`);
                        }
                      }}
                      className="group flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-blue-600 hover:shadow-clinical cursor-pointer transition-all active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {appointment.patientAvatar ? (
                          <img 
                            src={appointment.patientAvatar} 
                            alt={appointment.patientName} 
                            className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 uppercase">
                            {appointment.patientName.slice(0, 2)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-800 transition-colors truncate">
                            {appointment.patientName}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">{appointment.reason}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-blue-800">{appointment.time}</p>
                        <span className={`inline-block px-2 py-0.5 border text-[9px] font-bold rounded-full mt-1 ${getPriorityBadgeClass(appointment.priority)}`}>
                          {appointment.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={() => onNavigateToView(View.SCHEDULE)}
                className="w-full py-2.5 bg-blue-800 text-white hover:bg-blue-900 rounded-xl font-bold text-xs transition-colors shadow-xs active:scale-[0.98]"
              >
                Go to Scheduler
              </button>
            </div>
          </div>

          {/* Upcoming next 48h */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Upcoming Schedules (Next 48h)</h4>
            <div className="divide-y divide-slate-100">
              <div className="flex justify-between items-center py-2.5 cursor-pointer hover:bg-slate-50 rounded-lg px-1 transition-colors" onClick={() => onNavigateToView(View.SCHEDULE)}>
                <div>
                  <p className="text-xs font-bold text-slate-800">Albert Flores</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Tomorrow, 11:00 AM (Follow-up)</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex justify-between items-center py-2.5 cursor-pointer hover:bg-slate-50 rounded-lg px-1 transition-colors" onClick={() => onNavigateToView(View.SCHEDULE)}>
                <div>
                  <p className="text-xs font-bold text-slate-800">Bessie Cooper</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Tomorrow, 02:00 PM (Symptom Review)</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Notifications & Live Alerts */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-600" />
                <span>Live Alerts</span>
              </h3>
              <span className="w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full text-[10px] font-bold shadow-xs">
                {urgentReportsCount}
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1 scrollbar-thin">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  onClick={() => onNavigateToView(View.ALERTS)}
                  className={`relative pl-4 border-l-2 p-1.5 hover:bg-slate-50 rounded transition-all cursor-pointer ${
                    alert.unread ? 'border-red-500 opacity-100' : 'border-slate-300 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${getAlertDotClass(alert.category)}`}></span>
                    <p className="text-[11px] font-bold text-slate-800 leading-tight block">{alert.title}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{alert.description}</p>
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wide mt-1.5 block">
                    {alert.time}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigateToView(View.ALERTS)}
              className="mt-4 pt-3 border-t border-slate-100 text-center text-xs font-bold text-blue-800 hover:text-blue-900 block w-full"
            >
              Configure Alerts Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

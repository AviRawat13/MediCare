import React, { useState } from 'react';
import { Bell, AlertOctagon, Info, Check, CheckSquare, MessageSquare, Phone, FileText } from 'lucide-react';
import { Alert, Patient, View } from '../types';

interface AlertsManagerProps {
  alerts: Alert[];
  patients: Patient[];
  onMarkRead: (id: string) => void;
  onDismissAlert: (id: string) => void;
  onNavigateToPatient: (patientId: string) => void;
}

export default function AlertsManager({ 
  alerts, 
  patients, 
  onMarkRead, 
  onDismissAlert, 
  onNavigateToPatient 
}: AlertsManagerProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread' | 'Critical Results' | 'Follow-up Alerts'>('All');

  const filteredAlerts = alerts.filter(alert => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return alert.unread;
    return alert.category === activeFilter;
  });

  const getAlertSeverityStyles = (category: string) => {
    switch(category) {
      case 'Critical Results':
        return 'bg-red-50/50 border-red-200 text-red-900 border-l-4 border-l-red-650';
      case 'Follow-up Alerts':
        return 'bg-amber-50/50 border-amber-200 text-amber-900 border-l-4 border-l-amber-500';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800 border-l-4 border-l-blue-600';
    }
  };

  const alertUnreadCount = alerts.filter(a => a.unread).length;

  return (
    <div className="space-y-6 text-left">
      {/* Header and status alerts summary */}
      <section className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-700" />
            <span>Alerts &amp; Notifications Center</span>
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Review critical diagnostic reports, lab triggers, and follow-ups real-time.</p>
        </div>

        <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-xl text-red-800 text-xs font-bold shrink-0">
          {alertUnreadCount} Unread Live Actions pending
        </div>
      </section>

      {/* Tabs and layout grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Filter chips */}
        <div className="lg:col-span-3 space-y-2 select-none">
          <div className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm space-y-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 pb-2 border-b border-slate-100 mb-2">
              Categories
            </h3>
            
            {(['All', 'Unread', 'Critical Results', 'Follow-up Alerts'] as const).map((filter) => {
              const count = filter === 'All' 
                ? alerts.length 
                : filter === 'Unread' 
                  ? alertUnreadCount 
                  : alerts.filter(a => a.category === filter).length;

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex justify-between items-center transition-all cursor-pointer ${
                    activeFilter === filter 
                      ? 'bg-blue-700 text-white shadow-xs' 
                      : 'hover:bg-slate-50 text-slate-650'
                  }`}
                >
                  <span>{filter === 'Unread' ? 'Unread Notifications' : filter}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeFilter === filter ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/60 font-medium">
            <h4 className="text-[10px] font-bold text-blue-900 uppercase">HIPAA Warning</h4>
            <p className="text-[10px] text-slate-500 leading-normal mt-2">
              Critical updates or diagnostics are transmitted securely under HIPAA guidelines. Mark checked items as completed to sync shift files.
            </p>
          </div>
        </div>

        {/* Right Side: List of action notifications */}
        <div className="lg:col-span-9 space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 shadow-sm text-slate-400 select-none">
              <CheckSquare className="w-10 h-10 text-emerald-600 mx-auto mb-2.5" />
              <p className="text-sm font-semibold">Fantastic work! No alerts match your current view filters.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              // Extract the target patient if listed in description
              const matchingPatient = patients.find(p => p.name === alert.patientName);

              return (
                <div 
                  key={alert.id}
                  className={`border border-slate-150 rounded-2xl p-5 shadow-xs transition-all ${getAlertSeverityStyles(alert.category)}`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {alert.category === 'Critical Results' ? (
                        <AlertOctagon className="w-5 h-5 text-red-650 shrink-0" />
                      ) : (
                        <Info className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm leading-tight inline-flex items-center gap-2">
                          <span>{alert.title}</span>
                          {alert.unread && (
                            <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-ping" />
                          )}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mt-1">
                          {alert.category} • {alert.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 select-none self-end md:self-center">
                      {alert.unread && (
                        <button 
                          type="button"
                          onClick={() => onMarkRead(alert.id)}
                          className="p-1.5 hover:bg-slate-200/50 rounded-xl text-blue-700 bg-white border border-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      
                      <button 
                        type="button"
                        onClick={() => onDismissAlert(alert.id)}
                        className="text-xs font-bold px-3 py-1.5 text-slate-500 hover:text-red-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-650 leading-relaxed font-semibold pl-1">
                    {alert.description}
                  </p>

                  {/* Actions to interact with patient record */}
                  {matchingPatient && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-3">
                      <button 
                        type="button" 
                        onClick={() => onNavigateToPatient(matchingPatient.id)}
                        className="py-1 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Navigate to Patient File</span>
                      </button>

                      <button 
                        type="button" 
                        onClick={() => window.alert(`Broadcasting secure clinical SMS to emergency caregiver or relatives listed under ${matchingPatient.name}. NPI trigger verified.`)}
                        className="py-1 px-3 border border-slate-250 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Contact Caregiver</span>
                      </button>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

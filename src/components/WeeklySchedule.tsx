import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter, Clock, Edit2, CheckCircle2, XCircle, AlertTriangle, UserPlus, Plus } from 'lucide-react';
import { Appointment, View } from '../types';

interface WeeklyScheduleProps {
  queue: Appointment[];
  onConfirmAppointment: (id: string) => void;
  onCancelAppointment: (id: string) => void;
  onAddAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

export default function WeeklySchedule({ 
  queue, 
  onConfirmAppointment, 
  onCancelAppointment, 
  onAddAppointment 
}: WeeklyScheduleProps) {
  const [activeTab, setActiveTab] = useState<'Week' | 'Day'>('Week');
  const [showAddModal, setShowAddModal] = useState(false);

  // Quick form fields for new appointment
  const [patientName, setPatientName] = useState('');
  const [reason, setReason] = useState('');
  const [time, setTime] = useState('09:30 AM');
  const [priority, setPriority] = useState<'High Priority' | 'Stable' | 'Follow-up'>('Stable');

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !reason.trim()) return;

    onAddAppointment({
      patientName,
      patientId: '#MED-' + Math.floor(1000 + Math.random() * 9000),
      reason,
      time,
      date: '2026-06-06',
      status: 'Confirmed',
      priority
    });

    // Reset
    setPatientName('');
    setReason('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-700" />
            <span>Weekly Schedule</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">October 21 - October 27, 2026 (Active Week)</p>
        </div>
        
        <div className="flex items-center bg-slate-100 rounded-full p-1 self-start sm:self-center">
          <button 
            type="button"
            onClick={() => setActiveTab('Week')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'Week' 
                ? 'bg-white shadow-sm text-blue-800' 
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            Week
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('Day')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'Day' 
                ? 'bg-white shadow-sm text-blue-800' 
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            Day
          </button>
        </div>
      </div>

      {/* Grid Layout of Bento: Calendar on left, Queue on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Calendar View */}
        <section className="lg:col-span-8 bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          
          {/* Calendar Headers */}
          <div className="grid grid-cols-[80px_repeat(7,1fr)] bg-slate-50 border-b border-slate-150 text-center font-bold text-xs select-none">
            <div className="p-3 border-r border-slate-150 bg-slate-100"></div>
            <div className="p-3 border-r border-slate-150 text-slate-700">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Mon</span>
              <span className="text-sm font-semibold mt-0.5 block">21</span>
            </div>
            <div className="p-3 border-r border-slate-150 text-slate-700">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Tue</span>
              <span className="text-sm font-semibold mt-0.5 block">22</span>
            </div>
            <div className="p-3 border-r border-slate-150 bg-blue-50/50 text-blue-800">
              <span className="block text-[10px] uppercase font-bold text-blue-400">Wed</span>
              <span className="text-sm font-bold mt-0.5 block">23</span>
            </div>
            <div className="p-3 border-r border-slate-150 text-slate-700">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Thu</span>
              <span className="text-sm font-semibold mt-0.5 block">24</span>
            </div>
            <div className="p-3 border-r border-slate-150 text-slate-700">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Fri</span>
              <span className="text-sm font-semibold mt-0.5 block">25</span>
            </div>
            <div className="p-3 border-r border-slate-150 text-slate-400 bg-slate-100/50">
              <span className="block text-[10px] uppercase font-bold text-slate-350">Sat</span>
              <span className="text-sm font-semibold mt-0.5 block">26</span>
            </div>
            <div className="p-3 text-slate-400 bg-slate-100/50">
              <span className="block text-[10px] uppercase font-bold text-slate-350">Sun</span>
              <span className="text-sm font-semibold mt-0.5 block">27</span>
            </div>
          </div>

          {/* Time & Grid Cells */}
          <div className="grid grid-cols-[80px_1fr] h-[480px] overflow-y-auto relative bg-white">
            
            {/* Time Column lines */}
            <div className="flex flex-col border-r border-slate-150 sticky left-0 bg-white z-10 text-[10px] font-bold text-slate-400 select-none">
              <div className="h-16 p-2 border-b border-slate-150 flex items-center">08:00 AM</div>
              <div className="h-16 p-2 border-b border-slate-150 flex items-center">09:00 AM</div>
              <div className="h-16 p-2 border-b border-slate-150 flex items-center">10:00 AM</div>
              <div className="h-16 p-2 border-b border-slate-150 flex items-center">11:00 AM</div>
              <div className="h-16 p-2 border-b border-slate-150 flex items-center">12:00 PM</div>
              <div className="h-16 p-2 border-b border-slate-150 flex items-center">01:00 PM</div>
            </div>

            {/* Simulated background columns */}
            <div className="relative">
              <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                <div className="border-r border-slate-100 h-full"></div>
                <div className="border-r border-slate-100 h-full"></div>
                <div className="border-r border-slate-100 h-full bg-blue-50/10"></div>
                <div className="border-r border-slate-100 h-full"></div>
                <div className="border-r border-slate-100 h-full"></div>
                <div className="border-r border-slate-100 h-full bg-slate-50/50"></div>
                <div className="h-full bg-slate-50/50"></div>
              </div>

              {/* Grid horizontal divider lines */}
              <div className="absolute inset-0 flex flex-col pointer-events-none">
                <div className="h-16 border-b border-slate-100 w-full" />
                <div className="h-16 border-b border-slate-100 w-full" />
                <div className="h-16 border-b border-slate-100 w-full" />
                <div className="h-16 border-b border-slate-100 w-full" />
                <div className="h-16 border-b border-slate-100 w-full" />
                <div className="h-16 border-b border-slate-100 w-full" />
              </div>

              {/* Weekly Blocks */}
              {/* Mon, Tue, Wed block examples */}
              {/* Tuesday: Cardio Check at 08:00 AM */}
              <div className="absolute top-2 left-[14.28%] w-[12%] h-12 bg-blue-50 text-blue-700 border border-blue-200 p-2 rounded-lg text-[10px] font-bold z-10 shadow-xs leading-tight">
                <p className="font-bold truncate">Cardio Check</p>
                <p className="text-[9px] text-blue-500 mt-0.5">08:00 AM</p>
              </div>

              {/* Wednesday: Surgery at 09:30 AM */}
              <div className="absolute top-[100px] left-[28.56%] w-[12%] h-24 bg-amber-500/10 border-l-4 border-amber-500 p-2.5 rounded-r-lg shadow-sm z-20 hover:bg-amber-500/15 transition-all">
                <p className="font-bold text-amber-800 text-[11px] truncate">Surgery Consult</p>
                <p className="text-[9px] text-amber-700 font-semibold mt-0.5">Dr. Sarah Jenkins</p>
                <p className="text-[9px] text-slate-500 font-medium mt-1">OR-4 • 09:30 - 11:00</p>
              </div>

              {/* Preplanned block on Friday */}
              <div className="absolute top-[180px] left-[57.12%] w-[12%] h-10 bg-slate-500/10 border-l-2 border-slate-400 p-1.5 rounded-r-lg text-[9px] font-semibold text-slate-600 z-10 truncate">
                Staff Review (Lunch)
              </div>
            </div>

          </div>
        </section>

        {/* Daily Queue column */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm flex-1 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Daily Consult Queue</h3>
                <button type="button" className="p-1 hover:bg-slate-100 rounded-lg">
                  <Filter className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4">
                {queue.map((item) => (
                  <div 
                    key={item.id}
                    className="group border border-slate-150 hover:border-blue-600 rounded-xl p-4 bg-white transition-all shadow-xs"
                  >
                    <div className="flex justify-between items-start mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          item.status === 'Confirmed' ? 'bg-emerald-600' : 'bg-amber-500'
                        }`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'Confirmed' ? 'text-emerald-700' : 'text-amber-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400">{item.time}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.patientName}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.reason}</p>

                    <div className="flex gap-2 pt-3 mt-3 border-t border-slate-100">
                      {item.status === 'Pending' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => onConfirmAppointment(item.id)}
                            className="flex-1 py-1 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold justify-center flex items-center transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            <span>Confirm</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onCancelAppointment(item.id)}
                            className="py-1 px-2.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50 transition-all cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => alert(`Rescheduling consult for ${item.patientName}`)}
                            className="flex-1 py-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold justify-center flex items-center transition-all cursor-pointer"
                          >
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            <span>Reschedule</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onCancelAppointment(item.id)}
                            className="py-1 px-2.5 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50 transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="mt-6 w-full py-2.5 bg-blue-700 text-white hover:bg-blue-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Book Appointment Slot</span>
            </button>
          </div>
        </section>

      </div>

      {/* FAB Floating action trigger for fast scheduling */}
      <button 
        type="button"
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 w-14 h-14 bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto hover:bg-blue-900 hover:scale-105 active:scale-95 transition-all z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Simple standard scheduler modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-md p-6 select-none">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-700" />
              <span>Schedule New Appointment</span>
            </h3>

            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Patient Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Eleanor Fitz"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-1 focus:ring-blue-700"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Consultation Motive / Reason</label>
                <input 
                  type="text"
                  placeholder="e.g. Post-Op Cardiology Review"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-1 focus:ring-blue-700"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Allocated Time</label>
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none"
                  >
                    <option>08:00 AM</option>
                    <option>09:15 AM</option>
                    <option>09:30 AM</option>
                    <option>10:15 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>01:45 PM</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Priority Tier</label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none"
                  >
                    <option>Stable</option>
                    <option>Follow-up</option>
                    <option>High Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

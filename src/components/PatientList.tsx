import React, { useState } from 'react';
import { Search, SlidersHorizontal, MoreVertical, ChevronDown, UserPlus, FileText, CheckCircle } from 'lucide-react';
import { Patient, View } from '../types';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  onAddPatient: (patient: Patient) => void;
}

export default function PatientList({ patients, onSelectPatient, onAddPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Discharged' | 'Chronic' | 'Critical'>('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for creating a new patient record
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('O Positive');
  const [status, setStatus] = useState<'Active' | 'Discharged' | 'Chronic' | 'Critical'>('Active');
  const [allergies, setAllergies] = useState('');

  // Process search & filters
  const filteredPatients = patients.filter((patient) => {
    // Search match
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      patient.name.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query) ||
      patient.bloodType.toLowerCase().includes(query) ||
      (patient.allergies && patient.allergies.some(a => a.toLowerCase().includes(query)));

    // Status filter match
    const matchesFilter = activeFilter === 'All' || patient.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPatient: Patient = {
      id: '#MC-' + Math.floor(10000 + Math.random() * 90000),
      name,
      age: parseInt(age) || 30,
      gender,
      dob: dob || '01/01/1990',
      weight: parseFloat(weight) || 70,
      bloodType,
      avatar: '', // fallback to initials badge
      status,
      lastVisit: 'Today',
      allergies: allergies ? allergies.split(',').map(a => a.trim()) : [],
      medicalHistory: [],
      consultationNotes: [],
      currentMedications: [],
      labReports: [],
      vitals: { bp: '120/80', hr: 72 }
    };

    onAddPatient(newPatient);
    
    // Reset states
    setName('');
    setAge('');
    setDob('');
    setWeight('');
    setAllergies('');
    setShowAddModal(false);
  };

  const getStatusBadgeStyle = (patStatus: Patient['status']) => {
    switch(patStatus) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      case 'Chronic':
        return 'bg-amber-55 text-[#291800] border-amber-100 b-amber bg-[#ffddb3]/50';
      case 'Discharged':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-150';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Filters Section */}
      <section className="bg-slate-50 border border-slate-150 p-4 rounded-xl shadow-xs">
        <div className="flex flex-col gap-4">
          
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <input 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all text-sm outline-none placeholder:text-slate-400"
              placeholder="Search patients by name, biological ID, allergies, blood type..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {(['All', 'Active', 'Discharged', 'Chronic', 'Critical'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(6); // reset pagination when switching filters
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border cursor-pointer active:scale-95 transition-transform ${
                  activeFilter === filter
                    ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-250 hover:bg-slate-100/60'
                }`}
              >
                {filter === 'All' ? 'All Patients' : filter}
              </button>
            ))}
            
            <button 
              type="button"
              onClick={() => alert('Additional Filter Settings: Advanced filters for age groups, doctors assigned, and critical laboratory thresholds are currently initialized.')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-slate-600 border border-slate-200 text-xs font-bold hover:bg-slate-50 select-none ml-auto"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

        </div>
      </section>

      {/* Grid containing Patient Cards */}
      {filteredPatients.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 shadow-sm text-slate-400">
          <p className="text-sm font-medium">No clinical files match your queries.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.slice(0, visibleCount).map((patient) => {
            // Get initials fallbacks if avatar string is empty
            const initials = patient.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <div 
                key={patient.id}
                className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm hover:shadow-clinical hover:border-slate-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      {patient.avatar ? (
                        <img 
                          alt={`Patient ${patient.name}`} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50 shadow-xs shrink-0" 
                          src={patient.avatar}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-800 font-bold flex items-center justify-center text-sm shadow-xs shrink-0 uppercase">
                          {initials.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors text-sm truncate max-w-[130px]">
                          {patient.name}
                        </h3>
                        <p className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">{patient.id}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 border text-[10px] font-bold rounded-full ${getStatusBadgeStyle(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5 text-left select-none">
                    <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Age / Sex</p>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{patient.age} Y / {patient.gender}</p>
                    </div>
                    <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Last Visit</p>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">{patient.lastVisit}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => onSelectPatient(patient.id)}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 font-bold py-2 rounded-xl text-xs text-white transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                  >
                    View Record File
                  </button>
                  <button 
                    type="button"
                    onClick={() => alert(`Record ID: ${patient.id}. Weight: ${patient.weight}kg. Blood Type: ${patient.bloodType}. Allergies: ${patient.allergies.join(', ') || 'None'}.`)}
                    className="w-10 h-10 flex items-center justify-center border border-slate-250 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Pagination Footer */}
      {filteredPatients.length > visibleCount && (
        <div className="flex justify-center pt-4">
          <button 
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="flex items-center gap-1.5 px-6 py-2.5 border border-slate-200 rounded-xl text-blue-850 hover:bg-slate-50 text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <span>Load More Patients</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Contextual Patient Registrar FAB on Mobile / Bottom side */}
      <button 
        type="button"
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 w-14 h-14 bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-900 hover:scale-105 active:scale-95 transition-all z-40"
      >
        <UserPlus className="w-6 h-6" />
      </button>

      {/* Registar Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-700" />
              <span>Register New Patient File</span>
            </h3>

            <form onSubmit={handleCreatePatient} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Patient Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Sarah J. Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-blue-700 text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">DOB (Date of Birth)</label>
                  <input 
                    type="text"
                    placeholder="e.g. 05/12/1988"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none uppercase text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Age</label>
                  <input 
                    type="number"
                    placeholder="e.g. 35"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Gender</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none text-slate-900 font-medium"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Weight (kg)</label>
                  <input 
                    type="number"
                    placeholder="e.g. 64"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Blood Type</label>
                  <select 
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none text-slate-900 font-medium"
                  >
                    <option>O Positive</option>
                    <option>O Negative</option>
                    <option>A Positive</option>
                    <option>A Negative</option>
                    <option>B Positive</option>
                    <option>B Negative</option>
                    <option>AB Positive</option>
                    <option>AB Negative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Triage Tag Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none text-slate-900 font-medium"
                  >
                    <option>Active</option>
                    <option>Chronic</option>
                    <option>Discharged</option>
                    <option>Critical</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Allergies (comma separated)</label>
                  <input 
                    type="text"
                    placeholder="e.g. Penicillin, Latex"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full p-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Register File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

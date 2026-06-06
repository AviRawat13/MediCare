import React from 'react';
import { 
  ArrowLeft, Edit3, Printer, History, Plus, AlertOctagon, 
  Pill, FileText, Eye, CheckCircle, HeartPulse, RefreshCw
} from 'lucide-react';
import { Patient, View } from '../types';

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
  onStartConsultation: (patientId: string) => void;
}

export default function PatientDetail({ patient, onBack, onStartConsultation }: PatientDetailProps) {
  // Initials helper
  const initials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const getStatusBadgeStyle = (status: Patient['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500 text-white';
      case 'Chronic':
        return 'bg-[#ffddb3] text-[#291800] border-amber-250';
      case 'Discharged':
        return 'bg-slate-500 text-white';
      case 'Critical':
      default:
        return 'bg-red-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Return Hook */}
      <button 
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-slate-500 hover:text-blue-800 text-xs font-bold transition-colors cursor-pointer select-none group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Return to Patient Registry</span>
      </button>

      {/* Patient Profile Header Card */}
      <section className="bg-white rounded-2xl p-5 border border-slate-150 shadow-clinical flex flex-col md:flex-row gap-6 items-start md:items-center relative">
        <div className="relative shrink-0">
          {patient.avatar ? (
            <img 
              alt={patient.name} 
              className="w-24 h-24 md:w-28 md:h-24 object-cover rounded-2xl border border-slate-200 bg-slate-50" 
              src={patient.avatar}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-blue-105 text-blue-800 font-bold flex items-center justify-center text-2xl uppercase">
              {initials.slice(0, 2)}
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-xs">
            Active
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight truncate">{patient.name}</h2>
            <span className="text-xs font-bold text-slate-400">ID: {patient.id}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1 max-w-2xl select-none">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age/Sex</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5">{patient.age} Years / {patient.gender}</span>
            </div>
            <div className="flex flex-col border-l border-slate-150 md:pl-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weight</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5">{patient.weight} kg</span>
            </div>
            <div className="flex flex-col border-l border-slate-150 pl-2 md:pl-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Type</span>
              <span className="text-sm font-bold text-red-650 mt-0.5">{patient.bloodType}</span>
            </div>
            <div className="flex flex-col border-l border-slate-150 pl-2 md:pl-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Visit</span>
              <span className="text-sm font-bold text-slate-850 mt-0.5">{patient.lastVisit}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
          <button 
            type="button"
            onClick={() => onStartConsultation(patient.id)}
            className="flex-1 md:w-44 py-2 px-4 bg-blue-750 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Consultation Note</span>
          </button>
          
          <button 
            type="button"
            onClick={() => window.print()}
            className="flex-1 md:w-44 py-2 px-4 border border-slate-250 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Export Registry Files</span>
          </button>
        </div>
      </section>

      {/* Main Content Layout Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Medical History & Notes */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          {/* Medical History Timeline */}
          <div className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4.5 h-4.5 text-blue-700" />
                <span>Diagnostic Timeline History</span>
              </h3>
              <RefreshCw className="w-4 h-4 text-slate-400 hover:text-blue-700 cursor-pointer transition-colors" />
            </div>

            <div className="p-5 space-y-6">
              {patient.medicalHistory.length === 0 ? (
                <div className="text-slate-400 text-xs py-4 text-center font-medium">No timeline entries matching the current file constraints.</div>
              ) : (
                patient.medicalHistory.map((entry, index) => (
                  <div key={entry.id} className="flex gap-4 relative">
                    {/* Vertical guideline segment */}
                    {index < patient.medicalHistory.length - 1 && (
                      <div className="absolute left-[7px] top-5 -bottom-8 w-0.5 bg-slate-205" />
                    )}
                    <div className="shrink-0 mt-1">
                      <div className={`w-4 h-4 rounded-full border-4 ${
                        index === 0 ? 'bg-blue-700 border-blue-200' : 'bg-slate-300 border-slate-100'
                      }`} />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xs font-bold text-slate-900">{entry.title}</h4>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {entry.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{entry.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Consultation Notes */}
          <div className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-150 flex justify-between items-center bg-slate-10/50">
              <h3 className="text-sm font-bold text-slate-900">EHR Consultation Records</h3>
              <button 
                type="button"
                onClick={() => onStartConsultation(patient.id)}
                className="text-blue-800 hover:text-blue-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Session</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {patient.consultationNotes.length === 0 ? (
                <div className="text-slate-400 text-xs p-6 text-center font-medium">No previous electronic consultation notes uploaded.</div>
              ) : (
                patient.consultationNotes.map((note) => (
                  <div key={note.id} className="p-5 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-blue-800 group-hover:underline">{note.title}</span>
                      <span className="text-[10px] font-semibold text-slate-400">{note.date} • {note.doctor}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-medium">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Key warning details & Document viewer */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Allergies highlighted card */}
          <div className="bg-red-50/60 rounded-2xl border border-red-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-red-100/50">
              <AlertOctagon className="w-5 h-5 text-red-650" />
              <h3 className="text-sm font-bold text-red-800">Critical Medical Allergies</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {patient.allergies.length === 0 ? (
                <span className="text-xs font-bold text-slate-500 italic">No allergies registered.</span>
              ) : (
                patient.allergies.map((allergy) => (
                  <span 
                    key={allergy}
                    className="bg-red-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block shadow-xs"
                  >
                    {allergy}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Current Medications List */}
          <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 select-none pb-2 border-b border-slate-100">Live Active Medications</h3>
            <div className="space-y-4">
              {patient.currentMedications.length === 0 ? (
                <div className="text-slate-400 text-xs italic py-2">No medications currently active.</div>
              ) : (
                patient.currentMedications.map((med) => (
                  <div key={med.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-105 flex items-center justify-center text-blue-700 shrink-0">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div className="truncate min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{med.name} {med.strength}</h4>
                      <p className="text-[10px] font-semibold text-slate-400 mt-0.5 truncate">
                        {med.dosage} • {med.frequency} ({med.duration})
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Lab Records Viewer */}
          <div className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/30">
              <h3 className="text-sm font-bold text-slate-900">Lab Diagnostic Panels</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">EHR Attachments</p>
            </div>

            <div className="p-4 space-y-4">
              {/* Highlight Sandbox block */}
              {patient.labReports.length > 0 ? (
                <div 
                  onClick={() => alert(`Simulating file view: Blood_Panel_Oct2023.pdf (Size: 1.2 MB). This secure document has been cryptographic verified on Medicare blockchain ledger.`)}
                  className="relative aspect-[4/3] bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center group cursor-pointer overflow-hidden border-dashed"
                >
                  {/* Blur Hover block */}
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-xs z-10 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button type="button" className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer">
                      <Eye className="w-4 h-4" />
                      <span>View File Panel</span>
                    </button>
                  </div>

                  <FileText className="w-10 h-10 text-slate-400 mb-2 pointer-events-none" />
                  <h4 className="text-xs font-bold text-slate-900 truncate max-w-full pointer-events-none">
                    {patient.labReports[0].name}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1 pointer-events-none">
                    Uploaded {patient.labReports[0].date} • {patient.labReports[0].size}
                  </p>
                  
                  {/* Status checklist progress indicator */}
                  <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-3 max-w-[120px]">
                    <div className="bg-emerald-600 w-full h-full" />
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 text-xs italic py-4 text-center">No loaded lab reports file attachment.</div>
              )}

              {/* Smaller details columns list */}
              {patient.labReports.slice(1).map((report) => (
                <div 
                  key={report.id}
                  onClick={() => alert(`Opening secure attachments: ${report.name}`)}
                  className="flex items-center justify-between p-2.5 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800 truncate max-w-[155px] group-hover:text-blue-700 transition-colors">
                      {report.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 italic shrink-0">{report.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

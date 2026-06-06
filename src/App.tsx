import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Calendar, Bell, ChevronDown, 
  LogOut, ShieldCheck, ClipboardList, Eye, Plus, Sparkles, HelpCircle 
} from 'lucide-react';

// Import local types and presets
import { View, Patient, Appointment, Alert, Doctor, Medication, ConsultationNote } from './types';
import { INITIAL_PATIENTS, INITIAL_APPOINTMENTS, INITIAL_ALERTS, DOCTORS } from './data';

// Import functional screen blocks
import LoginScreen from './components/LoginScreen';
import DoctorDashboard from './components/DoctorDashboard';
import WeeklySchedule from './components/WeeklySchedule';
import PatientList from './components/PatientList';
import PatientDetail from './components/PatientDetail';
import ActiveConsultation from './components/ActiveConsultation';
import DigitalPrescription from './components/DigitalPrescription';
import AlertsManager from './components/AlertsManager';

export default function App() {
  // Authentication & clinical identity state
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(DOCTORS[0]); // Bootstrapped with Sarah Jenkins by default
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  
  // Clinical core reactive databases
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  // Focus workflow pointers
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [activePrescriptionMeds, setActivePrescriptionMeds] = useState<Medication[]>([]);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);

  // Navigation controller helper
  const handleNavigate = (view: View, payload?: string) => {
    setCurrentView(view);
    if (payload) {
      setSelectedPatientId(payload);
    }
  };

  // State handlers - Book scheduling
  const handleBookAppointment = (newAppt: Omit<Appointment, 'id'>) => {
    const formattedAppt: Appointment = {
      ...newAppt,
      id: 'appt_' + Date.now().toString()
    };
    setAppointments([formattedAppt, ...appointments]);
  };

  const handleConfirmAppointment = (id: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Confirmed' } : a));
    
    // Add success notification
    const matched = appointments.find(a => a.id === id);
    if (matched) {
      const newAlert: Alert = {
        id: 'alert_c_' + Date.now().toString(),
        title: 'Appointment Confirmed',
        description: `Consultation Slot with ${matched.patientName} at ${matched.time} has been officially approved.`,
        time: 'Just Now',
        category: 'Follow-up Alerts',
        unread: true,
        type: 'event_repeat',
        patientName: matched.patientName
      };
      setAlerts([newAlert, ...alerts]);
    }
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
  };

  // State handlers - Patient registers
  const handleAddPatient = (newPatient: Patient) => {
    setPatients([newPatient, ...patients]);
    
    // Add registration notification
    const newAlert: Alert = {
      id: 'alert_reg_' + Date.now().toString(),
      title: 'New Patient Record Registered',
      description: `EHR demographic file successfully bootstrapped for ${newPatient.name}. Diagnostic logs initialized.`,
      time: 'Just Now',
      category: 'Follow-up Alerts',
      unread: true,
      type: 'heart_plus',
      patientName: newPatient.name
    };
    setAlerts([newAlert, ...alerts]);
  };

  // State handlers - Secure submissions
  const handleSubmitConsultation = (note: ConsultationNote, medications: Medication[]) => {
    if (!selectedPatientId) return;

    // 1. Append newest consultation note to matching patient timeline
    setPatients(patients.map(p => {
      if (p.id === selectedPatientId) {
        return {
          ...p,
          consultationNotes: [note, ...p.consultationNotes],
          currentMedications: [...medications, ...p.currentMedications],
          medicalHistory: [
            {
              id: 'hist_' + Date.now().toString(),
              title: note.title,
              date: 'Oct 2026',
              description: 'Observed and recorded during active clinician desk session.'
            },
            ...p.medicalHistory
          ]
        };
      }
      return p;
    }));

    // 2. Clear unread alert for this patient if any
    setAlerts(alerts.map(al => al.patientName === patients.find(p => p.id === selectedPatientId)?.name ? { ...al, unread: false } : al));

    // 3. Set medications to load into digital prescription screen
    setActivePrescriptionMeds(medications);

    // 4. Redirect immediately to View.PRESCRIPTION matching user flow
    setCurrentView(View.PRESCRIPTION);
  };

  // State handlers - Clear alerts unread badges
  const handleMarkAlertRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, unread: false } : a));
  };

  const handleMarkAlertDismiss = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  // Get focused patient record object helper
  const getSelectedPatient = (): Patient | undefined => {
    return patients.find(p => p.id === selectedPatientId) || patients[0];
  };

  // Render target screen block dynamically
  const renderActiveScreen = () => {
    if (!currentDoctor) return null;

    switch (currentView) {
      case View.DASHBOARD:
        return (
          <DoctorDashboard 
            currentDoctor={currentDoctor}
            appointments={appointments}
            alerts={alerts}
            patients={patients}
            onNavigateToView={handleNavigate}
          />
        );

      case View.PATIENTS:
        return (
          <PatientList 
            patients={patients}
            onSelectPatient={(id) => handleNavigate(View.PATIENT_DETAIL, id)}
            onAddPatient={handleAddPatient}
          />
        );

      case View.PATIENT_DETAIL:
        const detailPatient = getSelectedPatient();
        if (!detailPatient) return <div>Load error or critical record matching missing.</div>;
        return (
          <PatientDetail 
            patient={detailPatient}
            onBack={() => setCurrentView(View.PATIENTS)}
            onStartConsultation={(id) => handleNavigate(View.ACTIVE_CONSULTATION, id)}
          />
        );

      case View.SCHEDULE:
        return (
          <WeeklySchedule 
            queue={appointments}
            onConfirmAppointment={handleConfirmAppointment}
            onCancelAppointment={handleCancelAppointment}
            onAddAppointment={handleBookAppointment}
          />
        );

      case View.ACTIVE_CONSULTATION:
        const consultPatient = getSelectedPatient();
        if (!consultPatient) return <div>Load error or critical record matching missing.</div>;
        return (
          <ActiveConsultation 
            patient={consultPatient}
            onSaveConsultation={handleSubmitConsultation}
            onDiscard={() => setCurrentView(View.DASHBOARD)}
          />
        );

      case View.PRESCRIPTION:
        const presPatient = getSelectedPatient();
        if (!presPatient) return <div>Load error or critical record matching missing.</div>;
        return (
          <DigitalPrescription 
            patient={presPatient}
            doctor={currentDoctor}
            medications={activePrescriptionMeds}
            onBack={() => setCurrentView(View.DASHBOARD)}
          />
        );

      case View.ALERTS:
        return (
          <AlertsManager 
            alerts={alerts}
            patients={patients}
            onMarkRead={handleMarkAlertRead}
            onDismissAlert={handleMarkAlertDismiss}
            onNavigateToPatient={(id) => handleNavigate(View.PATIENT_DETAIL, id)}
          />
        );

      default:
        return <div>View Constraints error. Re-routing.</div>;
    }
  };

  // If user is not securely logged in, display credential gate first
  if (!currentDoctor) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 md:p-6 font-sans">
        <LoginScreen onLoginSuccess={(doc) => setCurrentDoctor(doc)} />
      </div>
    );
  }

  const unreadAlertsCount = alerts.filter(a => a.unread).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      
      {/* 1. Header Navigation frame (no-print tag avoids cluttering printout) */}
      <header className="sticky top-0 z-45 bg-white border-b border-slate-200 px-4 md:px-8 py-3.5 flex justify-between items-center no-print shadow-2xs select-none">
        
        {/* Brand visual badge */}
        <div 
          onClick={() => setCurrentView(View.DASHBOARD)}
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <ShieldCheck className="w-8 h-8 text-blue-800" />
          <span className="text-xl font-extrabold tracking-tight text-blue-950">MediCare</span>
          <span className="hidden sm:inline bg-blue-50 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
            EHR PORTAL v4.2
          </span>
        </div>

        {/* Action quick shortcut tags */}
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => handleNavigate(View.ALERTS)}
            className="p-2 relative bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
          >
            <Bell className="w-4.5 h-4.5 text-slate-650" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full text-[9px] font-bold shadow-xs">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Practitioner Profile control selector */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setShowDoctorDropdown(!showDoctorDropdown)}
              className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all font-semibold cursor-pointer text-slate-800 text-xs"
            >
              {currentDoctor.avatar ? (
                <img 
                  src={currentDoctor.avatar} 
                  alt={currentDoctor.name} 
                  className="w-7 h-7 rounded-lg object-cover border border-slate-200 shadow-3xs"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 bg-blue-800 text-white font-extrabold rounded-lg flex items-center justify-center text-[10px]">
                  MD
                </div>
              )}
              <span className="hidden md:inline font-bold text-slate-900">{currentDoctor.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showDoctorDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs select-none">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-extrabold text-slate-900 truncate">{currentDoctor.name}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{currentDoctor.specialty}</p>
                </div>
                
                {/* Switch doctors to showcase Neurology views etc */}
                <div className="p-1.5 bg-slate-50 border-b border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 px-2 uppercase tracking-wide">Quick Switch role:</p>
                  {DOCTORS.map((doc) => (
                    <button
                      key={doc.username}
                      onClick={() => {
                        setCurrentDoctor(doc);
                        setShowDoctorDropdown(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded text-[10px] font-bold mt-1 ${
                        currentDoctor.username === doc.username ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {doc.name}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentDoctor(null);
                    setShowDoctorDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 font-semibold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Shift</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </header>

      {/* 2. Main surrounding body frame split with Desktop left sidebar and right views container */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Sticky Desktop Sidebar column (no-print) */}
        <aside className="hidden md:flex md:w-60 bg-white border-r border-slate-200 flex-col py-6 px-4 no-print select-none">
          
          <nav className="space-y-1">
            <button 
              onClick={() => setCurrentView(View.DASHBOARD)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === View.DASHBOARD 
                  ? 'bg-blue-50 text-blue-900 border-l-4 border-l-blue-800' 
                  : 'text-slate-655 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 opacity-80" />
              <span>Shift Dashboard</span>
            </button>

            <button 
              onClick={() => setCurrentView(View.PATIENTS)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === View.PATIENTS || currentView === View.PATIENT_DETAIL
                  ? 'bg-blue-50 text-blue-900 border-l-4 border-l-blue-800' 
                  : 'text-slate-655 hover:bg-slate-50'
              }`}
            >
              <Users className="w-5 h-5 opacity-80" />
              <span>Patient Files</span>
            </button>

            <button 
              onClick={() => setCurrentView(View.SCHEDULE)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === View.SCHEDULE 
                  ? 'bg-blue-50 text-blue-900 border-l-4 border-l-blue-800' 
                  : 'text-slate-655 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-5 h-5 opacity-80" />
              <span>Weekly Schedule</span>
            </button>

            <button 
              onClick={() => setCurrentView(View.ALERTS)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                currentView === View.ALERTS 
                  ? 'bg-blue-50 text-blue-900 border-l-4 border-l-blue-800' 
                  : 'text-slate-655 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-5 h-5 opacity-80" />
              <span>Alert Center</span>
              {unreadAlertsCount > 0 && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full text-[10px] font-bold">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Prompt active consult segment shortcut */}
          <div className="mt-8 pt-6 border-t border-slate-100 select-none">
            <p className="text-[10px] font-bold text-slate-400 px-4 uppercase tracking-widest leading-none mb-3">Consultations</p>
            <button 
              onClick={() => {
                const target = patients.find(p => p.id === '#MC-88291-J') || patients[0];
                handleNavigate(View.ACTIVE_CONSULTATION, target.id);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-blue-800 text-white font-extrabold text-[11px] rounded-xl shadow-xs hover:bg-blue-900 transition-colors cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Active Workspace</span>
            </button>
          </div>

          <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-205 leading-relaxed font-semibold">
            <div className="flex gap-2 items-start text-left text-[11px] text-slate-505 select-none">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-slate-850">Clinical Compliance</p>
                <p className="mt-1">NPI validation token assigned. HIPAA secure channels active on this shift.</p>
              </div>
            </div>
          </div>

        </aside>

        {/* Active main screens content router renderer */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <div className="animate-fade-in">
            {renderActiveScreen()}
          </div>
        </main>

      </div>

      {/* 3. Sticky Bottom dock navigation on Mobile devices (no-print) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 h-16 md:hidden flex justify-around items-center z-45 no-print select-none shadow-lg">
        
        <button 
          onClick={() => setCurrentView(View.DASHBOARD)}
          className={`flex flex-col items-center justify-center py-2 text-center flex-1 cursor-pointer ${
            currentView === View.DASHBOARD ? 'text-blue-800' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1">Dashboard</span>
        </button>

        <button 
          onClick={() => setCurrentView(View.PATIENTS)}
          className={`flex flex-col items-center justify-center py-2 text-center flex-1 cursor-pointer ${
            currentView === View.PATIENTS || currentView === View.PATIENT_DETAIL ? 'text-blue-800' : 'text-slate-400'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1">Patients</span>
        </button>

        <button 
          onClick={() => setCurrentView(View.SCHEDULE)}
          className={`flex flex-col items-center justify-center py-2 text-center flex-1 cursor-pointer ${
            currentView === View.SCHEDULE ? 'text-blue-800' : 'text-slate-400'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1">Schedule</span>
        </button>

        <button 
          onClick={() => setCurrentView(View.ALERTS)}
          className={`flex flex-col items-center justify-center py-2 text-center flex-1 cursor-pointer relative ${
            currentView === View.ALERTS ? 'text-blue-800' : 'text-slate-400'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1">Alerts</span>
          {unreadAlertsCount > 0 && (
            <span className="absolute top-2 right-6 w-4 h-4 bg-red-600 text-white font-bold text-[8px] rounded-full flex items-center justify-center">
              {unreadAlertsCount}
            </span>
          )}
        </button>

      </nav>

    </div>
  );
}

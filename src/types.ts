/**
 * Medicare Application Type Declarations
 */

export enum View {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  SCHEDULE = 'SCHEDULE',
  PATIENTS = 'PATIENTS',
  PATIENT_DETAIL = 'PATIENT_DETAIL',
  ACTIVE_CONSULTATION = 'ACTIVE_CONSULTATION',
  PRESCRIPTION = 'PRESCRIPTION',
  ALERTS = 'ALERTS'
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface ConsultationNote {
  id: string;
  title: string;
  date: string;
  doctor: string;
  content: string;
}

export interface Medication {
  id: string;
  name: string;
  strength: string;
  form: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface LabReport {
  id: string;
  name: string;
  date: string;
  size: string;
  url?: string;
  status: 'processing' | 'ready';
}

export interface Patient {
  id: string; // e.g. #MC-88291-J
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string; // e.g. 05/12/1988
  weight: number; // in kg
  bloodType: string;
  avatar: string;
  status: 'Active' | 'Discharged' | 'Chronic' | 'Critical';
  lastVisit: string;
  allergies: string[];
  medicalHistory: HistoryItem[];
  consultationNotes: ConsultationNote[];
  currentMedications: Medication[];
  labReports: LabReport[];
  vitals?: {
    bp: string;
    hr: number;
  };
}

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  patientAvatar?: string;
  reason: string;
  time: string; // e.g. 09:00 AM or 11:00 AM
  date: string; // YYYY-MM-DD
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  priority: 'High Priority' | 'Stable' | 'Follow-up';
  room?: string;
}

export interface Alert {
  id: string;
  category: 'Critical Results' | 'Appointments' | 'Follow-up Alerts';
  title: string;
  description: string;
  patientName?: string;
  patientId?: string;
  time: string; // relative string e.g. '14 mins ago'
  unread: boolean;
  type: string; // for icons like 'biotech', 'heart_plus', 'event_repeat', etc.
  actionLabel?: string;
}

export interface Doctor {
  name: string;
  username: string; // email matching
  specialty: string;
  avatar: string;
  license: string;
  contact: string;
  npi: string;
  department: string;
}

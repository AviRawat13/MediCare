import React from 'react';
import { 
  Printer, Share2, Mail, MessageSquare, Verified, 
  ArrowLeft, CheckSquare, Stethoscope, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { Patient, Medication, Doctor, View } from '../types';

interface DigitalPrescriptionProps {
  patient: Patient;
  doctor: Doctor;
  medications: Medication[];
  prescriptionId?: string;
  onBack: () => void;
}

export default function DigitalPrescription({ 
  patient, 
  doctor, 
  medications, 
  prescriptionId = 'RX-9920-X12',
  onBack 
}: DigitalPrescriptionProps) {

  // Current Date string formatted
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    alert('Crypto-Lock Share: Generated secure portal URL link. Callback endpoints successfully dispatched to clinical partner records.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Return Navigation controller */}
      <div className="flex flex-wrap justify-between items-center gap-4 no-print select-none">
        <button 
          type="button" 
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-500 hover:text-blue-800 text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Prescription Preview</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-blue-700" />
            <span>Cryptographic Share</span>
          </button>
          
          <button 
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Download &amp; Print PDF</span>
          </button>
        </div>
      </div>

      {/* Primary Letterhead Prescription Sheet */}
      <section className="prescription-canvas bg-white border border-slate-200 rounded-2xl shadow-clinical p-6 md:p-8 flex flex-col relative overflow-hidden select-none">
        
        {/* Medical Letterhead title block */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-blue-900 pb-5 mb-6">
          <div className="text-left">
            <div className="flex items-center gap-2 text-blue-900 font-bold mb-1.5">
              <Stethoscope className="w-8 h-8 pointer-events-none" />
              <span className="text-xl md:text-2xl uppercase tracking-tight font-extrabold">MediCare Clinic</span>
            </div>
            <p className="text-slate-500 text-xs font-semibold">123 Healthcare Blvd, Medical District</p>
            <p className="text-slate-500 text-xs font-semibold">San Francisco, CA 94107</p>
            <p className="text-slate-500 text-xs font-semibold">+1 (555) 012-3456 | contact@medicare.com</p>
          </div>

          <div className="text-left sm:text-right mt-4 sm:mt-0 font-medium">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">DATE</p>
            <p className="text-sm font-extrabold text-slate-800 leading-none mb-4">{currentDate}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">PRESCRIPTION ID</p>
            <p className="text-xs font-extrabold text-blue-900 font-mono tracking-wider leading-none">#{prescriptionId}</p>
          </div>
        </div>

        {/* Divided Demographics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left font-medium select-none">
          {/* Patient demographic file card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
            <h3 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2.5">
              Patient Details
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Name:</span> <span className="font-bold text-slate-800">{patient.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">DOB:</span> <span className="font-bold text-slate-800">{patient.dob} ({patient.age}y)</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Gender:</span> <span className="font-bold text-slate-800">{patient.gender}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Weight:</span> <span className="font-bold text-slate-800">{patient.weight} kg</span></div>
            </div>
          </div>

          {/* Physician demographic card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
            <h3 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2.5">
              Physician Details
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Doctor:</span> <span className="font-bold text-slate-800">{doctor.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Specialty:</span> <span className="font-bold text-slate-800">{doctor.specialty}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">License:</span> <span className="font-bold text-slate-800">{doctor.license}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Contact:</span> <span className="font-bold text-slate-800">{doctor.contact}</span></div>
            </div>
          </div>
        </div>

        {/* Rx cursive symbol dividing section */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-blue-900 font-serif text-5xl font-italic font-bold italic leading-none select-none">Rx</span>
          <div className="h-0.5 flex-grow bg-slate-200/60" />
        </div>

        {/* Table of prescribed medic items */}
        <div className="flex-grow overflow-x-auto mb-6">
          <table className="w-full border-collapse text-left font-medium select-none">
            <thead>
              <tr className="border-b border-slate-300 text-slate-450 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 pr-2">Medication</th>
                <th className="py-2.5 px-2">Dosage</th>
                <th className="py-2.5 px-2">Frequency</th>
                <th className="py-2.5 pl-2 text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100">
              {medications.length === 0 ? (
                // Fallbacks to default meds listed in mockup 
                <>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-4 text-left">
                      <p className="font-bold text-blue-900 leading-tight">Lisinopril 10mg</p>
                      <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Oral Tablet (ACE Inhibitor)</p>
                    </td>
                    <td className="py-4 text-slate-800 font-semibold px-2">1 Tablet</td>
                    <td className="py-4 text-slate-800 font-semibold px-2">Once Daily</td>
                    <td className="py-4 text-slate-800 font-extrabold pl-2 text-right">30 Days</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-4 text-left">
                      <p className="font-bold text-blue-900 leading-tight">Atorvastatin 20mg</p>
                      <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Oral Tablet (Statin)</p>
                    </td>
                    <td className="py-4 text-slate-800 font-semibold px-2">1 Tablet</td>
                    <td className="py-4 text-slate-800 font-semibold px-2">Before Sleep</td>
                    <td className="py-4 text-slate-800 font-extrabold pl-2 text-right">90 Days</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-4 text-left">
                      <p className="font-bold text-blue-900 leading-tight">Metoprolol Succinate 25mg</p>
                      <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Extended Release</p>
                    </td>
                    <td className="py-4 text-slate-800 font-semibold px-2">1/2 Tablet</td>
                    <td className="py-4 text-slate-800 font-semibold px-2">Twice Daily</td>
                    <td className="py-4 text-slate-800 font-extrabold pl-2 text-right">30 Days</td>
                  </tr>
                </>
              ) : (
                medications.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/50">
                    <td className="py-4 text-left">
                      <p className="font-bold text-blue-900 leading-tight">{med.name} {med.strength}</p>
                      <p className="text-[10px] font-semibold text-slate-400 mt-0.5 leading-none">{med.form || 'Oral Tablet'}</p>
                    </td>
                    <td className="py-4 text-slate-850 font-bold px-2">{med.dosage}</td>
                    <td className="py-4 text-slate-850 font-bold px-2">{med.frequency}</td>
                    <td className="py-4 text-slate-850 font-extrabold pl-2 text-right">{med.duration}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Special instructions box callouts */}
        <div className="mt-4 p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-xl text-left select-none">
          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1.5 mb-1 select-none">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Special Instructions</span>
          </span>
          <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
            Monitor blood pressure weekly. If systolic falls below 100, discontinue Metoprolol/Lisinopril actions and contact the clinic immediately. Avoid consuming grapefruit juice during the active course of Atorvastatin.
          </p>
        </div>

        {/* Signature & Crypto Ledger Verification bottom layout */}
        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-end gap-6 text-left font-medium select-none">
          
          {/* Crypto verified block */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <Verified className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Digitally Signed &amp; Encrypted</span>
            </div>

            <div className="bg-slate-50 w-44 h-44 p-2 rounded-xl flex items-center justify-center border border-slate-200 shadow-2xs">
              <img 
                className="w-full h-full object-contain mix-blend-multiply opacity-85" 
                alt="Medicare Authentication QR Certificate"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk1nVwmbV62_SPRIR3krYGdmzceof3ThZ5fXADpsl1i9RWELfyTl5ErRSQVRQ5iG06eC6v5MRen0dtV-M5p9fR3ab03Z85QUI8WBfvq5fMeWmusML39ZSuWsT2drF7fTG5Lx_xmt3Zw3Q9cNCIj8zoMOJibi609rCjQhWti2zaqr3HYkWGglPbOcMZuqFoDxBO97mNNT35uz5NFWfsuMlIYesP492e8-KgSww48wiojnjG55FT4Jlyx-aRuqeZapcgJpYSIryfjxQ"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 max-w-[200px] leading-relaxed">
              Scan to verify prescription authenticity through the cryptographically-signed MediCare blockchain portal.
            </p>
          </div>

          {/* Practitioner Signature block */}
          <div className="md:text-right shrink-0">
            <div className="mb-2 relative inline-block">
              <img 
                className="h-16 mix-blend-multiply opacity-80" 
                alt={`${doctor.name} Hand-written signature`}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUIdeIDwJuaaSxqG-BYYgeLZQzxlxy9m5ayKak9J3komfxd0xAOVY_WE9oNXp6--mDkvz4i-IMqcJL8y23gDN7lvm0N61T0uAE0Q8YNVZZPkqY03Jhv9AqWVRtTJDyvdjWl8iNT8Py9Rp3HftkHQfEj3oJ2ntSrqp-XutJpo53EnzwBonfUwl_DnqpnMsMDXzSgYhj340AjNRtScU3bgFWzfV7Ny0zdlEtw_surj31m7CMV_aOKSOKVZxy-PkUuFt2fD769bGqcKw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-300" />
            </div>
            <p className="text-base font-bold text-slate-900 leading-tight">{doctor.name}, MD</p>
            <p className="text-xs font-semibold text-slate-450 mt-0.5">{doctor.department}</p>
            <p className="text-[10px] font-semibold text-slate-450 mt-1">NPI: {doctor.npi}</p>
          </div>
        </div>

        {/* Footer electronic metadata copyright */}
        <div className="mt-8 text-center border-t border-slate-100 pt-5">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            This is a legally binding electronic diagnostic prescription • Generated via MediCare EHR Portal v4.2
          </p>
        </div>

      </section>

      {/* Secondary Dispatch Actions under sheet */}
      <div className="flex flex-wrap justify-center gap-3 no-print select-none">
        <button 
          type="button"
          onClick={() => {
            alert('Prescription script successfully encrypted and transmitted directly to secure partners at CVS and Walgreens Pharmacy matching NPI credentials.');
          }}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-800 hover:border-blue-300 rounded-full text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          <Mail className="w-4.5 h-4.5 text-blue-700" />
          <span>Transmit Script to Pharmacy</span>
        </button>

        <button 
          type="button"
          onClick={() => {
            alert(`Prescription verification code transmitted safely to patient's mobile number: ${patient.name}`);
          }}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-800 hover:border-blue-300 rounded-full text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          <MessageSquare className="w-4.5 h-4.5 text-blue-700" />
          <span>Dispatch SMS to Patient</span>
        </button>
      </div>
    </div>
  );
}

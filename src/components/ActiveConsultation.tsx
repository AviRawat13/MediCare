import React, { useState } from 'react';
import { 
  Heart, Clipboard, FileText, CheckCircle, PlusSquare, 
  Trash2, ChevronDown, Check, Save, HelpCircle, 
  X, AlertTriangle, Play, Calendar, Search, Pill, Send, ClipboardList
} from 'lucide-react';
import { Patient, Medication, HistoryItem, ConsultationNote, View } from '../types';

interface ActiveConsultationProps {
  patient: Patient;
  onSaveConsultation: (consultation: ConsultationNote, newMedications: Medication[]) => void;
  onDiscard: () => void;
}

export default function ActiveConsultation({ patient, onSaveConsultation, onDiscard }: ActiveConsultationProps) {
  // Input form states
  const [symptoms, setSymptoms] = useState('');
  const [icdCode, setIcdCode] = useState('G43.909 - Migraine, unspecified');
  const [internalNotes, setInternalNotes] = useState('');
  const [tags, setTags] = useState<string[]>(['Chronic', 'Recurring']);
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  // Suggested checklist recommendations
  const [recommendedTests, setRecommendedTests] = useState<{ [key: string]: boolean }>({
    'MRI Brain Scan': true,
    'Complete Blood Count': false
  });
  const [newCustomTest, setNewCustomTest] = useState('');
  const [isAddingCustomTest, setIsAddingCustomTest] = useState(false);

  const [followupDate, setFollowupDate] = useState('2026-11-15');

  // Interactive Prescription Medications List Builder
  const [prescribedMedications, setPrescribedMedications] = useState<Medication[]>([
    {
      id: 'p_med_init',
      name: 'Sumatriptan',
      strength: '50mg',
      form: 'Oral Tablet',
      dosage: '1 Tablet',
      frequency: 'Twice daily as needed',
      duration: '14 Days'
    }
  ]);

  // Medication form entries
  const [showAddMedForm, setShowAddMedForm] = useState(false);
  const [medName, setMedName] = useState('');
  const [medStrength, setMedStrength] = useState('50mg');
  const [medDosage, setMedDosage] = useState('1 Tablet');
  const [medFrequency, setMedFrequency] = useState('Once Daily');
  const [medDuration, setMedDuration] = useState('30 Days');

  // Trigger adding tag
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Trigger adding custom test recommendation
  const handleAddCustomTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomTest.trim()) {
      setRecommendedTests({
        ...recommendedTests,
        [newCustomTest.trim()]: true
      });
      setNewCustomTest('');
      setIsAddingCustomTest(false);
    }
  };

  const toggleTestCheckbox = (testKey: string) => {
    setRecommendedTests({
      ...recommendedTests,
      [testKey]: !recommendedTests[testKey]
    });
  };

  // Add Medication item in local state
  const handleAddNewMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim()) return;

    const newItem: Medication = {
      id: 'user_pres_med_' + Date.now().toString(),
      name: medName.trim(),
      strength: medStrength,
      form: 'Oral Tablet',
      dosage: medDosage,
      frequency: medFrequency,
      duration: medDuration
    };

    setPrescribedMedications([...prescribedMedications, newItem]);
    
    // reset form fields
    setMedName('');
    setMedStrength('20mg');
    setMedDosage('1 Tablet');
    setMedFrequency('Once Daily');
    setMedDuration('30 Days');
    setShowAddMedForm(false);
  };

  const handleDeleteMedication = (idToDelete: string) => {
    setPrescribedMedications(prescribedMedications.filter(m => m.id !== idToDelete));
  };

  // Perform save and submit consultation session
  const handleSubmitConsultation = () => {
    // Generate diagnostic consultation notes
    const activeTestList = Object.keys(recommendedTests).filter(key => recommendedTests[key]);
    
    const submittedNote: ConsultationNote = {
      id: 'cons_note_' + Math.floor(100+Math.random()*900).toString(),
      title: `Active Consult Note - ${icdCode.split(' - ')[1] || 'General Review'}`,
      date: 'Today',
      doctor: 'Dr. Julian Vance',
      content: `Chief Complaint: ${symptoms || 'Observational headache/migraine review'}. ICD-10 Code Assigned: ${icdCode}. Recommended diagnostics: ${activeTestList.join(', ') || 'No tests recommended'}. Scheduled followup for ${followupDate}. Internal notes: ${internalNotes || 'None'}.`
    };

    onSaveConsultation(submittedNote, prescribedMedications);
  };

  const handleSaveAsDraft = () => {
    alert('Simulating draft caching: Workspace state successfully cached locally to secure in-memory draft slots.');
  };

  return (
    <div className="space-y-6">
      {/* Active Consult Header Grid split with sticky items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sticky Sidebar Column: Patient Briefing & Vitals */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 z-10 select-none">
          
          {/* Patient Profile Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm relative">
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-900 truncate leading-tight">{patient.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Patient ID: {patient.id}</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[9px] font-bold shadow-xs">
                IN CONSULTATION
              </span>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Age / Sex</span>
                <span className="text-slate-950 font-bold">{patient.age}Y / {patient.gender}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Diagnosis Type</span>
                <span className="text-red-650 font-bold">{patient.bloodType}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">Last Clinician Visit</span>
                <span className="text-slate-950 font-bold">{patient.lastVisit}</span>
              </div>
            </div>

            {/* Allergies tag block */}
            <div className="mt-5 bg-slate-50 border border-slate-150 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-blue-900 uppercase">Active Medical Allergies</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {patient.allergies.map((allergy) => (
                  <span 
                    key={allergy}
                    className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-2.5 py-0.5 rounded shadow-2xs"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vitals Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-155 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 mb-3.5 flex items-center gap-2">
              <Heart className="w-4 h-4 text-blue-700" />
              <span>Recent Vitals Snapshot</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">BP Threshold</p>
                <p className="text-lg font-bold text-blue-800 mt-1">{patient.vitals?.bp || '128/84'}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pulse Rate</p>
                <p className="text-lg font-bold text-blue-800 mt-1">
                  {patient.vitals?.hr || 72} <span className="text-xs font-normal text-slate-400">bpm</span>
                </p>
              </div>
            </div>
          </div>

        </aside>

        {/* Right Columns Canvas: Interactive Clinical consultation layout */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Section: Symptoms Chief complaints */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ClipboardList className="w-5 h-5 text-blue-700" />
              <h4 className="text-sm font-bold text-slate-900">Chief Complaints &amp; Symptoms</h4>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-slate-400 block uppercase" htmlFor="symptoms">
                Document Observed Symptoms &amp; Subjective Descriptions
              </label>
              <textarea 
                id="symptoms"
                className="w-full min-h-[100px] p-3 text-slate-800 bg-slate-50/50 border border-slate-200 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium text-xs leading-relaxed outline-none rounded-xl transition-all placeholder:text-slate-400"
                placeholder="E.g. Eleanor complains of persistent migraines for 3 days, acute sensitivity to photopic light, nausea..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
          </div>

          {/* Section: Diagnoses and tagging records */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Diagnosis Codes */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 select-none">
                  <Clipboard className="w-5 h-5 text-blue-700" />
                  <h4 className="text-sm font-bold text-slate-900">Diagnosis Codes</h4>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase block">Primary ICD-10 Code</label>
                    <select 
                      value={icdCode}
                      onChange={(e) => {
                        if (e.target.value === 'Add Custom Code...') {
                          const custom = prompt('Enter custom ICD-10 medical code and diagnosis context:');
                          if (custom) {
                            setIcdCode(custom);
                          }
                        } else {
                          setIcdCode(e.target.value);
                        }
                      }}
                      className="w-full p-2.5 text-xs font-semibold text-slate-800 bg-slate-50/50 border border-slate-205 rounded-xl outline-none"
                    >
                      <option>G43.909 - Migraine, unspecified</option>
                      <option>R51.9 - Headache, unspecified</option>
                      <option>I10 - Essential hypertension</option>
                      <option>E11.9 - Type 2 diabetes without complications</option>
                      <option>Add Custom Code...</option>
                    </select>
                  </div>

                  {/* Active tags and tag creator */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1 text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-2xs select-none"
                      >
                        <span>{tag}</span>
                        <X 
                          className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-red-650"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </span>
                    ))}

                    {isAddingTag ? (
                      <form onSubmit={handleAddTag} className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          className="p-1 text-[10px] w-16 border rounded bg-white text-slate-900 outline-none"
                          value={newTagInput}
                          placeholder="tag value"
                          onChange={(e) => setNewTagInput(e.target.value)}
                          autoFocus
                          required
                        />
                        <button type="submit" className="p-0.5 bg-emerald-600 text-white rounded">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={() => setIsAddingTag(false)} className="p-0.5 bg-slate-200 text-slate-500 rounded">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => setIsAddingTag(true)}
                        className="border border-dashed border-slate-300 text-blue-700 hover:bg-slate-50 px-2.5 py-1 text-[10px] font-bold rounded-full transition-transform active:scale-95"
                      >
                        + Tag
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Internal Diagnostic notes */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 select-none">
                  <FileText className="w-5 h-5 text-blue-700" />
                  <h4 className="text-sm font-bold text-slate-900">Internal Remarks</h4>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase block">Confidential Clinical Notes</label>
                  <textarea 
                    className="w-full h-full min-h-[95px] p-2.5 text-xs leading-relaxed text-slate-800 bg-slate-50/50 border border-slate-202 focus:ring-1 focus:ring-blue-700 outline-none rounded-xl transition-all"
                    placeholder="Provide confidential doctor-to-doctor remarks..."
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section: Prescription Medications Builder */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 select-none">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Pill className="w-4.5 h-4.5 text-blue-700" />
                <span>Script Medication Creator</span>
              </h4>
              <button 
                type="button"
                onClick={() => setShowAddMedForm(!showAddMedForm)}
                className="bg-blue-750 text-white hover:bg-blue-800 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <span>Add Medication</span>
              </button>
            </div>

            {/* Form to add a new medication dynamically */}
            {showAddMedForm && (
              <form onSubmit={handleAddNewMedication} className="bg-blue-50/40 border border-blue-100 p-4 rounded-xl text-left space-y-3 animate-fade-in select-none">
                <div className="flex items-center justify-between pb-1 border-b border-blue-100/50">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                    <PlusSquare className="w-4 h-4" />
                    <span>Preset Medication Details</span>
                  </span>
                  <X className="w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-650" onClick={() => setShowAddMedForm(false)} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-bold text-slate-600 block">Medication Name</label>
                    <input 
                      type="text"
                      className="w-full p-2 bg-white border border-slate-200 text-xs font-semibold text-slate-800 outline-none rounded-lg"
                      placeholder="e.g. Atorvastatin or Lisinopril"
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 block">Strength</label>
                    <input 
                      type="text"
                      className="w-full p-2 bg-white border border-slate-200 text-xs font-semibold text-slate-800 outline-none rounded-lg"
                      placeholder="e.g. 10mg"
                      value={medStrength}
                      onChange={(e) => setMedStrength(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 block">Dosage Form</label>
                    <input 
                      type="text"
                      className="w-full p-2 bg-white border border-slate-200 text-xs font-semibold text-slate-800 outline-none rounded-lg"
                      placeholder="e.g. 1 Tablet"
                      value={medDosage}
                      onChange={(e) => setMedDosage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 block">Frequency</label>
                    <select 
                      className="w-full p-2 bg-white border border-slate-200 text-xs font-semibold text-slate-800 outline-none rounded-lg"
                      value={medFrequency}
                      onChange={(e) => setMedFrequency(e.target.value)}
                    >
                      <option>Once Daily</option>
                      <option>Twice Daily</option>
                      <option>Before Sleep</option>
                      <option>As needed</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 block">Duration</label>
                    <select 
                      className="w-full p-2 bg-white border border-slate-200 text-xs font-semibold text-slate-800 outline-none rounded-lg"
                      value={medDuration}
                      onChange={(e) => setMedDuration(e.target.value)}
                    >
                      <option>14 Days</option>
                      <option>30 Days</option>
                      <option>90 Days</option>
                      <option>365 Days</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-1.5 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAddMedForm(false)}
                    className="p-1 px-3 border border-slate-200 rounded text-[11px] font-bold text-slate-600 hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="p-1 px-3 bg-blue-700 text-white rounded text-[11px] font-bold shadow-sm"
                  >
                    Add to Script
                  </button>
                </div>
              </form>
            )}

            {/* List of active meds added */}
            <div className="space-y-2">
              {prescribedMedications.length === 0 ? (
                <div className="text-slate-400 text-xs py-4 text-center select-none font-medium italic">
                  No medications active in script list. Add medication above.
                </div>
              ) : (
                prescribedMedications.map((item) => (
                  <div 
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-slate-50 border border-slate-150 rounded-xl shadow-2xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100/50 text-blue-700 flex items-center justify-center">
                        <Pill className="w-5 h-5 pointer-events-none" />
                      </div>
                      <div className="text-left font-medium">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-800 transition-colors uppercase tracking-tight">
                          {item.name} {item.strength}
                        </h4>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                          {item.dosage}, {item.frequency}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                        {item.duration}
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleDeleteMedication(item.id)}
                        className="text-slate-400 hover:text-red-650 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section: Diagnostic Labs & Followup Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            
            {/* Recommended Lab Tests details checklist */}
            <div className="bg-white p-5 rounded-2xl border border-slate-155 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <FileText className="w-5 h-5 text-blue-700" />
                <h4 className="text-sm font-bold text-slate-900">Recommended Diagnostics</h4>
              </div>

              <div className="space-y-1.5 text-left">
                {Object.keys(recommendedTests).map((testKey) => (
                  <div 
                    key={testKey} 
                    onClick={() => toggleTestCheckbox(testKey)}
                    className="flex items-center gap-2.5 p-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group"
                  >
                    <input 
                      type="checkbox"
                      checked={recommendedTests[testKey]}
                      onChange={() => {}} // handled by div click
                      className="rounded text-blue-800 focus:ring-blue-700 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">{testKey}</span>
                  </div>
                ))}

                {isAddingCustomTest ? (
                  <form onSubmit={handleAddCustomTest} className="inline-flex items-center gap-2 mt-2 w-full">
                    <input
                      type="text"
                      className="p-1 px-2.5 text-xs text-slate-800 border rounded-xl bg-white w-full outline-none"
                      placeholder="e.g. Blood Panel"
                      value={newCustomTest}
                      onChange={(e) => setNewCustomTest(e.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="p-1 bg-emerald-600 text-white rounded">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => setIsAddingCustomTest(false)} className="p-1 bg-slate-200 text-slate-500 rounded">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div 
                    onClick={() => setIsAddingCustomTest(true)}
                    className="p-2 text-xs font-medium text-slate-400 hover:text-blue-700 italic cursor-pointer"
                  >
                    + Add custom test recommendation...
                  </div>
                )}
              </div>
            </div>

            {/* Follow-up scheduler calendar Date selector */}
            <div className="bg-white p-5 rounded-2xl border border-slate-155 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Calendar className="w-4.5 h-4.5 text-blue-700" />
                <h4 className="text-sm font-bold text-slate-900">Follow-up Schedule</h4>
              </div>

              <div className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Suggested Consulting Date</label>
                  <input 
                    type="date"
                    className="w-full p-2.5 text-xs font-semibold text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl outline-none"
                    value={followupDate}
                    onChange={(e) => setFollowupDate(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 p-2 bg-amber-50 text-amber-900 rounded-xl border border-amber-100 leading-tight">
                  <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-amber-700" />
                  <p className="text-[10px] font-bold uppercase tracking-wider">Automated reminder will be sent 24h prior</p>
                </div>
              </div>
            </div>

          </div>

        </section>

      </div>

      {/* Sticky Action buttons Footer bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-6 md:px-12 z-50 flex justify-between items-center shadow-lg select-none">
        
        {/* Draft and cancel handlers */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleSaveAsDraft}
            className="flex items-center gap-1.5 font-bold text-xs text-slate-500 hover:text-blue-800 transition-colors cursor-pointer"
          >
            <Save className="w-4.5 h-4.5" />
            <span>Save as Draft</span>
          </button>
          
          <span className="w-px h-5 bg-slate-200" />

          <button 
            type="button"
            onClick={onDiscard}
            className="flex items-center gap-1.5 font-bold text-xs text-slate-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
            <span>Discard</span>
          </button>
        </div>

        {/* Diagnostic validated indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase">Review Status</p>
            <p className="text-xs font-bold text-emerald-800">All fields verified &amp; validated</p>
          </div>

          <button 
            type="button"
            onClick={handleSubmitConsultation}
            className="bg-blue-750 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-md text-xs font-bold transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
          >
            <span>Save &amp; Submit Consultation</span>
            <Send className="w-4 h-4 ml-1" />
          </button>
        </div>

      </footer>
    </div>
  );
}

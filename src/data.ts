import { Patient, Appointment, Alert, Doctor } from './types';

export const DOCTORS: Doctor[] = [
  {
    name: 'Dr. Sarah Jenkins',
    username: 'sarah.jenkins@medicare.com',
    specialty: 'Senior Cardiologist',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6QDEIY2OIbAqAS8_tog6sw71kgltWDgLyCKM9CvT8YyMqESY4apewsgp8MUpu-K7dwXl4n9SgElEisvZdx0mP47GhiZKSWR5SDuYqCYZwIF44jy7XM7D7PJ3WBF-5SnPgrTX4y99bKAX49ChRACZyYzIDbk7IcgTRg5tzI8hG1_AnLFLGEeFX6FXT9xESaXBC2lqO2wRy29K79EU6NGA4eF1P_gU9ZAUOCH-YjF-jaOTb281nJ38HAXbyLh4RkI6uEMmP_grZHtQ',
    license: '#MD-992012',
    contact: 'ext. 504',
    npi: '1029384756',
    department: 'Cardiology Department Head'
  },
  {
    name: 'Dr. Julian Vance',
    username: 'julian.vance@medicare.com',
    specialty: 'Neurologist',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgr4j58pvvTYMy2CI7rXl9kgdMCl7S-5S6gZ2pUwwxHs-rEFy18XVwbbOPpiH9BHiZw5d4qp9ZP-t9Eohcmuq6jYdtORbHW0m6s8aE7anqcPOchwMNAeXSOtaGxzWR8MdcA8hCQBSY_YeSTMxjDXakN9Zc8smNgmv_KTzPMUO_UvgqkaJMQPRigIXmmjnSF6wKqEg0xvd8ExXgzpkPjRML8dw7ddAw3XMqUbBXCwJnHI4wVQ2BmjvNEMgZCuyStkEXl8ddHk1XjZI',
    license: '#MD-712893',
    contact: 'ext. 402',
    npi: '5819381023',
    department: 'Neurology Department Head'
  },
  {
    name: 'Dr. Alexander Chen',
    username: 'dr.smith@medicare.com', // fallback default
    specialty: 'Cardiology Head',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDNPmXdoihQXWtOhq8uOZG74Xu-yuf5pfNXmJKJGdreiVhOTjbVAKmOlfXW0l1SdqXCI5HcDkDgvhauYfgpvZPBDk0VZHFS-4ovFxRRtzjhwZ1f7mmqkZO-yrkuidm6pBTOKybBrHW7uQbtXVBx6bEtczP9ICACiIXxPZRMU00tQ-7UBQK3K610Lq6BcXiRxVMMbSQVDDf0LJdWlzPjYo6Zl8IciFzsZGK4SgYxUkxhLCzB4oIambELSXhlbJIskTNByNCO55e290',
    license: '#MD-882910',
    contact: 'ext. 402',
    npi: '1029384756',
    department: 'Cardiology Department Head'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: '#MC-88291-J',
    name: 'Jane Cooper',
    age: 42,
    gender: 'Female',
    dob: '05/12/1981',
    weight: 64,
    bloodType: 'O Positive',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPOLekDkaQcXYop-yx-8me-s2WgiwXgfFzKOSOR5WRqW9slCEoDFnD3tFQExqo57zsWnMBpldrKjjxK01nIQp6ivNX3I810OIdto_Cu1L1BwoHjTV2jk_cZAteznD3Wgm3UnudReVEXA4WZ78jyeANwZUj-r6fcEv-s0Ra9pRocdrcVz2Vw3H09zt-bxvBmdjlDbeFwoySYjfgqQ5c2WmTrWLzQp-FdDFwHZyalZCzHfuZJGyg_kzkpaAfhAY_1fWilJpNl3D84U',
    status: 'Active',
    lastVisit: 'Oct 12, 2023',
    allergies: ['Penicillin', 'Latex', 'Shellfish'],
    vitals: { bp: '128/84', hr: 72 },
    medicalHistory: [
      {
        id: 'h1',
        title: 'Chronic Hypertension Diagnosis',
        date: 'Dec 2022',
        description: 'Confirmed after series of high blood pressure readings. Prescribed initial dosage of Lisinopril 10mg.'
      },
      {
        id: 'h2',
        title: 'Appendectomy Surgery',
        date: 'Aug 2018',
        description: 'Emergency laparoscopic procedure performed at St. Mary’s General. No postoperative complications reported.'
      },
      {
        id: 'h3',
        title: 'Type 2 Diabetes Screening',
        date: 'May 2015',
        description: 'Negative screening. Advised diet and exercise modifications due to family history markers.'
      }
    ],
    consultationNotes: [
      {
        id: 'n1',
        title: 'Follow-up Exam',
        date: 'Oct 12, 2023',
        doctor: 'Dr. Sarah Miller',
        content: 'Patient reports consistent BP readings within normal range. Dosage of Lisinopril remains effective. Recommended continued low-sodium diet and daily walking regimen.'
      },
      {
        id: 'n2',
        title: 'Lab Results Review',
        date: 'Sep 05, 2023',
        doctor: 'Dr. Sarah Miller',
        content: 'Reviewed metabolic panel and A1C levels. A1C remains stable at 5.4%. Lipids slightly elevated compared to last screening. Discussed statin options vs lifestyle changes.'
      }
    ],
    currentMedications: [
      {
        id: 'm1',
        name: 'Lisinopril',
        strength: '10mg',
        form: 'Oral Tablet',
        dosage: '1 Tablet',
        frequency: 'Once Daily',
        duration: '30 Days'
      },
      {
        id: 'm2',
        name: 'Metformin',
        strength: '500mg',
        form: 'Oral Tablet',
        dosage: '1 Tablet',
        frequency: 'Twice Daily (Preventative)',
        duration: '90 Days'
      },
      {
        id: 'm3',
        name: 'Multivitamin',
        strength: 'Standard Dosage',
        form: 'Capsule',
        dosage: '1 Capsule',
        frequency: 'Daily Supplement',
        duration: '365 Days'
      }
    ],
    labReports: [
      {
        id: 'l1',
        name: 'Blood_Panel_Oct2023.pdf',
        date: 'Oct 09, 2023',
        size: '1.2 MB',
        status: 'ready'
      },
      {
        id: 'l2',
        name: 'Urine_Analysis.pdf',
        date: 'Sep 15, 2023',
        size: '850 KB',
        status: 'ready'
      },
      {
        id: 'l3',
        name: 'Chest_XRay_Results.pdf',
        date: 'Aug 02, 2023',
        size: '4.5 MB',
        status: 'ready'
      }
    ]
  },
  {
    id: '#MS-8842',
    name: 'Sarah Johnson',
    age: 68,
    gender: 'Female',
    dob: '08/21/1955',
    weight: 70,
    bloodType: 'A Positive',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdQWDxm6yJVgaPdDFuBP7Z34b7XPm0G2alN59VCLc_uVfqlDUqVZNoe2s5_-7ST1IuRzq-x2g6_vHS3l17bw2un2rFyrGsq34B3O0kuIEOVaL9k2TCwiZGJI1PtX1QyHXvPfsxR0eujrb846qJEd-2bFFFzednE_v6fW46hNPzKeTHutTmAMz37CpNrvm3SNhUgr4a0bN9FS4Sf4MrXtc2V3fvUNFe3lNHbrivlm5FJxzYu8tvFQ1GCdWjNGC-xzVzmTIuWdBMa0g',
    status: 'Active',
    lastVisit: 'Oct 12, 2023',
    allergies: ['Penicillin'],
    vitals: { bp: '130/82', hr: 68 },
    medicalHistory: [
      {
        id: 'h_sj1',
        title: 'Mild Osteoarthritis of knees',
        date: 'Jan 2021',
        description: 'Recommended knee stretches, hot compress therapy, and naproxen when required.'
      }
    ],
    consultationNotes: [
      {
        id: 'cn_sj1',
        title: 'Routine Health Checkup',
        date: 'Oct 12, 2023',
        doctor: 'Dr. Sarah Jenkins',
        content: 'No major chest complaints. Vitals are stable. Adjust Lisinopril slightly if blood pressure increases.'
      }
    ],
    currentMedications: [
      {
        id: 'm_sj1',
        name: 'Lisinopril',
        strength: '10mg',
        form: 'Oral Tablet',
        dosage: '1 Tablet',
        frequency: 'Once Daily',
        duration: '90 Days'
      }
    ],
    labReports: []
  },
  {
    id: '#MS-9104',
    name: 'Michael Chen',
    age: 42,
    gender: 'Male',
    dob: '11/05/1981',
    weight: 78,
    bloodType: 'B Positive',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiEGc9XnVrdZpm9c7AiFOecwGaBAZArTMOmmuP7-F0qUxHshtPzaqGz7ln8BVGNYC_xhyGcN7tsX-LN06hORPJnVoLJg5G3n1E8lohWFHBmuGYmJFZFAFTOMzkkxwtHTga264zwdsvQ-RO-WUoSwx1SbdPNU0054QIF7inUsun4ZBeGfFCkCGkf8RsPVRwsm_nhp2lG7qKbhq7PlCBKy4zIAhFJo3lU0j1zEF7K0ncP4IKG8DdLWO4-20c8GyxuVYgQaqEC0i20gg',
    status: 'Chronic',
    lastVisit: 'Nov 05, 2023',
    allergies: [],
    vitals: { bp: '124/80', hr: 74 },
    medicalHistory: [
      {
        id: 'h_mc1',
        title: 'Chronic Gout Management',
        date: 'Jun 2020',
        description: 'Prescribed Allopurinol 100mg to lower uric acid levels. Advised dietary restrictions on purine-rich diets.'
      }
    ],
    consultationNotes: [
      {
        id: 'cn_mc1',
        title: 'Gout Follow-up',
        date: 'Nov 05, 2023',
        doctor: 'Dr. Sarah Jenkins',
        content: 'No acute flare-ups since last evaluation. Re-evaluating metabolic panel in next cycle.'
      }
    ],
    currentMedications: [
      {
        id: 'm_mc1',
        name: 'Allopurinol',
        strength: '100mg',
        form: 'Oral Tablet',
        dosage: '1 Tablet',
        frequency: 'Once Daily',
        duration: '180 Days'
      }
    ],
    labReports: []
  },
  {
    id: '#MS-7655',
    name: 'Elena Rodriguez',
    age: 29,
    gender: 'Female',
    dob: '05/14/1997',
    weight: 58,
    bloodType: 'AB Negative',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRVdPXYjKFsC96gXRX_xiqD1CtlMbTBgKV6V3JqB6GdyCXfmlgkpL81S6a4LIagUWdWnRv9Braf6B6ERbe4En22570oPgO-U978tmmCwEQsWFgDLk5EB1vfPO8M617A9HdqydAoziXjntYuZGFLLDQ4EGibYtvvWhSklHInjXpMFKumsw7Fg-RdND_HQf-mtboFumz0ik9tnpbn5jvLK4nrN7_JFVEkCDB0yzUn9DwMaSZaMB_c55Os2uQMMLPfcyUKrkT0zfofH4',
    status: 'Discharged',
    lastVisit: 'Oct 28, 2023',
    allergies: ['Peanuts'],
    medicalHistory: [],
    consultationNotes: [],
    currentMedications: [],
    labReports: []
  },
  {
    id: '#MS-5521',
    name: 'David Miller',
    age: 55,
    gender: 'Male',
    dob: '10/12/1970',
    weight: 85,
    bloodType: 'O Negative',
    avatar: '', // triggers initial DM avatar fallback
    status: 'Critical',
    lastVisit: 'Today',
    allergies: ['Aspirin'],
    medicalHistory: [],
    consultationNotes: [],
    currentMedications: [],
    labReports: []
  },
  {
    id: '#MS-1299',
    name: 'Sophia Thorne',
    age: 31,
    gender: 'Female',
    dob: '01/30/1995',
    weight: 61,
    bloodType: 'A Negative',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK-TZtG8cfpLo9q_7iRd4pAi3XgJ3Z-auZTNPj_EfEaJQ7LQnZHDibsHcopyxdrD7DoSa5bEzmI_vD0TgHFXEB8XtYDxPagZ2nf83wlglXXAXbPSgRPJxiTVZMl2-HsGc-UyJfEQMu1fBHozSk2Pite1ZNW0GWSmCsjn9QSvKD99MHMbfZ46fMoOimiEA4LEoMd2FmPo9ZkHUJN_A-EuJAtq0SRQS5PZyN_meNYdz5oHT3FOVDEdh-vHU44zyAatODRKwdcTkf_Dw',
    status: 'Active',
    lastVisit: 'Nov 10, 2023',
    allergies: [],
    medicalHistory: [],
    consultationNotes: [],
    currentMedications: [],
    labReports: []
  },
  {
    id: '#MS-3344',
    name: 'Robert Wilson',
    age: 75,
    gender: 'Male',
    dob: '04/15/1951',
    weight: 82,
    bloodType: 'O Positive',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOHEFrGtLICNa8Th9sTbvP8x5YyixdF8TDt3D_WZZ60HiBJGnxW5uEbrxDHMd0loGaNmbt_C54lc7qjn7CKg-BcxXjoNkvOoW-763H_USOLdctOkqMbNozIbM1sF2pF-UX41wZjZpPf8Xb_uuGlCz68KliEVFykSe8BZBICO12dInXX032rfyo58rrdBgGTFJb41fPnV2WefaSqhbeELUg3H939aWKeSHErNiOEP2IdoXX3k_tWm4rwVvZHjLAMeMOVOaOXv8z1pM',
    status: 'Chronic',
    lastVisit: 'Oct 15, 2023',
    allergies: ['Sulfa Drugs'],
    medicalHistory: [],
    consultationNotes: [],
    currentMedications: [],
    labReports: []
  },
  {
    id: '#MED-8829',
    name: 'Eleanor Fitzgerald',
    age: 64,
    gender: 'Female',
    dob: '03/12/1959',
    weight: 54,
    bloodType: 'O- (Critical)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgr4j58pvvTYMy2CI7rXl9kgdMCl7S-5S6gZ2pUwwxHs-rEFy18XVwbbOPpiH9BHiZw5d4qp9ZP-t9Eohcmuq6jYdtORbHW0m6s8aE7anqcPOchwMNAeXSOtaGxzWR8MdcA8hCQBSY_YeSTMxjDXakN9Zc8smNgmv_KTzPMUO_UvgqkaJMQPRigIXmmjnSF6wKqEg0xvd8ExXgzpkPjRML8dw7ddAw3XMqUbBXCwJnHI4wVQ2BmjvNEMgZCuyStkEXl8ddHk1XjZI',
    status: 'Critical',
    lastVisit: 'Oct 12, 2023',
    allergies: ['PENICILLIN', 'LATEX'],
    vitals: { bp: '128/84', hr: 72 },
    medicalHistory: [
      {
        id: 'h_ef1',
        title: 'Mild Chronic Migraines',
        date: 'Mar 2021',
        description: 'Observational notes state periodic severe headache. Prescribed Sumatriptan for emergency rescue.'
      }
    ],
    consultationNotes: [],
    currentMedications: [],
    labReports: []
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientName: 'Robert Fox',
    patientId: '#MC-91823',
    patientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1DVxUbh7zC8WRKu0YuRv5dunH1pUm8FA-VQrt2fPZ8O9agrFEBBzj3pYf0fwqeDylK71y20KTuXd1Z4QLOJq6p2uyCP-q2SQvydpB88FroRKDP9mDqNKZb7Y5hali5sCcxVZV9lVPFm99Xwukbs1YGlDHPehNgg2CfdGRWexF_Hc1AO7sqx6tFTCZuEJd93pDJKYjijtIFGgLfLZFjwmlP9daY_YExvvWtOqYS809yKFyVihlbjFP7IEGZR7LnwicbNvVoxQZsE4',
    reason: 'Cardiovascular Follow-up',
    time: '09:00 AM',
    date: '2026-06-06',
    status: 'Confirmed',
    priority: 'High Priority',
    room: 'RM 402'
  },
  {
    id: 'a2',
    patientName: 'Jane Cooper',
    patientId: '#MC-88291-J',
    patientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPOLekDkaQcXYop-yx-8me-s2WgiwXgfFzKOSOR5WRqW9slCEoDFnD3tFQExqo57zsWnMBpldrKjjxK01nIQp6ivNX3I810OIdto_Cu1L1BwoHjTV2jk_cZAteznD3Wgm3UnudReVEXA4WZ78jyeANwZUj-r6fcEv-s0Ra9pRocdrcVz2Vw3H09zt-bxvBmdjlDbeFwoySYjfgqQ5c2WmTrWLzQp-FdDFwHZyalZCzHfuZJGyg_kzkpaAfhAY_1fWilJpNl3D84U',
    reason: 'Routine Checkup',
    time: '10:30 AM',
    date: '2026-06-06',
    status: 'Confirmed',
    priority: 'Stable',
    room: 'RM 101'
  },
  {
    id: 'a3',
    patientName: 'Cody Fisher',
    patientId: '#MC-55291',
    patientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjWMjvcAM_cwub66fTbkYrj86pe3srjSWcjXEx_Zw6d7BEqYSvFG4DhBWJn2X-J-guv5nVHo8azkTyWUFzEXBHl6X-XgwWkjIx0Zt9nXLqhQtK8IBtX9ZA-xM1fKEjJC_BobjkpWk-Zuwp86YWJ61DhDazghbcbwslBDbsrZLvY9DWm1lOvBtmxqUTTGAiIOotD_0YprolCHfwWKFWz4n9RyKAXj5tpyI7Gh8uZlnrlxdldrTyn645JhFns043UNNjqEpG0cZOs-g',
    reason: 'Post-Op Review',
    time: '01:45 PM',
    date: '2026-06-06',
    status: 'Confirmed',
    priority: 'Follow-up',
    room: 'RM 204'
  }
];

export const DAILY_QUEUE: Appointment[] = [
  {
    id: 'q1',
    patientName: 'Eleanor Shellstrop',
    patientId: '#MED-1923',
    reason: 'General Consultation • Routine Checkup',
    time: '09:15 AM',
    date: '2026-06-06',
    status: 'Confirmed',
    priority: 'Stable'
  },
  {
    id: 'q2',
    patientName: 'Chidi Anagonye',
    patientId: '#MED-7711',
    reason: 'Follow-up • Neurology',
    time: '11:00 AM',
    date: '2026-06-06',
    status: 'Pending',
    priority: 'Follow-up'
  },
  {
    id: 'q3',
    patientName: 'Tahani Al-Jamil',
    patientId: '#MED-8899',
    reason: 'Annual Wellness Visit',
    time: '01:45 PM',
    date: '2026-06-06',
    status: 'Confirmed',
    priority: 'Stable'
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'al1',
    category: 'Critical Results',
    title: 'Urgent: Abnormal Potassium Levels',
    description: 'Patient: Elena Rodriguez (ID: #8821). Result: 6.2 mEq/L (Critical High). Immediate review required.',
    patientName: 'Elena Rodriguez',
    patientId: '#MS-8821',
    time: '14 mins ago',
    unread: true,
    type: 'biotech',
    actionLabel: 'Take Action'
  },
  {
    id: 'al2',
    category: 'Critical Results',
    title: 'Incomplete EKG Telemetry',
    description: 'Patient: Marcus Thorne. Signal interrupted at 03:45 AM. Manual check recommended.',
    patientName: 'Marcus Thorne',
    time: '1 hour ago',
    unread: true,
    type: 'heart_plus',
    actionLabel: 'View History'
  },
  {
    id: 'al3',
    category: 'Critical Results',
    title: 'Lab Results Ready',
    description: 'Patient: Robert Fox. Hemoglobin levels are critically low.',
    patientName: 'Robert Fox',
    time: '10 mins ago',
    unread: true,
    type: 'biotech'
  },
  {
    id: 'al4',
    category: 'Follow-up Alerts',
    title: 'Follow-up Pending',
    description: 'Marvin McKinney has not scheduled his heart rate monitoring.',
    patientName: 'Marvin McKinney',
    time: '2 hours ago',
    unread: true,
    type: 'assignment_turned_in'
  },
  {
    id: 'al5',
    category: 'Appointments',
    title: 'New Referral',
    description: 'Dr. Arlene McCoy referred a new patient for diagnostic imaging.',
    time: 'Yesterday',
    unread: true,
    type: 'event_repeat'
  },
  {
    id: 'al6',
    category: 'Follow-up Alerts',
    title: 'System Update',
    description: 'Patient portal maintenance scheduled for 12:00 AM UTC.',
    time: '2 days ago',
    unread: false,
    type: 'notifications'
  }
];

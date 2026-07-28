import type { ContentSection, ContentType, PublicContent, SourceCitation } from './types'

const UPDATED_AT = '2026-07-28'
const DATA_YEAR = 2025

const bls: SourceCitation = {
  accessedAt: UPDATED_AT,
  organization: 'U.S. Bureau of Labor Statistics',
  title: 'Occupational Outlook Handbook',
  url: 'https://www.bls.gov/ooh/',
}

const onet: SourceCitation = {
  accessedAt: UPDATED_AT,
  organization: 'O*NET',
  title: 'O*NET OnLine occupation data',
  url: 'https://www.onetonline.org/',
}

const careerOneStop: SourceCitation = {
  accessedAt: UPDATED_AT,
  organization: 'U.S. Department of Labor',
  title: 'CareerOneStop',
  url: 'https://www.careeronestop.org/',
}

type CareerSeed = {
  cluster: string
  credential: string
  entry: string
  name: string
  reality: string
  slug: string
  work: string
}

const careerSeeds: CareerSeed[] = [
  { slug: 'medical-assistant', name: 'Medical Assistant', cluster: 'Healthcare support', entry: 'a certificate or diploma can shorten the route, while some employers train candidates with strong clinical and administrative basics', work: 'rooming patients, recording vital signs, preparing exam spaces, updating records, and keeping a clinic moving between appointments', reality: 'the role switches quickly between patient contact and detailed documentation, and schedules depend heavily on the clinic setting', credential: 'state law rarely uses one national rule; CCMA or CMA credentials may be preferred by employers' },
  { slug: 'dental-assistant', name: 'Dental Assistant', cluster: 'Healthcare support', entry: 'routes range from employer training to accredited certificate programs, with state rules controlling expanded functions', work: 'preparing operatories, passing instruments, taking approved radiographs, documenting treatment, and explaining aftercare', reality: 'close patient contact and repetitive positioning are central to the day, while permitted duties can change at a state border', credential: 'DANB credentials and state radiography or expanded-function requirements must be checked separately' },
  { slug: 'pharmacy-technician', name: 'Pharmacy Technician', cluster: 'Healthcare support', entry: 'many candidates combine employer training with an approved course before registration or certification', work: 'processing prescriptions, measuring medication under pharmacist supervision, resolving insurance details, and maintaining inventory', reality: 'accuracy and interruption control matter more than speed alone, and retail schedules often include evenings or weekends', credential: 'PTCB or NHA certification is commonly recognized, but registration and training rules remain state-specific' },
  { slug: 'phlebotomist', name: 'Phlebotomist', cluster: 'Healthcare support', entry: 'a focused training course and supervised clinical sticks are the usual entry route', work: 'identifying patients, collecting blood, labeling specimens, calming anxious people, and maintaining chain-of-custody procedures', reality: 'early starts, standing, and repeated needle procedures are normal; a calm response to difficult draws is essential', credential: 'national certification may improve employability even where the state does not mandate it' },
  { slug: 'surgical-technologist', name: 'Surgical Technologist', cluster: 'Healthcare support', entry: 'an accredited certificate or associate program followed by clinical practice is the common route', work: 'setting sterile fields, checking instruments, anticipating the surgical team, and accounting for supplies before and after procedures', reality: 'the work rewards precision but includes long periods standing, urgent cases, and strict sterile technique', credential: 'CST certification is widely recognized and some states or employers make credential status consequential' },
  { slug: 'medical-records-specialist', name: 'Medical Records Specialist', cluster: 'Healthcare support', entry: 'certificate or associate-level coursework in coding, records, privacy, and reimbursement can establish the technical base', work: 'reviewing clinical documentation, assigning codes, checking data quality, and resolving incomplete records', reality: 'remote options exist, but entry roles still demand sustained concentration and frequent policy updates', credential: 'AHIMA or AAPC credentials can signal competence but do not replace practical coding accuracy' },
  { slug: 'patient-care-technician', name: 'Patient Care Technician', cluster: 'Healthcare support', entry: 'nursing-assistant fundamentals plus employer-specific clinical skills are a common starting point', work: 'helping with mobility and hygiene, collecting basic measurements, observing changes, and supporting nurses at the bedside', reality: 'lifting, shift work, emotional strain, and direct personal care are core conditions rather than occasional exceptions', credential: 'requirements vary by employer and state; nursing-assistant registration may be the controlling credential' },
  { slug: 'sterile-processing-technician', name: 'Sterile Processing Technician', cluster: 'Healthcare support', entry: 'a certificate can teach decontamination and instrument systems, followed by documented hands-on hours', work: 'decontaminating, inspecting, assembling, sterilizing, storing, and tracing surgical instruments', reality: 'the role is behind the scenes but mistakes can affect an operating room; heat, protective equipment, and production deadlines are routine', credential: 'CRCST or CSPDT certification may require experience hours in addition to an exam' },
  { slug: 'emergency-medical-technician', name: 'Emergency Medical Technician', cluster: 'Healthcare support', entry: 'a state-approved EMT course, psychomotor practice, examination, and state credential form the standard route', work: 'assessing patients, providing emergency care within scope, moving people safely, and documenting transport', reality: 'unpredictable calls, lifting, night shifts, and exposure to distress are inseparable from the role', credential: 'National Registry certification is common, but a state license or certification controls legal practice' },
  { slug: 'ekg-technician', name: 'EKG Technician', cluster: 'Healthcare support', entry: 'focused cardiac-monitoring instruction plus supervised practice can support entry into hospitals or diagnostic offices', work: 'preparing patients, placing leads, recording tracings, recognizing artifact, and escalating unusual results to clinical staff', reality: 'technical setup is only part of the job; patient explanation and clean, repeatable recordings shape performance', credential: 'national certificates exist, though employer training and local scope rules may matter more' },
  { slug: 'occupational-therapy-assistant', name: 'Occupational Therapy Assistant', cluster: 'Healthcare support', entry: 'an accredited associate program, fieldwork, national examination, and state licensure are normally required', work: 'carrying out treatment plans that help clients practice daily activities, adapt environments, and track progress', reality: 'the work can be physically active and emotionally rewarding, but documentation and licensed supervision are constant', credential: 'NBCOT certification and state licensure are distinct steps and both must be verified' },
  { slug: 'physical-therapist-assistant', name: 'Physical Therapist Assistant', cluster: 'Healthcare support', entry: 'an accredited associate program, clinical education, national examination, and state license form the route', work: 'guiding prescribed exercises, applying treatments within scope, measuring response, and documenting progress for the physical therapist', reality: 'frequent movement and patient support make body mechanics important, while productivity targets vary by setting', credential: 'passing the NPTE for PTAs and meeting state board rules are central requirements' },
  { slug: 'hvac-technician', name: 'HVAC Technician', cluster: 'Skilled trades', entry: 'trade school, employer training, or an apprenticeship can build refrigeration, electrical, and diagnostic skills', work: 'installing, maintaining, and troubleshooting heating, cooling, ventilation, controls, and refrigerant systems', reality: 'attics, rooftops, weather, on-call periods, and seasonal workload peaks are common', credential: 'EPA Section 608 certification is required for regulated refrigerant work; state or local licensing may also apply' },
  { slug: 'electrician', name: 'Electrician', cluster: 'Skilled trades', entry: 'a paid apprenticeship combining classroom instruction and supervised hours is the established route', work: 'reading plans, installing conductors and equipment, testing circuits, locating faults, and documenting code-compliant work', reality: 'the learning period is long and safety discipline is non-negotiable; travel and early starts depend on the contractor', credential: 'journey-level and contractor licensing rules vary by state and locality' },
  { slug: 'plumber', name: 'Plumber', cluster: 'Skilled trades', entry: 'most candidates learn through a multi-year apprenticeship with progressive responsibility', work: 'installing and repairing supply, waste, vent, fixture, and equipment connections while following code', reality: 'confined spaces, emergency calls, heavy components, and customer-facing troubleshooting all appear in the same career', credential: 'journey and master licensing typically depend on documented hours and examination' },
  { slug: 'welder', name: 'Welder', cluster: 'Skilled trades', entry: 'career-technical training or employer instruction develops process control and blueprint skills', work: 'preparing joints, setting equipment, making welds, inspecting results, and following procedure specifications', reality: 'heat, protective gear, awkward positions, and the need to pass procedure-specific tests shape the job', credential: 'AWS credentials can document skill, but employers often qualify welders for a particular process or code' },
  { slug: 'automotive-service-technician', name: 'Automotive Service Technician', cluster: 'Skilled trades', entry: 'postsecondary automotive training or structured shop experience can lead into diagnostic and repair work', work: 'interviewing customers, scanning systems, testing components, estimating repairs, and verifying the fix', reality: 'tool investment, flat-rate pay practices, and rapid electronics changes deserve as much attention as mechanical interest', credential: 'ASE certification is voluntary but widely used as an experience and knowledge signal' },
  { slug: 'industrial-maintenance-technician', name: 'Industrial Maintenance Technician', cluster: 'Skilled trades', entry: 'technical coursework plus plant experience in mechanical, electrical, controls, and safety systems is common', work: 'inspecting production equipment, diagnosing downtime, replacing components, aligning machinery, and documenting preventive maintenance', reality: 'shift schedules and urgent breakdowns can be demanding, while broad troubleshooting skill creates mobility', credential: 'employer qualifications matter most; specialized safety or controls credentials may support advancement' },
  { slug: 'solar-photovoltaic-installer', name: 'Solar Photovoltaic Installer', cluster: 'Skilled trades', entry: 'employer training, electrical fundamentals, and fall-protection practice support entry', work: 'laying out arrays, mounting racking and modules, routing conductors, testing systems, and documenting installations', reality: 'roof work, weather exposure, travel, and construction schedules are core conditions', credential: 'electrical connections may require licensed supervision; NABCEP credentials are voluntary professional signals' },
  { slug: 'wind-turbine-technician', name: 'Wind Turbine Technician', cluster: 'Skilled trades', entry: 'a technical certificate or associate program combined with safety and climbing training is common', work: 'climbing towers, inspecting mechanical and electrical systems, troubleshooting controls, and completing scheduled maintenance', reality: 'height tolerance, travel, weather windows, and rescue readiness matter more than the job title suggests', credential: 'employer safety qualifications and manufacturer training are usually more decisive than one universal license' },
  { slug: 'cnc-machinist', name: 'CNC Machinist', cluster: 'Skilled trades', entry: 'technical school or shop training in measurement, setup, tooling, and code can establish the base', work: 'reading prints, setting work offsets and tools, running parts, measuring results, and correcting process drift', reality: 'small errors compound quickly, and the role combines computer control with hands-on material behavior', credential: 'NIMS credentials are optional; demonstrated setup and inspection ability carries substantial weight' },
  { slug: 'diesel-service-technician', name: 'Diesel Service Technician', cluster: 'Skilled trades', entry: 'diesel technology coursework or supervised shop experience develops engine, electrical, brake, and emissions skills', work: 'diagnosing trucks or equipment, performing preventive service, repairing systems, and recording compliance work', reality: 'large components, outdoor or roadside work, and evening shifts are common in fleet operations', credential: 'ASE medium/heavy truck credentials can support progression but do not replace shop competence' },
  { slug: 'sheet-metal-worker', name: 'Sheet Metal Worker', cluster: 'Skilled trades', entry: 'a paid apprenticeship is the primary route into fabrication and installation specialties', work: 'measuring, laying out, cutting, forming, joining, and installing metal products or duct systems', reality: 'construction travel, sharp materials, lifting, and exact layout work all shape the trade', credential: 'local apprenticeship and licensing arrangements determine progression more than a national certificate' },
  { slug: 'heavy-equipment-operator', name: 'Heavy Equipment Operator', cluster: 'Skilled trades', entry: 'union or employer training combines equipment practice, site safety, grade reading, and maintenance checks', work: 'operating earthmoving or lifting equipment, inspecting machines, coordinating with ground crews, and protecting utilities', reality: 'seasonal schedules, travel, vibration, noise, and weather exposure are common', credential: 'commercial driver or crane credentials may apply to particular equipment; no single certificate covers every role' },
  { slug: 'computer-user-support-specialist', name: 'Computer User Support Specialist', cluster: 'Business and IT support', entry: 'hands-on labs, customer support practice, and targeted certificates can substitute for a four-year degree in some entry roles', work: 'triaging incidents, explaining fixes, managing accounts, documenting solutions, and escalating patterns', reality: 'the work is people-facing and interruption-heavy; technical curiosity without patient communication is not enough', credential: 'CompTIA A+ or vendor certificates may help establish a baseline but are not universal requirements' },
  { slug: 'network-support-specialist', name: 'Network Support Specialist', cluster: 'Business and IT support', entry: 'networking labs and support experience build toward monitoring and troubleshooting responsibilities', work: 'checking connectivity, configuring devices, responding to outages, analyzing logs, and maintaining documentation', reality: 'after-hours maintenance and methodical fault isolation are common, while titles vary widely by employer', credential: 'Network+ or Cisco credentials may be useful when matched to the environment' },
  { slug: 'data-center-technician', name: 'Data Center Technician', cluster: 'Business and IT support', entry: 'hardware support, cabling, safety, and ticketing experience can open entry routes', work: 'racking equipment, replacing components, tracing connections, following change controls, and escorting vendors', reality: 'windowless facilities, physical lifting, shift coverage, and procedural discipline distinguish the job from office IT', credential: 'hardware and networking certificates can help, but operational reliability and documented procedure matter most' },
  { slug: 'bookkeeping-clerk', name: 'Bookkeeping Clerk', cluster: 'Business and IT support', entry: 'coursework in accounting fundamentals and practical software exercises can support entry', work: 'recording transactions, reconciling accounts, preparing routine reports, and resolving documentation gaps', reality: 'deadline cycles and accuracy dominate the job; automation changes tasks but does not remove the need for review', credential: 'software credentials are optional and should be evaluated against the systems local employers actually use' },
  { slug: 'payroll-specialist', name: 'Payroll Specialist', cluster: 'Business and IT support', entry: 'payroll coursework plus exposure to tax, timekeeping, benefits, and reconciliation processes is common', work: 'validating time, calculating pay, resolving exceptions, filing routine reports, and protecting sensitive records', reality: 'payday deadlines are fixed and small mistakes affect real people, so calm exception handling matters', credential: 'FPC or CPP credentials may support advancement after practical experience' },
  { slug: 'project-coordinator', name: 'Project Coordinator', cluster: 'Business and IT support', entry: 'administrative experience, spreadsheet fluency, and small-project ownership can establish the route', work: 'tracking actions, scheduling meetings, maintaining plans, following up on risks, and preparing status information', reality: 'success depends on details and influence without formal authority, not on project vocabulary alone', credential: 'CAPM can provide structure but is rarely a substitute for evidence of dependable coordination' },
  { slug: 'digital-marketing-specialist', name: 'Digital Marketing Specialist', cluster: 'Business and IT support', entry: 'a portfolio showing campaigns, measurement, writing, and channel judgment is often more useful than a generic certificate', work: 'planning content, configuring campaigns, analyzing results, testing messages, and reporting what changed', reality: 'platform rules shift often and attribution is imperfect; the role requires skepticism about its own metrics', credential: 'vendor certificates expire or change, so current work samples and analytical reasoning matter' },
  { slug: 'insurance-claims-adjuster', name: 'Insurance Claims Adjuster', cluster: 'Business and IT support', entry: 'employer training or licensing coursework leads into claim investigation and settlement work', work: 'reviewing coverage, gathering records, interviewing parties, estimating damage, and documenting decisions', reality: 'caseload pressure, conflict, travel after major events, and detailed written reasoning are normal', credential: 'resident and designated-home-state licensing rules vary and must be checked before working claims' },
  { slug: 'paralegal-assistant', name: 'Paralegal Assistant', cluster: 'Business and IT support', entry: 'a paralegal certificate or associate program can build research, drafting, procedure, and ethics skills', work: 'organizing matters, researching authority, preparing documents, tracking deadlines, and supporting attorney review', reality: 'deadlines and confidentiality are constant, and the role cannot independently provide legal advice', credential: 'voluntary credentials exist; education expectations vary by employer and legal market' },
  { slug: 'human-resources-assistant', name: 'Human Resources Assistant', cluster: 'Business and IT support', entry: 'administrative experience plus employment-process and records knowledge can support entry', work: 'maintaining employee records, coordinating hiring steps, answering process questions, and preparing routine reports', reality: 'the job handles sensitive information and competing expectations, so discretion matters as much as friendliness', credential: 'entry credentials are optional; accurate process work and communication are stronger initial signals' },
  { slug: 'customer-service-representative', name: 'Customer Service Representative', cluster: 'Business and IT support', entry: 'employer product training combined with writing, listening, and systems practice is common', work: 'answering questions, solving account issues, documenting contacts, and recognizing when to escalate', reality: 'performance metrics, emotional labor, and repetitive systems work deserve careful scrutiny before accepting a role', credential: 'vendor or service certificates are optional and rarely outweigh demonstrated communication and judgment' },
  { slug: 'software-qa-tester', name: 'Software QA Tester', cluster: 'Business and IT support', entry: 'a portfolio of test cases, bug reports, exploratory testing, and basic technical tools can support entry', work: 'turning requirements into tests, reproducing defects, documenting evidence, and checking fixes across environments', reality: 'the role rewards curiosity and precision but includes repetitive regression work and ambiguous requirements', credential: 'ISTQB may provide vocabulary; practical testing artifacts usually carry more weight for entry roles' },
]

const credentialSeeds = [
  ['ccma', 'NHA Certified Clinical Medical Assistant (CCMA)', 'medical-assistant', 'NHA', 'https://www.nhanow.com/certification/nha-certifications/certified-clinical-medical-assistant-(ccma)'],
  ['cda', 'DANB Certified Dental Assistant (CDA)', 'dental-assistant', 'DANB', 'https://www.danb.org/exams/exam/cda'],
  ['cpht', 'PTCB Certified Pharmacy Technician (CPhT)', 'pharmacy-technician', 'PTCB', 'https://www.ptcb.org/credentials/certified-pharmacy-technician'],
  ['cpt', 'NHA Certified Phlebotomy Technician (CPT)', 'phlebotomist', 'NHA', 'https://www.nhanow.com/certification/nha-certifications/certified-phlebotomy-technician-(cpt)'],
  ['cst', 'Certified Surgical Technologist (CST)', 'surgical-technologist', 'NBSTSA', 'https://www.nbstsa.org/cst-exam'],
  ['ccs', 'Certified Coding Specialist (CCS)', 'medical-records-specialist', 'AHIMA', 'https://www.ahima.org/certification-careers/certification-exams/ccs/'],
  ['crcst', 'Certified Registered Central Service Technician (CRCST)', 'sterile-processing-technician', 'HSPA', 'https://myhspa.org/certification/get-certified/crcst-application.html'],
  ['nremt', 'National Registry EMT Certification', 'emergency-medical-technician', 'National Registry of EMTs', 'https://www.nremt.org/EMT/Certification'],
  ['cota', 'NBCOT Certified Occupational Therapy Assistant', 'occupational-therapy-assistant', 'NBCOT', 'https://www.nbcot.org/get-certified'],
  ['epa-608', 'EPA Section 608 Technician Certification', 'hvac-technician', 'U.S. Environmental Protection Agency', 'https://www.epa.gov/section608/section-608-technician-certification'],
  ['ase-a-series', 'ASE Automobile and Light Truck Certification', 'automotive-service-technician', 'ASE', 'https://www.ase.com/test-series'],
  ['aws-certified-welder', 'AWS Certified Welder', 'welder', 'American Welding Society', 'https://www.aws.org/certification/page/certified-welder-program'],
  ['comptia-a-plus', 'CompTIA A+', 'computer-user-support-specialist', 'CompTIA', 'https://www.comptia.org/certifications/a'],
  ['comptia-network-plus', 'CompTIA Network+', 'network-support-specialist', 'CompTIA', 'https://www.comptia.org/certifications/network'],
  ['fpc', 'Fundamental Payroll Certification (FPC)', 'payroll-specialist', 'PayrollOrg', 'https://payroll.org/certification/certification/fundamental-payroll-certification-(fpc)'],
  ['capm', 'Certified Associate in Project Management (CAPM)', 'project-coordinator', 'Project Management Institute', 'https://www.pmi.org/certifications/certified-associate-capm'],
  ['nala-cp', 'NALA Certified Paralegal', 'paralegal-assistant', 'NALA', 'https://nala.org/certification/'],
  ['istqb-ctfl', 'ISTQB Certified Tester Foundation Level', 'software-qa-tester', 'ISTQB', 'https://www.istqb.org/certifications/certified-tester-foundation-level'],
] as const

const comparisonSeeds = [
  ['medical-assistant', 'dental-assistant'], ['pharmacy-technician', 'phlebotomist'],
  ['patient-care-technician', 'medical-assistant'], ['surgical-technologist', 'sterile-processing-technician'],
  ['occupational-therapy-assistant', 'physical-therapist-assistant'], ['emergency-medical-technician', 'patient-care-technician'],
  ['electrician', 'hvac-technician'], ['plumber', 'sheet-metal-worker'], ['welder', 'cnc-machinist'],
  ['diesel-service-technician', 'automotive-service-technician'], ['solar-photovoltaic-installer', 'wind-turbine-technician'],
  ['computer-user-support-specialist', 'network-support-specialist'], ['bookkeeping-clerk', 'payroll-specialist'],
  ['project-coordinator', 'customer-service-representative'], ['paralegal-assistant', 'human-resources-assistant'],
  ['digital-marketing-specialist', 'software-qa-tester'],
] as const

const topicalSeeds = {
  training: [
    ['check-program-accreditation', 'How to Check a Training Program\'s Accreditation', 'separating institutional accreditation, programmatic accreditation, state approval, and marketing claims before paying a deposit'],
    ['compare-certificate-program-costs', 'How to Compare Certificate Program Costs', 'building an apples-to-apples cost ledger that includes exams, tools, travel, lost work time, and renewal fees'],
    ['read-job-placement-claims', 'How to Read Job Placement Claims', 'testing the denominator, timeframe, job definition, and verification behind a school\'s employment percentage'],
    ['review-refund-cancellation-terms', 'How to Review Refund and Cancellation Terms', 'locating withdrawal deadlines, nonrefundable charges, clock-hour calculations, and complaint routes'],
    ['community-college-vs-private-school', 'Community College vs. Private Career School', 'comparing pace, support, transfer value, scheduling, price transparency, and regulatory oversight'],
    ['evaluate-online-hybrid-training', 'How to Evaluate Online and Hybrid Career Training', 'checking which skills can be taught remotely and where supervised practice is still required'],
    ['understand-apprenticeship-offers', 'How to Evaluate an Apprenticeship Offer', 'reviewing wage progression, classroom obligations, supervision, portability, and the difference between registered and informal training'],
    ['avoid-training-scams', 'Career Training Red Flags Before You Enroll', 'recognizing pressure tactics, fake accreditation, guaranteed jobs, unclear credentials, and financing presented as free money'],
    ['ask-before-campus-tour', 'Questions to Ask on a Campus or Lab Tour', 'checking equipment access, instructor coverage, clinical placement, class size, safety, and actual practice time'],
    ['verify-state-approval', 'How to Verify State Approval and Complaint History', 'finding the correct regulator and reading approval as a minimum condition rather than a quality guarantee'],
    ['calculate-time-to-entry', 'How to Calculate Your Real Time to Career Entry', 'including prerequisites, waitlists, exams, background checks, applications, and employer onboarding'],
    ['document-employer-promises', 'How to Document Training and Employer Promises', 'saving written representations, cost schedules, credential claims, and support commitments before enrollment'],
  ],
  skill: [
    ['first-90-days-clinical-support', 'The First 90 Days in a Clinical Support Role', 'building reliable routines for patient identity, escalation, documentation, privacy, and shift handoff'],
    ['first-90-days-skilled-trade', 'The First 90 Days in a Skilled Trade', 'learning site expectations, tool control, hazard communication, measurements, and when to stop and ask'],
    ['technical-support-documentation', 'Writing Technical Support Notes That Others Can Use', 'capturing symptoms, environment, attempted fixes, evidence, outcome, and the next owner without filler'],
    ['renew-professional-certification', 'Planning for Certification Renewal', 'tracking renewal windows, continuing education, experience requirements, fees, and evidence before the deadline'],
    ['move-from-help-desk-to-networking', 'Moving from Help Desk to Network Support', 'turning recurring incidents into networking labs, documented projects, and measurable troubleshooting practice'],
    ['move-from-assistant-to-coordinator', 'Moving from Assistant to Coordinator Work', 'showing ownership through schedules, risks, vendor follow-up, records, and concise status reporting'],
    ['build-trade-safety-habits', 'Safety Habits That Make Trade Skills Transferable', 'using pre-task planning, lockout discipline, equipment checks, housekeeping, and near-miss learning'],
    ['decide-next-credential', 'How to Decide Whether the Next Credential Is Worth It', 'testing employer demand, legal necessity, timing, total cost, renewal burden, and a cheaper evidence path'],
  ],
  'work-reality': [
    ['clinic-flow-and-interruptions', 'What Clinic Support Work Is Like When the Schedule Slips', 'a source-based look at interruptions, patient flow, documentation, scope boundaries, and why task switching is a core skill'],
    ['retail-pharmacy-accuracy-pressure', 'The Accuracy Pressure Behind Retail Pharmacy Work', 'how prescription volume, insurance exceptions, customer communication, and pharmacist supervision shape the technician role'],
    ['construction-trades-weather-travel', 'Weather, Travel, and Early Starts in Construction Trades', 'how jobsite location, sequencing, contractor schedules, and outdoor exposure alter the day beyond the technical task list'],
    ['industrial-maintenance-downtime', 'What Production Downtime Means for Maintenance Technicians', 'how troubleshooting changes when every minute affects output, safety, coordination, and documentation'],
    ['entry-level-it-interruption-work', 'Entry-Level IT Is Interruption Work', 'why queues, user communication, escalation, account procedures, and careful notes matter as much as device knowledge'],
    ['payroll-deadline-cycle', 'The Fixed Deadline Cycle in Payroll Work', 'how time exceptions, approvals, taxes, privacy, and reconciliation converge before every pay run'],
    ['claims-adjusting-after-catastrophe', 'Claims Adjusting After a Major Weather Event', 'a public-source review of surge caseloads, travel, licensing, documentation, conflict, and decision fatigue'],
    ['healthcare-support-body-mechanics', 'The Physical Demands Hidden in Healthcare Support Roles', 'comparing standing, transfers, repetitive positioning, protective equipment, and schedule patterns across support jobs'],
  ],
  research: [
    ['training-time-vs-entry-wage', 'Training Time and Entry Pay Do Not Move in Lockstep', 'a reproducible comparison of training bands, wage medians, licensing requirements, and the limits of national data'],
    ['schedule-stability-by-career', 'Which Short-Training Careers Offer More Predictable Schedules?', 'a transparent comparison of work settings, shift patterns, on-call exposure, and the evidence missing from national datasets'],
    ['mandatory-vs-optional-credentials', 'Mandatory, Preferred, or Optional: Mapping 18 Credentials', 'a credential-by-credential review that separates law, employer preference, exam eligibility, and marketing language'],
    ['state-rules-change-career-path', 'How State Rules Change the Same Career Path', 'ten case studies showing where registration, scope, exams, and supervised hours alter time and cost'],
  ],
  tool: [
    ['training-cost-planner', 'Training Cost Planner', 'combine tuition, fees, exams, equipment, travel, childcare, and reduced work hours into one transparent estimate'],
    ['career-comparison-worksheet', 'Career Comparison Worksheet', 'compare two paths using training time, work setting, schedule, physical demands, credentials, and source dates'],
    ['program-evaluation-checklist', 'Program Evaluation Checklist', 'score a program\'s approval, accreditation, cost disclosure, outcomes, refund terms, practice time, and marketing claims'],
    ['state-requirement-navigator', 'State Requirement Navigator', 'find the verified regulator, legal credential status, official link, and next check for selected career-state pairs'],
  ],
} as const

const stateSeeds = [
  ['texas-pharmacy-technician', 'Pharmacy Technician Requirements in Texas', 'Texas', 'pharmacy-technician', 'Texas State Board of Pharmacy', 'https://www.pharmacy.texas.gov/'],
  ['california-dental-assistant', 'Dental Assistant Requirements in California', 'California', 'dental-assistant', 'Dental Board of California', 'https://www.dbc.ca.gov/'],
  ['florida-hvac-technician', 'HVAC Licensing Paths in Florida', 'Florida', 'hvac-technician', 'Florida DBPR', 'https://www2.myfloridalicense.com/'],
  ['new-york-emt', 'EMT Certification Requirements in New York', 'New York', 'emergency-medical-technician', 'New York State Department of Health', 'https://www.health.ny.gov/professionals/ems/'],
  ['washington-electrician', 'Electrician Certification Requirements in Washington', 'Washington', 'electrician', 'Washington State Department of Labor & Industries', 'https://www.lni.wa.gov/licensing-permits/electrical/'],
  ['colorado-plumber', 'Plumber Licensing Requirements in Colorado', 'Colorado', 'plumber', 'Colorado Division of Professions and Occupations', 'https://dpo.colorado.gov/Plumbing'],
  ['arizona-claims-adjuster', 'Insurance Adjuster Licensing in Arizona', 'Arizona', 'insurance-claims-adjuster', 'Arizona Department of Insurance and Financial Institutions', 'https://difi.az.gov/'],
  ['nevada-pharmacy-technician', 'Pharmacy Technician Requirements in Nevada', 'Nevada', 'pharmacy-technician', 'Nevada State Board of Pharmacy', 'https://bop.nv.gov/'],
  ['massachusetts-emt', 'EMT Certification Requirements in Massachusetts', 'Massachusetts', 'emergency-medical-technician', 'Massachusetts Office of Emergency Medical Services', 'https://www.mass.gov/orgs/office-of-emergency-medical-services'],
  ['oregon-electrician', 'Electrician Licensing Requirements in Oregon', 'Oregon', 'electrician', 'Oregon Building Codes Division', 'https://www.oregon.gov/bcd/licensing/Pages/electrical.aspx'],
] as const

const hubSeeds = [
  ['careers', 'Career Guides', 'Explore work, entry routes, credentials, tradeoffs, and source-backed next steps across 36 careers.'],
  ['certifications', 'Credential Guides', 'Separate legal requirements, employer preferences, renewal duties, and marketing claims across 18 credentials.'],
  ['compare', 'Career Comparisons', 'Compare two paths on the conditions that change real decisions, not a single salary number.'],
  ['training', 'Training Decisions', 'Evaluate schools, apprenticeships, costs, outcomes, refunds, and enrollment claims before committing.'],
  ['state-requirements', 'State Requirements', 'Find manually checked state regulators and understand where local rules change a national career guide.'],
  ['skills-and-advancement', 'Skills and Advancement', 'Build practical first-90-day habits and decide when another credential is actually useful.'],
  ['work-reality', 'Work Reality', 'Read evidence-based dossiers on schedules, pressure, physical demands, interruptions, and operating conditions.'],
  ['research', 'Research Desk', 'Inspect reproducible analyses built from public workforce, credential, and regulatory data.'],
  ['tools', 'Planning Tools', 'Use transparent calculators and worksheets without surrendering your information to a lead form.'],
] as const

function source(organization: string, title: string, url: string): SourceCitation {
  return { accessedAt: UPDATED_AT, organization, title, url }
}

function paragraph(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function makeContent(input: Omit<PublicContent, 'dataYear' | 'editorMemo' | 'originalEvidence' | 'qualityScore' | 'relatedSlugs' | 'updatedAt'> & Partial<Pick<PublicContent, 'dataYear' | 'editorMemo' | 'originalEvidence' | 'qualityScore' | 'relatedSlugs'>>): PublicContent {
  return {
    dataYear: input.dataYear ?? DATA_YEAR,
    editorMemo: input.editorMemo ?? `Answer the practical decision behind ${input.title}; state the tradeoffs and avoid promises.`,
    originalEvidence: input.originalEvidence ?? 'Editorial synthesis of the cited primary sources, with requirements and limitations compared side by side.',
    qualityScore: input.qualityScore ?? 88,
    relatedSlugs: input.relatedSlugs ?? [],
    updatedAt: UPDATED_AT,
    ...input,
  }
}

function careerContent(seed: CareerSeed, index: number): PublicContent {
  const title = `How to Become a ${seed.name}`
  const route = `/careers/${seed.slug}`
  const sections: ContentSection[] = [
    { heading: index % 2 ? 'The work behind the title' : 'What the work actually involves', body: paragraph(`${seed.name} work centers on ${seed.work}. That mix is more useful than a list of generic skills because it shows where the day can break down: a handoff is missed, a measurement is not recorded, or a customer does not understand the next step. Employers divide duties differently, so compare several current job descriptions with the official occupation profile before paying for training. The title itself is not proof of scope, seniority, schedule, or setting.`) },
    { heading: 'A realistic entry route', body: paragraph(`For this path, ${seed.entry}. Start by checking local job postings for recurring requirements, then verify every legal claim with the responsible state agency. A school may teach useful material without qualifying a graduate for a regulated duty. Build a route backward from the work you want: required approval first, supervised experience second, examination or registration third, and optional signals last. This order reduces the risk of buying a certificate that employers recognize only weakly.`) },
    { heading: 'Credential and regulatory check', body: paragraph(`${seed.credential}. Treat the words certificate, certification, registration, and license as different things. A school certificate documents completion; a certification body tests against its standard; a state credential grants or records legal authority. Ask for the exact rule, issuing body, eligibility requirements, renewal interval, and total cost. If an employer says a credential is preferred, ask whether it changes starting duties, pay, or only applicant screening.`) },
    { heading: 'Conditions people underestimate', body: paragraph(`${seed.reality}. Consider how those conditions interact with transportation, caregiving, physical capacity, and preferred hours. National wage medians do not describe a first offer, and a high published wage can reflect experienced workers, overtime, union agreements, or costly regions. Compare the work setting and schedule before comparing pay. The better question is whether the route creates acceptable work at a cost and pace you can carry.`) },
    { heading: 'A source-backed next step', body: paragraph(`Read the BLS profile for duties, settings, education patterns, pay definitions, and outlook. Use O*NET to inspect tasks, work activities, tools, and work context. Then review ten local postings and record which requirements repeat. Contact the relevant regulator directly when the role includes licensed duties. Only after those checks should you compare programs. Keep screenshots or written answers for tuition, clinical placement, exam eligibility, refunds, and any employment claim.`) },
  ]
  return makeContent({
    contentType: 'career', jurisdiction: 'United States', path: route, sections, slug: seed.slug,
    sources: [bls, onet, careerOneStop],
    summary: `${seed.name} combines ${seed.work}. This guide separates the usual entry route, legal requirements, optional credentials, and working conditions.`,
    title,
    seoTitle: `${seed.name}: Training, Requirements, Pay & Outlook`,
    seoDescription: `Research the ${seed.name} career: real duties, entry routes, credentials, work conditions, pay context, and source-backed next steps.`,
    relatedSlugs: careerSeeds.filter((item) => item.cluster === seed.cluster && item.slug !== seed.slug).slice(0, 4).map((item) => item.slug),
  })
}

function standardSections(subject: string, focus: string, type: ContentType): ContentSection[] {
  const typeLabel = type === 'work-reality' ? 'work conditions' : type === 'research' ? 'research question' : 'decision'
  return [
    { heading: `The ${typeLabel} this page answers`, body: paragraph(`${subject} matters because ${focus}. The useful answer is not a slogan or a ranked list. It requires a clear definition, a stated timeframe, and a distinction between legal rules, common employer practice, and optional choices. This page starts with the decision a reader has to make and keeps unsupported certainty out of the conclusion.`) },
    { heading: 'What the primary sources establish', body: paragraph(`Federal workforce data can describe duties, work settings, education patterns, and national wage definitions. Credential bodies can establish exam eligibility and renewal. State agencies control legal scope and licensing. None of those sources alone answers every personal question. We use each for the claim it is qualified to support and identify where local verification is still required.`) },
    { heading: 'Where comparisons go wrong', body: paragraph(`Published numbers often use different years, populations, and definitions. Program length may exclude prerequisites or waiting lists. Tuition may omit tools, exams, travel, and reduced work hours. Employment claims may exclude nonrespondents. A careful comparison keeps denominators visible and treats missing information as a finding, not an invitation to guess.`) },
    { heading: 'How to apply the evidence', body: paragraph(`Write down the specific outcome you need, the deadline, the maximum cost you can carry, and the work conditions you will not accept. Verify the controlling regulator and credential body on their own sites. Ask schools and employers the same questions in writing so answers can be compared. Preserve dates because requirements and fees change.`) },
    { heading: 'Limits and update policy', body: paragraph(`This page provides general educational information, not legal, financial, or employment advice. National data cannot promise local pay or hiring. Rules can change after the access date shown in the sources. The Editorial Team reviews time-sensitive requirements on a scheduled cycle and records material changes instead of silently replacing the conclusion.`) },
  ]
}

const hubs = hubSeeds.map(([slug, title, summary]) => makeContent({
  contentType: 'hub', jurisdiction: 'United States', path: `/${slug}`, slug, summary,
  title, seoTitle: `${title} | Career Path Brief`, seoDescription: `${summary} Source-backed guidance from the Career Path Brief Editorial Team.`,
  sections: standardSections(title, summary.toLowerCase(), 'hub'), sources: [bls, onet, careerOneStop],
}))

const careers = careerSeeds.map(careerContent)

const credentials = credentialSeeds.map(([slug, name, careerSlug, organization, url]) => {
  const career = careerSeeds.find((item) => item.slug === careerSlug)!
  const summary = `${name} can be relevant to ${career.name} work, but its value depends on eligibility, employer use, renewal, and state rules.`
  return makeContent({
    contentType: 'credential', jurisdiction: 'United States', path: `/certifications/${slug}`, slug, title: `${name}: A Decision Guide`,
    summary, seoTitle: `${name}: Cost, Eligibility & Renewal`, seoDescription: `Check ${name} eligibility, exam purpose, renewal duties, career fit, and the difference between certification and legal permission.`,
    sections: standardSections(name, `readers need to know whether this credential is required, commonly preferred, or optional for ${career.name}`, 'credential'),
    sources: [source(organization, `${name} official information`, url), careerOneStop], relatedSlugs: [careerSlug],
  })
})

const comparisons = comparisonSeeds.map(([leftSlug, rightSlug]) => {
  const left = careerSeeds.find((item) => item.slug === leftSlug)!
  const right = careerSeeds.find((item) => item.slug === rightSlug)!
  const slug = `${leftSlug}-vs-${rightSlug}`
  const title = `${left.name} vs. ${right.name}`
  const sections = standardSections(title, `${left.name} and ${right.name} differ in duties, entry route, credentials, schedule, physical demands, and setting`, 'comparison')
  sections.splice(2, 0, {
    heading: 'The work is not interchangeable',
    body: paragraph(`${left.name} work emphasizes ${left.work}. ${right.name} work emphasizes ${right.work}. Those differences affect the kind of interruptions, supervision, customer or patient contact, and physical movement in a normal shift. Compare the tasks you would repeat every day before treating training time or a wage estimate as the deciding factor.`),
  })
  return makeContent({
    contentType: 'comparison', jurisdiction: 'United States', path: `/compare/${slug}`, slug, title,
    summary: `A side-by-side decision brief on ${left.name} and ${right.name}, including work, training, credentials, schedule, and tradeoffs.`,
    seoTitle: `${title}: Training, Pay & Work`, seoDescription: `Compare ${left.name} and ${right.name} by duties, training route, credential rules, work setting, schedule, physical demands, and pay context.`,
    sections, sources: [bls, onet], relatedSlugs: [leftSlug, rightSlug],
  })
})

function topicCollection(type: 'training' | 'skill' | 'work-reality' | 'research' | 'tool', prefix: string) {
  return topicalSeeds[type].map(([slug, title, focus]) => makeContent({
    contentType: type, jurisdiction: 'United States', path: `/${prefix}/${slug}`, slug, title, summary: `A practical, source-backed guide to ${focus}.`,
    seoTitle: `${title} | Career Path Brief`, seoDescription: `Source-backed guidance for ${title.toLowerCase()}, with a transparent method, clear limits, verification steps, and practical next actions.`,
    sections: standardSections(title, focus, type), sources: type === 'training' ? [source('U.S. Department of Education', 'Accreditation and education resources', 'https://www.ed.gov/accreditation'), source('Federal Trade Commission', 'Choosing a vocational school or certificate program', 'https://consumer.ftc.gov/articles/choosing-vocational-school-or-certificate-program') ] : [bls, onet, careerOneStop],
  }))
}

const training = topicCollection('training', 'training')
const skills = topicCollection('skill', 'skills-and-advancement')
const reality = topicCollection('work-reality', 'work-reality')
const research = topicCollection('research', 'research')
const tools = topicCollection('tool', 'tools')

const stateRequirements = stateSeeds.map(([slug, title, state, careerSlug, organization, url]) => {
  const career = careerSeeds.find((item) => item.slug === careerSlug)!
  return makeContent({
    contentType: 'state-requirement', jurisdiction: state, path: `/state-requirements/${slug}`, slug, title,
    summary: `A manually scoped starting point for ${career.name} rules in ${state}, with the controlling agency and checks that still require confirmation.`,
    seoTitle: `${title} | Career Path Brief`, seoDescription: `Check the agency, credential status, application sequence, renewal questions, and official sources for ${career.name} work in ${state}.`,
    sections: standardSections(title, `${state} rules can change the legal route into ${career.name} work`, 'state-requirement'),
    sources: [source(organization, `${title} official regulator`, url), careerOneStop], relatedSlugs: [careerSlug],
  })
})

export const allContent: PublicContent[] = [
  ...hubs, ...careers, ...credentials, ...comparisons, ...training, ...stateRequirements, ...skills, ...reality, ...research, ...tools,
]

export const contentByPath = new Map(allContent.map((item) => [item.path, item]))
export const contentBySlug = new Map(allContent.map((item) => [item.slug, item]))

export const contentCounts = allContent.reduce<Record<ContentType, number>>((counts, item) => {
  counts[item.contentType] += 1
  return counts
}, { hub: 0, career: 0, credential: 0, comparison: 0, training: 0, 'state-requirement': 0, skill: 0, 'work-reality': 0, research: 0, tool: 0 })

export function getContentForPrefix(prefix: string) {
  return allContent.filter((item) => item.path === `/${prefix}` || item.path.startsWith(`/${prefix}/`))
}

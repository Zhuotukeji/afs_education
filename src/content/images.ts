import type { ContentType, ContentVisuals, EditorialImage } from './types'

const PEXELS_LICENSE = 'https://www.pexels.com/license/'

function pexelsImage(
  src: string,
  id: number,
  credit: string,
  alt: string,
  caption: string,
  sourceUrl = `https://www.pexels.com/photo/${id}/`,
): EditorialImage {
  return { alt, caption, credit, licenseName: 'Pexels License', licenseUrl: PEXELS_LICENSE, sourceUrl, src }
}

const images = {
  adultLearning: pexelsImage('/assets/editorial/adult-learning.jpg', 3768126, 'Andrea Piacquadio', 'Adult learner holding books in front of a chalkboard covered with formulas.', 'Structured learning is one part of a career route; verified eligibility and hands-on practice complete the picture.', 'https://www.pexels.com/photo/woman-holding-books-3768126/'),
  analyticsReport: pexelsImage('/assets/editorial/analytics-report.jpg', 590020, 'Lukas Blazek', 'A hand using a pen to review a printed chart.', 'Published numbers become useful only when their definition, year, and denominator stay visible.', 'https://www.pexels.com/photo/person-holding-pen-pointing-at-graph-590020/'),
  autoRepair: pexelsImage('/assets/editorial/auto-repair.jpg', 4489732, 'cottonbro studio', 'Automotive technician working on a wheel in a repair shop.', 'Shop conditions, diagnostic process, and pay structure shape automotive work as much as mechanical interest.', 'https://www.pexels.com/photo/man-in-blue-long-sleeve-shirt-and-gray-pants-standing-beside-black-car-4489732/'),
  automotiveService: pexelsImage('/assets/editorial/automotive-service.jpg', 3806249, 'Andrea Piacquadio', 'Technician changing a vehicle tire with shop tools.', 'Practical work is a sequence of inspection, diagnosis, repair, and verification rather than one isolated task.', 'https://www.pexels.com/photo/man-changing-a-car-tire-3806249/'),
  blueprints: pexelsImage('/assets/editorial/blueprints.jpg', 3862365, 'ThisIsEngineering', 'Engineers reviewing plans, measurements, and a laptop at a worktable.', 'A credible training decision connects classroom material to the documents and tolerances used on the job.', 'https://www.pexels.com/photo/civil-engineer-planning-dam-3862365/'),
  careerPlanning: pexelsImage('/assets/editorial/career-planning.jpg', 3184287, 'fauxels', 'A team reviewing charts and notes around a shared table.', 'Good career comparisons keep costs, conditions, requirements, and evidence in the same frame.', 'https://www.pexels.com/photo/professionals-having-a-meeting-3184287/'),
  clinicalProfessional: pexelsImage('/assets/editorial/clinical-professional.jpg', 5452201, 'Tima Miroshnichenko', 'Clinical professional wearing a mask and stethoscope.', 'Clinical support roles combine patient communication, procedural accuracy, and setting-specific scope rules.', 'https://www.pexels.com/photo/photo-of-woman-with-stethoscope-hanging-on-the-back-of-her-neck-5452201/'),
  clinicalTools: pexelsImage('/assets/editorial/clinical-tools.jpg', 4386466, 'Kaboompics.com', 'A stethoscope, protective mask, and care symbols arranged on a work surface.', 'Equipment and protective procedures are visible reminders that healthcare work is governed by repeatable checks.', 'https://www.pexels.com/photo/medical-stethoscope-and-mask-composed-with-red-foiled-chocolate-hearts-4386466/'),
  collaborativeMeeting: pexelsImage('/assets/editorial/collaborative-meeting.jpg', 3184291, 'fauxels', 'Colleagues collaborating during a workplace meeting.', 'Coordination work depends on clear ownership, documented decisions, and reliable follow-through.', 'https://www.pexels.com/photo/colleagues-shaking-each-other-s-hands-3184291/'),
  computerWork: pexelsImage('/assets/technology-work.jpg', 1181244, 'Christina Morillo', 'A professional using a laptop and phone at a desk.', 'Entry-level technology work joins technical investigation with careful communication and documentation.', 'https://www.pexels.com/photo/person-holding-smartphone-while-using-laptop-1181244/'),
  constructionSite: pexelsImage('/assets/editorial/construction-site.jpg', 585419, 'Yury Kim', 'Construction worker handling equipment on an active industrial site.', 'Travel, protective equipment, weather, and coordination with other trades are normal parts of site work.', 'https://www.pexels.com/photo/man-carrying-gray-pipe-585419/'),
  dataCenter: pexelsImage('/assets/editorial/data-center.jpg', 3862617, 'ThisIsEngineering', 'Technical specialist standing among equipment panels in a control environment.', 'Procedure, access control, equipment checks, and reliable handoffs distinguish operations work from casual troubleshooting.', 'https://www.pexels.com/photo/female-engineer-in-space-station-3862617/'),
  dataReview: pexelsImage('/assets/editorial/data-review.jpg', 5716001, 'Artem Podrez', 'Professionals reviewing charts on paper and a laptop.', 'Evidence review means checking what a chart includes before using it to support a decision.', 'https://www.pexels.com/photo/person-holding-white-and-blue-box-5716001/'),
  dentalCare: pexelsImage('/assets/healthcare-work.jpg', 3845983, 'Photo via Pexels', 'Dental assistant speaking with a patient in a treatment room.', 'Dental assisting duties and permitted functions can change with the employer, procedure, and state.', 'https://www.pexels.com/photo/3845983/'),
  electricianService: pexelsImage('/assets/editorial/electrician-service.jpg', 8005397, 'Photo via Pexels', 'Electrician using hand tools while working on a wall-mounted electrical box.', 'Electrical work pairs hands-on installation with code, testing, documentation, and supervised experience.', 'https://www.pexels.com/photo/8005397/'),
  emergencyRoom: pexelsImage('/assets/editorial/emergency-room.jpg', 263402, 'Pixabay', 'Hospital emergency entrance with prominent red signage.', 'Emergency-care routes must be checked against the state credential that controls legal practice.', 'https://www.pexels.com/photo/emergency-signage-263402/'),
  enrollmentContract: pexelsImage('/assets/editorial/enrollment-contract.jpg', 3760067, 'Andrea Piacquadio', 'A prospective student reviewing a document before signing.', 'Tuition, refund, placement, and eligibility claims should be obtained in writing before enrollment.', 'https://www.pexels.com/photo/crop-businessman-giving-contract-to-woman-to-sign-3760067/'),
  healthcareSupport: pexelsImage('/assets/editorial/healthcare-support.jpg', 5998474, 'Pavel Danilyuk', 'Healthcare professional wearing a white coat and stethoscope.', 'Titles alone do not establish clinical scope; setting, supervision, and state rules still need verification.', 'https://www.pexels.com/photo/physician-in-white-coat-wearing-a-stethoscope-5998474/'),
  hvacService: pexelsImage('/assets/editorial/hvac-service.jpg', 5463575, 'Jose Andres Pacheco Cortes', 'HVAC technician checking an outdoor air-conditioning unit with gauges.', 'HVAC work combines electrical diagnosis, airflow, refrigerant rules, weather exposure, and customer communication.', 'https://www.pexels.com/photo/man-checking-an-air-conditioner-5463575/'),
  industrialControl: pexelsImage('/assets/hero-trades.jpg', 3862132, 'ThisIsEngineering', 'Engineer monitoring multiple screens in a technical control room.', 'Technical careers reward disciplined checks and communication as much as familiarity with equipment.', 'https://www.pexels.com/photo/female-engineer-controlling-flight-simulator-3862132/'),
  industrialMaintenance: pexelsImage('/assets/editorial/industrial-maintenance.jpg', 1108101, 'Chevanon Photography', 'Industrial technician in safety gear inspecting machinery.', 'Maintenance work brings mechanical judgment, safety procedure, and downtime pressure together.', 'https://www.pexels.com/photo/woman-wears-yellow-hard-hat-holding-vehicle-part-1108101/'),
  measuringPlans: pexelsImage('/assets/editorial/measuring-plans.jpg', 4792479, 'Anete Lusina', 'Measuring tools and a pencil resting on a building plan.', 'Exact layout and documented measurements turn a broad plan into work that can be checked.', 'https://www.pexels.com/photo/instruments-prepared-for-measurements-in-house-4792479/'),
  networkRack: pexelsImage('/assets/editorial/network-rack.jpg', 2881229, 'Brett Sayles', 'Network cables connected to equipment in a server rack.', 'Network support requires methodical tracing, change control, and records that another technician can follow.', 'https://www.pexels.com/photo/cables-connected-on-server-2881229/'),
  pharmacySupplies: pexelsImage('/assets/editorial/pharmacy-supplies.jpg', 3786157, 'Anna Shvets', 'Medication, a syringe, and protective equipment arranged on a blue surface.', 'Medication work depends on identity, measurement, supervision, and interruption-resistant procedures.', 'https://www.pexels.com/photo/syringe-and-pills-on-blue-background-3786157/'),
  professionalHandshake: pexelsImage('/assets/editorial/professional-handshake.jpg', 3184465, 'fauxels', 'Two professionals shaking hands across a desk.', 'An offer becomes comparable when duties, conditions, pay basis, and credential expectations are explicit.', 'https://www.pexels.com/photo/man-and-woman-near-table-3184465/'),
  remoteSupport: pexelsImage('/assets/editorial/remote-support.jpg', 4226256, 'Anna Shvets', 'A professional taking notes during a video call.', 'Remote support still depends on attentive questions, accurate notes, and a clear escalation path.', 'https://www.pexels.com/photo/people-on-a-video-call-4226256/'),
  renewableEnergy: pexelsImage('/assets/editorial/renewable-energy.jpg', 433308, 'Pixabay', 'Solar panels and a wind turbine in a winter landscape.', 'Renewable-energy work remains construction and maintenance work, with weather and site constraints.', 'https://www.pexels.com/photo/solar-panels-on-snow-with-windmill-under-clear-day-sky-433308/'),
  skilledTrades: pexelsImage('/assets/editorial/skilled-trades.jpg', 8486972, 'Kindel Media', 'Tradesperson in safety gear holding a large wrench.', 'Transferable trade skill starts with safe setup, tool control, and repeatable inspection habits.', 'https://www.pexels.com/photo/handywoman-holding-a-plumbers-wrench-8486972/'),
  softwareTesting: pexelsImage('/assets/editorial/software-testing.jpg', 3861958, 'ThisIsEngineering', 'Software professional working with code on two monitors.', 'Testing work turns observations into reproducible evidence that another person can act on.', 'https://www.pexels.com/photo/woman-coding-on-computer-3861958/'),
  solarInstallation: pexelsImage('/assets/editorial/solar-installation.jpg', 8853536, 'Los Muertos Crew', 'Two technicians installing solar panels on a roof with protective equipment.', 'Solar installation involves layout, electrical boundaries, fall protection, and changing site conditions.', 'https://www.pexels.com/photo/solar-technicians-installing-solar-panels-8853536/'),
  solarPanels: pexelsImage('/assets/editorial/solar-panels.jpg', 356036, 'Pixabay', 'Solar panels under a bright sky.', 'The equipment is only one part of the route; site practice and electrical scope still control the work.', 'https://www.pexels.com/photo/blue-solar-panel-board-356036/'),
  surgicalTeam: pexelsImage('/assets/editorial/surgical-team.jpg', 1250655, 'Photo via Pexels', 'Surgical team working beneath operating-room lights.', 'Operating-room work depends on sterile sequence, instrument accountability, and calm coordination.', 'https://www.pexels.com/photo/1250655/'),
  teamPlanning: pexelsImage('/assets/editorial/team-planning.jpg', 3184418, 'fauxels', 'A workplace team bringing their hands together over a shared table.', 'Shared goals are useful only when actions, owners, dates, and risks remain visible.', 'https://www.pexels.com/photo/photo-of-people-near-wooden-table-3184418/'),
  technicalPlanning: pexelsImage('/assets/editorial/technical-planning.jpg', 3861943, 'ThisIsEngineering', 'Software professional documenting an interface plan on a whiteboard.', 'Technical notes should preserve the context, attempted steps, evidence, and next action.', 'https://www.pexels.com/photo/woman-writing-on-whiteboard-3861943/'),
  trainingBudget: pexelsImage('/assets/editorial/training-budget.jpg', 6694543, 'Tima Miroshnichenko', 'Calculator, currency, laptop, and financial documents on a desk.', 'A training budget includes fees, exams, equipment, travel, and reduced work hours as well as tuition.', 'https://www.pexels.com/photo/banknotes-and-calculator-on-table-6694543/'),
  windEnergy: pexelsImage('/assets/editorial/wind-energy.jpg', 414837, 'Pixabay', 'Wind turbine standing in a mountain landscape at sunset.', 'Wind work is shaped by climbing, weather windows, travel, rescue readiness, and maintenance procedure.', 'https://www.pexels.com/photo/white-windmill-414837/'),
  workplaceTeam: pexelsImage('/assets/editorial/workplace-team.jpg', 3184436, 'fauxels', 'A diverse team collaborating around a table viewed from above.', 'People-facing roles depend on handoffs, documentation, and influence without formal authority.', 'https://www.pexels.com/photo/photo-of-people-holding-each-other-s-hands-3184436/'),
  workshop: pexelsImage('/assets/editorial/workshop.jpg', 4491881, 'Ivan S', 'Craftsperson using a laptop at a workshop bench.', 'Modern trade work often combines material judgment with digital plans, records, and equipment settings.', 'https://www.pexels.com/photo/man-using-a-laptop-at-a-wood-workshop-4491881/'),
} as const

type ImageKey = keyof typeof images
type VisualPair = readonly [ImageKey, ImageKey]

const careerVisuals: Record<string, VisualPair> = {
  'medical-assistant': ['clinicalProfessional', 'healthcareSupport'],
  'dental-assistant': ['dentalCare', 'clinicalTools'],
  'pharmacy-technician': ['pharmacySupplies', 'healthcareSupport'],
  phlebotomist: ['clinicalTools', 'clinicalProfessional'],
  'surgical-technologist': ['surgicalTeam', 'clinicalTools'],
  'medical-records-specialist': ['healthcareSupport', 'dataReview'],
  'patient-care-technician': ['healthcareSupport', 'clinicalProfessional'],
  'sterile-processing-technician': ['surgicalTeam', 'industrialMaintenance'],
  'emergency-medical-technician': ['emergencyRoom', 'healthcareSupport'],
  'ekg-technician': ['clinicalTools', 'clinicalProfessional'],
  'occupational-therapy-assistant': ['healthcareSupport', 'clinicalProfessional'],
  'physical-therapist-assistant': ['clinicalProfessional', 'healthcareSupport'],
  'hvac-technician': ['hvacService', 'technicalPlanning'],
  electrician: ['electricianService', 'skilledTrades'],
  plumber: ['skilledTrades', 'measuringPlans'],
  welder: ['constructionSite', 'industrialMaintenance'],
  'automotive-service-technician': ['automotiveService', 'autoRepair'],
  'industrial-maintenance-technician': ['industrialMaintenance', 'industrialControl'],
  'solar-photovoltaic-installer': ['solarInstallation', 'solarPanels'],
  'wind-turbine-technician': ['windEnergy', 'renewableEnergy'],
  'cnc-machinist': ['industrialMaintenance', 'workshop'],
  'diesel-service-technician': ['autoRepair', 'industrialMaintenance'],
  'sheet-metal-worker': ['workshop', 'measuringPlans'],
  'heavy-equipment-operator': ['constructionSite', 'industrialMaintenance'],
  'computer-user-support-specialist': ['computerWork', 'remoteSupport'],
  'network-support-specialist': ['networkRack', 'computerWork'],
  'data-center-technician': ['dataCenter', 'networkRack'],
  'bookkeeping-clerk': ['trainingBudget', 'analyticsReport'],
  'payroll-specialist': ['trainingBudget', 'dataReview'],
  'project-coordinator': ['careerPlanning', 'teamPlanning'],
  'digital-marketing-specialist': ['analyticsReport', 'collaborativeMeeting'],
  'insurance-claims-adjuster': ['professionalHandshake', 'dataReview'],
  'paralegal-assistant': ['enrollmentContract', 'careerPlanning'],
  'human-resources-assistant': ['collaborativeMeeting', 'professionalHandshake'],
  'customer-service-representative': ['remoteSupport', 'workplaceTeam'],
  'software-qa-tester': ['softwareTesting', 'technicalPlanning'],
}

const pageVisuals: Record<string, VisualPair> = {
  careers: ['industrialControl', 'careerPlanning'],
  certifications: ['adultLearning', 'enrollmentContract'],
  compare: ['careerPlanning', 'analyticsReport'],
  training: ['adultLearning', 'trainingBudget'],
  'state-requirements': ['measuringPlans', 'enrollmentContract'],
  'skills-and-advancement': ['workplaceTeam', 'technicalPlanning'],
  'work-reality': ['constructionSite', 'clinicalProfessional'],
  research: ['analyticsReport', 'dataReview'],
  tools: ['technicalPlanning', 'trainingBudget'],
  'check-program-accreditation': ['adultLearning', 'enrollmentContract'],
  'compare-certificate-program-costs': ['trainingBudget', 'analyticsReport'],
  'read-job-placement-claims': ['analyticsReport', 'enrollmentContract'],
  'review-refund-cancellation-terms': ['enrollmentContract', 'trainingBudget'],
  'community-college-vs-private-school': ['adultLearning', 'careerPlanning'],
  'evaluate-online-hybrid-training': ['remoteSupport', 'adultLearning'],
  'understand-apprenticeship-offers': ['skilledTrades', 'professionalHandshake'],
  'avoid-training-scams': ['enrollmentContract', 'dataReview'],
  'ask-before-campus-tour': ['adultLearning', 'workshop'],
  'verify-state-approval': ['measuringPlans', 'enrollmentContract'],
  'calculate-time-to-entry': ['careerPlanning', 'trainingBudget'],
  'document-employer-promises': ['professionalHandshake', 'enrollmentContract'],
  'first-90-days-clinical-support': ['clinicalProfessional', 'healthcareSupport'],
  'first-90-days-skilled-trade': ['skilledTrades', 'constructionSite'],
  'technical-support-documentation': ['technicalPlanning', 'networkRack'],
  'renew-professional-certification': ['adultLearning', 'careerPlanning'],
  'move-from-help-desk-to-networking': ['computerWork', 'networkRack'],
  'move-from-assistant-to-coordinator': ['collaborativeMeeting', 'teamPlanning'],
  'build-trade-safety-habits': ['constructionSite', 'skilledTrades'],
  'decide-next-credential': ['careerPlanning', 'trainingBudget'],
  'clinic-flow-and-interruptions': ['dentalCare', 'clinicalProfessional'],
  'retail-pharmacy-accuracy-pressure': ['pharmacySupplies', 'clinicalTools'],
  'construction-trades-weather-travel': ['constructionSite', 'windEnergy'],
  'industrial-maintenance-downtime': ['industrialMaintenance', 'industrialControl'],
  'entry-level-it-interruption-work': ['computerWork', 'remoteSupport'],
  'payroll-deadline-cycle': ['trainingBudget', 'dataReview'],
  'claims-adjusting-after-catastrophe': ['professionalHandshake', 'windEnergy'],
  'healthcare-support-body-mechanics': ['healthcareSupport', 'clinicalProfessional'],
  'training-time-vs-entry-wage': ['analyticsReport', 'trainingBudget'],
  'schedule-stability-by-career': ['dataReview', 'careerPlanning'],
  'mandatory-vs-optional-credentials': ['adultLearning', 'analyticsReport'],
  'state-rules-change-career-path': ['measuringPlans', 'dataReview'],
  'training-cost-planner': ['trainingBudget', 'analyticsReport'],
  'career-comparison-worksheet': ['careerPlanning', 'dataReview'],
  'program-evaluation-checklist': ['enrollmentContract', 'adultLearning'],
  'state-requirement-navigator': ['measuringPlans', 'careerPlanning'],
}

const fallbackByType: Record<ContentType, VisualPair> = {
  hub: ['careerPlanning', 'dataReview'],
  career: ['industrialControl', 'careerPlanning'],
  credential: ['adultLearning', 'enrollmentContract'],
  comparison: ['careerPlanning', 'analyticsReport'],
  training: ['adultLearning', 'trainingBudget'],
  'state-requirement': ['measuringPlans', 'enrollmentContract'],
  skill: ['workplaceTeam', 'technicalPlanning'],
  'work-reality': ['constructionSite', 'dataReview'],
  research: ['analyticsReport', 'dataReview'],
  tool: ['technicalPlanning', 'trainingBudget'],
}

export function resolveEditorialVisuals(item: {
  contentType: ContentType
  relatedSlugs: string[]
  slug: string
}): ContentVisuals {
  let pair = careerVisuals[item.slug] ?? pageVisuals[item.slug]

  if (!pair && item.relatedSlugs.length > 0) {
    const relatedPairs = item.relatedSlugs.map((slug) => careerVisuals[slug]).filter(Boolean)
    if (relatedPairs.length > 0) pair = [relatedPairs[0][0], relatedPairs[1]?.[0] ?? relatedPairs[0][1]]
  }

  pair ??= fallbackByType[item.contentType]
  return { lead: images[pair[0]], inline: images[pair[1]] }
}

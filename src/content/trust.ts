export const trustPages: Record<string, { title: string; description: string; sections: Array<{ heading: string; body: string }> }> = {
  about: { title: 'About Career Path Brief', description: 'How the Career Path Brief Editorial Team researches, reviews, and updates career decisions.', sections: [
    { heading: 'What we publish', body: 'Career Path Brief is an independent educational reference for adults comparing career paths, credentials, state rules, and short-term training. We do not operate a job board, sell enrollment leads, rank schools for payment, or promise employment outcomes.' },
    { heading: 'How we research', body: 'We start with federal workforce data, state regulators, credential bodies, and public program rules. Every substantive page keeps a source file, access dates, an editorial memo, and an update schedule. Public-source Work Reality dossiers never present invented people or composite quotes as reporting.' },
    { heading: 'AI assistance', body: 'Automation may help organize notes, check structure, or flag repetition. It does not create authorities, quotes, experience, or legal conclusions. Production publication requires an Editorial Team review against the cited source and the quality rubric.' },
  ]},
  privacy: { title: 'Privacy Policy', description: 'How Career Path Brief handles analytics, search queries, contact information, cookies, and advertising controls.', sections: [
    { heading: 'Data minimization', body: 'The public site does not require an account. Search terms and aggregate usage events must not include names, email addresses, phone numbers, or other direct identifiers. Contact messages are used only to answer the request or investigate a correction.' },
    { heading: 'Analytics and advertising', body: 'Analytics and advertising scripts remain disabled until configured with an appropriate consent process. When enabled, this policy will identify the providers, purposes, retention rules, and available choices before data is collected where consent is required.' },
    { heading: 'Contact and deletion', body: 'The production operator name, contact email, retention period, and applicable privacy request process must be completed before the site is deployed to a public domain.' },
  ]},
  terms: { title: 'Terms of Use', description: 'The scope and limits of Career Path Brief educational information.', sections: [
    { heading: 'Educational information', body: 'Content is general educational information. It is not legal, financial, medical, licensing, admissions, or employment advice. A regulator, credential body, school, or employer may change its rules after the date shown on a page.' },
    { heading: 'No outcome guarantee', body: 'Career Path Brief does not guarantee admission, certification, licensure, salary, job placement, or return on training costs. Users should verify controlling requirements directly and consider their own circumstances.' },
    { heading: 'Corrections and availability', body: 'We may correct, update, redirect, or remove content when evidence changes. External links are provided for verification and do not imply endorsement.' },
  ]},
  contact: { title: 'Contact the Editorial Team', description: 'Report a correction, source update, accessibility issue, or privacy question.', sections: [
    { heading: 'Send a focused note', body: 'The production contact email will be published after the domain and operator are confirmed. A useful correction includes the page URL, the statement at issue, the controlling source, and the date you accessed it.' },
    { heading: 'Response targets', body: 'The Editorial Team aims to acknowledge corrections within two business days and provide a verified resolution or status within five business days. Urgent safety or legal-scope corrections are prioritized.' },
    { heading: 'What we do not accept', body: 'We do not accept paid rankings, undisclosed sponsored interviews, placement guarantees, link insertion offers, or requests to disguise advertising as editorial content.' },
  ]},
}

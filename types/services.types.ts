export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Industry {
  name: string;
  description: string;
}

export interface ServiceData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  
  // Intro Section
  introTitle: string;
  introContent: string;
  
  // Role/Importance Section
  roleTitle: string;
  roleContent: string[];
  
  // How We Help Section
  howWeHelpTitle: string;
  howWeHelpPoints: { title: string; description: string }[];
  
  // Overview
  overview: string;
  items: string[];
  
  // Benefits/Why Choose Us
  benefits: string[];
  whyChooseUsPoints: { title: string; description: string }[];
  
  // Process
  process: ServiceProcess[];
  
  // Industries
  industries: Industry[];
  
  // Case Studies
  caseStudies: CaseStudy[];
  
  // FAQs
  faqs: FAQ[];
}
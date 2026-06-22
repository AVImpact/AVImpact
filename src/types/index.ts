export interface SolutionCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  specs: string[];
}

export interface TechDiscipline {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
}

export interface LeadFormData {
  fullName: string;
  company: string;
  email: string;
  mobile: string;
  requirementType: string;
  additionalInfo?: string;
}

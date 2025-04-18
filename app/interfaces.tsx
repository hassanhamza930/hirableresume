export interface UserData {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastLogin: Date;
  plan: 'free' | 'premium';
  credits: number;
  onboarded?: boolean;
  resumeData?: string; // User's resume data in natural language
}

export interface Resume {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  jobDescription?: string;
  companyInfo?: string;
  ownerId: string;
  status: 'draft' | 'completed';
}

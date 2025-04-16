export interface UserData {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastLogin: Date;
  resumes: Resume[];
  plan: 'free' | 'premium' | 'enterprise';
  credits:number
}

export interface Resume {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  jobDescription?: string;
  status: 'draft' | 'completed';
}

// Types for the resume editor components

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

// Format date to human-readable format (e.g., "5 minutes ago", "1 hour ago")
export const formatDate = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
};

// Placeholder resume data
export const PLACEHOLDER_RESUMES: Resume[] = [
  {
    id: '1',
    name: 'Software Engineer@Google',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    content: '<h1>Software Engineer Resume</h1><p>This is a placeholder resume for a Software Engineer position at Google.</p>'
  },
  {
    id: '2',
    name: 'Product Manager@Microsoft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    content: '<h1>Product Manager Resume</h1><p>This is a placeholder resume for a Product Manager position at Microsoft.</p>'
  },
  {
    id: '3',
    name: 'Data Scientist@Amazon',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    content: '<h1>Data Scientist Resume</h1><p>This is a placeholder resume for a Data Scientist position at Amazon.</p>'
  }
];

// Types for the resume editor components

export interface Resume {
  id: string;
  firebaseId?: string; // Firestore document ID for unique React keys
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


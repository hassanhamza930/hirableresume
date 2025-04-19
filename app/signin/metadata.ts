import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | HirableResume',
  description: 'Sign in to HirableResume to create and manage your personalized resumes.',
  openGraph: {
    title: 'Sign In | HirableResume',
    description: 'Sign in to HirableResume to create and manage your personalized resumes.',
    url: 'https://hirableresume.com/signin',
    siteName: 'HirableResume',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'HirableResume - Sign In',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In | HirableResume',
    description: 'Sign in to HirableResume to create and manage your personalized resumes.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://hirableresume.com/signin',
  },
};

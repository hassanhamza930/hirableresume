import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HirableResume - AI-Powered Resume Builder',
  description: 'Personalize your resume for each job description using AI to get your foot in the door and land more interviews.',
  openGraph: {
    title: 'HirableResume - AI-Powered Resume Builder',
    description: 'Personalize your resume for each job description using AI to get your foot in the door and land more interviews.',
    url: 'https://hirableresume.com/lander',
    siteName: 'HirableResume',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'HirableResume - AI-Powered Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HirableResume - AI-Powered Resume Builder',
    description: 'Personalize your resume for each job description using AI to get your foot in the door and land more interviews.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://hirableresume.com/lander',
  },
};

import type { Metadata } from "next";
import "./globals.css";
import { RootWrapper } from './components/RootWrapper';
import Script from "next/script";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "HirableResume - AI-Powered Resume Builder",
    template: "%s | HirableResume"
  },
  description: "Personalize your resume for each job description using AI to get your foot in the door and land more interviews.",
  keywords: ["resume builder", "AI resume", "job application", "personalized resume", "ATS optimization", "job search", "career", "employment", "hiring", "job seeker"],
  authors: [{ name: "HirableResume Team" }],
  creator: "HirableResume",
  publisher: "HirableResume",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hirableresume.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/'
    },
  },
  openGraph: {
    title: "HirableResume - AI-Powered Resume Builder",
    description: "Personalize your resume for each job description using AI to get your foot in the door and land more interviews.",
    url: 'https://hirableresume.com',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HirableResume - AI-Powered Resume Builder',
    description: 'Personalize your resume for each job description using AI to get your foot in the door and land more interviews.',
    images: ['/og.png'],
    creator: '@hirableresume',
  },

  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
      },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification=YOUR_VERIFICATION_CODE', // Replace with your verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Special+Gothic+Expanded+One&display=swap"
          rel="stylesheet"
        />
        <Script type="text/javascript">
          {
            `
           (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "r746c0yon6");
          `
          }
        </Script>
      </head>
      <body
        className={`antialiased bg-zinc-950`}
      >
        <RootWrapper>
          {children}
        </RootWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HirableResume",
  description: "Personalize your resume for each job description to get your foot in the door.",
  icons: {
    icon: "/logo.png",
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
      </head>
      <body
        className={`antialiased bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}

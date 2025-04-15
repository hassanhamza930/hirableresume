export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    avatar: "https://picsum.photos/seed/user1/200",
    content: "HirableResume helped me land my dream job at Google! The AI-powered customization made my resume stand out from the competition."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    avatar: "https://picsum.photos/seed/user2/200",
    content: "After using HirableResume, I got callbacks from 80% of the jobs I applied to. The personalization for each job description made all the difference."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Apple",
    avatar: "https://picsum.photos/seed/user3/200",
    content: "I was struggling to get past ATS systems until I found HirableResume. Now I'm working at my dream company thanks to their AI optimization!"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Data Scientist",
    company: "Amazon",
    avatar: "https://picsum.photos/seed/user4/200",
    content: "The resume customization is incredible. I went from zero callbacks to multiple interviews in just one week after using HirableResume."
  },
  {
    id: 5,
    name: "Jessica Patel",
    role: "Marketing Director",
    company: "Netflix",
    avatar: "https://picsum.photos/seed/user5/200",
    content: "As someone who switched careers, HirableResume helped me highlight my transferable skills perfectly. Worth every penny!"
  },
  {
    id: 6,
    name: "Thomas Wilson",
    role: "Frontend Developer",
    company: "Spotify",
    avatar: "https://picsum.photos/seed/user6/200",
    content: "The AI suggestions were spot-on for each job I applied to. HirableResume is now my secret weapon for job hunting."
  },
  {
    id: 7,
    name: "Olivia Martinez",
    role: "Project Manager",
    company: "Adobe",
    avatar: "https://picsum.photos/seed/user7/200",
    content: "I was skeptical at first, but the results speak for themselves. Three interviews in my first week using HirableResume!"
  },
  {
    id: 8,
    name: "James Taylor",
    role: "DevOps Engineer",
    company: "Salesforce",
    avatar: "https://picsum.photos/seed/user8/200",
    content: "The ATS optimization feature is a game-changer. I'm finally getting my resume in front of actual humans instead of being filtered out."
  }
];

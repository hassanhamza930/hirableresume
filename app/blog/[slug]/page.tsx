import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Define the blog post interface
interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    channel?: string;
  };
  slug: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Make a Hirable Resume in 2025",
    description: "Learn how to personalize your resume for each job description to maximize your chances of getting hired in today's competitive job market.",
    thumbnail: "/gradient.gif",
    date: "May 15, 2025",
    author: {
      name: "A Life After Layoff",
      avatar: "https://yt3.googleusercontent.com/_zU_clWV90oSMPYNvnJhHIwIJBtsK2YQiaHsSRuQkgLUwWNsbkiXoZeRytQJPd8eK7TKYeq4QqA=s160-c-k-c0x00ffffff-no-rj",
      channel: "https://www.youtube.com/@ALifeAfterLayoff",
    },
    slug: "how-to-make-hirable-resume-2025",
    content: `
      <h2>The Evolution of Resume Building in 2025</h2>
      <p>In today's hyper-competitive job market, a generic resume no longer cuts it. Employers are using increasingly sophisticated tools to filter through hundreds of applications, making personalization more crucial than ever.</p>

      <h2>Why Personalization Matters</h2>
      <p>When you submit a resume, it's likely to first encounter an Applicant Tracking System (ATS) before human eyes ever see it. These systems are trained to look for specific keywords and qualifications that match the job description. A personalized resume dramatically increases your chances of making it through this initial filter.</p>

      <h2>Step 1: Analyze the Job Description</h2>
      <p>The first step in creating a hirable resume is to thoroughly analyze the job description. Look for:</p>
      <ul>
        <li>Required skills and qualifications</li>
        <li>Preferred experience levels</li>
        <li>Industry-specific terminology</li>
        <li>Company values and culture indicators</li>
      </ul>

      <h2>Step 2: Tailor Your Skills Section</h2>
      <p>Reorganize your skills section to prioritize those that directly match the job requirements. Be specific and use the exact terminology found in the job posting. For example, if they ask for "experience with data visualization," don't just list "data analysis" – be explicit.</p>

      <h2>Step 3: Customize Your Professional Summary</h2>
      <p>Your professional summary is the first thing recruiters read. Make it count by tailoring it to address exactly what the employer is looking for. Mention your most relevant experiences and achievements that align with the position.</p>

      <h2>Step 4: Reorder and Emphasize Relevant Experience</h2>
      <p>Restructure your work experience section to highlight roles and responsibilities that are most relevant to the position you're applying for. Use bold text to draw attention to key achievements that directly relate to the job requirements.</p>

      <h2>Step 5: Quantify Your Achievements</h2>
      <p>Numbers speak louder than words. Whenever possible, quantify your achievements with specific metrics. Instead of saying "Improved sales," say "Increased quarterly sales by 27% through implementation of new customer engagement strategies."</p>

      <h2>Step 6: Leverage AI Tools for Optimization</h2>
      <p>Modern AI tools like HirableResume can analyze both your resume and the job description to suggest optimizations that will increase your chances of getting noticed. These tools can identify missing keywords, suggest improvements to your phrasing, and help you format your resume for maximum ATS compatibility.</p>

      <h2>Step 7: Maintain Authenticity</h2>
      <p>While personalization is crucial, authenticity remains paramount. Never fabricate experiences or skills. Instead, focus on honestly presenting your background in the most relevant light for each position.</p>

      <h2>The Future of Resume Building</h2>
      <p>As we move further into 2025, the integration of AI in both resume creation and screening will continue to evolve. Staying ahead means embracing these tools while maintaining the human touch that showcases your unique value proposition.</p>

      <h2>Expert Advice from A Life After Layoff</h2>
      <p>Check out this insightful video from A Life After Layoff that provides additional tips on creating a resume that stands out:</p>
      <div class="video-container"></div>

      <h2>Conclusion</h2>
      <p>Creating a hirable resume in 2025 is about strategic personalization. By tailoring your resume for each job application, you significantly increase your chances of getting past ATS systems and impressing human recruiters. Remember, your resume is not just a document – it's a marketing tool designed to sell your professional story to potential employers.</p>
    `,
  },
  {
    id: "2",
    title: "Rant: Why Hiring Sucks in 2025 and How to Actually Hack the Job Market",
    description: "Discover how major companies are using AI to parse resumes at scale and learn the strategies to beat these systems and stand out.",
    thumbnail: "/chrome.gif",
    date: "June 2, 2025",
    author: {
      name: "Pooja Dutt",
      avatar: "https://yt3.googleusercontent.com/Dv_7FHx3QdYzqVsfVJ42bbeiowQkiTiR87H7ZYgrdh7izKNBnD1_lTg7WuLaioUah4XZecGLEco=s160-c-k-c0x00ffffff-no-rj",
      channel: "https://www.youtube.com/@PoojaDutt",
    },
    slug: "why-hiring-sucks-2025-hack-job-market",
    content: `
      <h2>The Broken Hiring System of 2025</h2>
      <p>Let's face it: the hiring process in 2025 is fundamentally broken. What was once a human-centered process has become an algorithmic nightmare where qualified candidates are filtered out before a human ever sees their application. This isn't just frustrating—it's creating a massive disconnect between talent and opportunity.</p>

      <h2>The AI Gatekeepers</h2>
      <p>Nearly every Fortune 500 company now uses some form of AI-powered Applicant Tracking System (ATS) to manage the flood of resumes they receive. These systems are designed to scan for specific keywords, phrases, and patterns, often missing the nuance and potential that human recruiters might spot.</p>

      <p>Here's what these systems typically look for:</p>
      <ul>
        <li>Keyword density matching the job description</li>
        <li>Specific formatting and structure</li>
        <li>Quantifiable achievements</li>
        <li>Educational credentials from recognized institutions</li>
        <li>Career progression patterns</li>
      </ul>

      <h2>The Resume Black Hole</h2>
      <p>The result? Millions of qualified candidates send their carefully crafted resumes into what amounts to a digital black hole. According to recent studies, up to 75% of resumes are rejected by ATS systems before a human ever reviews them. This isn't just inefficient—it's actively harmful to both job seekers and companies missing out on great talent.</p>

      <h2>How Companies Are Using AI at Scale</h2>
      <p>Major corporations have taken resume parsing to new extremes. Some are now implementing:</p>

      <h3>Sentiment Analysis</h3>
      <p>AI systems that analyze the tone and language of your resume and cover letter to determine cultural fit.</p>

      <h3>Predictive Performance Algorithms</h3>
      <p>Systems that attempt to predict your job performance based on patterns in your work history and achievements.</p>

      <h3>Social Media Integration</h3>
      <p>AI tools that scrape your online presence to create a "complete candidate profile" beyond what you've submitted.</p>

      <h3>Video Interview Analysis</h3>
      <p>Automated systems that analyze facial expressions, word choice, and speech patterns during video interviews.</p>

      <h2>Hacking the System: Practical Strategies</h2>
      <p>So how do you beat this rigged game? Here are concrete strategies that actually work:</p>

      <h3>1. Reverse-Engineer the ATS</h3>
      <p>Use tools like HirableResume that analyze job descriptions and optimize your resume specifically for each company's ATS. This isn't about keyword stuffing—it's about strategic placement of relevant terms and phrases.</p>

      <h3>2. Bypass the Front Door</h3>
      <p>The most successful job seekers in 2025 aren't relying on application portals. Instead, they're leveraging second and third-degree connections on professional networks to get direct introductions to hiring managers. A personal referral can bypass the ATS entirely.</p>

      <h3>3. Create a Digital Portfolio</h3>
      <p>Standard resumes are increasingly obsolete. Develop a compelling digital portfolio that showcases your actual work, not just descriptions of it. Include case studies, project outcomes, and tangible results.</p>

      <h3>4. Leverage AI to Your Advantage</h3>
      <p>Fight fire with fire. Use AI tools to analyze successful resumes in your target role and industry. Identify patterns and incorporate them into your own materials.</p>

      <h3>5. Demonstrate Adaptability</h3>
      <p>The half-life of skills is shorter than ever. Rather than focusing solely on current technical skills, emphasize your ability to learn and adapt quickly to new technologies and methodologies.</p>

      <h2>The Human Element: Still the Ultimate Hack</h2>
      <p>Despite all the technology, the most effective "hack" remains human connection. Attend industry events, participate in relevant online communities, and build genuine relationships. When a hiring manager already knows your value, the ATS becomes irrelevant.</p>

      <h2>Expert Insights from Pooja Dutt</h2>
      <p>Watch this insightful video from Pooja Dutt that provides additional perspectives on navigating the modern hiring landscape:</p>
      <div class="video-container"></div>

      <h2>Conclusion: The Future Belongs to the Adaptable</h2>
      <p>The job market of 2025 is challenging, but not impossible to navigate. By understanding how companies are using AI to screen candidates and implementing strategies to work with (or around) these systems, you can significantly increase your chances of landing interviews and offers.</p>

      <p>Remember: The goal isn't just to get past the AI—it's to connect your genuine talents with opportunities where you can thrive. The companies worth working for are increasingly recognizing the limitations of algorithmic hiring and creating alternative pathways for exceptional candidates to be discovered.</p>
    `,
  },
];

// Define the page props type
type Props = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found | HirableResume Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | HirableResume Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://hirableresume.com/blog/${post.slug}`,
      siteName: 'HirableResume',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.thumbnail],
    },
    alternates: {
      canonical: `https://hirableresume.com/blog/${post.slug}`,
    },
  };
}

// Define the page component
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16">
      <article
        className="max-w-none"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="author" content={post.author.name} />

        <header className="mb-12 text-center">
          <div className="mb-6">
            <Link
              href="/blog"
              className="text-white/70 hover:text-white text-sm inline-flex items-center gap-1"
              style={{ fontFamily: "Geist Mono" }}
            >
              ← Back to all articles
            </Link>
          </div>

          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={post.thumbnail}
              alt={`Cover image for ${post.title}`}
              className="absolute inset-0 w-full h-full object-cover"
              itemProp="image"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          </div>

          <h1
            style={{ fontFamily: "Special Gothic Expanded One" }}
            className="text-3xl md:text-5xl text-white mb-4"
            itemProp="headline"
          >
            {post.title}
          </h1>

          <p
            style={{ fontFamily: "Geist Mono" }}
            className="text-white/70 text-md md:text-lg max-w-2xl mx-auto mb-6"
            itemProp="abstract"
          >
            {post.description}
          </p>

          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full border border-white/20"
            />
            <div className="text-left">
              <div style={{ fontFamily: "Geist" }} className="text-white text-sm">
                {post.author.name}
              </div>
              {post.author.channel && (
                <a
                  href={post.author.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Geist Mono" }}
                  className="text-white/70 hover:text-white text-xs underline"
                >
                  YouTube Channel
                </a>
              )}
              <div style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs">
                Published on {post.date}
              </div>
            </div>
          </div>
        </header>

        <div
          className="blog-content text-white/90"
          itemProp="articleBody"
        >
          {post.content.split('<h2>').map((section, index) => {
            if (index === 0) return null;

            const [title, ...contentParts] = section.split('</h2>');
            const content = contentParts.join('</h2>');

            return (
              <div key={index} className="mb-10">
                <h2 className="text-xl md:text-2xl mb-4 text-white" style={{ fontFamily: "Special Gothic Expanded One" }}>
                  {title}
                </h2>
                <div className="space-y-4">
                  {content.split('<p>').map((paragraph, pIndex) => {
                    if (pIndex === 0) return null;

                    if (paragraph.includes('<ul>')) {
                      const [text, ...rest] = paragraph.split('<ul>');
                      const [list, ...afterList] = rest.join('<ul>').split('</ul>');

                      return (
                        <div key={pIndex} className="space-y-4">
                          {text.replace('</p>', '').trim() && (
                            <p className="text-white/80" style={{ fontFamily: "Geist" }}>
                              {text.replace('</p>', '')}
                            </p>
                          )}
                          <ul className="list-disc pl-6 space-y-2">
                            {list.split('<li>').map((item, liIndex) => {
                              if (liIndex === 0) return null;
                              return (
                                <li key={liIndex} className="text-white/80" style={{ fontFamily: "Geist" }}>
                                  {item.replace('</li>', '')}
                                </li>
                              );
                            })}
                          </ul>
                          {afterList[0].replace('</p>', '').trim() && (
                            <p className="text-white/80" style={{ fontFamily: "Geist" }}>
                              {afterList[0].replace('</p>', '')}
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (paragraph.includes('<div class="video-container">')) {
                      const [text, ...rest] = paragraph.split('<div class="video-container">');
                      const [...afterVideo] = rest.join('<div class="video-container">').split('</div>');

                      return (
                        <div key={pIndex} className="space-y-4">
                          {text.replace('</p>', '').trim() && (
                            <p className="text-white/80" style={{ fontFamily: "Geist" }}>
                              {text.replace('</p>', '')}
                            </p>
                          )}
                          <div className="relative w-full pt-[56.25%] mt-4 mb-6 overflow-hidden rounded-lg">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src={post.slug === "how-to-make-hirable-resume-2025" ?
                                "https://www.youtube.com/embed/R3abknwWX7k" :
                                "https://www.youtube.com/embed/31EWjB_9Jig"}
                              title="YouTube video player"
                              style={{ border: 0 }}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          {afterVideo[0] && afterVideo[0].replace('</p>', '').trim() && (
                            <p className="text-white/80" style={{ fontFamily: "Geist" }}>
                              {afterVideo[0].replace('</p>', '')}
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (paragraph.includes('<h3>')) {
                      const [text, ...rest] = paragraph.split('<h3>');
                      const [subheading, ...afterSubheading] = rest.join('<h3>').split('</h3>');

                      return (
                        <div key={pIndex} className="space-y-2">
                          {text.replace('</p>', '').trim() && (
                            <p className="text-white/80" style={{ fontFamily: "Geist" }}>
                              {text.replace('</p>', '')}
                            </p>
                          )}
                          <h3 className="text-lg mt-6 mb-2 text-white" style={{ fontFamily: "Geist" }}>
                            {subheading}
                          </h3>
                          <p className="text-white/80" style={{ fontFamily: "Geist" }}>
                            {afterSubheading[0].replace('</p>', '')}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <p key={pIndex} className="text-white/80" style={{ fontFamily: "Geist" }}>
                        {paragraph.replace('</p>', '')}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 style={{ fontFamily: "Geist" }} className="text-white text-lg mb-2">
                Ready to create your personalized resume?
              </h3>
              <p style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-sm">
                Try HirableResume today and stand out from the competition.
              </p>
            </div>

            <Button asChild>
              <Link href="/signin">Get Started for Free</Link>
            </Button>
          </div>
        </footer>
      </article>

      {/* Schema.org JSON-LD for BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": `https://hirableresume.com${post.thumbnail}`,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "url": post.author.channel || "https://hirableresume.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "HirableResume",
              "logo": {
                "@type": "ImageObject",
                "url": "https://hirableresume.com/logo.png",
                "width": 112,
                "height": 112
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://hirableresume.com/blog/${post.slug}`
            },
            "keywords": ["resume", "job search", "career advice", "hiring", "job application"],
            "articleSection": "Career Advice",
            "wordCount": post.content.split(' ').length
          })
        }}
      />
    </main>
  );
}

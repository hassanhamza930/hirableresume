import Link from "next/link";
import { Button } from "../ui/button";

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
  },
];

export default function ServerResources() {
  return (
    <section
      className="w-full flex flex-col justify-start items-center px-[5%] sm:px-[10%] mt-24 md:mt-48"
      aria-labelledby="resources-title"
    >
      {/* Section Label */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1 mb-6 mx-auto w-fit">
        <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs font-medium">
          RESOURCES
        </span>
      </div>

      {/* Section Title */}
      <h2
        id="resources-title"
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mb-2 text-2xl sm:text-3xl md:text-4xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 px-4 w-full md:w-[650px] text-white"
      >
        Actual Advice from Real Recruiters
      </h2>

      {/* Section Description */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mb-10 md:mb-16 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] px-4"
      >
        Learn insider tips and strategies directly from hiring managers to help you land more interviews.
      </p>

      {/* Blog Posts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="w-full"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <meta itemProp="datePublished" content={post.date} />
            <meta itemProp="author" content={post.author.name} />
            <Link href={`/blog/${post.slug}`} className="block">
              <div
                className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                {/* Thumbnail */}
                <img
                  src={post.thumbnail}
                  alt={`Thumbnail for ${post.title}`}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  itemProp="image"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl z-10 transition-all duration-300 group-hover:bg-black/50" />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-6 text-center">
                  <h3
                    style={{ fontFamily: "Special Gothic Expanded One" }}
                    className="text-lg md:text-xl text-white mb-3"
                    itemProp="headline"
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{ fontFamily: "Geist Mono" }}
                    className="text-white/80 text-xs md:text-sm mb-4 line-clamp-3"
                    itemProp="abstract"
                  >
                    {post.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full border border-white/20"
                    />
                    {post.author.channel ? (
                      <a
                        href={post.author.channel}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "Geist" }}
                        className="text-white/70 hover:text-white text-xs"
                      >
                        {post.author.name}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "Geist" }} className="text-white/70 text-xs">
                        {post.author.name}
                      </span>
                    )}
                    <span className="text-white/50 text-xs">•</span>
                    <time style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs">
                      {post.date}
                    </time>
                  </div>

                  <Button
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10 text-xs"
                  >
                    Read Article
                  </Button>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10 text-center">
        <Button
          variant="outline"
          className="text-white border-white/20 hover:bg-white/10"
          asChild
        >
          <Link href="/blog">View All Articles</Link>
        </Button>
      </div>

      {/* Schema.org JSON-LD for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "HirableResume Blog",
            "description": "Actual advice from real recruiters to help you land more interviews.",
            "url": "https://hirableresume.com/blog",
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
            "blogPost": blogPosts.map(post => ({
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
                "name": "HirableResume"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://hirableresume.com/blog/${post.slug}`
              },
              "url": `https://hirableresume.com/blog/${post.slug}`
            }))
          })
        }}
      />
    </section>
  );
}

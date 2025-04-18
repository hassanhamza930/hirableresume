import React from "react";
import ServerCard from "./ServerCard";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How does the AI customize my resume?",
    answer: "Our AI analyzes both your resume and the job description to identify key skills and experiences that match what employers are looking for. It then restructures and highlights the most relevant parts of your resume to increase your chances of getting past ATS systems and impressing recruiters."
  },
  {
    id: 2,
    question: "Can I use the service for multiple job applications?",
    answer: "Absolutely! Our plans are designed to support multiple job applications. The Basic plan includes 20 resume customizations, while the Pro plan offers 80 customizations, making it perfect for active job seekers applying to multiple positions."
  },
  {
    id: 3,
    question: "Will my resume still look professional after AI customization?",
    answer: "Yes, maintaining professionalism is our priority. Our AI enhances content while preserving your resume's professional appearance. You'll always have the opportunity to review and approve changes before finalizing your resume."
  },
  {
    id: 4,
    question: "How long does it take to customize a resume?",
    answer: "The AI customization process typically less than a minute. This means you can quickly tailor your resume for each job application without spending hours manually editing it yourself."
  },
  {
    id: 5,
    question: "Can i customize my resume after it has been optimized?",
    answer: "Yes, you can make further customizations to your resume after it has been optimized by the AI. You have full control over the final content and formatting."
  },
  {
    id: 6,
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. You can cancel your subscription at any time with no cancellation fees. Your subscription will remain active until the end of your current billing period."
  }
];

export default function ServerFAQs() {
  return (
    <section className="w-full flex flex-col justify-start items-center px-[5%] sm:px-[10%] mt-24 md:mt-48" aria-labelledby="faq-title">
      {/* Section Label */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1 mb-6 mx-auto w-fit">
        <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs font-medium">
          FREQUENTLY ASKED QUESTIONS
        </span>
      </div>

      {/* Section Title */}
      <h2 id="faq-title"
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mb-2 text-2xl sm:text-3xl md:text-4xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 px-4 w-full md:w-[450px] text-white"
      >
        Got Questions? We've Got Answers
      </h2>

      {/* Section Description */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mb-10 md:mb-16 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] px-4"
      >
        Find answers to common questions about our AI resume builder and how it can help you land more interviews.
      </p>

      {/* FAQ Cards */}
      <dl className="w-full max-w-3xl">
        {faqItems.map((faq) => (
          <div key={faq.id} className="mb-4">
            <FAQCard faq={faq} />
          </div>
        ))}
      </dl>
    </section>
  );
}

function FAQCard({ faq }: { faq: FAQItem }) {
  return (
    <ServerCard
      className="border border-white/10 bg-zinc-950/50 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20"
      spotlightColor="rgba(255, 255, 255, 0.15)"
    >
      <div className="w-full">
        {/* Question */}
        <dt className="px-5 py-4 border-b border-white/10">
          <h3 style={{ fontFamily: "Geist" }} className="text-white text-sm md:text-md font-medium text-start">
            {faq.question}
          </h3>
        </dt>

        {/* Answer */}
        <dd className="px-5 py-4">
          <p style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs md:text-xs">
            {faq.answer}
          </p>
        </dd>
      </div>
    </ServerCard>
  );
}

import { FaUpload, FaRobot, FaFileDownload } from "react-icons/fa";
import { MdOutlineAutoAwesome, MdOutlineCompareArrows, MdOutlineFileDownload, MdOutlineHistory } from "react-icons/md";
import { FaPaste } from "react-icons/fa6";
import ServerCard from "./ServerCard";

interface FeatureStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  spotlightColor?: string;
}

interface KeyFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  spotlightColor?: string;
}

const featureSteps: FeatureStep[] = [
  {
    id: 1,
    title: "Upload Your Resume",
    description: "Start by uploading your existing resume or create a new one from scratch just by telling us more about yourself",
    icon: <FaUpload className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-emerald-500 to-blue-500",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 2,
    title: "Paste Job Description",
    description: "Our AI analyzes the job description and customizes your resume to highlight relevant skills and experience",
    icon: <FaPaste className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-blue-500 to-purple-500",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: 3,
    title: "Download & Apply",
    description: "Download your personalized resume in multiple formats and apply with confidence.",
    icon: <FaFileDownload className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-purple-500 to-pink-500",
    spotlightColor: "rgba(236, 72, 153, 0.15)",
  },
];

const keyFeatures: KeyFeature[] = [
  {
    id: 1,
    title: "ATS Optimization",
    description: "Our AI ensures your resume passes through Applicant Tracking Systems by using the right keywords and formatting.",
    icon: <MdOutlineAutoAwesome className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-blue-500 to-cyan-400",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 2,
    title: "Skill Matching",
    description: "Automatically identify and highlight the skills that match the job description to show recruiters you're the perfect fit.",
    icon: <MdOutlineCompareArrows className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-purple-500 to-pink-500",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: 3,
    title: "Multiple Formats",
    description: "Download your resume in various formats including PDF, DOCX, and TXT to meet any application requirement.",
    icon: <MdOutlineFileDownload className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-amber-500 to-yellow-500",
    spotlightColor: "rgba(251, 191, 36, 0.15)",
  },
  {
    id: 4,
    title: "Version History",
    description: "Keep track of all your customized resumes and easily access previous versions for similar job applications.",
    icon: <MdOutlineHistory className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-emerald-500 to-green-500",
    spotlightColor: "rgba(52, 211, 153, 0.15)",
  },
];

export default function ServerFeatures() {
  return (
    <main id="features" className="w-full flex flex-col justify-start items-center px-[5%] sm:px-[10%] mt-24 md:mt-48">
      {/* HOW IT WORKS Badge */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1 mb-6">
        <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs font-medium">
          HOW IT WORKS
        </span>
      </div>

      {/* Section Title */}
      <h2
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mb-2 text-2xl sm:text-3xl md:text-4xl w-full max-w-[500px] px-4 text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 text-white"
      >
        A Hyper Personalized Resume For Every Job Application
      </h2>

      {/* Section Description */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mb-8 md:mb-16 mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] px-4"
      >
        Maximize your chances of getting noticed in ATS systems & ACTUALLY land job interviews in the next 30 days
      </p>

      {/* Feature Steps */}
      <section className="w-full flex flex-wrap justify-center items-end gap-5" aria-labelledby="how-it-works">
        <h3 id="how-it-works" className="sr-only">How It Works</h3>
        {featureSteps.map((step) => (
          <article key={step.id} className="w-full sm:w-[300px] md:w-96">
            <HowItWorksCard step={step} />
          </article>
        ))}
      </section>

      {/* Key Features Section */}
      <section className="mt-24 md:mt-48 w-full relative flex flex-col justify-center items-center overflow-hidden" aria-labelledby="key-features">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1 mb-6 mx-auto w-fit">
          <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs font-medium">
            KEY FEATURES
          </span>
        </div>

        <h2 id="key-features"
          style={{ fontFamily: "Special Gothic Expanded One" }}
          className="mb-5 text-2xl sm:text-3xl md:text-4xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 px-4 md:w-[600px] text-white"
        >
          Forget Resume Templates, AI is Your Unfair Advantage
        </h2>

        <p
          style={{ fontFamily: "Geist Mono" }}
          className="mb-8 md:mb-16 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] mx-auto px-4"
        >
          We supercharge your profile with the best resume practices and make sure your resume is custom tailored for each specific job applications.
        </p>

        <div className="w-full flex flex-wrap justify-center items-center gap-2 md:gap-5">
          {keyFeatures.map((feature) => (
            <article key={feature.id} className="w-full sm:w-[300px] md:w-96">
              <KeyFeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                spotlightColor={feature.spotlightColor}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function HowItWorksCard({ step }: { step: FeatureStep }) {
  return (
    <ServerCard
      className="h-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl px-6 py-5"
      spotlightColor={step.spotlightColor || "rgba(255, 255, 255, 0.1)"}
    >
      <div className="flex flex-col justify-start items-start h-full">
        {/* Icon Container */}
        <figure className="mb-5 h-8 w-8 flex items-center justify-center" aria-hidden="true">
          {step.icon}
        </figure>

        {/* Title */}
        <h3 style={{ fontFamily: "Geist" }} className="text-white text-md md:text-lg font-semibold mb-2 text-start">
          {step.title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs md:text-sm text-start">
          {step.description}
        </p>
      </div>
    </ServerCard>
  );
}

function KeyFeatureCard({
  title,
  description,
  icon,
  spotlightColor
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  spotlightColor?: string;
}) {
  return (
    <ServerCard
      className="h-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl p-5"
      spotlightColor={spotlightColor || "rgba(255, 255, 255, 0.1)"}
    >
      <div className="flex flex-col justify-start items-start h-full">
        {/* Icon Container */}
        <figure className="w-8 h-8 mb-4 flex items-center justify-center" aria-hidden="true">
          {icon}
        </figure>

        {/* Title */}
        <h3 style={{ fontFamily: "Geist" }} className="text-white text-md md:text-lg font-semibold mb-2 text-start">
          {title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs md:text-sm text-start">
          {description}
        </p>
      </div>
    </ServerCard>
  );
}

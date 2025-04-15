import { useEffect, useRef, useState } from 'react'
import Onboarding from './components/onboarding';
import Marquee from 'react-fast-marquee';
import { IoMdArrowDroprightCircle, IoMdClipboard, IoMdDocument } from 'react-icons/io';
import { GeistSans } from "geist/font/sans";
import { useNavigate } from 'react-router-dom';
import uuid4 from "uuid4";
import NavBar from './components/navbar';
import Pricing from './components/pricing';
import { motion, useScroll } from "framer-motion";
import { MdEditDocument, MdLoop, MdSend } from 'react-icons/md';
import FAQs from './components/faqs';
import ResumeAnimation from './components/resumeanimation';
import TryItNow from './components/tryitnow';


function Feature(props: { title: string, summary: string, emoji: string }) {
  return (
    <div className="w-96 md:h-64 p-5 text-white border-[1px] border-white border-dashed rounded-xl flex flex-col justify-start items-start gap-1">
      <div className="font-bold text-5xl">{props.emoji}</div>
      <div className="font-bold text-2xl">{props.title}</div>
      <div className="font-normal text-sm">{props.summary}</div>
    </div>
  );
}



function LandingPage() {



  const navigate = useNavigate();




  return (
    <div
      style={{ fontFamily: "Bricolage Grotesque" }} className="w-full relative z-0 flex flex-col justify-start items-center overflow-x-hidden">
      <NavBar />
      <div
        className="tracking-tight text-center w-full md:w-[750px] text-4xl md:text-6xl font-bold mt-36 flex flex-wrap justify-center items-center gap-y-1 md:gap-y-2 gap-x-2 md:gap-x-4"
      >
        A <span className="decoration-wavy decoration-[1.5px] underline-offset-[5px] md:decoration-[2px] underline text-primary">Brand-new Resume</span> for Every Application
      </div>

      <div
        style={{ fontFamily: "Bricolage Grotesque" }}
        className="tracking-tight text-lg px-5 md:text-xl w-full overflow-x-hidden md:w-[550px] text-center font-medium mt-5 text-black"
      >
        Create <span className="text-primary">Hyper-Personalized</span> resumes and cover letters for each job description within seconds using AI  & land the role of your dreams.
      </div>

      <div className="w-full md:w-2/4 relative rounded-full overflow-x-hidden mt-12 md:mt-8">
        <div className="absolute z-10 flex flex-row justify-between items-center w-full h-full">
          <div className="h-full w-10 md:w-36 bg-gradient-to-r from-white to-transparent " />
          <div className="h-full w-10 md:w-36 bg-gradient-to-r from-transparent to-white " />
        </div>

        <Marquee autoFill speed={45} className="overflow-x-hidden relative">
          {[
            "Hyper Personalized Resumes",
            "AI Powered Design",
            "ATS Friendly Keywords",
            "Personalized Cover Letters",
            "High Parsing Scores"
          ].map((e, index) => {
            return (
              <div
                key={index}
                className="bg-primary/10 text-primary rounded-full px-5 py-2 mx-1 md:mx-2 text-xs md:text-sm"
              >
                {e}
              </div>
            );
          })}
        </Marquee>
      </div>

      <button onClick={() => {
        document.getElementById("tryitnow")?.scrollIntoView({behavior:"smooth"});
      }}
        className="flex flex-row justify-center items-center gap-2 bg-primary rounded-xl text-white shadow-lg hover:animate-none hover:shadow-2xl hover:shadow-purple-600/80 shadow-purple-600/30 hover:scale-105 hover:-rotate-1 transition-all duration-2 text-md md:text-lg font-normal px-10 py-3 mt-12">
        Try it now, No Signup Required
        <IoMdArrowDroprightCircle />
      </button>

   



      <div className='flex flex-col md:flex-row justify-start md:justify-center items-center md:items-start w-full px-[10%] gap-5 md:gap-10 mt-24 md:mt-36'>
        <div
          style={{ fontFamily: "Inter" }}
          className='flex flex-wrap justify-center items-start gap-x-1 w-[90%] md:w-2/5'>
          {
            '"Templates Matter Less, Keywords Matter More. When you make a resume in 2024, you\'re making it for the ATS first and the recruiter second"'.split(" ").map((e, index) => {
              return (
                <motion.div
                  initial={{
                    opacity: 0, y: 5
                  }}
                  whileInView={{
                    opacity: 1, y: 0
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  className='text-xl md:text-2xl font-normal tracking-tight'
                >
                  {e}
                </motion.div>
              )
            })
          }
        </div>

        <div className='md:flex hidden md:h-24 w-[2px] bg-black/60'>
        </div>

        <div className='flex md:hidden h-[1px] w-full bg-black/60'>
        </div>


        <div
          style={{ fontFamily: "Inter" }}
          className='flex flex-wrap justify-center items-start gap-x-1 w-[90%] md:w-2/5 flex-none'>
          {
            '"A 2023 survey by Glassdoor found that 83% of recruiters say that they like to see resumes personalized to the job position"'.split(" ").map((e, index) => {
              return (
                <motion.div
                  initial={{
                    opacity: 0, y: 5
                  }}
                  whileInView={{
                    opacity: 1, y: 0
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  className='text-xl md:text-2xl font-normal tracking-tight'
                >
                  {e}
                </motion.div>
              )
            })
          }
        </div>
      </div>


      <motion.div
        whileInView={{ opacity: [0, 1], y: [10, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className='mt-48 text-5xl font-bold text-center'>1 Template, That Just Works!</motion.div>
      <div className='mt-4 text-xl font-normal text-primary -mb-5 md:-mb-16 w-full px-5 md:w-[650px] text-center'>We trained our own AI models on hundreds of <b className=''>winning resumes</b> to help you land your dream job</div>
      
      <ResumeAnimation />




      <div
        id="features" className="bg-gradient-to-b from-indigo-600/90 to-purple-600 mt-24 w-full flex flex-col justify-start items-center gap-3 relative z-0 overflow-hidden">
        <motion.div
          whileInView={{
            rotate: [0, 360, 0],
            scale: [3, 4],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20210612/pngtree-blue-noise-image_729577.jpg')` }} className='h-full w-full absolute z-0 bg-cover bg-center '></motion.div>

        <div className='w-full flex flex-col justify-start items-center gap-3 relative z-10 py-24 bg-black/50 backdrop-blur-[50px]'>

          <div
            style={{ fontFamily: "Bricolage Grotesque" }}
            className="tracking-tight text-center w-full text-4xl md:text-5xl font-bold text-white"
          >
            Meet Your New<br /> <span className="decoration-wavy decoration-[1.5px] underline-offset-[5px] md:decoration-[2px] underline text-yellow-400 px-1">Career Copilot</span>
          </div>

          <div
            style={{ fontFamily: "Bricolage Grotesque" }}
            className="tracking-normal text-lg px-5 md:text-xl w-full overflow-x-hidden md:w-[650px] text-center font-normal mt-5 text-white"
          >
            HirableNow gets you through the <span className="text-yellow-400 font-bold">ATS Filtering Systems</span> by including all the relevant Keywords for each job description while impressing recruiters when they do eventually read your resume by highlighting your achievements that are most relevant.
          </div>

          <div className="flex flex-wrap  w-full justify-center items-center gap-3 mt-10 md:px-0 px-5">
            <Feature emoji="👋" title="Hyper Personalized Resumes" summary="Stop wasting hours customizing and tweaking your resumes for different job titles and descriptions. Enter all your info once and let AI generate a brand new, hyper-personalized resume and cover letter in seconds, tailored for each job description  " />
            <Feature emoji="🎨" title="AI powered Design" summary="Generate professional resume copy and design in seconds and make changes just by talking to our AI chatbot. Generate new designs in seconds with all the relevant sections" />
            {/* <Feature emoji="🤝" title="Unified Chat Interface" summary="Generate resumes, cover letters, edit designs and ask for career advice, all by just talking to HirableAI in a unified chat interface." /> */}
          </div>

          <button onClick={() => {
            navigate("/signup")
          }}
            className="flex flex-row justify-center items-center gap-2 bg-primary rounded-xl text-white shadow-lg hover:animate-none hover:shadow-2xl hover:shadow-purple-600/80 shadow-purple-600/30 hover:scale-105 hover:-rotate-1 transition-all duration-2 text-md md:text-lg font-normal px-10 py-3 mt-12">
            Get Started in 5 Minutes
            <IoMdArrowDroprightCircle />
          </button>
        </div>


      </div>


      <div className='w-full flex flex-col justify-start items-center gap-5 mt-20'>
        <div
          style={{ fontFamily: "Bricolage Grotesque" }}
          className="tracking-tight text-center w-full text-4xl md:text-5xl font-bold text-black">
          How it Works</div>
        <div
          style={{ fontFamily: "Bricolage Grotesque" }}
          className="tracking-tight text-lg px-5 md:text-xl w-full overflow-x-hidden md:w-[650px] text-center font-medium text-black"
        >
          Get a brand new hyper personalized resume & cover letter for each job description in 5 minutes </div>

          <div className='flex flex-col md:flex-row justify-start items-center md:justify-center md:items-center gap-5 w-full mt-5 px-5'>

            <div className='w-full md:w-1/4 border-[1px] border-black border-dashed rounded-xl flex flex-col justify-start items-start p-5 bg-black/80 text-white/95 shadow-2xl'>
              <div className='text-sm'>Step 1</div>
              <div className='text-xl font-bold'>Upload your Current Resume</div>
              <div className='text-md font-normal'>GPT parses your current resume to extract all the details about you which you can then edit and finalize</div>
              <IoMdDocument className='mt-5 text-white' size={60}/>
            </div>

            <div className='w-full md:w-1/4 border-[1px] border-black border-dashed rounded-xl flex flex-col justify-start items-start p-5 bg-black/80 text-white/95 shadow-2xl'>
              <div className='text-sm'>Step 2</div>
              <div className='text-xl font-bold'>HirableAI + Job Description</div>
              <div className='text-md font-normal'>HirableAI personalizes your details with relevant experiences and keywords for each job description</div>
              <MdLoop className='mt-5 text-white' size={60}/>
            </div>

            <div className='w-full md:w-1/4 border-[1px] border-black border-dashed rounded-xl flex flex-col justify-start items-start p-5 bg-black/80 text-white/95 shadow-2xl'>
              <div className='text-sm'>Step 3</div>
              <div className='text-xl font-bold'>A Brand New Resume</div>
              <div className='text-md font-normal'>HirableNow Creates a brand new resume for application, hyper personalized to help you get noticed in ATS systems</div>
              <IoMdClipboard className='mt-5 text-white' size={60}/>
            </div>

          </div>

        <video autoPlay muted controls loop src="/hirable.mp4" className='mt-10 w-[95%] md:w-3/4 shadow-xl shadow-indigo-600/50 object-cover object-center rounded-md'>

        </video>
      </div>


      <TryItNow />
      <Pricing />
      <FAQs />

      <div className='text-xl font-bold tracking-tight flex flex-row justify-center gap-5 items-center w-full my-10'>
        <button onClick={() => { navigate("/imprint") }}>imprint</button>
        <button onClick={() => { navigate("/dataprotection") }}>data protection</button>
      </div>


    </div>
  );
}

export default LandingPage

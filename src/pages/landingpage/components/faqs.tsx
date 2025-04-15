import exp from "constants";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { motion } from "framer-motion";

function FAQ(props: { question: string, answer: string }) {
    const [expanded, setexpanded] = useState(false);

    return (

        <div className="w-full md:w-2/4 border-black border-dashed border-[1px] px-5 py-4 text-black/80 rounded-md flex flex-col">
            <button onClick={() => { setexpanded(!expanded); }} className="text-sm text-start md:text-xl font-semibold flex flex-row justify-between items-center">
                {props.question}
                <MdArrowDropDown className="flex flex-none ml-5" size={20} />
            </button>
            <AnimatePresence>
                {
                    expanded == true &&
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{
                            duration: 0.2
                        }}
                        className="text-xs md:text-sm font-normal mt-2">
                        {props.answer}
                    </motion.div>
                }
            </AnimatePresence>
        </div>

    )
}


function FAQs() {

    const faqs = [
        {
            question: "What is Hirable Now?",
            answer: "Hirable Now is an AI-powered tool that helps you create hyper-personalized resumes and cover letters tailored for each job application, increasing your chances of landing your dream job."
        },
        {
            question: "How does Hirable Now create personalized resumes?",
            answer: "Hirable Now uses custom trained models that analyzed thousands of resumes to find the winners. HirableNow analyzes job descriptions and your provided information to generate resumes that include relevant keywords and highlight your most applicable skills and experiences."
        },
        {
            question: "Can I create a resume for any job position?",
            answer: "Yes, Hirable Now can generate resumes for any job position by tailoring the content to match the specific requirements of the job description you provide."
        },
        {
            question: "Is Hirable Now's resume design ATS-friendly?",
            answer: "Absolutely! Hirable Now ensures that the resumes it generates are optimized for Applicant Tracking Systems (ATS), making sure your application gets noticed by recruiters."
        },
        {
            question: "How quickly can I generate a resume with Hirable Now?",
            answer: "You can generate a fully personalized resume in just a few seconds after providing the necessary information and job description."
        },
        {
            question: "Does Hirable Now offer cover letter generation?",
            answer: "Yes, Hirable Now also generates personalized cover letters tailored to each job application, complementing your resume perfectly."
        },
        {
            question: "What are the pricing plans for Hirable Now?",
            answer: "Hirable Now offers a Basic plan at $15 per month, which includes 500 resume generations, and a Pro plan at $25 per month, offering 1200 generations along with additional features like career roadmap and counseling."
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes, you can start creating your resumes and optimize according to your liking for free, but you need to be on a paid plan to download your resumes."
        },
        {
            question: "Can I customize the resume after it's generated?",
            answer: "Yes, you can make changes to the resume by interacting with our AI chatbot, which allows you to edit designs and content quickly and easily."
        },
    ];


    return (
        <div className="w-full flex flex-col justify-start items-center mt-24 mb-24 gap-3 px-5">
            {
                faqs.map((e, index) => {
                    return (
                        <FAQ {...e} key={index} />
                    )
                })
            }
        </div>
    );
}

export default FAQs;
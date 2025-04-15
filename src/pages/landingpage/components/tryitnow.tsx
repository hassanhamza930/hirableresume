import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowDroprightCircle, IoMdCloudUpload } from "react-icons/io";
import pdfToText from "react-pdftotext";
import { atom, useRecoilState } from "recoil";
import axios from "axios";

const jobDescriptionAtom = atom({
    key: "jobDescriptionAtom",
    default: ""
});

const indexAtom = atom({
    key: "TryItNownIdexAtom",
    default: 0
});

const userDataAtom = atom({
    key: "userDataAtom",
    default: ""
});


function Page1() {
    const [index, setindex] = useRecoilState(indexAtom);
    const [userResumeData, setuserResumeData] = useRecoilState(userDataAtom);

    async function handleResumeUpload() {
        const inputField = document.createElement("input");
        inputField.type = "file";
        inputField.accept = "application/pdf";
        inputField.oncancel = (e: any) => {
            e.preventDefault();
        }
        inputField.onchange = async (e: any) => {
            e.preventDefault();
            const reader = new FileReader();
            const file: File = e.target.files[0];
            if (file) {
                pdfToText(file)
                    .then(
                        text => {
                            setuserResumeData(text);
                            setindex(1);
                            console.log(text);
                        }
                    )
                    .catch(error => {
                        alert("There was an error parsing your resume, either it is not readable or there was an internal error, please contact support");
                    }
                    )
            }

        };
        inputField.click();
    }


    return (
        <div style={{ fontFamily: "Inter" }} className="h-full w-full flex flex-col justify-start items-center tracking-tight">
            <button onClick={() => { handleResumeUpload() }} className="p-5 md:py-10 md:px-10 text-md font-bold rounded-md gap-6 shadow-2xl shadow-indigo-600 flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 border-2 border-black border-dashed text-black hover:bg-black hover:text-white">
                <div className="text-lg md:text-xl w-full">Upload your current resume</div>
                <div className="text-3xl">
                    <IoMdCloudUpload />
                </div>
            </button>

        </div>
    )

}


function Page2() {
    const [jobDescription, setjobDescription] = useRecoilState(jobDescriptionAtom);
    const [index, setindex] = useRecoilState(indexAtom);


    return (
        <div style={{ fontFamily: "Inter" }} className="h-full w-full flex flex-col justify-start items-center tracking-tight px-5">
            <textarea value={jobDescription} onChange={(e) => { e.preventDefault(); setjobDescription(e.target.value) }} className="w-full md:w-2/4 md:h-64 h-64 px-4 py-3 border-2 border-black rounded-md" placeholder="Enter the job description here"></textarea>
            <button onClick={() => {
                setindex(2);
            }}
                className="flex flex-row justify-center items-center gap-2 bg-primary rounded-xl text-white shadow-lg hover:animate-none hover:shadow-2xl hover:shadow-purple-600/80 shadow-purple-600/30 hover:scale-105 hover:-rotate-1 transition-all duration-2 text-md md:text-lg font-normal px-10 py-3 mt-12">
                Get your personalized resume
                <IoMdArrowDroprightCircle />
            </button>
        </div>
    )

}



function Page3() {
    const [index, setindex] = useRecoilState(indexAtom);
    const [userData, setUserData] = useRecoilState(userDataAtom);
    const [jobDescription, setjobDescription] = useRecoilState(jobDescriptionAtom);
    const [resumeHTML, setresumeHTML] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    async function generateResume() {
        setloading(true);
        const res = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini', // Specify the model you are using
                messages: [
                    {
                        role: "system", content: `
                        ###Objectives
                        You are a resume building assistant, your goal is to help the user generate dynamic hyper personalized resumes in HTML format, you will generate all the resumes based on each job description that the user provides. 
                        You will generate all resumes based on the data about the user.

                        ###Data of the User: 
                        ${userData}

                        You have to generate all resumes based on this data and the job description that the user provides.
                        You can take liberties with explaining the user's accomplishments but don't make any claims that are not supported by this data about the user.
                        
                        ###Instuctions About Styling of HTML Code for Resume:
                        In your HTML output, you have to style the resume only using TailwindCSS inline classes.
                        Import TailwindCSS with the CDN.
                        For fonts, you can use the Google Fonts CDN.
                        The text and paragraphs should be spaced moderately apart but should stay compact in a resume style.
                        Include all relevant sections of a resume based on the data.
                        Make sure all social links and contact links like phone, email, linkedin are wrapped with a tags in html so they are clickable
                        Use Professional Fonts like Times New Roman.

                        Add a brief paragraph at the start explaining why the user is a good fit for the job based on the data provided.

                        If certain sections or information from user data is not relevant to the job description, then don't add it.



                        ###Example Output:

                        Here's a resume for a XYZ role for XYZ description.

                        <html lang="en">

                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>React Developer Resume</title>
                            <link href="https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&family=Times+New+Roman:wght@400;700&display=swap" rel="stylesheet">
                            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                            <style>
                                @page {
                                    size: A4;
                                    margin: 0;
                                }
                            </style>
                        </head>

                        <body class="p-0 m-0">
                            <div class="w-full max-w-screen-md mx-auto p-8">
                                <!-- Header -->
                                <header class="text-center mb-4">
                                    <h1 class="text-4xl font-bold" style="font-family: 'Calibri', sans-serif;">John Doe</h1>
                                    <h2 class="text-xl font-medium" style="font-family: 'Calibri', sans-serif;">Lead Business Analyst</h2>
                                    <div class="mt-2 text-lg" style="font-family: 'Times New Roman', serif;">
                                        <p>
                                            <a href="tel:+1234567890" class="text-blue-500">+1-921-389-0182</a> •
                                            <a href="mailto:name@gmail.com" class="text-blue-500">name@gmail.com</a> •
                                            <a href="https://linkedin.com/in/jonwright" class="text-blue-500">linkedin.com/in/jonwright</a> •
                                            Dallas, TX
                                        </p>
                                    </div>
                                </header>

                                <!-- Summary -->
                                <section class="mb-4">
                                    <h2 class="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2" style="font-family: 'Calibri', sans-serif;">Summary</h2>
                                    <p class="mt-2" style="font-family: 'Times New Roman', serif;">Highly skilled React Developer with over 5 years of experience in building and maintaining responsive web applications. Proficient in modern JavaScript frameworks, libraries, and best practices. Strong problem-solving abilities and a passion for creating high-quality user experiences.</p>
                                </section>

                                <!-- Skills -->
                                <section class="mb-4">
                                    <h2 class="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2" style="font-family: 'Calibri', sans-serif;">Skills</h2>
                                    <div class="flex flex-wrap">
                                        <div class="w-1/2">
                                            <h3 class="font-bold" style="font-family: 'Calibri', sans-serif;">Business:</h3>
                                            <p style="font-family: 'Times New Roman', serif;">Budgeting, Financial Analysis, Project Management, Stakeholder Management, Business Strategy</p>
                                        </div>
                                        <div class="w-1/2">
                                            <h3 class="font-bold" style="font-family: 'Calibri', sans-serif;">Technology:</h3>
                                            <p style="font-family: 'Times New Roman', serif;">Excel, VBA, SQL, QuickBooks, Power BI, Tableau, Python</p>
                                        </div>
                                    </div>
                                </section>

                                <!-- Experience -->
                                <section class="mb-4">
                                    <h2 class="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2" style="font-family: 'Calibri', sans-serif;">Experience</h2>
                                    <div class="mt-2">
                                        <h3 class="text-lg font-bold" style="font-family: 'Calibri', sans-serif;">Network Solutions LLC</h3>
                                        <h4 class="italic" style="font-family: 'Times New Roman', serif;">Lead Business Analyst & Project Manager</h4>
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">Dallas, TX | 2019 - Ongoing</p>
                                        <ul class="list-disc ml-5 mt-2" style="font-family: 'Times New Roman', serif;">
                                            <li>Created new strategies to manage $2 million of accounts at risk, resulting in an increase of 4% in revenue in 6 months.</li>
                                            <li>Led the effort to deploy an automated time & expense reporting system for more than 90 onsite and offsite personnel across 3 locations.</li>
                                            <li>Oversaw the budget and schedule of a project to recruit, hire, and train 150 new employees at five new locations.</li>
                                        </ul>
                                    </div>
                                    <div class="mt-4">
                                        <h3 class="text-lg font-bold" style="font-family: 'Calibri', sans-serif;">Senior Business Analyst</h3>
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">2017 - 2019</p>
                                        <ul class="list-disc ml-5 mt-2" style="font-family: 'Times New Roman', serif;">
                                            <li>Through an improved pricing model, increased gross revenue of 15% in 2018 compared to 2017 with no change to fixed costs.</li>
                                            <li>Reduced warehouse processing time by 30% in just 3 months while industry norm is 10 months.</li>
                                            <li>Achieved project milestones and deliverables with an internal and external team of 10+ analysts.</li>
                                        </ul>
                                    </div>
                                    <div class="mt-4">
                                        <h3 class="text-lg font-bold" style="font-family: 'Calibri', sans-serif;">Lauzon</h3>
                                        <h4 class="italic" style="font-family: 'Times New Roman', serif;">Business Analyst</h4>
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">Dallas, TX | 2013 - 2016</p>
                                        <ul class="list-disc ml-5 mt-2" style="font-family: 'Times New Roman', serif;">
                                            <li>Prepared 2016 Budget with Variance analysis to prior years.</li>
                                            <li>Assisted merger in advanced electronics space, identifying synergy opportunities of $60M.</li>
                                            <li>Reduced IPS (Customer Issues) by 2.2% while impacting merely 3% of GMV.</li>
                                            <li>Designed and maintained 10+ data integration jobs.</li>
                                        </ul>
                                    </div>
                                </section>

                                <!-- Education -->
                                <section class="mb-4">
                                    <h2 class="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2" style="font-family: 'Calibri', sans-serif;">Education</h2>
                                    <div class="mt-2">
                                        <h3 class="text-lg font-bold" style="font-family: 'Calibri', sans-serif;">University of Wisconsin</h3>
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">M.Sc. in Finance | Wisconsin | 2012 - 2013</p>
                                    </div>
                                    <div class="mt-2">
                                        <h3 class="text-lg font-bold" style="font-family: 'Calibri', sans-serif;">University of Wisconsin</h3>
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">BBA: Business, Supply Chain Management | Wisconsin | 2008 - 2012</p>
                                    </div>
                                </section>

                                <!-- Courses & Certificates -->
                                <section class="mb-4">
                                    <h2 class="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2" style="font-family: 'Calibri', sans-serif;">Courses & Certificates</h2>
                                    <div class="mt-2">
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">PMI Professional in Business Analysis (PBA) — PMI, 2019</p>
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">Certified Associate in Project Management (CAPM) — PMI, 2018</p>
                                        <p class="italic" style="font-family: 'Times New Roman', serif;">High-Dimensional Data Analysis — Harvard, 2017</p>
                                    </div>
                                </section>

                                <!-- Interests & Hobbies -->
                                <section class="mb-4">
                                    <h2 class="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2" style="font-family: 'Calibri', sans-serif;">Interests & Hobbies</h2>
                                    <div class="flex flex-wrap">
                                        <div class="w-1/3">
                                            <h3 class="font-bold" style="font-family: 'Calibri', sans-serif;">Giving back to my community</h3>
                                            <p style="font-family: 'Times New Roman', serif;">With my two kids, I spend at least one day each month volunteering.</p>
                                        </div>
                                        <div class="w-1/3">
                                            <h3 class="font-bold" style="font-family: 'Calibri', sans-serif;">Horse-riding & spending time in nature</h3>
                                            <p style="font-family: 'Times New Roman', serif;">Recharging during the weekend is vital for leading a high-performing team.</p>
                                        </div>
                                        <div class="w-1/3">
                                            <h3 class="font-bold" style="font-family: 'Calibri', sans-serif;">Developing my team into star analysts</h3>
                                            <p style="font-family: 'Times New Roman', serif;">Not only is it very satisfying, but it is also the highest value-add of any leader.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </body>

                        </html>


                        ###Response Guidelines

                        Your output should only include some plain text as a context about the resume and the HTML code for the resume.
                        Don't add weird things in the resume for example quotes

                        In your response, don't mention that you're generating HTML code because the end user doesn't know. Just reply with the HTML code and a brief context about the resume.
                        The HTML code will automatically be visualized for the end user through an app.

                       ` },
                    { role: "user", content: `Generate a resume for me against this job description: ${jobDescription}` },
                ],
                max_tokens: 16384,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer sk-proj-XfOxTONSgu5GemhQJaopT3BlbkFJqUT7ygXdbzvkiC3KeEEh`,
                },
            }
        );

        var content = res.data.choices[0].message.content;

        const firstHtmlTagMatch = content.match(/<html[^>]*>/);
        const lastHtmlTagMatch = content.match(/<\/html>/);

        if (firstHtmlTagMatch && lastHtmlTagMatch) {
            const startIndex = content.indexOf(firstHtmlTagMatch[0]);
            const endIndex = content.lastIndexOf(lastHtmlTagMatch[0]) + lastHtmlTagMatch[0].length;

            const htmlContent = content.slice(startIndex, endIndex);

            const beforeHtmlContent = content.slice(0, startIndex).trim();
            const afterHtmlContent = content.slice(endIndex).trim();
            const nonHtmlContent = `${beforeHtmlContent}\n${afterHtmlContent}`.trim();
            setresumeHTML(htmlContent);
            setloading(false);
        }
        else {
            alert("There was an error generating your resume, please try again");
            setloading(false);
        }

    }

    useEffect(() => {
        if (resumeHTML == "") {
            generateResume();
        }
    }, [])

    return (
        <div style={{ fontFamily: "Inter" }} className="h-full w-full flex flex-col justify-start items-center tracking-tight px-5">
            {
                loading == true ?
                    <div className="mt-10 flex flex-none animate-pulse">
                        Making a brand new hyper personalized resume....
                    </div>
                    :
                    <iframe src={`data:text/html;charset=utf-8,${resumeHTML}`} className="w-full md:w-3/4 md:h-[650px] h-[450px] overflow-y-auto px-4 py-3 border-2 border-black rounded-md" />

            }
            <button onClick={() => {
                localStorage.setItem("onetime", "true");
                navigate("/print", { state: { htmlContent: resumeHTML } });
            }}
                className="flex flex-row justify-center items-center gap-2 bg-primary rounded-xl text-white shadow-lg hover:animate-none hover:shadow-2xl hover:shadow-purple-600/80 shadow-purple-600/30 hover:scale-105 hover:-rotate-1 transition-all duration-2 text-md md:text-lg font-normal px-20 py-3 mt-12">
                Print
                <IoMdArrowDroprightCircle />
            </button>
        </div>
    )

}






function TryItNow() {
    const navigate = useNavigate();
    const [index, setindex] = useRecoilState(indexAtom);


    return (
        <div id="tryitnow" className='w-full flex flex-col justify-start items-center gap-3 relative z-10 py-36 bg-white backdrop-blur-[50px]'>

            <div
                style={{ fontFamily: "Bricolage Grotesque" }}
                className="tracking-tight text-center w-full text-5xl md:text-5xl font-bold text-black"
            >
                Get your first resume for free
            </div>

            <div
                style={{ fontFamily: "Bricolage Grotesque" }}
                className="tracking-normal text-lg px-5 md:text-xl w-full overflow-x-hidden md:w-[650px] text-center font-normal mt-2 text-black"
            >
                Upload your current resume and enter a job description to get a brand new hyper personalized resume
            </div>

            {
                localStorage.getItem("onetime") != "true" ?
                    <div className="w-full flex flex-col justify-start items-center gap-3 mt-10">
                        {
                            index == 0 && <Page1 />
                        }
                        {
                            index == 1 && <Page2 />
                        }
                        {
                            index == 2 && <Page3 />
                        }

                    </div> :
                    <div className="w-full flex flex-col justify-center items-center mt-10 text-center">
                        You have already generated a free demo resume, please signup to get started
                        <button onClick={() => {
                            navigate("/signup");
                        }}
                            className="flex flex-row justify-center items-center gap-2 bg-primary rounded-xl text-white shadow-lg hover:animate-none hover:shadow-2xl hover:shadow-purple-600/80 shadow-purple-600/30 hover:scale-105 hover:-rotate-1 transition-all duration-2 text-md md:text-lg font-normal px-20 py-3 mt-5">
                            Signup
                            <IoMdArrowDroprightCircle />
                        </button>

                    </div>
            }


        </div>

    );
}

export default TryItNow;
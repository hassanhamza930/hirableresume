import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { chatHistoryAtom, loadingAtom, userDataAtom } from "./atoms";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { UserDataInterface } from "./interfaces";


export function useUser() {
    const [userData, setuserData] = useRecoilState(userDataAtom);
    const [chatHistory, setchatHistory] = useRecoilState(chatHistoryAtom);
    const db = getFirestore();

  
    useEffect(() => {
        if (localStorage.getItem("uid") != undefined) {
            onSnapshot(doc(db, "users", localStorage.getItem("uid")! as string), doc => {
                if (doc.exists()) {
                    setuserData({ ...doc.data(), uid: localStorage.getItem("uid") } as UserDataInterface);
                    if(localStorage.getItem('chathistory')!=undefined){
                        setchatHistory(JSON.parse(localStorage.getItem('chathistory')!));
                    }
                    else{
                        setchatHistory(
                            [
                                {
                                    role: "system", content: `
                                    ###Objectives
                                    You are a resume building assistant, your goal is to help the user generate dynamic hyper personalized resumes in HTML format, you will generate all the resumes based on each job description that the user provides. 
                                    You will generate all resumes based on the data about the user.
    
                                    ###Data of the User: 
                                    ${JSON.stringify({...doc.data(),profilePicture:""} as UserDataInterface)}
    
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
                                { role: "assistant", content: "Hello! I am your virtual job search assistant, I'm here to help you generate hyper personalized resumes and cover letters. You can just talk to me about your career aspirations or ask for advice or you can enter a job description to help me align keywords and relevant experiences according to a particular application to increase your chances of getting through the ATS filtering and landing your next job 🚀 " },
                            ]
                        );
                    }
                   
                }
                else {
                    localStorage.clear();
                    window.location.href = "/";
                }
            }
            )
        }
        
    }, [])

    return { userData };


}
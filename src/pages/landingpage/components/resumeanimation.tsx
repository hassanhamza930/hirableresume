import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";


function ResumeAnimation() {
    const { scrollYProgress, scrollY } = useScroll({ smooth: 10 });
    const [scrollTicker, setscrollTicker] = useState(0.0);

    scrollYProgress.onChange((latest) => {
        setscrollTicker(latest);
    })

    useEffect(() => { }, [scrollY])

    const htmlResume = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>John Doe - Data Analyst Resume</title>
        <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body {
                font-family: 'Times New Roman', serif;
            }
        </style>
    </head>
    <body class="bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto bg-white shadow-lg p-8">
            <header class="text-center mb-8">
                <h1 class="text-3xl font-bold mb-2">John Doe</h1>
                <p class="text-xs">
                    <a href="tel:+923001234567" class="mr-2">+92 300 1234567</a> |
                    <a href="mailto:john.doe@email.com" class="mx-2">john.doe@email.com</a> |
                    <a href="https://www.linkedin.com/in/johndoe" class="ml-2">LinkedIn Profile</a>
                </p>
            </header>
    
            <section class="mb-6">
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Professional Summary</h2>
                <p class="text-xs leading-relaxed">
                    Experienced Data Analyst with 3 years of expertise in Tableau development, SQL, and database management. Skilled in creating impactful dashboards and analytics solutions. Proficient in Excel with advanced capabilities in macros and pivot tables. Seeking a challenging role to leverage my skills in data visualization and analysis.
                </p>
            </section>
    
            <section class="mb-6">
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Work Experience</h2>
                <div class="mb-4">
                    <h3 class="text-lg font-semibold">Senior Data Analyst</h3>
                    <p class="text-xs italic">XYZ Analytics, Lahore | June 2020 - Present</p>
                    <ul class="list-disc list-inside text-xs mt-2">
                        <li>Developed and maintained Tableau dashboards for key business metrics, improving decision-making efficiency by 30%.</li>
                        <li>Optimized SQL queries and data models, reducing dashboard load times by 40%.</li>
                        <li>Implemented advanced Excel models using macros and pivot tables for financial reporting.</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Junior Data Analyst</h3>
                    <p class="text-xs italic">ABC Tech Solutions, Lahore | July 2018 - May 2020</p>
                    <ul class="list-disc list-inside text-xs mt-2">
                        <li>Assisted in the development of Tableau dashboards for marketing and sales teams.</li>
                        <li>Conducted data cleansing and preparation using SQL, improving data accuracy by 25%.</li>
                        <li>Collaborated with cross-functional teams to identify and implement data-driven solutions.</li>
                    </ul>
                </div>
            </section>
    
            <section class="mb-6">
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Skills</h2>
                <ul class="list-disc list-inside text-xs grid grid-cols-2 gap-2">
                    <li>Tableau Development</li>
                    <li>SQL</li>
                    <li>Data Modeling</li>
                    <li>Excel (Advanced)</li>
                    <li>Database Management</li>
                    <li>Data Visualization</li>
                </ul>
            </section>
    
            <section>
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Education</h2>
                <h3 class="text-lg font-semibold">Bachelor of Science in Data Science</h3>
                <p class="text-xs italic">University of Lahore | Graduated: May 2018</p>
                <h4 class="text-sm font-semibold mt-2">Key Courses:</h4>
                <ul class="list-disc list-inside text-xs mt-1">
                    <li>Advanced Database Management Systems</li>
                    <li>Data Visualization and Business Intelligence</li>
                    <li>Statistical Analysis and Machine Learning</li>
                    <li>Big Data Analytics</li>
                    <li>Data Mining and Predictive Modeling</li>
                    <li>Programming for Data Science (Python, R)</li>
                </ul>
            </section>
        </div>
    </body>
    </html>
    `
    const htmlResume2 = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jane Doe - Frontend Engineer Resume</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body {
                font-family: 'Roboto', sans-serif;
            }
        </style>
    </head>
    <body class="bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto bg-white shadow-lg p-8">
            <header class="text-center mb-8">
                <h1 class="text-3xl font-bold mb-2">Jane Doe</h1>
                <p class="text-xs">
                    <a href="tel:+1234567890" class="mr-2">+1 234 567 890</a> |
                    <a href="mailto:jane.doe@email.com" class="mx-2">jane.doe@email.com</a> |
                    <a href="https://www.linkedin.com/in/janedoe" class="ml-2">LinkedIn Profile</a> |
                    <a href="https://github.com/janedoe" class="ml-2">GitHub</a>
                </p>
            </header>
    
            <section class="mb-6">
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Professional Summary</h2>
                <p class="text-xs leading-relaxed">
                    Highly skilled Frontend Engineer with 4+ years of experience in developing scalable, responsive web applications using React.js and modern JavaScript frameworks. Proficient in translating UI/UX designs into high-quality code, optimizing applications for maximum speed, and ensuring cross-browser compatibility. Passionate about creating engaging user experiences and implementing best practices in web development.
                </p>
            </section>
    
            <section class="mb-6">
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Work Experience</h2>
                <div class="mb-4">
                    <h3 class="text-lg font-semibold">Senior Frontend Engineer</h3>
                    <p class="text-xs italic">Tech Innovators, San Francisco, CA | January 2022 - Present</p>
                    <ul class="list-disc list-inside text-xs mt-2">
                        <li>Led the development of a dynamic e-commerce platform using React.js, Redux, and TypeScript, resulting in a 25% increase in user engagement.</li>
                        <li>Collaborated with UI/UX designers to implement responsive and accessible web pages using CSS3, Tailwind CSS, and Sass.</li>
                        <li>Optimized application performance by implementing lazy loading, code splitting, and efficient state management strategies.</li>
                        <li>Integrated third-party APIs and services, including payment gateways and analytics tools, to enhance platform functionality.</li>
                        <li>Mentored junior developers, conducted code reviews, and promoted best practices in React development across the team.</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Frontend Developer</h3>
                    <p class="text-xs italic">Creative Solutions, New York, NY | June 2018 - December 2021</p>
                    <ul class="list-disc list-inside text-xs mt-2">
                        <li>Developed and maintained multiple web applications using React.js, ensuring high code quality and adherence to industry standards.</li>
                        <li>Implemented reusable components, hooks, and context API to streamline the development process and reduce code redundancy.</li>
                        <li>Worked closely with backend developers to integrate RESTful APIs, ensuring seamless data flow and real-time updates.</li>
                        <li>Utilized Jest and React Testing Library to write unit and integration tests, achieving 90% test coverage across projects.</li>
                        <li>Contributed to the company’s design system by building and documenting UI components that adhered to the brand’s guidelines.</li>
                    </ul>
                </div>
            </section>
    
            <section class="mb-6">
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Technical Skills</h2>
                <ul class="list-disc list-inside text-xs grid grid-cols-2 gap-2">
                    <li>React.js</li>
                    <li>JavaScript (ES6+)</li>
                    <li>Redux / Context API</li>
                    <li>TypeScript</li>
                    <li>HTML5 & CSS3</li>
                    <li>Tailwind CSS</li>
                    <li>Responsive Web Design</li>
                    <li>RESTful APIs</li>
                    <li>Version Control (Git)</li>
                    <li>Webpack & Babel</li>
                    <li>Unit Testing (Jest, React Testing Library)</li>
                    <li>Agile & Scrum Methodologies</li>
                </ul>
            </section>
    
            <section class="mb-6">
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Projects</h2>
                <div class="mb-4">
                    <h3 class="text-lg font-semibold">Portfolio Website</h3>
                    <p class="text-xs italic">https://janedoe.dev</p>
                    <ul class="list-disc list-inside text-xs mt-2">
                        <li>Designed and developed a personal portfolio website showcasing various projects and technical skills using React.js and Tailwind CSS.</li>
                        <li>Implemented a custom blog feature with markdown support and a dynamic content management system (CMS) using React Static.</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">E-commerce Platform</h3>
                    <p class="text-xs italic">https://mystore.com</p>
                    <ul class="list-disc list-inside text-xs mt-2">
                        <li>Developed a fully functional e-commerce platform with user authentication, product management, and payment integration using React.js, Redux, and Firebase.</li>
                        <li>Optimized the platform for performance, resulting in a 20% reduction in load time and an improved user experience.</li>
                    </ul>
                </div>
            </section>
    
            <section>
                <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Education</h2>
                <h3 class="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
                <p class="text-xs italic">University of California, Berkeley | Graduated: May 2018</p>
                <h4 class="text-sm font-semibold mt-2">Key Courses:</h4>
                <ul class="list-disc list-inside text-xs mt-1">
                    <li>Web Development and Design</li>
                    <li>Data Structures and Algorithms</li>
                    <li>Software Engineering</li>
                    <li>Human-Computer Interaction</li>
                    <li>Database Systems</li>
                    <li>Operating Systems</li>
                </ul>
            </section>
        </div>
    </body>
    </html>
    `
    const htmlResume3=`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hamza Khan - Electrical Engineering Internship Resume</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white shadow-lg p-8">
        <header class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">Hamza Khan</h1>
            <p class="text-xs">
                <a href="tel:+923001234567" class="mr-2">+92 300 1234567</a> |
                <a href="mailto:hamza.khan@email.com" class="mx-2">hamza.khan@email.com</a> |
                <a href="https://www.linkedin.com/in/hamzakhanelectrical" class="ml-2">LinkedIn Profile</a>
            </p>
        </header>

        <section class="mb-6">
            <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Career Objective</h2>
            <p class="text-xs leading-relaxed">
                Enthusiastic Electrical Engineering student with a solid foundation in power systems, circuit analysis, and renewable energy technologies. Seeking an internship opportunity at Tesla to apply my academic knowledge and gain hands-on experience in electric vehicle technologies and energy storage systems. Passionate about contributing to sustainable energy solutions and eager to work in a dynamic, innovative environment.
            </p>
        </section>

        <section class="mb-6">
            <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Education</h2>
            <h3 class="text-lg font-semibold">Bachelor of Science in Electrical Engineering</h3>
            <p class="text-xs italic">University of Lahore | Expected Graduation: May 2025</p>
            <h4 class="text-sm font-semibold mt-2">Relevant Courses:</h4>
            <ul class="list-disc list-inside text-xs mt-1">
                <li>Power Electronics</li>
                <li>Electric Vehicle Technology</li>
                <li>Renewable Energy Systems</li>
                <li>Circuit Analysis and Design</li>
                <li>Control Systems Engineering</li>
                <li>Digital Signal Processing</li>
            </ul>
        </section>

        <section class="mb-6">
            <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Skills</h2>
            <ul class="list-disc list-inside text-xs grid grid-cols-2 gap-2">
                <li>Circuit Design & Simulation (MATLAB, Simulink)</li>
                <li>Power System Analysis</li>
                <li>PCB Design (Altium Designer)</li>
                <li>Embedded Systems (Arduino, Raspberry Pi)</li>
                <li>Renewable Energy Systems</li>
                <li>AutoCAD Electrical</li>
                <li>Project Management (MS Project)</li>
                <li>Data Analysis (MATLAB, Python)</li>
            </ul>
        </section>

        <section class="mb-6">
            <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Projects</h2>
            <div class="mb-4">
                <h3 class="text-lg font-semibold">Solar-Powered EV Charging Station</h3>
                <p class="text-xs italic">University of Lahore | August 2023 - December 2023</p>
                <ul class="list-disc list-inside text-xs mt-2">
                    <li>Designed and simulated a solar-powered electric vehicle charging station with energy storage capabilities using MATLAB and Simulink.</li>
                    <li>Developed a control algorithm to optimize energy usage from solar panels and battery storage to minimize grid dependence.</li>
                    <li>Collaborated with a team of four to design the PCB for the charging station's control system, ensuring efficient power management.</li>
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold">Smart Home Energy Management System</h3>
                <p class="text-xs italic">University of Lahore | January 2023 - May 2023</p>
                <ul class="list-disc list-inside text-xs mt-2">
                    <li>Developed a smart energy management system for residential use, integrating renewable energy sources with traditional power supply.</li>
                    <li>Implemented IoT-based monitoring and control using Arduino and Raspberry Pi to manage energy consumption effectively.</li>
                    <li>Presented the project at the university's annual tech fair, receiving recognition for innovation in energy efficiency.</li>
                </ul>
            </div>
        </section>

        <section class="mb-6">
            <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Extracurricular Activities</h2>
            <ul class="list-disc list-inside text-xs mt-2">
                <li>Member, IEEE Student Branch, University of Lahore (2022-Present)</li>
                <li>Volunteer, Renewable Energy Awareness Campaign, Lahore (2023)</li>
                <li>Participant, National Robotics Competition (2022)</li>
            </ul>
        </section>

        <section>
            <h2 class="text-xl font-bold mb-2 border-b-2 border-gray-300">Certifications</h2>
            <ul class="list-disc list-inside text-xs mt-2">
                <li>Introduction to Electric Vehicles - Coursera (2023)</li>
                <li>Renewable Energy and Green Building Entrepreneurship - Coursera (2023)</li>
                <li>MATLAB for Engineers - LinkedIn Learning (2022)</li>
            </ul>
        </section>
    </div>
</body>
</html>

    `

    return (
        <div
            style={{ fontFamily: "Inter" }}
            className='relative md:scale-100 scale-[0.7] -mt-10 -mb-36 md:-mb-0 md:pb-24 flex flex-col justify-end items-center md:mt-36'>

            <motion.div
                style={{
                    perspective: "1000px",
                    skew: "5deg",
                    opacity: scrollTicker * 10,
                }}

                dangerouslySetInnerHTML={{
                    __html: htmlResume
                }} className="h-[850px] z-10 w-full md:w-[750px] overflow-y-hidden via-white/20 bg-white rounded-xl flex flex-none border-[1px] border-gradient-to-br from-orange-600 to-blue-600 shadow-indigo-600 shadow-2xl ">
            </motion.div>

            <motion.div
                style={{
                    perspective: "1000px",
                    skew: "5deg",
                    rotateZ:"-5deg",
                    marginLeft:-2000*scrollTicker,
                    opacity: scrollTicker * 10,
                }}
                dangerouslySetInnerHTML={{
                    __html: htmlResume2
                }} className="h-[850px] absolute z-0 -mb-[10%] -ml-[60%] w-full md:w-[750px] overflow-y-hidden via-white/20 bg-white rounded-xl flex flex-none border-[1px] border-gradient-to-br from-orange-600 to-blue-600 shadow-indigo-600 shadow-2xl ">
            </motion.div>


            <motion.div
                style={{
                    perspective: "1000px",
                    skew: "5deg",
                    rotateZ:"5deg",
                    opacity: scrollTicker * 10,
                    marginRight:-2000*scrollTicker,
                }}
                dangerouslySetInnerHTML={{
                    __html: htmlResume3
                }} className="h-[850px] absolute z-20 -mt-[20%] -mr-[60%] w-full md:w-[750px] overflow-y-hidden via-white/20 bg-white rounded-xl flex flex-none border-[1px] border-gradient-to-br from-orange-600 to-blue-600 shadow-indigo-600 shadow-2xl ">
            </motion.div>

        </div>

    );
}

export default ResumeAnimation;
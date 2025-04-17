'use client';

import { useState } from 'react';
import { useResumeStore } from '@/app/store/resumeStore';
import { toast } from 'sonner';
import { Resume } from '@/app/interfaces';

interface UseResumeLogicProps {
  userId: string;
}

export function useResumeLogic({ userId }: UseResumeLogicProps) {
  const [isGeneratingName, setIsGeneratingName] = useState(false);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isUpdatingResume, setIsUpdatingResume] = useState(false);

  const { createResume, updateResume, resumes, setSelectedResumeId } = useResumeStore();

  // Function to generate a resume name using OpenRouter API
  const generateResumeName = async (jobDesc: string, companyInfo: string): Promise<string> => {
    setIsGeneratingName(true);
    try {
      // Combine job description and company info for better context
      const combinedInfo = `Job Description: ${jobDesc}\n\nCompany Information: ${companyInfo}`;

      // Prepare the prompt for the AI
      const prompt = `Based on the following job description and company information, extract the job title and company name. Format your response exactly as "jobtitle@companyname" (e.g., "Data Analyst@Google"). If the company name is not clearly mentioned, use the most likely company name or "Company" as a placeholder. Dont' reply with any other text, just this format: jobtitle@companyname \n\n${combinedInfo}`;

      // Call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // Replace with actual API key
          "HTTP-Referer": "https://hirableresume.com",
          "X-Title": "HirableResume",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openai/gpt-4.1-nano",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedName = data.choices[0].message.content.trim();

      // Validate the format (should be something like "jobtitle@companyname")
      if (generatedName.includes('@')) {
        return generatedName;
      }

      // Fallback if the format is not as expected
      return fallbackGenerateResumeName(jobDesc);
    } catch (error) {
      console.error('Error generating resume name with AI:', error);
      // Fallback to regex-based name generation
      return fallbackGenerateResumeName(jobDesc);
    } finally {
      setIsGeneratingName(false);
    }
  };

  // Fallback function using regex to extract job title
  const fallbackGenerateResumeName = (jobDesc: string): string => {
    // Try to extract a job title from the first 100 characters
    const firstLine = jobDesc.substring(0, 100).split('\n')[0];

    // Look for common job title patterns
    const titleMatch = firstLine.match(/(?:position|job|role|title|hiring)(?:\s+for)?\s*[:\-]?\s*([^,.:;\n]+)/i) ||
      firstLine.match(/([^,.:;\n]+(?:engineer|developer|designer|manager|specialist|analyst|consultant|director|architect|lead|head|chief|officer|associate|assistant|coordinator|administrator|technician|supervisor|agent|representative|advisor|strategist|scientist|researcher|writer|editor|marketer|accountant|auditor|lawyer|paralegal|nurse|doctor|therapist|counselor|teacher|instructor|professor|tutor|coach|trainer|driver|operator|mechanic|technician|electrician|plumber|carpenter|chef|cook|server|cashier|clerk|receptionist|secretary|assistant|janitor|cleaner|guard|officer|analyst|specialist|consultant|coordinator|manager|director|president|ceo|cto|cfo|coo|vp|head|chief|lead|senior|junior|associate|assistant|intern|trainee|apprentice|fellow|contractor|freelancer|remote|virtual|part-time|full-time|temporary|permanent|seasonal|contract)[^,.:;\n]*)/i);

    if (titleMatch && titleMatch[1]) {
      // Clean up and capitalize the title
      const title = titleMatch[1].trim();
      return title.charAt(0).toUpperCase() + title.slice(1) + '@Company';
    }

    // If no specific title found, use a generic name with date
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `JobApplication@${date}`;
  };

  // Function to generate a fallback HTML resume template
  const generateFallbackResumeHTML = (jobDescription: string, _companyInfo: string = ''): string => {
    // Extract potential job title from description
    const jobTitleMatch = jobDescription.match(/(?:position|job|role|title|hiring)(?:\s+for)?\s*[:\-]?\s*([^,.;:\n]+)/i);
    const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : 'Job Position';

    // Create a simple HTML resume template
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">YOUR NAME</h1>
          <div style="margin-top: 5px;">
            your.email@example.com | (123) 456-7890 | City, State | LinkedIn Profile
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; border-bottom: 1px solid #000; padding-bottom: 5px;">PROFESSIONAL SUMMARY</h2>
          <p>Experienced professional with a proven track record in ${jobTitle}. Skilled in problem-solving, communication, and teamwork with a focus on delivering results.</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; border-bottom: 1px solid #000; padding-bottom: 5px;">EXPERIENCE</h2>
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between;">
              <div style="font-weight: bold;">Company Name</div>
              <div>City, State</div>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <div style="font-style: italic;">${jobTitle}</div>
              <div>Month Year - Present</div>
            </div>
            <ul style="margin-top: 5px;">
              <li>Accomplished [specific achievement] resulting in [specific outcome]</li>
              <li>Led [specific project or initiative] that [specific result]</li>
              <li>Developed and implemented [specific strategy] to [specific outcome]</li>
            </ul>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; border-bottom: 1px solid #000; padding-bottom: 5px;">EDUCATION</h2>
          <div style="display: flex; justify-content: space-between;">
            <div style="font-weight: bold;">University Name</div>
            <div>City, State</div>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <div style="font-style: italic;">Degree in Field of Study</div>
            <div>Graduation Year</div>
          </div>
        </div>

        <div>
          <h2 style="font-size: 18px; border-bottom: 1px solid #000; padding-bottom: 5px;">SKILLS</h2>
          <p>Skill 1 • Skill 2 • Skill 3 • Skill 4 • Skill 5 • Skill 6</p>
        </div>
      </div>
    `;
  };

  // Function to generate HTML resume content using OpenRouter API
  const generateResumeContent = async (jobDescription: string, companyInfo: string = ''): Promise<string> => {
    try {
      // Combine job description and company info for better context
      const combinedInfo = `Job Description: ${jobDescription}\n\nCompany Information: ${companyInfo}`;

      // Prepare the prompt for the AI
      const prompt = `Create a professional resume tailored specifically for the following job description and company information. Format the resume in clean, professional HTML that can be directly injected into a webpage. Include appropriate sections like summary, experience, skills, education, etc. Make the resume ATS-friendly and highlight relevant skills and experiences that match the job requirements.


Use a clean, modern design with appropriate spacing, font sizes, and colors. The resume should be ready to use without any additional formatting needed. Tailor the resume according to the following information:\n\n${combinedInfo}


VERY VERY IMPORTANT:
Your goal should be to generate a custom tailored resume just for this specific job description so that the user can standout,

For the formatting of the resume, don't make text too big, use "Geist" font for body text and use Playfair Display for Main Headings, for subheadings, use Geist Mono via Google Fonts CDN.
There should be a proper heirarchy to the sizes of the different sections, Main Headings> Subheadings> Body Text > dates etc.
Use lower opacities for things like dates etc.

The Main headings should be thinggs like Profesisonal Sumary, Education etc and they should be bolded properly, whereas subheadings would be the actual university / workplace etc
Make sure to have consistent line spacing and character spacing throughout the whole resume.
Add some breathing room between each section to not make things too clustered.
Use <a> tags with hrefs for all links, mobile numbers, emails that you integrate in your resume.
Make sure the professional summary is short and sweet and not too long and also make sure the letter spacing is not too tight, don't use tight tracking.
`;

      // Call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // Replace with actual API key
          "HTTP-Referer": "https://hirableresume.com",
          "X-Title": "HirableResume",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "anthropic/claude-3.7-sonnet",
          "messages": [
            {
              "role":"system",
              "content":`
              You are a helpful resume generation Assistant, your goal is to generate hyper personalized html styled resumes for the user that are tailored to a specific job description that the user will provide,


--------------------------------------

VERY VERY IMPORTANT:
Example Format, Try to keep the generated resume in similar style, following this exact pattern.


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Analyst Resume</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body style="font-family: Geist, Arial, sans-serif; color: #212529; background: #fff; max-width: 760px; margin: 0 auto; padding: 28px 20px; line-height: 1.58; letter-spacing:0.01em;">
    <div style="text-align: center; margin-bottom: 32px; border-bottom:1.5px solid #E0E0E0; padding-bottom: 12px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 4px; letter-spacing:0.02em;">MICHAEL ANDERSON</h1>
        <div style="font-size:14.25px; color: #595959;">
            123 Analytics Drive, New York, NY 10001 &nbsp;•&nbsp; m.anderson@email.com &nbsp;•&nbsp; (212) 555-7890 &nbsp;•&nbsp; linkedin.com/in/michaelanderson
        </div>
    </div>

    <div style="margin-bottom: 32px;">
        <h2 style="font-family:'Playfair Display', serif; font-size: 20px; margin-bottom: 12px; letter-spacing: 0.04em; font-weight: 600;">Professional Summary</h2>
        <p style="margin-top:6px; margin-bottom:2px; font-size:14.25px;">
            Data analytics professional with 5+ years of experience in developing data products, building machine learning models, and creating interactive dashboards for financial services. Expertise in Python, SQL, and data visualization with a strong foundation in banking analytics. Proven track record of translating complex financial data into actionable business insights and supporting strategic decision-making through data-driven solutions.
        </p>
    </div>

    <div style="margin-bottom: 34px;">
        <h2 style="font-family:'Playfair Display',serif; font-size: 20px; margin-bottom: 20px; letter-spacing: 0.04em; font-weight: 600;">Professional Experience</h2>
        <div style="margin-bottom:24px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:16px; font-weight: 700;">FinTech Solutions Inc.</span>
                <span style="font-family:'Geist Mono',monospace; font-size:13px; color: #63676B; opacity:0.70;">New York, NY</span>
            </div>
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-size:15px; font-weight: 500; color:#222;">Senior Data Analyst</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">June 2020 – Present</span>
            </div>
            <ul style="margin-top:6px; margin-bottom:2px; padding-left: 18px; font-size:14.25px;">
                <li>Designed and implemented data marts that integrated retail and business banking data, reducing reporting time by 40% and enabling more agile analytics.</li>
                <li>Developed machine learning models for customer churn prediction in wholesale banking, improving retention rates by 18% through targeted interventions.</li>
                <li>Built interactive Power BI dashboards for C-level executives, providing real-time visibility into key banking KPIs across retail, business, and wholesale segments.</li>
                <li>Led a team of 3 junior analysts in developing a Python-based application for automated time-series analysis of banking trends, deployed via AWS.</li>
                <li>Collaborated with cross-functional teams to integrate data products with existing banking systems, ensuring seamless data flow and validation.</li>
            </ul>
        </div>
        <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:16px; font-weight: 700;">Global Banking Group</span>
                <span style="font-family:'Geist Mono',monospace; font-size:13px; color: #63676B; opacity:0.70;">Chicago, IL</span>
            </div>
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-size:15px; font-weight: 500; color:#222;">Data Analyst</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">March 2018 – May 2020</span>
            </div>
            <ul style="margin-top:6px; margin-bottom:2px; padding-left: 18px; font-size:14.25px;">
                <li>Implemented SQL-based data pipelines to consolidate and analyze customer transaction data from multiple banking products.</li>
                <li>Created algorithms to identify patterns in customer financial behaviors, resulting in a 25% increase in cross-selling effectiveness.</li>
                <li>Developed and maintained Tableau dashboards for branch performance metrics, enhancing strategic decision-making for regional managers.</li>
                <li>Conducted rigorous testing and validation of analytical models, ensuring 99.7% accuracy in financial forecasting tools.</li>
                <li>Partnered with the product team to develop data-driven features for the bank's mobile application, increasing user engagement by 34%.</li>
            </ul>
        </div>
    </div>

    <div style="margin-bottom: 34px;">
        <h2 style="font-family:'Playfair Display',serif; font-size: 20px; margin-bottom: 20px; letter-spacing: 0.04em; font-weight: 600;">Project Experience</h2>
        <div style="margin-bottom:24px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:16px; font-weight: 700;">Retail Banking Customer Segmentation Platform</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">2021 – 2022</span>
            </div>
            <ul style="margin-top:6px; margin-bottom:2px; padding-left: 18px; font-size:14.25px;">
                <li>Architected a cloud-based data product using AWS and Python that automatically segments retail banking customers based on financial behaviors.</li>
                <li>Implemented clustering algorithms and predictive models to identify high-value customers and personalize banking offers.</li>
                <li>Created an API layer allowing other business applications to consume segmentation data, improving marketing campaign effectiveness by 45%.</li>
            </ul>
        </div>
        <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:16px; font-weight: 700;">Commercial Loan Risk Assessment Tool</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">2019 – 2020</span>
            </div>
            <ul style="margin-top:6px; margin-bottom:2px; padding-left: 18px; font-size:14.25px;">
                <li>Designed and deployed a machine learning model to evaluate commercial loan applications, reducing manual review time by 60%.</li>
                <li>Built an interactive dashboard using Power BI to visualize risk factors and model outputs for loan officers.</li>
                <li>Integrated time-series analysis to incorporate market trends in risk assessment, improving prediction accuracy by 22%.</li>
            </ul>
        </div>
    </div>

    <div style="margin-bottom: 34px;">
        <h2 style="font-family:'Playfair Display',serif; font-size: 20px; margin-bottom: 20px; letter-spacing: 0.04em; font-weight: 600;">Technical Skills</h2>
        <div style="display:grid; grid-template-columns: 160px 1fr; gap:0px 10px;">
            <div style="font-family:'Geist Mono',monospace; font-size:15px; font-weight:700; color:#30343A; margin-bottom:8px;">Programming</div>
            <div style="font-size:15px; margin-bottom:8px;">Python (Pandas, NumPy, Scikit-learn, TensorFlow), SQL (advanced), DAX, R, Java (intermediate)</div>

            <div style="font-family:'Geist Mono',monospace; font-size:15px; font-weight:700; color:#30343A; margin-bottom:8px;">Data Visualization</div>
            <div style="font-size:15px; margin-bottom:8px;">Power BI, Tableau, Qlik, Matplotlib, Seaborn, D3.js</div>

            <div style="font-family:'Geist Mono',monospace; font-size:15px; font-weight:700; color:#30343A; margin-bottom:8px;">Cloud & Databases</div>
            <div style="font-size:15px; margin-bottom:8px;">AWS (S3, Redshift, Lambda), Azure (Data Factory, Synapse), PostgreSQL, MongoDB</div>

            <div style="font-family:'Geist Mono',monospace; font-size:15px; font-weight:700; color:#30343A; margin-bottom:8px;">Machine Learning</div>
            <div style="font-size:15px; margin-bottom:8px;">Regression, Classification, Clustering, Time-series Analysis, Deep Learning, Optimization</div>

            <div style="font-family:'Geist Mono',monospace; font-size:15px; font-weight:700; color:#30343A; margin-bottom:8px;">Banking Domain</div>
            <div style="font-size:15px; margin-bottom:8px;">Retail Banking, Commercial Banking, Wholesale Banking, Risk Management, Compliance Reporting</div>
        </div>
    </div>

    <div style="margin-bottom: 34px;">
        <h2 style="font-family:'Playfair Display',serif; font-size: 20px; margin-bottom: 20px; letter-spacing: 0.04em; font-weight: 600;">Education</h2>
        <div style="margin-bottom:24px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:16px; font-weight: 700;">New York University</span>
                <span style="font-family:'Geist Mono',monospace; font-size:13px; color: #63676B; opacity:0.70;">New York, NY</span>
            </div>
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-size:15px; font-weight: 500; color:#222;">Master of Science in Data Science</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">May 2018</span>
            </div>
            <div style="margin-top:3px; font-size:13.5px; color:#5F6368;">Specialized in Financial Analytics and Predictive Modeling</div>
        </div>
        <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:16px; font-weight: 700;">Cornell University</span>
                <span style="font-family:'Geist Mono',monospace; font-size:13px; color: #63676B; opacity:0.70;">Ithaca, NY</span>
            </div>
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-size:15px; font-weight: 500; color:#222;">Bachelor of Science in Statistics and Economics</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">May 2016</span>
            </div>
            <div style="margin-top:3px; font-size:13.5px; color:#5F6368;">Minor in Computer Science</div>
        </div>
    </div>

    <div style="margin-bottom: 34px;">
        <h2 style="font-family:'Playfair Display',serif; font-size: 20px; margin-bottom: 20px; letter-spacing: 0.04em; font-weight: 600;">Certifications</h2>
        <div style="margin-bottom:8px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:15.5px; font-weight:700;">AWS Certified Data Analytics - Specialty</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">2022</span>
            </div>
        </div>
        <div style="margin-bottom:8px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:15.5px; font-weight:700;">Microsoft Certified: Power BI Data Analyst Associate</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">2021</span>
            </div>
        </div>
        <div style="margin-bottom:8px;">
            <div style="display:flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family:'Geist Mono',monospace; font-size:15.5px; font-weight:700;">Python for Data Science and Machine Learning (Coursera)</span>
                <span style="font-size:13px; font-family:'Geist Mono',monospace; color:#63676B; opacity:0.70;">2019</span>
            </div>
        </div>
    </div>

    <div style="margin-bottom: 30px;">
        <h2 style="font-family:'Playfair Display',serif; font-size: 20px; margin-bottom: 20px; letter-spacing: 0.04em; font-weight: 600;">Professional Achievements</h2>
        <ul style="margin-top:6px; margin-bottom:2px; padding-left: 18px; font-size:14.25px;">
            <li>Featured presenter at Banking Analytics Summit 2022, discussing the implementation of deep learning models for fraud detection in banking.</li>
            <li>Led a project that won the company's Innovation Award for developing a predictive analytics solution that improved loan portfolio management.</li>
            <li>Published article in Banking Technology Journal on "Leveraging Machine Learning for Customer Experience in Digital Banking" (2021).</li>
            <li>Mentored 5 junior data analysts, 3 of whom received promotions within 18 months.</li>
        </ul>
    </div>
</body>
</html>
              `
            },
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Check if data.choices exists and has at least one element
      if (!data.choices || data.choices.length === 0) {
        throw new Error('API response did not contain any choices');
      }

      // Check if the first choice has a message with content
      if (!data.choices[0].message || !data.choices[0].message.content) {
        throw new Error('API response choice does not contain message content');
      }

      const generatedContent = data.choices[0].message.content.trim();

      // Extract HTML content if it's wrapped in code blocks or has extra text
      let htmlContent = generatedContent;

      // Handle content wrapped in code blocks (```html ... ```)
      if (generatedContent.includes('```html') && generatedContent.includes('```')) {
        htmlContent = generatedContent.split('```html')[1].split('```')[0].trim();
      }
      // Handle content wrapped in just backticks without language specification
      else if (generatedContent.includes('```') && generatedContent.split('```').length >= 3) {
        htmlContent = generatedContent.split('```')[1].trim();
      }
      // Handle content that starts with <!DOCTYPE or <html
      else if (!generatedContent.trim().startsWith('<')) {
        // Find the first HTML-like tag
        const htmlStartMatch = generatedContent.match(/<\w+[^>]*>/i);
        if (htmlStartMatch && htmlStartMatch.index !== undefined) {
          htmlContent = generatedContent.substring(htmlStartMatch.index);
        }
      }

      return htmlContent;
    } catch (error) {
      console.error('Error generating resume content with AI:', error);

      // Log detailed error information
      if (error instanceof Error) {
        console.error(`Error type: ${error.name}, Message: ${error.message}`);
        if (error.stack) console.error(`Stack trace: ${error.stack}`);
      }

      // Return fallback HTML template instead of throwing
      console.log('Using fallback resume template due to API error');
      return generateFallbackResumeHTML(jobDescription, companyInfo);
    }
  };

  // Function to create a new resume with generated content
  const createResumeWithContent = async (jobDescription: string, companyInfo: string = ''): Promise<string | null> => {
    setIsGeneratingName(true);
    setIsGeneratingResume(true);

    try {
      // Generate resume name
      let name;
      try {
        name = await generateResumeName(jobDescription, companyInfo);
      } catch (nameError) {
        console.error('Error generating resume name:', nameError);
        // Use fallback name generation if the API call fails
        name = fallbackGenerateResumeName(jobDescription);
      }

      // Generate resume content
      let content;
      try {
        content = await generateResumeContent(jobDescription, companyInfo);
      } catch (contentError) {
        console.error('Error generating resume content:', contentError);
        toast.error('Error generating resume content. Using a basic template instead.');
        // Use fallback content generation if the API call fails
        content = generateFallbackResumeHTML(jobDescription, companyInfo);
      }

      // Create resume in Firebase
      const resumeData: Partial<Resume> = {
        name,
        jobDescription,
        companyInfo,
        status: 'completed', // Mark as completed since we're generating content
        content,
      };

      const resumeId = await createResume(resumeData, userId);

      if (resumeId) {
        // Automatically select the newly created resume
        setSelectedResumeId(resumeId);
        toast.success(`Resume "${name}" created successfully`);
        return resumeId;
      } else {
        toast.error('Failed to save resume to database');
        return null;
      }
    } catch (error) {
      console.error('Error creating resume with content:', error);

      // Provide more specific error messages based on the error
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to create resume');
      }

      return null;
    } finally {
      setIsGeneratingName(false);
      setIsGeneratingResume(false);
    }
  };

  // Function to update an existing resume with new content
  const updateResumeWithContent = async (
    resumeId: string,
    customizationInput: string,
    // We keep these parameters for API compatibility, even if not directly used
    _originalJobDescription: string,
    _originalCompanyInfo: string = ''
  ): Promise<boolean> => {
    setIsUpdatingResume(true);

    try {
      // Get the current resume content
      const currentResume = resumes.find((resume: Resume) => resume.id === resumeId);
      if (!currentResume) {
        throw new Error('Resume not found');
      }

      // Make sure we have content to update
      if (!currentResume.content) {
        throw new Error('Resume has no content to update');
      }

      // Log the resume content for debugging
      console.log('Resume content found, length:', currentResume.content.length);

      // First try a simple approach - just append the customization text
      // This ensures we have a fallback even if the API call fails
      const simpleUpdatedContent = `${currentResume.content.trim()}
<div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">
  <h3 style="font-size: 16px; margin-bottom: 5px;">Customization Notes:</h3>
  <p style="font-style: italic;">${customizationInput}</p>
</div>`;

      try {
        // Now try the AI-powered approach
        // Prepare the prompt for the AI - specifically formatted for Claude
        const prompt = `
          Human: I need you to update an HTML resume based on a customization request. Here's the current HTML resume and the customization request:

          Current HTML Resume:
          ${currentResume.content}
          --------------
          Customization Request:
          "${customizationInput}"

          Please create an updated version of the resume in clean, professional HTML format that can be directly injected into a webpage. The HTML should be styled with inline CSS for a clean, professional appearance with good typography and spacing.

          IMPORTANT INSTRUCTIONS:
          1. Only reply with HTML
          2. Do NOT include any markdown formatting, code blocks, or explanatory text
          3. Do NOT use any <style> tags, <link> tags, or <script> tags
          4. Use only inline styles on individual HTML elements
          5. Do NOT use any CSS classes or IDs for styling
          6. Your response should start with an HTML tag
          7. Do not include any explanations or comments in your response
          8. Do not wrap your response in code blocks

          Assistant:
        `;

        // Call OpenRouter API
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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", // Replace with actual API key
            "HTTP-Referer": "https://hirableresume.com",
            "X-Title": "HirableResume",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "anthropic/claude-3.7-sonnet",
            "messages": [
              {
                "role": "user",
                "content": prompt
              }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Log the API response for debugging
        console.log('API Response structure:', JSON.stringify(data, null, 2));

        // Different AI providers have different response formats
        // Try to handle multiple formats
        let generatedContent = '';

        // OpenAI format
        if (data.choices && data.choices.length > 0) {
          if (data.choices[0].message && data.choices[0].message.content) {
            generatedContent = data.choices[0].message.content.trim();
            console.log('Found content in OpenAI format');
          } else if (data.choices[0].text) {
            // Some models might return text directly
            generatedContent = data.choices[0].text.trim();
            console.log('Found content in OpenAI text format');
          }
        }
        // Anthropic format
        else if (data.content && data.content.length > 0 && data.content[0].text) {
          generatedContent = data.content[0].text.trim();
          console.log('Found content in Anthropic format');
        }
        // Anthropic alternative format
        else if (data.content && typeof data.content === 'string') {
          generatedContent = data.content.trim();
          console.log('Found content in Anthropic alternative format');
        }

        if (!generatedContent) {
          console.error('Could not extract content from API response:', data);
          throw new Error('Could not extract content from API response');
        }

        // Extract HTML content if it's wrapped in code blocks or has extra text
        let htmlContent = generatedContent;

        console.log('Processing generated content, length:', generatedContent.length);
        console.log('Content starts with:', generatedContent.substring(0, 50));

        // Handle content wrapped in code blocks (```html ... ```)
        if (generatedContent.includes('```html') && generatedContent.includes('```')) {
          console.log('Extracting HTML from code block with html tag');
          htmlContent = generatedContent.split('```html')[1].split('```')[0].trim();
        }
        // Handle content wrapped in just backticks without language specification
        else if (generatedContent.includes('```') && generatedContent.split('```').length >= 3) {
          console.log('Extracting HTML from generic code block');
          htmlContent = generatedContent.split('```')[1].trim();
        }
        // Handle content that starts with <!DOCTYPE or <html
        else if (!generatedContent.trim().startsWith('<')) {
          // Find the first HTML-like tag
          const htmlStartMatch = generatedContent.match(/<\w+[^>]*>/i);
          if (htmlStartMatch && htmlStartMatch.index !== undefined) {
            console.log('Extracting HTML starting from first tag');
            htmlContent = generatedContent.substring(htmlStartMatch.index);
          }
        } else {
          console.log('Content already starts with HTML tag, using as-is');
        }

        // Update resume in Firebase
        const success = await updateResume(resumeId, {
          content: htmlContent,
          status: 'completed'
        });

        if (success) {
          toast.success('Resume updated successfully');
        }

        return success;
      } catch (apiError) {
        console.error('Error with AI customization:', apiError);

        // Log detailed error information
        if (apiError instanceof Error) {
          console.error(`Error type: ${apiError.name}, Message: ${apiError.message}`);
          if (apiError.stack) console.error(`Stack trace: ${apiError.stack}`);
        }

        // Notify user but still try to update with the customization text directly
        toast.error('Could not process customization with AI. Applying basic update instead.');

        // Use the simple update we prepared earlier

        // Update resume in Firebase with the simple update
        const fallbackSuccess = await updateResume(resumeId, {
          content: simpleUpdatedContent,
          status: 'completed'
        });

        if (fallbackSuccess) {
          toast.success('Resume updated with customization notes');
        }

        return fallbackSuccess;
      }
    } catch (error) {
      console.error('Error updating resume with content:', error);

      // Provide more specific error messages based on the error
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to update resume');
      }

      return false;
    } finally {
      setIsUpdatingResume(false);
    }
  };

  return {
    isGeneratingName,
    isGeneratingResume,
    isUpdatingResume,
    createResumeWithContent,
    updateResumeWithContent,
    generateResumeName,
    generateResumeContent
  };
}

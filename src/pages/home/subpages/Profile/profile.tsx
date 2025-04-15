import { loadingAtom, userDataAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserDataInterface } from "@/interfaces";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import LoggedInNavBar from "../../components/components";
import { MdCamera, MdCameraAlt, MdFileCopy, MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Onboarding from "@/pages/landingpage/components/onboarding";
import { MdOutlineUploadFile } from "react-icons/md";
import pdfToText from 'react-pdftotext'
import { useEffect, useState } from "react";
import axios from "axios";
import { parse } from "path";



// export interface UserDataInterface{
//     uid?:string,
//     email:string,
//     name:string,
//     profilePicture?:string,
//     workExperience?:string,
//     education?:string,
//     portfolioLinks?:string,
//     skills?:string,
//     projects?:string,
//     contactLinks?:string,
//     onboarding:boolean

// }


function ProperOnboarding() {

    const [userData, setuserData] = useRecoilState(userDataAtom);
    const [loading, setloading] = useRecoilState(loadingAtom);
    const db = getFirestore();
    const navigate = useNavigate();

    async function saveImageToLocalStorage() {
        const inputField = document.createElement("input");
        inputField.type = "file";
        inputField.accept = "image/png, image/jpeg, .svg";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            const reader = new FileReader();
            const file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                const base64Result = file!.target!.result! as string;
                setuserData(
                    { ...userData, profilePicture: base64Result as string } as UserDataInterface
                );
            }
        };
        inputField.click();
    }


    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (
                    userData.name != "" && userData.name != undefined &&
                    userData.email != "" && userData.email != undefined &&
                    userData.workExperience != "" && userData.workExperience != undefined &&
                    userData.education != "" && userData.education != undefined &&
                    userData.portfolioLinks != "" && userData.portfolioLinks != undefined &&
                    userData.skills != "" && userData.skills != undefined &&
                    userData.projects != "" && userData.projects != undefined &&
                    userData.contactLinks != "" && userData.contactLinks != undefined
                ) {
                    setloading(true);
                    await setDoc(doc(db, "users", userData.uid!), { ...userData, onboarding: true } as UserDataInterface, { merge: true });
                    setloading(false);
                    navigate("/");
                }
                else {
                    alert("Please provide information about all fields")
                }
                console.log(userData);
            }}
            style={{ fontFamily: "Inter" }} className="flex flex-col justify-start items-start text-black/80 tracking-tight">

            <div className="w-full flex justify-center items-center">
                <LoggedInNavBar />
            </div>

            <div className="flex flex-col gap-3 justify-start items-start h-full w-full px-5 md:px-[20%]">
                <div className="text-2xl font-bold mt-10">
                    Profile
                </div>
                <div className="text-md font-normal w-full">
                    Complete or Update your Profile to start generating resumes.<br />
                    You only need to do this once <br />
                    <div className="text-xs text-black/80 mt-2">(Add as much information as possible for the best results)</div>
                </div>


                <button onClick={() => {
                    saveImageToLocalStorage();
                }} type="button" className="h-36 w-36 flex justify-center items-center flex-none bg-primary shadow-xl hover:scale-105 transition-all duration-300 shadow-indigo-600/30 rounded-sm mt-5">
                    {
                        userData.profilePicture == "" || userData.profilePicture == undefined ?
                            <MdCameraAlt size={50} className="text-white" /> :
                            <img src={userData.profilePicture} alt="Profile Picture" className="h-36 w-36 object-cover rounded-sm" />
                    }
                </button>

                <Input value={userData.name} onChange={(e) => { setuserData({ ...userData, name: e.target.value }) }} placeholder="Full Name: John Doe" className="mt-5"></Input>
                <Input disabled value={userData.email} onChange={(e) => { setuserData({ ...userData, email: e.target.value }) }} placeholder="Email: hassanhamza930@gmail.com" className="disabled:opacity-50 disabled:text-primary disabled:border-2 border-primary  border-b-[1px] border-dashed mt-2"></Input>
                <Textarea value={userData.workExperience} onChange={(e) => { setuserData({ ...userData, workExperience: e.target.value }) }} placeholder={`Work Experience: I have worked for 2 years at US based startup called Careernetwork.co where i helped lead a team of 7 developers for the development of a career focused social media platform. `} className="mt-2 h-36" />
                <Textarea value={userData.education} onChange={(e) => { setuserData({ ...userData, education: e.target.value }) }} placeholder={`Education: I am a graduate of Bachelors in Economics with Data Science and I graduated in 2 years `} className="mt-2 h-36" />
                <Textarea value={userData.portfolioLinks} onChange={(e) => { setuserData({ ...userData, portfolioLinks: e.target.value }) }} placeholder={`Portfolio Links: hamzahassan.vercel.app`} className="mt-2 h-36" />
                <Textarea value={userData.skills} onChange={(e) => { setuserData({ ...userData, skills: e.target.value }) }} placeholder={`Skills: Javascript, Typescript, Firebase, TailwindCSS, Framer Motion, Node JS `} className="mt-2 h-36" />
                <Textarea value={userData.projects} onChange={(e) => { setuserData({ ...userData, projects: e.target.value }) }} placeholder={`Projects: As part of my summer internship, i worked on a NLP based search engine for medical journals `} className="mt-2 h-36" />
                <Textarea value={userData.contactLinks} onChange={(e) => { setuserData({ ...userData, contactLinks: e.target.value }) }} placeholder={`Contact Links: https://linkedin.com/in/hassanhamza930 Mobile Number: +923174631189\nEmail: hassanhamza930@gmail.com`} className="mt-2 h-36" />
                <Button type="submit" className="bg-primary text-white rounded-md px-5 py-8 text-lg w-full mt-10 mb-24">Save Profile</Button>

            </div>
        </form>
    );
}

function UploadCurrentResume() {

    const [pdfText, setpdfText] = useState("");
    const [loading, setloading] = useState(false);
    const [userData, setuserData] = useRecoilState(userDataAtom);
    const db=getFirestore();

    async function handleResumeUpload() {
        setloading(true);
        const inputField = document.createElement("input");
        inputField.type = "file";
        inputField.accept = "application/pdf";
        inputField.oncancel = (e: any) => {
            e.preventDefault();
            setloading(false);

        }
        inputField.onchange = async (e: any) => {
            e.preventDefault();
            const reader = new FileReader();
            const file: File = e.target.files[0];
            if (file) {
                pdfToText(file)
                    .then(
                        text => {
                            setpdfText(text);
                            setloading(false);
                        }
                    )
                    .catch(error => {
                        setpdfText("There was an error parsing your resume, either it is not readable or there was an internal error, please contact support");
                        setloading(false);

                    }
                    )
            }

        };
        inputField.click();
    }

    async function fetchResponseFromGPT(parsedData:string){
        console.log("trying to call GPT for detail parsing");
        const res = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4o", // Specify the model you are using
              response_format: {
                "type": "json_object"
              },
              messages: [
                {
                  role: "system",
                  content:
                    `
                      You are a resume parser assistant, Your Goal is to Help parse all the details from a user's resume and return them in following JSON format with all these fields.
                        name:string,
                        workExperience?:string,
                        education?:string,
                        portfolioLinks?:string,
                        skills?:string,
                        projects?:string,
                        contactLinks?:string,
                    
                        for example:
                      {
                        email: "hassanhamza930@gmail.com",
                        workExperience:"..."
                        ..... so on  
                      }

                        The keys are case sensitive

                      `,
                },
                {
                  role: "user",
                  content: `This is my data ${parsedData}, Now give me all the details in the above mentioned JSON format `
                },
              ],
              // max_tokens: 16384,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer sk-proj-XfOxTONSgu5GemhQJaopT3BlbkFJqUT7ygXdbzvkiC3KeEEh`,
              },
            }
          );
        await setDoc(doc(db,"users",userData.uid! as string),{...JSON.parse(res.data.choices[0].message.content)},{merge:true})
        window.location.reload();
    }

    async function tryToFetchResponseFromGPT(parsedData:string,counter:number){
        if(counter<3){
            try{
                setloading(true);
                await fetchResponseFromGPT(parsedData);
                setloading(false);
            }
            catch(err){
                console.log(err);
                tryToFetchResponseFromGPT(parsedData,counter+1);
                setloading(false);
            }
        }
        else{
            setloading(false);
            alert("There was an error parsing your resume, either it is not formatted properly or there was an error with the GPT service, please contact support.")
        }
    }

    useEffect(()=>{
        if(pdfText!=""){
           tryToFetchResponseFromGPT(pdfText,0);
        }
    },[pdfText])

    return (
        <div className="h-full w-full flex flex-col justify-start items-center bg-white">
            <LoggedInNavBar></LoggedInNavBar>

            <div className="flex flex-col justify-start items-center gap-5 mt-24">
                <div className="text-md md:text-2xl font-bold tracking-tight">Upload your current resume to get started</div>
                <button onClick={() => { handleResumeUpload(); }} className="py-5 w-3/4 transition-all duration-200 hover:scale-105 text-lg font-medium hover:bg-black/90 bg-indigo-600 rounded-md shadow-xl flex flex-col justify-center items-center text-white">
                    <div className="text-lg">Upload Resume</div>
                    <div className="text-xs text-white/60">(Only PDFs Supported)</div>
                    <MdOutlineUploadFile className="mt-5" size={40} />

                </button>

                {
                    loading == true &&
                    <div className="text-sm font-normal text-center px-5 w-full flex flex-none justify-center items-center animate-pulse">
                        Analyzing your resume...
                    </div>
                }
            </div>

        </div>
    )
}

function Profile() {

    const [userData, setuserData] = useRecoilState(userDataAtom);
    const [loading, setloading] = useRecoilState(loadingAtom);
    const db = getFirestore();
    const navigate = useNavigate();


    return (
        userData.workExperience == "" || userData.workExperience == undefined ? //this mean that this is user's first time coming around
            <UploadCurrentResume /> :
            <ProperOnboarding />
    )

}

export default Profile;
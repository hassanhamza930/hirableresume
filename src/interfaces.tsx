import { Timestamp } from "firebase/firestore";

export interface ChatHistoryInterface {
    content: string,
    role: "assistant" | "user" | "system",
}

export interface UserDataInterface{
    uid?:string,
    email:string,
    name:string,
    profilePicture?:string,
    workExperience?:string,
    education?:string,
    portfolioLinks?:string,
    skills?:string,
    projects?:string,
    contactLinks?:string,
    onboarding:boolean,
    credits:number,
    signedUpTime:Timestamp,
    pricingPlan:"free"|"pro"
}

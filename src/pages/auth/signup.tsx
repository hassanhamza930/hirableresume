import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "./functions";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";

function Signup() {
    const navigate=useNavigate();
    const {signUpWithEmailPassword,continueWithGoogle}=useFirebaseAuth();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");

    return (
        <div className="relative z-10 backdrop-blur-[200px] bg-black/90 h-screen w-full flex flex-col justify-start items-center px-0">
            <form 
            onSubmit={(e)=>{
                e.preventDefault();
                signUpWithEmailPassword(email,password,name);
            }}
            className="h-full w-full md:w-2/5 shadow-2xl rounded-sm p-5 md:p-10 overflow-y-auto flex flex-col justify-center items-center gap-5">
                <a
                    href={"/"}
                    className="tracking-tight text-4xl md:text-5xl text-white/90 font-bold flex justify-center items-center -mt-5"
                >
                    Hirable Now
                </a>
                <div className="text-white text-center px-5">Create an account, and get your first resume in 5 minutes</div>
                <Input value={email} onChange={(e)=>{setemail(e.target.value)}} type="text" placeholder="Email" className="mt-5" />
                <Input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" placeholder="Full Name" className="" />
                <Input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Password" className="" />
                <Button type="submit" className="bg-primary text-white rounded-md p-3 w-full">Sign Up</Button>
                <div className="text-white mt-5">Already have an Account? <button onClick={()=>{navigate("/login")}} className="font-bold underline">Login Here</button></div>
                
                <button type="button" onClick={()=>{continueWithGoogle()}} className="text-black bg-white px-4 py-2 mt-10 flex flex-row justify-center items-center gap-5 hover:scale-105 transition-all duration-200">
                    <BsGoogle size={25}/>
                    Continue With Google
                </button>
            
            </form>
        </div>
    );
}

export default Signup;
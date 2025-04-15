import { chatHistoryAtom } from "@/atoms";
import { useRecoilState } from "recoil";
import ChatBox from "./components/chatbox";
import { MdSend } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useGPTBackgroundService } from "./functions";
import axios from "axios";

function ResumeChat() {

    const [chatHistory, setchatHistory] = useRecoilState(chatHistoryAtom);
    const [chatInput, setchatInput] = useState("");
    const {loading}=useGPTBackgroundService();


    return (
        <div style={{ fontFamily: "Inter" }} className="relative z-0 flex flex-col justify-start items-start md:px-[20%] text-black/80 tracking-tight h-full w-full">

            <div className="relative z-0 h-full w-full flex flex-col justify-start items-center gap-5 rounded-md">

                <div id="no-scrollbar" className="relative z-0 h-full w-full flex flex-col justify-start items-start overflow-y-auto gap-12 py-10 px-5 pb-36">
                    {
                        chatHistory.map((chat, index) => {
                            return (
                                chat.role != "system" &&
                                <>
                                    <ChatBox key={index} {...chat} />
                                </>
                            )
                        })
                    }
                    {
                        loading==true&&
                        <div className="mt-10 flex flex-none animate-pulse">
                            Loading....
                        </div>
                    }
                    
                        <div id="scrollTarget" className="w-full h-[1px] flex flex-none">
                        </div>
                    

                </div>

                <form 
                onSubmit={(e)=>{
                    e.preventDefault();
                    if(chatInput.length>0){
                        setchatHistory([...chatHistory,{role:"user",content:chatInput}]);
                        document.getElementById("scrollTarget")!.scrollIntoView({behavior:"smooth"});   
                        setchatInput("");
                    }
                }}
                className="w-full flex flex-row justify-end items-center flex-none overflow-visible px-5 pb-5">
                    
                    <Textarea value={chatInput} onChange={(e)=>{setchatInput(e.target.value)}} id="no-scrollbar" placeholder="Generate a new resume for the following job description: " className="py-4 text-black pr-16 shadow-xl">
                    </Textarea>

                    <button type="submit" className="absolute z-10 px-5">
                        <MdSend size={30} className="" />
                    </button>

                </form>

            </div>


        </div>
    );
}

export default ResumeChat;
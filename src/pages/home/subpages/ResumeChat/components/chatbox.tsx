import { userDataAtom } from "@/atoms";
import { ChatHistoryInterface, UserDataInterface } from "@/interfaces";
import axios from "axios";
import { set } from "date-fns";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";



function ChatBox(props: ChatHistoryInterface) {

    const [plaintext, setplaintext] = useState("");
    const [htmlContent, sethtmlContent] = useState("");
    const [downloadingFile, setdownloadingFile] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore();
    const [userData, setuserData] = useRecoilState(userDataAtom);

    const handleGeneratePdf = async () => {
        setdownloadingFile(true);
        try {
            const response = await axios.post('https://hirablenow.onrender.com/generate-pdf',
                { htmlContent },
                { responseType: 'blob' } // Important to specify the response type
            );

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setdownloadingFile(false);
        }
    };

    const handleGeneratePdfExperimental = async () => {

        if (userData.pricingPlan=="free") {
            alert("You need to subscribe to HirableNow before you can download your resume");
            navigate("/billing")
            return;
        }

        if (userData.credits <= 0 && userData.pricingPlan=="pro") {
            alert("You have run out of credits. Your Credits will reset at the start of the next monthly billing cycle.");
            navigate("/billing")
            return;
        }



        else {
            setdownloadingFile(true);
            try {
                setDoc(doc(db, "users", localStorage.getItem("uid")! as string), { credits: userData.credits - 1 } as UserDataInterface, { merge: true });
                navigate("/print", { state: { htmlContent: htmlContent } });
            } catch (error) {
                console.error('Error generating PDF:', error);
            } finally {
                setdownloadingFile(false);
            }
        }

    };

    useEffect(() => {

        const firstHtmlTagMatch = props.content.match(/<html[^>]*>/);
        const lastHtmlTagMatch = props.content.match(/<\/html>/);

        if (firstHtmlTagMatch && lastHtmlTagMatch) {
            const startIndex = props.content.indexOf(firstHtmlTagMatch[0]);
            const endIndex = props.content.lastIndexOf(lastHtmlTagMatch[0]) + lastHtmlTagMatch[0].length;

            const htmlContent = props.content.slice(startIndex, endIndex);

            const beforeHtmlContent = props.content.slice(0, startIndex).trim();
            const afterHtmlContent = props.content.slice(endIndex).trim();
            const nonHtmlContent = `${beforeHtmlContent}\n${afterHtmlContent}`.trim();


            setplaintext(nonHtmlContent);
            sethtmlContent(htmlContent);
        }
        else {
            setplaintext(props.content);
        }

    }, [])

    return (
        <div className={`flex flex-col gap-5 w-full ${props.role == "user" ? "justify-start items-end" : "justify-start items-start"}`}>
            {
                <div className={`flex flex-wrap justify-start items-start gap-x-[4px] ${props.role == "user" ? "w-full md:max-w-[80%] px-4 py-3 rounded-md shadow-xl border-2 border-dotted border-black text-black" : "tracking-tight w-full md:max-w-[60%]"}`}>
                    {
                        plaintext.replace("```", "").replace("```", "").replace("html", "").split(" ").map((word, index) => {
                            return (
                                <motion.span
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.05 * index }}
                                    key={index}>
                                    {word}
                                </motion.span>
                            )
                        })
                    }
                </div>
            }
            {
                htmlContent != "" &&
                <div className="relative w-full h-full border-2 border-primary rounded-xl overflow-hidden shadow-xl shadow-indigo-600/20 mt-5">
                    <iframe srcDoc={htmlContent} className="relative z-0 w-full h-[650px] flex flex-none">
                    </iframe>

                    {
                        downloadingFile &&
                        <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-black/80">
                            <div className="text-white font-medium tracking-tight text-2xl animate-pulse">
                                Generating PDF...
                            </div>
                        </div>
                    }

                    {
                        !downloadingFile &&
                        <button onClick={handleGeneratePdfExperimental} className="absolute z-10 top-0 right-0 px-5 py-2 bg-black/70 backdrop-blur-xl text-white shadow-xl shadow-indigo-600/20 hover:scale-105 rounded-bl-md">
                            Download PDF
                        </button>
                    }
                </div>
            }
        </div>
    );
}

export default ChatBox;
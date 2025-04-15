import { chatHistoryAtom } from "@/atoms";
import { ChatHistoryInterface } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";


export function useGPTBackgroundService() {
    const [loading, setloading] = useState(false);
    const [chatHistory, setchatHistory] = useRecoilState(chatHistoryAtom);


    const apiKey = "sk-proj-XfOxTONSgu5GemhQJaopT3BlbkFJqUT7ygXdbzvkiC3KeEEh";

    useEffect(() => {
        if (chatHistory[chatHistory.length - 1].role == "user") {
            fetchResponseFromGPT();
        }
    }, [chatHistory])


    async function fetchResponseFromGPT() {
        try {
            setloading(true);
            // console.log(chatHistory[0].content);
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o-mini', // Specify the model you are using
                    messages: [...chatHistory],
                    max_tokens: 16384,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            setchatHistory([...chatHistory, { role: "assistant", content: res.data.choices[0].message.content }]);
            localStorage.setItem("chathistory",JSON.stringify([...chatHistory, { role: "assistant", content: res.data.choices[0].message.content }]));
            document.getElementById("scrollTarget")?.scrollIntoView();
            setloading(false);

        } catch (error) {
            console.error('Error:', error);
            document.getElementById("scrollTarget")?.scrollIntoView();
            setloading(false);
        }
    }

    return { loading };



}
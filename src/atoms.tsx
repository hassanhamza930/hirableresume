import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { ChatHistoryInterface, UserDataInterface } from "./interfaces";


export const inputTextAtom = atom({
    key: "inputText",
    default: ""
});


export const loadingAtom = atom({
    key: "loading",
    default: false as boolean
})

export const userDataAtom = atom({
    key: "userData",
    default: {} as UserDataInterface
})


export const chatHistoryAtom = atom({
    key: "chatHistory",
    default: [] as Array<ChatHistoryInterface>
})
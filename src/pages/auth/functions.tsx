import { loadingAtom } from "@/atoms";
import { UserDataInterface } from "@/interfaces";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";


export function useFirebaseAuth() {
    const auth = getAuth();
    const db = getFirestore();
    const [loading, setloading] = useRecoilState(loadingAtom);

    async function signInUserWithEmailPassword(email: string, password: string) {
        try {
            setloading(true);
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCred.user.uid;
            localStorage.setItem("uid", uid);
            setloading(false);
            window.location.href = "/";
        }
        catch (e) {
            setloading(false);
            alert(e);
        }
    }

    async function signUpWithEmailPassword(email: string, password: string, name: string) {
        try {
            setloading(true);
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCred.user.uid;
            localStorage.setItem("uid", uid);
            await setDoc(doc(db, "users", uid), {
                email: email,
                name: name,
                onboarding: false,
                credits: 0,
                pricingPlan: "free",
                signedUpTime: Timestamp.now()
            } as UserDataInterface);
            setloading(false);
            window.location.href = "/";
        }
        catch (e) {
            setloading(false);
            alert(e);
        }
    }

    async function continueWithGoogle() {
        const provider = new GoogleAuthProvider();

        try {
            setloading(true);
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential!.accessToken;
                    const user = result.user;
                    const uid = user.uid;
                    localStorage.setItem("uid", uid);
                    var supposedDoc=await getDoc(doc(db,"users",uid));

                    if(supposedDoc.exists()){
                        //do nothing cause data is already there
                    }
                    else{
                        await setDoc(doc(db, "users", uid), {
                            email: user.email,
                            name: user.displayName,
                            onboarding: false,
                            credits: 0,
                            profilePicture:user.photoURL,
                            pricingPlan: "free",
                            signedUpTime: Timestamp.now()
                        } as UserDataInterface,{merge:true});
                    }
                    setloading(false);
                    window.location.href="/";

                   

                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    console.log(errorCode);
                });

            setloading(false)
        }
        catch (e) {
            setloading(false);
            alert(e);
        }
    }

    return { continueWithGoogle, signInUserWithEmailPassword, signUpWithEmailPassword };

} 

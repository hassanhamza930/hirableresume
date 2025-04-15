import { useRecoilState } from "recoil";
import LoggedInNavBar from "../../components/components";
import { userDataAtom } from "@/atoms";

function Billing() {

    const [userData, setuserData] = useRecoilState(userDataAtom);

    return (
        <div style={{ fontFamily: "Bricolage Grotesque" }} className="tracking-tight h-screen w-full bg-white text-black/80 flex flex-col justify-start items-center">
            <LoggedInNavBar />

            <div className="text-4xl md:text-4xl font-bold mt-[10%] md:mt-[5%] text-center px-5">Billing</div>
            <div className="text-xs md:text-lg font-normal text-center mt-1 md:mt-3 px-5 mb-10">You get free usage when you signup<br />Credits are only charged and required when you download your resume</div>




            <div className="flex flex-col md:flex-col justify-start items-center md:justify-start md:items-center gap-5 w-full">

                {
                    userData.pricingPlan != "pro" &&
                    <div className="border-2 border-black border-dotted rounded-md p-2 shadow-2xl shadow-indigo-600">
                        <stripe-buy-button
                            customer-email={userData.email}
                            client-reference-id={userData.uid!}
                            buy-button-id="buy_btn_1PnwjGBKC9nQ1b0J4xt7yTOu"
                            publishable-key="pk_live_51PWKT5BKC9nQ1b0JszqWoonE8sTsGRiI3cEhdIBRJictQRzFsxZYEnsxG5xiByiX9KEBAr4eiYPwmEb8DrJnUOoD00VB8XPsQU"
                        >
                        </stripe-buy-button>
                    </div>
                }

                {
                    userData.pricingPlan == "pro" &&
                    <div className="flex flex-col justify-start items-center gap-5 px-5">
                        <div className="font-bold text-center">
                            You are currently on the Paid Plan with HirableNow 🎉🎉🎉
                        </div>
                        <button
                            onClick={() => { window.open("https://billing.stripe.com/p/login/5kA29O19AePe7KM5kk") }}
                            className="px-5 py-2 bg-primary text-white hover:scale-105 transition-all duration-300 shadow-2xl shadow-indigo-600 rounded-sm"
                        >
                            Manage or Cancel Subscription
                        </button>
                    </div>

                }
                <div className="flex flex-col justify-start items-center gap-2 shadow-purple-600 shadow-xl p-5 md:p-10 md:mt-20 rounded-xl bg-primary text-white">
                    <div className="text-sm md:text-md font-normal">Remaining Credits</div>
                    <div className="text-4xl md:text-8xl font-bold">{userData.credits}</div>
                </div>
            </div>


        </div>
    );
}

export default Billing;
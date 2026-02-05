import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm"; 
import { FaCreditCard, FaLock, FaCoins, FaShieldAlt } from "react-icons/fa";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const { price, coins } = useParams();
    const totalPrice = parseFloat(price);

    return (
        <div className="min-h-screen bg-[#1d232a] flex items-center justify-center p-4 md:p-8">
            
            <div className="w-full max-w-lg relative">
         
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px]"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px]"></div>

                <div className="bg-[#15191e] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative z-10">
                    
   
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 text-center border-b border-white/5 relative">
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                            <FaLock className="text-green-400 text-xs" />
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Secure SSL</span>
                        </div>

                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                            <FaCreditCard className="text-2xl text-white" />
                        </div>
                        <h2 className="text-2xl font-black text-white italic tracking-tight">COMPLETE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">PAYMENT</span></h2>
                        <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Enter your card details below</p>
                    </div>

                    <div className="p-8">
                       
                        <div className="bg-black/30 rounded-xl p-5 border border-white/5 mb-8 flex justify-between items-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Package</p>
                                <div className="flex items-center gap-2 text-white font-bold text-lg">
                                    <FaCoins className="text-yellow-400" />
                                    {coins} Coins
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total</p>
                                <p className="text-3xl font-black text-white">${totalPrice}</p>
                            </div>
                        </div>

                     
                        <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm price={totalPrice} coins={coins} />
                            </Elements>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-60">
                            <FaShieldAlt />
                            Payments are processed securely by Stripe
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
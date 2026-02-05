import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";

const CheckoutForm = ({ price, coins }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false); 
    const [cardError, setCardError] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

   
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price: price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSecure, price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true); 
        setCardError("");

    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('Payment error', error);
            setCardError(error.message);
            setProcessing(false);
            return;
        }

  
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('Confirm error', confirmError);
            setCardError(confirmError.message);
            setProcessing(false);
        } 
        else if (paymentIntent.status === "succeeded") {
        
            const paymentInfo = {
                email: user.email,
                price: price,
                transactionId: paymentIntent.id,
                date: new Date(),
                coins: parseInt(coins),
                status: 'succeeded'
            };

            const res = await axiosSecure.post("/payments", paymentInfo);
            
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Payment Successful!",
                    text: `Transaction ID: ${paymentIntent.id}`,
                    icon: "success",
                    background: "#15191e",
                    color: "#fff",
                    confirmButtonColor: "#10b981"
                });
                navigate("/dashboard/paymentHistory");
            }
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
          
            <div className="bg-black/40 border border-white/10 p-5 rounded-xl shadow-inner focus-within:border-blue-500 transition-colors">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#ffffff', 
                                fontFamily: "'Inter', sans-serif",
                                '::placeholder': {
                                    color: '#9ca3af', 
                                },
                                iconColor: '#60a5fa', 
                            },
                            invalid: {
                                color: '#ef4444', 
                                iconColor: '#ef4444',
                            },
                        },
                    }}
                />
            </div>

         
            {cardError && (
                <p className="text-red-400 text-sm font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20 text-center">
                    {cardError}
                </p>
            )}

 
            <button 
                className={`btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black uppercase tracking-widest border-none rounded-xl shadow-lg py-3 h-auto ${processing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? (
                    <span className="loading loading-spinner loading-sm"></span> 
                ) : (
                    <div className="flex items-center justify-center gap-2">
                         Pay <span className="text-yellow-300">${price}</span> <FaCreditCard />
                    </div>
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
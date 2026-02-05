import React from 'react';
import Swal from 'sweetalert2';
import { FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";

const Newsletter = () => {

    const handleSubscribe = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;

        if (email) {

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            Toast.fire({
                icon: 'success',
                title: 'Subscribed successfully!'
            });

            form.reset(); 
        }
    };

    return (
        <div className="py-24 bg-[#1d232a] relative flex items-center justify-center overflow-hidden">
            
    
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            

            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

         
            <div className="relative z-10 container mx-auto px-4 max-w-4xl">
                <div className="bg-[#15191e]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl text-center relative overflow-hidden group">
                    
        
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>

     
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <FaEnvelopeOpenText className="text-4xl text-white" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Newsletter</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                        Be the first to know about new tasks, weekly bonuses, and platform updates. No spam, we promise!
                    </p>

    
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative">
                        <div className="relative flex items-center">
            
                            <input 
                                type="email" 
                                name="email"
                                required
                                placeholder="Enter your email address..." 
                                className="w-full bg-[#0f1215] text-white border border-gray-600 rounded-full py-4 pl-6 pr-36 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner text-base"
                            />
                       
                            <button 
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform active:scale-95"
                            >
                                <span>Subscribe</span>
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-sm text-gray-500">
                        Join <span className="text-white font-semibold">10,000+</span> community members earning daily.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Newsletter;
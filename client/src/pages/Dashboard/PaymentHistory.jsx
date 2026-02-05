import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaHistory, FaCoins, FaDollarSign, FaExchangeAlt } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center text-blue-400 animate-pulse font-bold tracking-widest">LOADING HISTORY...</div>;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a]">
          
            <div className="mb-10">
                <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
                    <FaHistory className="text-blue-500" />
                    PAYMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">HISTORY</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm font-bold uppercase">
                    Total Transactions: {payments.length}
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent mt-4"></div>
            </div>

        
            <div className="overflow-hidden bg-[#15191e] border border-white/10 rounded-[2rem] shadow-2xl">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="table w-full border-separate border-spacing-y-3 px-6">
               
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[11px] tracking-[0.2em]">
                                <th className="bg-transparent border-none py-6">#</th>
                                <th className="bg-transparent border-none py-6">Amount ($)</th>
                                <th className="bg-transparent border-none py-6">Coins Added</th>
                                <th className="bg-transparent border-none py-6">Transaction ID</th>
                                <th className="bg-transparent border-none py-6 text-right">Date & Time</th>
                            </tr>
                        </thead>
                        
                   
                        <tbody className="space-y-4">
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="group hover:bg-white/5 transition-all duration-300">
                                    
                  
                                    <td className="bg-transparent border-none py-5 rounded-l-2xl text-gray-500 font-mono">
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </td>

                           
                                    <td className="bg-transparent border-none py-5">
                                        <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                                            <FaDollarSign />
                                            {payment.price}
                                        </div>
                                    </td>

                  
                                    <td className="bg-transparent border-none py-5">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-sm">
                                            <FaCoins /> {payment.coins}
                                        </div>
                                    </td>

                                
                                    <td className="bg-transparent border-none py-5">
                                        <div className="flex items-center gap-2 text-gray-300 font-mono text-xs bg-black/30 px-3 py-2 rounded-lg border border-white/5 w-fit">
                                            <FaExchangeAlt className="text-gray-600" />
                                            {payment.transactionId}
                                        </div>
                                    </td>

                                    <td className="bg-transparent border-none py-5 rounded-r-2xl text-right">
                                        <div className="text-gray-300 font-bold text-sm">
                                            {new Date(payment.date).toLocaleDateString()}
                                        </div>
                                        <div className="text-gray-600 text-[10px] uppercase font-bold tracking-widest mt-1">
                                            {new Date(payment.date).toLocaleTimeString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

          
                {payments.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-20 text-gray-500">
                        <FaHistory className="text-5xl mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-sm italic">
                            No payment records found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
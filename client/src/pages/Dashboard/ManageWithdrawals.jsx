import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaMoneyCheckAlt, FaUser, FaCoins, FaCheckCircle, FaUniversity } from "react-icons/fa";

const ManageWithdrawals = () => {
    const axiosSecure = useAxiosSecure();

    const { data: withdrawals = [], refetch, isLoading } = useQuery({
        queryKey: ['admin-withdrawals'],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/withdrawals");
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        const res = await axiosSecure.patch(`/withdrawals/approve/${id}`);
        if (res.data.message === "Withdrawal Approved") {
            Swal.fire({
                icon: 'success',
                title: 'Payment Approved',
                text: 'Coins deducted and transaction completed!',
                background: '#15191e',
                color: '#fff',
                confirmButtonColor: '#10b981'
            });
            refetch();
        }
    };

    if (isLoading) return <div className="p-10 text-orange-400 animate-pulse font-bold tracking-widest text-center">CONNECTING TO GATEWAY...</div>;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a]">
            {/* পেজ টাইটেল */}
            <div className="mb-10">
                <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
                    <FaMoneyCheckAlt className="text-orange-500" />
                    MANAGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">WITHDRAWALS</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm uppercase font-bold">Pending Approval Requests: {withdrawals.length}</p>
                <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-transparent mt-4 shadow-[0_0_15px_#f97316]"></div>
            </div>

            {/* ফিউচারিস্টিক টেবিল কন্টেইনার */}
            <div className="relative overflow-hidden bg-[#15191e] border border-white/10 rounded-[2rem] shadow-2xl">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="table w-full border-separate border-spacing-y-3 px-6">
                        {/* টেবিল হেড */}
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[11px] tracking-[0.2em]">
                                <th className="bg-transparent border-none py-6">Worker Info</th>
                                <th className="bg-transparent border-none py-6 text-center">Coins</th>
                                <th className="bg-transparent border-none py-6 text-center">Amount</th>
                                <th className="bg-transparent border-none py-6 text-center">Method</th>
                                <th className="bg-transparent border-none py-6 text-right pr-10">System Action</th>
                            </tr>
                        </thead>
                        
                        {/* টেবিল বডি */}
                        <tbody className="space-y-4">
                            {withdrawals.map((withdraw) => (
                                <tr key={withdraw._id} className="group hover:bg-white/5 transition-all duration-300">
                             
                                    <td className="bg-transparent border-none py-5 rounded-l-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                                <FaUser className="text-orange-400 text-sm" />
                                            </div>
                                            <span className="font-bold text-gray-200 tracking-wide">{withdraw.worker_name}</span>
                                        </div>
                                    </td>

                                    {/* কয়েন */}
                                    <td className="bg-transparent border-none py-5 text-center">
                                        <div className="flex items-center justify-center gap-2 text-yellow-500 font-mono font-bold">
                                            <FaCoins className="text-xs" />
                                            <span>{withdraw.withdrawal_coin}</span>
                                        </div>
                                    </td>

                                    {/* ডলার অ্যামাউন্ট */}
                                    <td className="bg-transparent border-none py-5 text-center">
                                        <span className="text-emerald-400 font-black text-lg">${withdraw.withdrawal_amount}</span>
                                    </td>

                                    {/* পেমেন্ট মেথড ও অ্যাকাউন্ট */}
                                    <td className="bg-transparent border-none py-5 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase border border-blue-500/20 mb-1">
                                                {withdraw.payment_system}
                                            </span>
                                            <span className="text-gray-500 font-mono text-[11px]">{withdraw.account_number}</span>
                                        </div>
                                    </td>

                                    {/* অ্যাকশন বাটন */}
                                    <td className="bg-transparent border-none py-5 rounded-r-2xl text-right pr-6">
                                        <button 
                                            onClick={() => handleApprove(withdraw._id)}
                                            className="relative group/btn overflow-hidden px-6 py-2.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FaCheckCircle className="text-sm" />
                                                Approve Payment
                                            </div>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* নো রিকোয়েস্ট মেসেজ */}
                {withdrawals.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-20">
                        <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-4 border border-white/5">
                            <FaUniversity className="text-3xl text-gray-600" />
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm italic">
                            The withdrawal queue is currently empty.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageWithdrawals;
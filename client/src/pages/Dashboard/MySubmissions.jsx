import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const MySubmissions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    const { data: submissions = [] } = useQuery({
        queryKey: ['my-submissions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-submissions/${user?.email}`);
            return res.data;
        }
    });


    const totalPages = Math.ceil(submissions.length / itemsPerPage);
    const displayedSubmissions = submissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full text-white">
     
            <h2 className="text-3xl font-bold mb-8 text-white border-b-4 border-blue-500 pb-2 inline-block">
                My Submission History
            </h2>

       
            <div className="overflow-x-auto shadow-2xl rounded-2xl bg-[#15191e] border border-white/5">
                <table className="table w-full">
             
                    <thead className="bg-blue-600/10 text-blue-400 uppercase text-xs tracking-wider font-bold">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th className="py-4">Task Title</th>
                            <th className="py-4">Payable Amount</th>
                            <th className="py-4">Buyer Name</th>
                            <th className="py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    
                    {/* টেবিল বডি */}
                    <tbody className="text-gray-300 text-sm">
                        {displayedSubmissions.map((sub, index) => (
                            <tr key={sub._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-300">
                                <th className="pl-6 text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                <td className="font-medium text-white">{sub.task_title}</td>
                                <td className="font-bold text-yellow-400">🪙 {sub.payable_amount}</td>
                                <td className="text-cyan-400">{sub.buyer_name}</td>
                                <td className="text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                        sub.status === 'approved' 
                                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                            : sub.status === 'rejected' 
                                            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}>
                                        {sub.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

              
                {submissions.length === 0 && (
                    <div className="text-center py-16 flex flex-col items-center gap-3">
                        <div className="text-6xl grayscale opacity-20">📂</div>
                        <p className="text-gray-500 text-lg">No submission records found.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-3">
                    {[...Array(totalPages).keys()].map(page => (
                        <button
                            key={page + 1}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-300 border ${
                                currentPage === page + 1 
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                                    : 'bg-[#15191e] text-gray-400 border-white/10 hover:border-cyan-500 hover:text-cyan-400'
                            }`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MySubmissions;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye, FaClipboardList, FaUser } from "react-icons/fa";

const BuyerReview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { data: submissions = [], refetch, isLoading } = useQuery({
        queryKey: ['buyer-submissions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-submissions/${user?.email}`);
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        const res = await axiosSecure.patch(`/submissions/approve/${id}`);
        if (res.data.message === "approved") {
            Swal.fire({
                title: "Approved!",
                text: "Worker has received the coins.",
                icon: "success",
                background: "#15191e",
                color: "#fff",
                confirmButtonColor: "#10b981"
            });
            refetch();
        }
    };

    const handleReject = async (id) => {
        const res = await axiosSecure.patch(`/submissions/reject/${id}`);
        if (res.data.message === "rejected") {
            Swal.fire({
                title: "Rejected!",
                text: "Submission rejected. Task slot increased.",
                icon: "error",
                background: "#15191e",
                color: "#fff",
                confirmButtonColor: "#ef4444"
            });
            refetch();
        }
    };

    if (isLoading) return <div className="p-10 text-center text-blue-400 animate-pulse font-bold tracking-widest">LOADING SUBMISSIONS...</div>;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a]">

            <div className="mb-10">
                <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
                    <FaClipboardList className="text-blue-500" />
                    REVIEW <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">SUBMISSIONS</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm uppercase font-bold">Pending Requests: {submissions.length}</p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent mt-4"></div>
            </div>


            <div className="relative overflow-hidden bg-[#15191e] border border-white/10 rounded-[2rem] shadow-2xl">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="table w-full border-separate border-spacing-y-3 px-6">
              
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[11px] tracking-[0.2em]">
                                <th className="bg-transparent border-none py-6">Worker Info</th>
                                <th className="bg-transparent border-none py-6">Task Title</th>
                                <th className="bg-transparent border-none py-6 text-center">Payable</th>
                                <th className="bg-transparent border-none py-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        
                      
                        <tbody className="space-y-4">
                            {submissions.map((sub) => (
                                <tr key={sub._id} className="group hover:bg-white/5 transition-all duration-300">
                       
                                    <td className="bg-transparent border-none py-5 rounded-l-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                                                <FaUser />
                                            </div>
                                            <span className="font-bold text-gray-200 tracking-wide text-sm">{sub.worker_name}</span>
                                        </div>
                                    </td>

                   
                                    <td className="bg-transparent border-none py-5">
                                        <span className="text-gray-400 font-medium text-xs md:text-sm">{sub.task_title}</span>
                                    </td>

                                 
                                    <td className="bg-transparent border-none py-5 text-center">
                                        <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-xs">
                                            🪙 {sub.payable_amount}
                                        </div>
                                    </td>

                                    <td className="bg-transparent border-none py-5 rounded-r-2xl text-center">
                                        <div className="flex justify-center items-center gap-3">
                                         
                                            <button 
                                                onClick={() => setSelectedSubmission(sub)}
                                                className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>

                                       
                                            <button 
                                                onClick={() => handleApprove(sub._id)} 
                                                className="p-2.5 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all border border-green-500/20"
                                                title="Approve"
                                            >
                                                <FaCheckCircle />
                                            </button>

                                            <button 
                                                onClick={() => handleReject(sub._id)} 
                                                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                                title="Reject"
                                            >
                                                <FaTimesCircle />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

             
                {submissions.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-20 text-gray-500">
                        <FaClipboardList className="text-5xl mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-sm italic">
                            No submissions pending for review.
                        </p>
                    </div>
                )}
            </div>

            {/* Dark Mode Modal for Submission Details */}
            {selectedSubmission && (
                <dialog open className="modal modal-bottom sm:modal-middle bg-black/80 backdrop-blur-sm">
                    <div className="modal-box bg-[#15191e] border border-white/10 text-white rounded-2xl shadow-2xl">
                        <h3 className="font-bold text-xl mb-6 text-blue-400 border-b border-white/10 pb-3">Submission Proof</h3>
                        
                        <div className="space-y-4">
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Worker Name</p>
                                <p className="font-bold">{selectedSubmission.worker_name}</p>
                            </div>
                            
                            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Proof / Submission Details</p>
                                <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{selectedSubmission.submission_details}</p>
                            </div>
                        </div>

                        <div className="modal-action mt-8">
                            <button 
                                className="btn btn-sm bg-gray-700 hover:bg-gray-600 text-white border-none rounded-lg px-6" 
                                onClick={() => setSelectedSubmission(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default BuyerReview;
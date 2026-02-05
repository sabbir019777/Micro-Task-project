import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const ReviewSubmissions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [displaySubmissions, setDisplaySubmissions] = useState([]);

    const { data: submissions = [] } = useQuery({
        queryKey: ['review-submissions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-submissions/${user?.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        setDisplaySubmissions(submissions);
    }, [submissions]);

   
    const handleApprove = (id, workerEmail, payableAmount, taskId) => {
        Swal.fire({
            title: "Approve this task?",
            text: "Worker will be paid instantly!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!",
            background: "#1d232a",
            color: "#fff"
        }).then((result) => {
            if (result.isConfirmed) {
           
                const remaining = displaySubmissions.filter(sub => sub._id !== id);
                setDisplaySubmissions(remaining);

        
                axiosSecure.patch(`/submissions/approve/${id}`, {
                    workerEmail,
                    payableAmount,
                    taskId
                }).catch(err => console.error(err));

                
                Swal.fire({
                    title: "Approved!",
                    text: "Task has been approved.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                    background: "#1d232a",
                    color: "#fff"
                });
            }
        });
    };


    const handleReject = (id) => {
        Swal.fire({
            title: "Reject this task?",
            text: "You cannot revert this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Reject!",
            background: "#1d232a",
            color: "#fff"
        }).then((result) => {
            if (result.isConfirmed) {
        
                const remaining = displaySubmissions.filter(sub => sub._id !== id);
                setDisplaySubmissions(remaining);

   
                axiosSecure.patch(`/submissions/reject/${id}`)
                    .catch(err => console.error(err));

     
                Swal.fire({
                    title: "Rejected!",
                    text: "Task has been rejected.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                    background: "#1d232a",
                    color: "#fff"
                });
            }
        });
    };

    return (
        <div className="w-full text-white">
            <div className="mb-12 text-center relative z-10">
                <h2 className="text-4xl font-bold tracking-wide">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                        Review Submissions
                    </span>
                </h2>
                <p className="text-gray-400 text-xs md:text-sm mt-3 tracking-[0.2em] uppercase font-medium">
                    Validate Worker Tasks & Approve Payments
                </p>
                <div className="h-1 w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-60 blur-[1px]"></div>
            </div>

            <div className="overflow-x-auto shadow-2xl rounded-2xl bg-[#15191e] border border-white/5 relative z-10">
                <table className="table w-full">
                    <thead className="bg-blue-600/10 text-blue-400 uppercase text-xs tracking-wider font-bold backdrop-blur-md">
                        <tr>
                            <th className="py-5 pl-8">#</th>
                            <th className="py-5">Worker Info</th>
                            <th className="py-5">Task Title</th>
                            <th className="py-5">Payable Amount</th>
                            <th className="py-5">Submission Detail</th>
                            <th className="py-5 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-300 text-sm">
                        {displaySubmissions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-20 flex flex-col items-center justify-center gap-4 w-full">
                                    <div className="text-7xl grayscale opacity-10 animate-pulse">📂</div>
                                    <p className="text-gray-500 text-lg font-medium">No pending submissions found.</p>
                                </td>
                            </tr>
                        ) : (
                            displaySubmissions.map((sub, index) => (
                                <tr key={sub._id} className="border-b border-white/5 hover:bg-blue-500/5 transition-colors duration-300 group">
                                    <th className="pl-8 text-gray-500 group-hover:text-white transition-colors">{index + 1}</th>
                                    <td>
                                        <div className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">{sub.worker_name}</div>
                                        <div className="text-xs text-gray-500 font-mono mt-1 group-hover:text-gray-400">{sub.worker_email}</div>
                                    </td>
                                    <td className="font-medium">{sub.task_title}</td>
                                    <td className="font-bold text-yellow-400 text-base shadow-yellow-500/10 drop-shadow-sm">🪙 {sub.payable_amount}</td>
                                    <td>
                                        <div className="tooltip tooltip-info z-50" data-tip={sub.submission_details}>
                                            <button className="btn btn-xs btn-outline border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </td>
                                    <td className="flex justify-center gap-3">
                                        <button
                                            onClick={() => handleApprove(sub._id, sub.worker_email, sub.payable_amount, sub.task_id)}
                                            className="btn btn-sm bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all shadow-[0_0_15px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(sub._id)}
                                            className="btn btn-sm bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-[0_0_15px_rgba(239,68,68,0.05)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewSubmissions;
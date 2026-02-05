import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaCoins, FaCalendarAlt, FaUserTie, FaPaperPlane, FaAlignLeft } from "react-icons/fa";

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
  
            const res = await axiosSecure.get(`/task/${id}`); 
            return res.data;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const submission_details = form.submission_details.value;

        if(user?.email === task.buyer_email){
            return Swal.fire("Error", "You cannot submit your own task!", "error");
        }

        const submissionData = {
            task_id: task._id,
            task_title: task.task_title,
            task_image_url: task.task_image_url,
            payable_amount: task.payable_amount,
            worker_email: user?.email,
            worker_name: user?.displayName,
            buyer_name: task.buyer_name,
            buyer_email: task.buyer_email,
            submission_details: submission_details,
            status: 'pending',
            current_date: new Date()
        };

        try {
            const res = await axiosSecure.post('/submissions', submissionData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Good job!",
                    text: "Task submitted successfully!",
                    icon: "success",
                    background: "#15191e",
                    color: "#fff"
                });
                form.reset();
                navigate('/dashboard/mySubmissions');
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-blue-500"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 min-h-screen text-white">
            <div className="max-w-5xl mx-auto bg-[#15191e] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-full min-h-[300px] bg-gray-800">
                        <img 
                            src={task.task_image_url} 
                            alt="Task" 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop";
                            }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#15191e] via-transparent to-transparent"></div>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30 uppercase tracking-widest">
                                Task Details
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                            {task.task_title || "No Title Available"}
                        </h2>
                        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <FaUserTie />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Buyer</p>
                                <p className="font-bold">{task.buyer_name || "Unknown Buyer"}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                                <p className="text-yellow-500 text-xs font-bold uppercase mb-1 flex items-center gap-2">
                                    <FaCoins /> Reward
                                </p>
                                <p className="text-2xl font-black">{task.payable_amount || 0} <span className="text-xs">Coins</span></p>
                            </div>
                            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                                <p className="text-red-400 text-xs font-bold uppercase mb-1 flex items-center gap-2">
                                    <FaCalendarAlt /> Deadline
                                </p>
                                <p className="text-xl font-bold">
                                    {task.completion_date ? new Date(task.completion_date).toLocaleDateString() : "No Date"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 border-t border-white/10 bg-[#1a202c]/50">
                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-300">
                            <FaAlignLeft className="text-blue-500" /> Task Description
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base bg-black/20 p-6 rounded-2xl border border-white/5">
                            {task.task_detail || "No description provided."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text text-white font-bold text-lg">Submission Details</span>
                            </label>
                            <textarea 
                                name="submission_details" 
                                className="textarea h-40 bg-[#15191e] border border-white/20 focus:border-blue-500 text-white placeholder-gray-600 rounded-2xl text-base p-4" 
                                placeholder="Describe your work proof here..."
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn w-full bg-gradient-to-r from-blue-600 to-cyan-600 border-none text-white rounded-xl shadow-lg text-lg font-bold h-14">
                            <FaPaperPlane /> Submit Work
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
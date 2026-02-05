import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt, FaTasks, FaUserCircle, FaUsers, FaCoins, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();


    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['all-tasks-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get("/tasks");
            return res.data;
        }
    });


    const handleDeleteTask = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This task will be removed permanently!",
            icon: "warning",
            showCancelButton: true,
            background: '#15191e',
            color: '#fff',
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#374151",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tasks/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The task has been removed by Admin.",
                        icon: "success",
                        background: '#15191e',
                        color: '#fff'
                    });
                    refetch();
                }
            }
        });
    };

    if (isLoading) return <div className="p-10 text-cyan-400 animate-pulse font-bold tracking-widest text-center">SYNCHRONIZING TASKS...</div>;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a]">
       
            <div className="mb-12">
                <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
                    <FaTasks className="text-red-500" />
                    MANAGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ALL TASKS</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm uppercase font-bold">Total Active Tasks: {tasks.length}</p>
                <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-transparent mt-4 shadow-[0_0_15px_#ef4444]"></div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks.map((task, index) => (
                    <motion.div 
                        key={task._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden bg-[#15191e] border border-white/10 rounded-[2rem] p-8 shadow-2xl hover:-translate-y-2 transition-all duration-500"
                    >
                   
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-600 opacity-0 group-hover:opacity-10 blur-xl transition duration-500"></div>
                
                        <div className="relative z-10">
                            <h2 className="text-xl font-black text-white mb-3 group-hover:text-red-400 transition-colors truncate">
                                {task.task_title}
                            </h2>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic leading-relaxed">
                                "{task.task_detail}"
                            </p>

                            <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3 text-sm">
                                    <FaUserCircle className="text-blue-400 text-lg" />
                                    <span className="text-gray-300"><strong className="text-gray-500 uppercase text-[10px]">Buyer:</strong> {task.buyer_name}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <FaUsers className="text-cyan-400 text-lg" />
                                    <span className="text-gray-300"><strong className="text-gray-500 uppercase text-[10px]">Required:</strong> {task.required_workers} Workers</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <FaCoins className="text-yellow-500 text-lg" />
                                    <span className="text-yellow-400 font-bold"><strong className="text-gray-500 uppercase text-[10px]">Reward:</strong> {task.payable_amount} Coins</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm border-t border-white/5 pt-3 mt-2">
                                    <FaCalendarAlt className="text-gray-500 text-lg" />
                                    <span className="text-gray-500 font-mono text-xs">{new Date(task.completion_date).toLocaleDateString()}</span>
                                </div>
                            </div>

             
                            <div className="mt-8">
                                <button 
                                    onClick={() => handleDeleteTask(task._id)}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg group/btn"
                                >
                                    <FaTrashAlt className="group-hover/btn:rotate-12 transition-transform" />
                                    Terminate Task
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

         
            {tasks.length === 0 && (
                <div className="flex flex-col items-center justify-center p-20 bg-[#15191e] rounded-[3rem] border border-dashed border-gray-700">
                    <FaTasks className="text-6xl text-gray-700 mb-4 animate-bounce" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest italic">
                        No tasks detected in the mainframe.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ManageTasks;
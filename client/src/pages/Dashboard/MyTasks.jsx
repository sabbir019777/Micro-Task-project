import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit, FaClipboardList, FaSave } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MyTasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedTask, setSelectedTask] = useState(null);
    const { register, handleSubmit, reset } = useForm();


    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['my-tasks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-tasks/${user?.email}`);
            return res.data;
        }
    });

 
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Deleted tasks cannot be recovered! Remaining coins will be refunded.",
            icon: "warning",
            background: "#15191e",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tasks/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Task deleted & coins refunded.",
                        icon: "success",
                        background: "#15191e",
                        color: "#fff"
                    });
                }
            }
        });
    };

 
    const handleUpdate = async (data) => {
        const updatedInfo = {
            task_title: data.task_title,
            task_detail: data.task_detail,
            submission_info: data.submission_info
        };

        const res = await axiosSecure.patch(`/tasks/${selectedTask._id}`, updatedInfo);
        if (res.data.modifiedCount > 0) {
            refetch();
            setSelectedTask(null);
            Swal.fire({
                title: "Updated!",
                text: "Task details updated successfully.",
                icon: "success",
                background: "#15191e",
                color: "#fff"
            });
        }
    };

    if (isLoading) return <div className="p-10 text-center text-blue-400 animate-pulse font-bold tracking-widest">LOADING TASKS...</div>;

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a]">
      
            <div className="mb-10">
                <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
                    <FaClipboardList className="text-blue-500" />
                    MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TASKS</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm font-bold uppercase">Total Active Tasks: {tasks.length}</p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent mt-4"></div>
            </div>

            <div className="overflow-hidden bg-[#15191e] border border-white/10 rounded-[2rem] shadow-2xl">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="table w-full border-separate border-spacing-y-3 px-6">
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[11px] tracking-[0.2em]">
                                <th className="bg-transparent border-none py-6">#</th>
                                <th className="bg-transparent border-none py-6">Task Info</th>
                                <th className="bg-transparent border-none py-6 text-center">Workers</th>
                                <th className="bg-transparent border-none py-6 text-center">Payable</th>
                                <th className="bg-transparent border-none py-6 text-center">Deadline</th>
                                <th className="bg-transparent border-none py-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-4">
                            {tasks.map((task, index) => (
                                <tr key={task._id} className="group hover:bg-white/5 transition-all duration-300">
                                    <td className="bg-transparent border-none py-5 rounded-l-2xl text-gray-500 font-mono">
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </td>
                                    
                                    <td className="bg-transparent border-none py-5">
                                        <div className="font-bold text-gray-200">{task.task_title}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">ID: {task._id.slice(-6)}</div>
                                    </td>

                                    <td className="bg-transparent border-none py-5 text-center">
                                        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg border border-blue-500/20 text-xs font-bold">
                                            {task.required_workers} Need
                                        </span>
                                    </td>

                                    <td className="bg-transparent border-none py-5 text-center">
                                        <span className="text-yellow-400 font-bold text-sm">🪙 {task.payable_amount}</span>
                                    </td>

                                    <td className="bg-transparent border-none py-5 text-center text-gray-400 text-xs">
                                        {new Date(task.completion_date).toLocaleDateString()}
                                    </td>

                                    <td className="bg-transparent border-none py-5 rounded-r-2xl text-center">
                                        <div className="flex justify-center gap-3">
                                            <button 
                                                onClick={() => {
                                                    setSelectedTask(task);
                                                    reset(task); 
                                                }} 
                                                className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(task._id)} 
                                                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {tasks.length === 0 && (
                    <div className="text-center p-20 text-gray-500 italic">No tasks found. Create one now!</div>
                )}
            </div>

            {selectedTask && (
                <dialog open className="modal modal-bottom sm:modal-middle bg-black/80 backdrop-blur-sm">
                    <div className="modal-box bg-[#15191e] border border-white/10 text-white rounded-2xl shadow-2xl">
                        <h3 className="font-bold text-xl mb-6 text-blue-400 border-b border-white/10 pb-3">Update Task</h3>
                        
                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                            <div className="form-control">
                                <label className="label text-xs uppercase text-gray-500 font-bold">Task Title</label>
                                <input {...register("task_title")} className="input bg-black/30 border border-white/10 w-full text-sm" />
                            </div>
                            
                            <div className="form-control">
                                <label className="label text-xs uppercase text-gray-500 font-bold">Task Detail</label>
                                <textarea {...register("task_detail")} className="textarea bg-black/30 border border-white/10 w-full h-24 text-sm"></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs uppercase text-gray-500 font-bold">Submission Info</label>
                                <input {...register("submission_info")} className="input bg-black/30 border border-white/10 w-full text-sm" />
                            </div>

                            <div className="modal-action mt-6">
                                <button type="button" className="btn btn-sm btn-ghost text-gray-400" onClick={() => setSelectedTask(null)}>Cancel</button>
                                <button type="submit" className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none px-6">
                                    <FaSave className="mr-2" /> Update
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyTasks;
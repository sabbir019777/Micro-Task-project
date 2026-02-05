import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FaTasks, FaCoins, FaCalendarAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const [userData, refetch] = useUserRole(); 
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const userAvailableCoin = userData?.coin || 0;

    const onSubmit = async (data) => {
        const total_payable_amount = parseInt(data.required_workers) * parseInt(data.payable_amount);

      
        if (total_payable_amount > userAvailableCoin) {
            Swal.fire({
                title: "Insufficient Coins!",
                text: "You need more coins to add this task.",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "Purchase Coin",
                background: "#15191e",
                color: "#fff",
                confirmButtonColor: "#3b82f6",
                cancelButtonColor: "#ef4444"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/dashboard/purchaseCoin");
                }
            });
            return;
        }

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait while we publish your task.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: "#15191e",
            color: "#fff"
        });

        try {
       
            const imageFile = { image: data.task_image[0] };
            const res = await axios.post(img_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const taskItem = {
                    task_title: data.task_title,
                    task_detail: data.task_detail,
                    required_workers: parseInt(data.required_workers),
                    payable_amount: parseInt(data.payable_amount),
                    total_payable_amount,
                    completion_date: data.completion_date,
                    submission_info: data.submission_info,
                    task_image_url: res.data.data.display_url,
                    buyer_name: user?.displayName,
                    buyer_email: user?.email,
                    created_at: new Date().toISOString()
                };

         
                const taskRes = await axiosSecure.post("/tasks", taskItem);
                
                if (taskRes.data.insertedId) {
                    reset();
                    refetch(); 
                    Swal.fire({
                        title: "Task Added!",
                        text: "Coins have been deducted from your account.",
                        icon: "success",
                        background: "#15191e",
                        color: "#fff",
                        confirmButtonColor: "#10b981"
                    });
                    navigate("/dashboard/myTasks");
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                background: "#15191e",
                color: "#fff"
            });
        }
    };

    return (
       
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a] flex justify-center items-center">
            
  
            <div className="w-full max-w-4xl bg-[#15191e] border border-white/10 rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
                
   
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]"></div>

   
                <div className="mb-10 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter flex justify-center items-center gap-3">
                        <FaTasks className="text-blue-500" />
                        ADD NEW <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TASK</span>
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-bold">Create tasks & Grow your business</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    
                    {/* Task Title */}
                    <div className="form-control md:col-span-2">
                        <label className="label text-gray-400 font-bold text-xs uppercase tracking-wider">Task Title</label>
                        <input {...register("task_title")} placeholder="Ex: Watch YouTube Video & Subscribe" className="input bg-[#1d232a] border border-white/10 text-white focus:border-blue-500 w-full rounded-xl" required />
                    </div>

                    {/* Required Workers */}
                    <div className="form-control">
                        <label className="label text-gray-400 font-bold text-xs uppercase tracking-wider">Required Workers</label>
                        <input type="number" {...register("required_workers")} placeholder="Ex: 100" className="input bg-[#1d232a] border border-white/10 text-white focus:border-blue-500 w-full rounded-xl" required />
                    </div>

                    {/* Payable Amount */}
                    <div className="form-control">
                        <label className="label text-gray-400 font-bold text-xs uppercase tracking-wider">Amount Per Worker (Coin)</label>
                        <div className="relative">
                            <FaCoins className="absolute left-4 top-3.5 text-yellow-500" />
                            <input type="number" {...register("payable_amount")} placeholder="Ex: 10" className="input bg-[#1d232a] border border-white/10 text-white focus:border-blue-500 w-full pl-10 rounded-xl" required />
                        </div>
                    </div>

                    {/* Completion Date */}
                    <div className="form-control">
                        <label className="label text-gray-400 font-bold text-xs uppercase tracking-wider">Completion Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-500" />
                            <input type="date" {...register("completion_date")} className="input bg-[#1d232a] border border-white/10 text-white focus:border-blue-500 w-full pl-10 rounded-xl" required />
                        </div>
                    </div>

                    {/* Submission Info */}
                    <div className="form-control md:col-span-2">
                        <label className="label text-gray-400 font-bold text-xs uppercase tracking-wider">Submission Info</label>
                        <input {...register("submission_info")} placeholder="Ex: Submit screenshot proof" className="input bg-[#1d232a] border border-white/10 text-white focus:border-blue-500 w-full rounded-xl" required />
                    </div>

                    {/* Task Detail */}
                    <div className="form-control md:col-span-2">
                        <label className="label text-gray-400 font-bold text-xs uppercase tracking-wider">Task Details</label>
                        <textarea {...register("task_detail")} className="textarea bg-[#1d232a] border border-white/10 text-white focus:border-blue-500 h-32 w-full rounded-xl leading-relaxed" placeholder="Describe the task steps carefully..." required></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="form-control md:col-span-2">
                        <label className="label text-gray-400 font-bold text-xs uppercase tracking-wider">Task Thumbnail</label>
                        <input type="file" {...register("task_image")} className="file-input file-input-bordered w-full bg-[#1d232a] border-white/10 text-gray-300 rounded-xl file:bg-blue-600 file:border-none file:text-white" required />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-6">
                        <button type="submit" className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black uppercase tracking-widest border-none rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all py-4 h-auto">
                            Publish Task
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddTask;
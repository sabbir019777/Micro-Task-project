import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaCoins, FaUsers, FaCalendarAlt, FaUserTie, FaArrowRight } from "react-icons/fa";

const TaskList = () => {
    const axiosSecure = useAxiosSecure();


    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks');
            return res.data;
        }
    });

    
    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-blue-500"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 min-h-screen">
            
     
            <div className="mb-12 text-center md:text-left">
                <h2 className="text-4xl font-black text-white italic tracking-tighter">
                    AVAILABLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">TASKS</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm font-bold uppercase">Complete tasks & earn coins</p>
            </div>
            
      
            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tasks.map(task => (
                        <div key={task._id} className="group relative bg-[#15191e] border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-xl flex flex-col h-full">
                            
                           
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                         
                            <figure className="relative h-48 overflow-hidden bg-gray-800">
                                <img 
                                    src={task.task_image_url} 
                                    alt="Task" 
                                 
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"; // ডিফল্ট ইমেজ
                                    }}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                                    <FaCoins className="text-yellow-400 animate-pulse" />
                                    <span className="text-white font-bold">{task.payable_amount} Coins</span>
                                </div>
                            </figure>

                            <div className="p-6 flex flex-col flex-grow relative z-10">
                        
                                <h2 className="card-title text-white text-xl font-bold mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                                    {task.task_title}
                                </h2>

                                
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">
                                    <FaUserTie className="text-blue-500" />
                                    <span>{task.buyer_name}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 flex items-center gap-1">
                                            <FaCalendarAlt /> Deadline
                                        </p>
                                        <p className="text-gray-300 text-xs font-mono">{new Date(task.completion_date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 flex items-center gap-1">
                                            <FaUsers /> Slots Left
                                        </p>
                                        <p className="text-gray-300 text-xs font-mono">{task.required_workers} Available</p>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <Link 
                                        to={`/dashboard/taskDetails/${task._id}`} 
                                        className="btn w-full bg-gradient-to-r from-blue-600 to-cyan-600 border-none text-white rounded-xl shadow-lg hover:shadow-blue-500/30 group-hover:gap-3 transition-all duration-300"
                                    >
                                        View Details <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (

                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp" alt="No Tasks" className="w-64 opacity-50 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-400">No Available Task</h3>
                    <p className="text-gray-500">Currently there are no tasks to display.</p>
                </div>
            )}
        </div>
    );
};

export default TaskList;
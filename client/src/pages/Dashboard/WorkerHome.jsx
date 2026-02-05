import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaClipboardList, FaHourglassHalf, FaCoins } from "react-icons/fa";

const WorkerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['worker-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/worker-stats/${user?.email}`);
            return res.data;
        }
    });

 
    const StatCard = ({ title, value, icon, gradient, iconColor }) => (
        <div className="relative group overflow-hidden bg-[#15191e] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all duration-500 min-h-[220px] flex flex-col justify-center">
            
          
            <div className={`absolute -inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition duration-500`}></div>
            
           
            <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <div className="relative z-10 grid grid-cols-[1fr_auto] items-center gap-6">
                
        
                <div className="overflow-hidden">
                    <h3 className="text-gray-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 truncate">
                        {title}
                    </h3>
                    
                    
                    <p className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] break-all leading-tight">
                        {value}
                    </p>
                </div>
                
       
                <div className={`w-20 h-20 rounded-3xl ${iconColor} bg-opacity-10 flex items-center justify-center text-4xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 min-h-screen">
           
            <div className="mb-12">
                <h2 className="text-4xl font-black text-white italic tracking-tighter">
                    WORKER <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">DASHBOARD</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm font-bold uppercase">Your Performance Overview</p>
            </div>

    
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                
               
                <StatCard 
                    title="Total Submissions" 
                    value={stats.totalSubmissions || 0} 
                    icon={<FaClipboardList className="text-blue-400" />}
                    gradient="from-blue-500 to-cyan-500"
                    iconColor="bg-blue-500"
                />

          
                <StatCard 
                    title="Pending Submission" 
                    value={stats.pendingSubmissions || 0} 
                    icon={<FaHourglassHalf className="text-orange-400" />}
                    gradient="from-orange-400 to-red-500"
                    iconColor="bg-orange-500"
                />

   
                <StatCard 
                    title="Total Earnings" 
                    value={stats.totalEarning || 0} 
                    icon={<FaCoins className="text-green-400" />}
                    gradient="from-green-400 to-emerald-600"
                    iconColor="bg-green-500"
                />

            </div>
        </div>
    );
};

export default WorkerHome;
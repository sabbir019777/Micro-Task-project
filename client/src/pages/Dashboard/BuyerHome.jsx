import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaTasks, FaUsers, FaWallet, FaBriefcase } from "react-icons/fa";

const BuyerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-stats/${user?.email}`);
            return res.data;
        }
    });


    const StatCard = ({ title, value, icon, gradient, iconColor }) => (
        <div className="relative group overflow-hidden bg-[#15191e] border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all duration-500">
            
     
            <div className={`absolute -inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition duration-500`}></div>
   
            <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <div className="relative z-10 flex justify-between items-center gap-4">
                <div>
                    <h3 className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">{title}</h3>
                    <p className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                        {value}
                    </p>
                </div>
                
           
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl ${iconColor} bg-opacity-10 flex items-center justify-center text-3xl md:text-4xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    if (isLoading) return (
        <div className="min-h-screen flex justify-center items-center bg-[#1d232a]">
            <span className="loading loading-bars loading-lg text-blue-500"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a]">
        
            <div className="mb-12">
                <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
                    <FaBriefcase className="text-blue-500" />
                    BUYER <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">DASHBOARD</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm font-bold uppercase">
                    Welcome back, <span className="text-white">{user?.displayName}</span>
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent mt-4"></div>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                
             
                <StatCard 
                    title="Total Tasks Posted" 
                    value={stats.totalTasks || 0} 
                    icon={<FaTasks className="text-blue-400" />}
                    gradient="from-blue-500 to-indigo-600"
                    iconColor="bg-blue-500"
                />

           
                <StatCard 
                    title="Workers Needed" 
                    value={stats.pendingWorkers || 0} 
                    icon={<FaUsers className="text-orange-400" />}
                    gradient="from-orange-500 to-red-600"
                    iconColor="bg-orange-500"
                />

             
                <StatCard 
                    title="Total Paid (USD)" 
                    value={`$${stats.totalPaid || 0}`} 
                    icon={<FaWallet className="text-green-400" />}
                    gradient="from-green-500 to-emerald-600"
                    iconColor="bg-green-500"
                />

            </div>
        </div>
    );
};

export default BuyerHome;
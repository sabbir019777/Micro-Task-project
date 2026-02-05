import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaUserTie, FaCoins, FaWallet } from "react-icons/fa";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        }
    });

    const StatCard = ({ title, value, icon, gradient, iconColor }) => (
     
        <div className="relative group overflow-hidden bg-[#15191e] border border-white/10 p-10 rounded-[2rem] shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col justify-center">
            
  
            <div className={`absolute -inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition duration-500`}></div>
            

            <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>

            <div className="relative z-10 flex justify-between items-center gap-4">
                <div className="flex-1 min-w-0"> 
   
                    <h3 className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs mb-3">{title}</h3>
                    

                    <p className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] truncate">
                        {value}
                    </p>
                </div>
                
        
                <div className={`w-16 h-16 flex-shrink-0 rounded-2xl ${iconColor} bg-opacity-10 flex items-center justify-center text-3xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 min-h-screen">
            
            <div className="mb-12">
                <h2 className="text-3xl font-black text-white italic tracking-tighter">
                    ADMIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">DASHBOARD</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm">System Overview & Statistics</p>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <StatCard 
                    title="Total Workers" 
                    value={stats.totalWorkers || 0} 
                    icon={<FaUsers className="text-cyan-400" />}
                    gradient="from-cyan-500 to-blue-600"
                    iconColor="bg-cyan-500"
                />

                <StatCard 
                    title="Total Buyers" 
                    value={stats.totalBuyers || 0} 
                    icon={<FaUserTie className="text-purple-400" />}
                    gradient="from-purple-500 to-pink-600"
                    iconColor="bg-purple-500"
                />

                <StatCard 
                    title="Total Site Coins" 
                    value={stats.totalCoin || 0} 
                    icon={<FaCoins className="text-yellow-400" />}
                    gradient="from-yellow-400 to-orange-500"
                    iconColor="bg-yellow-500"
                />

                <StatCard 
                    title="Total Revenue" 
                    value={`$${stats.totalEarnings || 0}`} 
                    icon={<FaWallet className="text-emerald-400" />}
                    gradient="from-emerald-400 to-green-600"
                    iconColor="bg-emerald-500"
                />

            </div>
        </div>
    );
};

export default AdminHome;
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import { FaUserAstronaut, FaCoins, FaArrowRight, FaRocket, FaCrown, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardHome = () => {
    const { user } = useAuth();
    const [userData] = useUserRole();
    const role = userData?.role;


    const getRoleData = () => {
        if (role === 'admin') return { 
            title: "System Administrator", 
            icon: <FaUserAstronaut className="text-6xl text-purple-500" />,
            desc: "Manage the entire platform from here.",
            color: "from-purple-500 to-indigo-600"
        };
        if (role === 'buyer') return { 
            title: "Task Creator", 
            icon: <FaCrown className="text-6xl text-blue-500" />,
            desc: "Create tasks and grow your business.",
            color: "from-blue-500 to-cyan-500"
        };
        return { 
            title: "Micro Worker", 
            icon: <FaTools className="text-6xl text-green-500" />,
            desc: "Complete tasks and earn money.",
            color: "from-green-500 to-emerald-500"
        };
    };

    const roleInfo = getRoleData();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
            
         
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-[#15191e] border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-3xl w-full overflow-hidden"
            >
     
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${roleInfo.color}`}></div>
                <div className={`absolute -inset-0 bg-gradient-to-r ${roleInfo.color} opacity-5 blur-[100px]`}></div>

               
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="p-6 bg-black/20 rounded-full border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        {roleInfo.icon}
                    </div>
                    
                    <div>
                        <h3 className="text-gray-400 font-bold tracking-[0.3em] uppercase text-sm mb-2">{roleInfo.title}</h3>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-tight">
                            Hello, <span className={`text-transparent bg-clip-text bg-gradient-to-r ${roleInfo.color}`}>{user?.displayName}</span>!
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg max-w-lg mx-auto">{roleInfo.desc}</p>
                    </div>


                    <div className="flex flex-col md:flex-row items-center gap-4 bg-[#1d232a] px-6 py-4 rounded-2xl border border-white/5 shadow-inner mt-4 w-full max-w-lg mx-auto overflow-hidden">
                    
                        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-lg animate-pulse">
                            <FaCoins className="text-white text-xl" />
                        </div>

                      
                        <div className="text-center md:text-left min-w-0 flex-1 w-full">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Current Balance</p>
                            
                            <h2 className="text-2xl md:text-3xl font-mono font-black text-white leading-none break-all whitespace-normal">
                                {userData?.coin || 0} 
                                <span className="text-sm text-yellow-500 ml-2 inline-block">Coins</span>
                            </h2>
                        </div>
                    </div>

                   
                    <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
                        {role === 'worker' && (
                            <Link to="/dashboard/taskList" className="btn btn-lg bg-gradient-to-r from-green-500 to-emerald-600 border-none text-white rounded-xl px-8 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] group">
                                <FaRocket className="mr-2 group-hover:animate-bounce" /> Start Earning
                            </Link>
                        )}
                        {role === 'buyer' && (
                            <Link to="/dashboard/addNewTask" className="btn btn-lg bg-gradient-to-r from-blue-500 to-cyan-600 border-none text-white rounded-xl px-8 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group">
                                <FaRocket className="mr-2 group-hover:rotate-45 transition-transform" /> Create Task
                            </Link>
                        )}
                        {role === 'admin' && (
                            <Link to="/dashboard/manageUsers" className="btn btn-lg bg-gradient-to-r from-purple-500 to-indigo-600 border-none text-white rounded-xl px-8 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                                Manage System <FaArrowRight className="ml-2" />
                            </Link>
                        )}
                        
                        <Link to="/dashboard/profile" className="btn btn-lg btn-ghost border border-white/10 text-gray-300 hover:bg-white/5 rounded-xl px-8">
                            View Profile
                        </Link>
                    </div>
                </div>
            </motion.div>

            <p className="mt-10 text-gray-600 text-xs font-mono tracking-widest">MICRO-TASKER SYSTEM • V2.0 • SECURE CONNECTION</p>
        </div>
    );
};

export default DashboardHome;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCoins, FaTrophy } from "react-icons/fa";

const TopWorkers = () => {
 
    const { data: topWorkers = [], isLoading, isError } = useQuery({
        queryKey: ['bestWorkers'],
        queryFn: async () => {
            const res = await axios.get('https://micro-task-server-side.vercel.app/best-workers');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20 text-cyan-400 animate-pulse tracking-widest">LOADING ELITE SQUAD...</div>;
    if (isError) return <div className="text-center py-20 text-red-500">Failed to load workers.</div>;

    
    const workersArray = Array.isArray(topWorkers) ? topWorkers.slice(0, 8) : [];


    const getRankStyle = (index) => {
        if (index === 0) return "from-yellow-300 via-amber-400 to-yellow-600 shadow-yellow-500/40";
        if (index === 1) return "from-gray-300 via-gray-400 to-gray-500 shadow-gray-400/40";
        if (index === 2) return "from-orange-300 via-orange-400 to-orange-600 shadow-orange-500/40"; 
        return "from-cyan-400 to-blue-500 shadow-cyan-500/20"; 
    };

    return (
  
        <section className="py-24 bg-[#1d232a] relative overflow-hidden">
            
          
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
     
                <div className="text-center mb-20 space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black italic tracking-tighter text-white"
                    >
                        ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">SQUAD</span>
                    </motion.h2>
                    <p className="text-gray-400 tracking-[0.3em] text-xs font-bold uppercase">Top 8 Best Performers</p>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#06b6d4]"></div>
                </div>
                
   
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {workersArray.length > 0 ? (
                        workersArray.map((worker, index) => (
                            <motion.div
                                key={worker._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                              
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${getRankStyle(index)} rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition duration-500`}></div>
                                
                              
                                <div className="relative h-full bg-[#15191e] rounded-[2rem] p-6 border border-gray-800 flex flex-col items-center text-center overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-xl">
                                    
                                  
                                    <div className={`absolute top-0 right-0 px-5 py-2 rounded-bl-3xl bg-gradient-to-r ${getRankStyle(index)}`}>
                                        <p className="text-white font-black text-sm flex items-center gap-1 shadow-sm">
                                            {index < 3 && <FaTrophy className="text-xs" />} 
                                            #{index + 1}
                                        </p>
                                    </div>

                         
                                    <div className="relative mb-5 mt-4">
                                       
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getRankStyle(index)} blur-md opacity-40 group-hover:opacity-80 transition duration-500`}></div>
                                        
                                        <div className="relative w-24 h-24 p-[3px] rounded-full bg-gradient-to-r from-gray-700 to-black overflow-hidden">
                                            <img 
                                                src={worker.image} 
                                                alt={worker.name} 
                                                referrerPolicy="no-referrer"
                                                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            />
                                        </div>
                                    </div>

                 
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 truncate w-full tracking-wide">
                                        {worker.name}
                                    </h3>
                                    
                       
                                    <div className="mt-auto px-4 py-2 rounded-full bg-[#1d232a] border border-gray-700 flex items-center gap-2 shadow-inner group-hover:border-cyan-500/30 transition-colors">
                                        <div className="p-1 bg-yellow-500/10 rounded-full">
                                            <FaCoins className="text-yellow-400 text-sm animate-pulse" />
                                        </div>
                                        <span className="text-gray-300 font-bold text-md">
                                            {worker.coin} <span className="text-[10px] text-gray-500 font-normal uppercase">Coins</span>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="col-span-full text-gray-500 italic text-center text-lg">System scanning... No workers found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TopWorkers;
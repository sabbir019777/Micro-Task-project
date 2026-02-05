import { FaUserPlus, FaTasks, FaWallet, FaShieldAlt, FaRocket, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
    const steps = [
        { id: 1, title: "Create Identity", desc: "Initialize your secure digital profile and claim your starter coin rewards.", icon: <FaUserPlus /> },
        { id: 2, title: "Scan Missions", desc: "Navigate the global grid to find thousands of tasks matching your skill matrix.", icon: <FaGlobe /> },
        { id: 3, title: "Execute Protocol", desc: "Complete selected micro-tasks with precision and submit neural proof.", icon: <FaTasks /> },
        { id: 4, title: "Secure Validation", desc: "Platform AI and Buyers verify your submissions for 100% accuracy.", icon: <FaShieldAlt /> },
        { id: 5, title: "Instant Credits", desc: "Get paid in crypto-valued coins immediately upon mission approval.", icon: <FaRocket /> },
        { id: 6, title: "Asset Transfer", desc: "Withdraw your digital fortune directly to your personal secure wallet.", icon: <FaWallet /> }
    ];


    const cardSlideVariants = {
        animate: (i) => ({
        
            opacity: [0, 1, 1, 1, 1, 0], 
            x: [-150, 0, 0, 0, 0, 150], 
            scale: [0.7, 1, 1, 1, 1, 0.7],
            transition: {
                duration: 12, 
                repeat: Infinity, 
                delay: i * 3.5,
                ease: "easeInOut",
            }
        })
    };

    return (
        <section className="py-32 bg-[#1d232a] text-white overflow-hidden relative font-sans uppercase">
   
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
       
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter italic leading-none">
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            WORKFLOW
                        </span>
                    </h2>
                    <div className="flex items-center justify-center gap-6">
                        <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
                        <p className="text-xs md:text-sm font-bold tracking-[0.6em] text-cyan-400">OPERATIONAL PROTOCOL v2.0</p>
                        <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-purple-500 shadow-[0_0_10px_#a855f7]"></span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={step.id} 
                            custom={index}
                            variants={cardSlideVariants}
                            animate="animate"
                            className="relative group pt-6 pl-6"
                        >
              
                            <div className="absolute inset-0 translate-x-5 translate-y-5 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] -z-10 transition-all duration-700"></div>
                            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-purple-600/10 border border-purple-500/20 rounded-[2.5rem] -z-10 transition-all duration-700"></div>

       
                            <div className="relative p-10 bg-[#1e293b]/90 backdrop-blur-3xl border-2 border-white/5 rounded-[2.5rem] group-hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden">
                                
               
                                <div className="absolute top-8 right-10 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_#22d3ee]"></div>

         
                                <div className="text-6xl text-white mb-10 flex justify-center group-hover:scale-110 transition-transform duration-500">
                                    <span className="filter drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] group-hover:text-cyan-400 transition-colors">
                                        {step.icon}
                                    </span>
                                </div>
                                
                          
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-[2px] w-12 bg-blue-500 group-hover:w-20 transition-all duration-500 shadow-[0_0_10px_#3b82f6]"></div>
                                    <span className="text-[11px] font-black tracking-[0.5em] text-cyan-400">MODULE 0{step.id}</span>
                                </div>
                                
                       
                                <h3 className="text-2xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-400 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-500">
                                    {step.title}
                                </h3>
                                
                   
                                <p className="leading-relaxed text-sm normal-case font-semibold bg-clip-text text-transparent bg-gradient-to-br from-gray-300 to-gray-500 group-hover:from-blue-200 group-hover:to-cyan-100 transition-all">
                                    {step.desc}
                                </p>

                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_15px_#22d3ee]"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
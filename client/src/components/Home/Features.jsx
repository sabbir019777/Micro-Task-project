import React from "react";
import { 
    FaShieldAlt, FaBolt, FaHeadset, FaCoins, 
    FaUserShield, FaRocket, FaGlobe, FaChartLine 
} from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
    const featureData = [
        { 
            id: 1, 
            icon: <FaShieldAlt />, 
            title: "Secure Payments", 
            desc: "Experience military-grade 100% encryption for every transaction node, ensuring your financial assets remain protected within our decentralized ledger system.", 
            color: "from-green-400 to-cyan-500", 
            shadow: "shadow-green-500/20" 
        },
        { 
            id: 2, 
            icon: <FaBolt />, 
            title: "Rapid Tasks", 
            desc: "Eliminate waiting times with our ultra-fast task validation protocols that trigger instant coin credit to your account upon successful submission.", 
            color: "from-yellow-400 to-orange-500", 
            shadow: "shadow-yellow-500/20" 
        },
        { 
            id: 3, 
            icon: <FaHeadset />, 
            title: "Expert Support", 
            desc: "Access our elite human-led technical assistance team available round-the-clock to resolve any complex issues or inquiries regarding your digital journey.", 
            color: "from-blue-400 to-purple-500", 
            shadow: "shadow-blue-500/20" 
        },
        { 
            id: 4, 
            icon: <FaCoins />, 
            title: "Bonus System", 
            desc: "Maximize your revenue stream with advanced daily multipliers and exclusive loyalty rewards designed to boost your earnings as you complete more tasks.", 
            color: "from-pink-400 to-red-500", 
            shadow: "shadow-red-500/20" 
        },
        { 
            id: 5, 
            icon: <FaUserShield />, 
            title: "Verified Identitys", 
            desc: "Maintain a high-trust environment with our advanced multi-layer verification system that safeguards buyer and worker profiles from unauthorized access.", 
            color: "from-green-400 to-cyan-500", 
            shadow: "shadow-green-500/20" 
        },
        { 
            id: 6, 
            icon: <FaRocket />, 
            title: "Scalable Growth", 
            desc: "Unlock the potential to scale your workforce or individual earnings seamlessly through our high-bandwidth infrastructure built for global performance.", 
            color: "from-yellow-400 to-orange-500", 
            shadow: "shadow-yellow-500/20" 
        },
        
    ];

    return (
        <section className="py-24 bg-[#1d232a] relative overflow-hidden font-sans uppercase">
           
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
          
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-[10px] tracking-[0.4em] text-cyan-400 font-bold mb-4 inline-block shadow-[0_0_15px_rgba(34,211,238,0.1)]">PROTOCOL ASSETS</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-none mt-4">
                        CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">FEATURES</span>
                    </h2>
                </motion.div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {featureData.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative p-8 md:p-10 bg-[#1e293b]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] group hover:border-cyan-500/40 transition-all duration-500 shadow-2xl ${feature.shadow} flex items-start gap-6 text-left`}
                        >
            
                            <div className={`text-5xl bg-gradient-to-br ${feature.color} bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500 shrink-0 mt-1`}>
                                {feature.icon}
                            </div>

                            <div className="flex-grow">
                            
                                <h4 className={`text-xl font-black mb-3 tracking-widest italic text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                                    {feature.title}
                                </h4>

                                <p className="text-gray-400 normal-case leading-relaxed font-medium text-sm">
                                    {feature.desc}
                                </p>
                            </div>

                    
                            <div className={`absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br ${feature.color} blur-3xl opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
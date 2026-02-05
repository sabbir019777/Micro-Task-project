import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaFingerprint, FaNetworkWired, FaShieldVirus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider"; 

const AboutMeSection = () => { 
    const { user } = useContext(AuthContext); 
    const techImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

    return (
        <section className="relative py-32 bg-[#1d232a] text-white overflow-hidden font-sans uppercase">
        
            <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 transition-all duration-1000" 
                style={{ 
                    backgroundImage: `url(${techImage})`,
                    filter: 'brightness(60%) contrast(110%) saturate(120%)',
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                }}
            ></div>
     
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_transparent_80%)] opacity-50"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
       
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-24 text-center"
                >
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black tracking-[0.6em] text-[10px] mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        NEXT-GEN PROTOCOL
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">
                        <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">UNLOCK</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                            FUTURE
                        </span>
                    </h2>
                    <div className="mt-6 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_#22d3ee]"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
         
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-[3rem] blur-2xl group-hover:opacity-60 transition duration-1000"></div>
                        
                        <div className="relative bg-[#1d232a]/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                            <div className="flex flex-col gap-10">
                                <div className="flex items-center gap-8 group/item">
                                    <FaFingerprint className="text-6xl text-cyan-400 drop-shadow-[0_0_15px_#22d3ee] group-hover/item:scale-110 transition-transform" />
                                    <div>
                                        <h4 className="text-2xl font-black text-white italic tracking-widest">SECURE PROTOCOL</h4>
                                        <p className="text-[10px] text-cyan-400/70 normal-case mt-1 font-bold tracking-widest uppercase">MILITARY-GRADE VALIDATION</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 group/item">
                                    <FaNetworkWired className="text-6xl text-blue-500 drop-shadow-[0_0_15px_#3b82f6] group-hover/item:scale-110 transition-transform" />
                                    <div>
                                        <h4 className="text-2xl font-black text-white italic tracking-widest">GLOBAL NODES</h4>
                                        <p className="text-[10px] text-blue-400/70 normal-case mt-1 font-bold tracking-widest uppercase">DECENTRALIZED WORKFORCE</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 group/item">
                                    <FaShieldVirus className="text-6xl text-purple-500 drop-shadow-[0_0_15px_#a855f7] group-hover/item:scale-110 transition-transform" />
                                    <div>
                                        <h4 className="text-2xl font-black text-white italic tracking-widest">REAL-TIME ASSETS</h4>
                                        <p className="text-[10px] text-purple-400/70 normal-case mt-1 font-bold tracking-widest uppercase">INSTANT LIQUIDITY</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

        
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <span className="bg-cyan-500/5 border border-cyan-500/10 px-5 py-2 rounded-full text-[12px] tracking-[0.5em] text-cyan-400 font-black shadow-[0_0_15px_rgba(34,211,238,0.1)]">MISSION OVERVIEW</span>
                            <p className="text-gray-300 normal-case leading-relaxed font-bold text-lg border-l-4 border-cyan-500/40 pl-6 italic">
                                MicroTasker terminal transforms global demand into structured micro-missions, secured by high-performance protocols.
                            </p>
                            <p className="text-gray-300 normal-case leading-relaxed font-bold text-lg border-l-4 border-purple-500/40 pl-6 italic">
                                Every protocol interaction ensures instant liquidity distribution across our verified worker network.
                            </p>
                        </div>
                        
                        <div className="pt-8">
                        
                            <Link to={user ? "/dashboard" : "/login"}>
                                <button className="relative group overflow-hidden px-14 py-5 bg-transparent border-2 border-cyan-500/30 rounded-2xl text-xs font-black tracking-[0.5em] text-cyan-400 hover:text-[#1d232a] transition-all duration-500 shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:shadow-cyan-400">
                                    <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <span className="relative z-10 flex items-center gap-4 uppercase">
                                        {user ? "ACCESS TERMINAL" : "INITIALIZE SYSTEM"} <FaShieldVirus className="text-xl" />
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>


            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        </section>
    );
};

export default AboutMeSection;
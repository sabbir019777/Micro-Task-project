import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaHandHoldingUsd, FaBriefcase, FaShieldAlt, FaRocket, FaGlobe } from "react-icons/fa";

const images = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", // Coding
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // Team
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Cyber
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Tech
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", // Meeting
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", // Future
];

const AboutUs = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
       
        <section className="py-24 bg-[#1d232a] relative overflow-hidden">
            
            {/* Futuristic Background Grid & Glows */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Text Content (Left Side) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-cyan-400"></span> About Our Mission
                            </h2>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                                EMPOWERING <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 filter drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                                    GLOBAL TALENT
                                </span>
                            </h1>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed border-l-4 border-blue-500/30 pl-6">
                            Micro Tasker isn't just a platform; it's a <span className="text-white font-semibold">digital revolution</span>. We bridge the gap between ambition and opportunity, creating a decentralized ecosystem where every micro-task contributes to a macro vision.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                                { title: "Instant Payouts", icon: FaRocket, desc: "Lightning fast & secure" },
                                { title: "Global Access", icon: FaGlobe, desc: "Work from anywhere" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/40 hover:bg-white/10 transition-all group">
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image Slider (Right Side) - */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Futuristic Frame */}
                     
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#15191e] shadow-2xl">
                        
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500 rounded-tl-2xl z-20"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500 rounded-br-2xl z-20"></div>
                            
                     
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt="Platform Preview"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

               
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1d232a] via-transparent to-transparent opacity-60 z-10"></div>
                            
                            {/* Slider Indicators */}
                            <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                                {images.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "w-2 bg-white/20"}`}
                                    ></div>
                                ))}
                            </div>
                        </div>

               
                        <div className="absolute -bottom-6 -right-6 bg-[#15191e]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl hidden md:block animate-bounce delay-700">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-white font-mono text-xs">System Online</span>
                            </div>
                        </div>
                    </motion.div>
                </div>


                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { icon: FaUsers, count: "15K+", label: "Active Workers", color: "text-blue-400" },
                        { icon: FaBriefcase, count: "85K+", label: "Tasks Done", color: "text-cyan-400" },
                        { icon: FaHandHoldingUsd, count: "$1.2M", label: "Paid Out", color: "text-green-400" },
                        { icon: FaShieldAlt, count: "100%", label: "Secure", color: "text-purple-400" }
                    ].map((stat, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
        
                            <div className="relative bg-[#15191e]/60 backdrop-blur-sm p-8 rounded-2xl border border-white/5 text-center hover:-translate-y-2 transition-transform duration-300">
                                <div className={`text-4xl mb-4 flex justify-center ${stat.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                                    <stat.icon />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-1">{stat.count}</h3>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default AboutUs;
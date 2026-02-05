import { motion } from "framer-motion";

const Stats = () => {
    const statData = [
        { label: "Registered Users", value: "50,000+" },
        { label: "Completed Tasks", value: "1.2 Million" },
        { label: "Paid to Workers", value: "$500,000+" },
        { label: "Active Missions", value: "2,500+" },
        { label: "Support Cases", value: "10,000+" },
        { label: "Country Reach", value: "120+" }
    ];

    const containerVariants = {
        animate: { transition: { staggerChildren: 0.1 } },
    };

    const letterVariants = {
        initial: { opacity: 0, scale: 0.5 },
        animate: {
            opacity: [0, 1, 1, 0.8, 1, 0], 
            scale: [0.9, 1, 1, 1, 1, 0.9],
            transition: {
                duration: 5, 
                repeat: Infinity, 
                repeatDelay: 1,
                ease: "easeInOut",
            },
        },
    };

    return (
        <section className="py-24 bg-[#1d232a] relative overflow-hidden">
     
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Futuristic Title */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white">
                        Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                            Performance
                        </span> Grid
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 shadow-[0_0_20px_#3b82f6]"></div>
                </motion.div>

                {/* Stat Cards with Permanent Glow */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {statData.map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                  
                            className="group relative p-10 rounded-[2.5rem] bg-[#1e293b]/80 border-2 border-blue-500/40 text-center backdrop-blur-md transition-all duration-300 
                                     shadow-[0_0_25px_rgba(59,130,246,0.2),inset_0_0_15px_rgba(59,130,246,0.1)]
                                     hover:border-cyan-400 hover:shadow-[0_0_45px_rgba(34,211,238,0.4)]"
                        >
                            {/* Neon Indicator Dot - Always Glowing */}
                            <div className="absolute top-6 right-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_15px_#3b82f6,0_0_30px_#3b82f6]"></div>

                            <motion.h2 
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                                className="text-3xl md:text-5xl font-black mb-4 tracking-tighter flex justify-center flex-wrap"
                            >
                                {stat.value.split("").map((char, i) => (
                                    <motion.span 
                                        key={i} 
                                        variants={letterVariants}
                                        className="text-white drop-shadow-[0_0_12px_rgba(59,130,246,1)]"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.h2>

                            {/* Label with Cyan Glow */}
                            <motion.p 
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                                className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs flex justify-center flex-wrap drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                            >
                                <span className="inline-block w-4 h-[1px] bg-blue-400 mr-2 self-center shadow-[0_0_8px_#3b82f6]"></span>
                                {stat.label.split("").map((char, i) => (
                                    <motion.span key={i} variants={letterVariants}>
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                                <span className="inline-block w-4 h-[1px] bg-blue-400 ml-2 self-center shadow-[0_0_8px_#3b82f6]"></span>
                            </motion.p>

                            {/* Bottom Neon Accent */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-300 to-purple-600 rounded-full shadow-[0_0_20px_#06b6d4] group-hover:w-3/4 transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
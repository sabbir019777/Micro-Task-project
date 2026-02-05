import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTerminal, FaYoutube, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import { motion } from "framer-motion";

const Footer = () => {

    const socialLinks = [
        { icon: <FaLinkedin />, link: "https://www.linkedin.com", color: "hover:text-blue-500 shadow-blue-500/20" },
        { icon: <FaFacebook />, link: "https://facebook.com", color: "hover:text-cyan-500 shadow-cyan-500/20" },
        { icon: <FaGithub />, link: "https://github.com/sabbir019777", color: "hover:text-white shadow-white/20" },
        { icon: <FaXTwitter />, link: "https://x.com", color: "hover:text-gray-200 shadow-white/10" }, // X কার্যকরী লিঙ্ক
        { icon: <FaDiscord />, link: "https://discord.gg", color: "hover:text-indigo-400 shadow-indigo-500/20" },
        { icon: <FaYoutube />, link: "https://www.youtube.com", color: "hover:text-red-500 shadow-red-500/20" }
    ];

    return (
        <footer className="relative bg-[#1d232a] pt-24 pb-12 overflow-hidden font-sans uppercase">
         
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:45px_45px] opacity-20"></div>
            
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_#22d3ee]"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    
                    <div className="space-y-8 col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <FaTerminal className="text-cyan-400 text-3xl animate-pulse shadow-[0_0_15px_#22d3ee]" />
                            <h2 className="text-3xl font-black tracking-tighter italic text-white">
                                MICRO<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">TASKER</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 normal-case text-sm leading-relaxed font-medium">
                            The next-gen decentralized terminal for micro-missions. Earn verified protocol assets by executing digital tasks across the global node networks.
                        </p>
                    </div>

                    <div className="lg:pl-8">
                        <h3 className="text-cyan-400 font-black tracking-[0.3em] text-xs mb-8 border-l-2 border-cyan-500 pl-4">SYSTEM NAV</h3>
                        <ul className="space-y-4 text-gray-300 text-xs font-bold">
                            {['Control Center', 'Task Terminal', 'Leaderboard', 'Asset Wallet'].map((link) => (
                                <li key={link} className="hover:text-cyan-400 transition-all cursor-pointer flex items-center gap-3 group">
                                    <span className="h-[2px] w-0 bg-cyan-400 group-hover:w-5 transition-all duration-300 shadow-[0_0_8px_#22d3ee]"></span>
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:pl-8">
                        <h3 className="text-blue-400 font-black tracking-[0.3em] text-xs mb-8 border-l-2 border-blue-500 pl-4">SUPPORT NODES</h3>
                        <ul className="space-y-4 text-gray-300 text-xs font-bold">
                            {['Protocol Documentation', 'Security Audit', 'Bug Bounty', 'Contact Admin'].map((link) => (
                                <li key={link} className="hover:text-blue-400 transition-all cursor-pointer flex items-center gap-3 group">
                                    <span className="h-[2px] w-0 bg-blue-400 group-hover:w-5 transition-all duration-300 shadow-[0_0_8px_#3b82f6]"></span>
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:pl-8">
                        <h3 className="text-purple-400 font-black tracking-[0.3em] text-xs mb-8 border-l-2 border-purple-500 pl-4">EXTERNAL DATA</h3>
                        <div className="grid grid-cols-3 gap-6">
                            {socialLinks.map((social, i) => (
                                <a 
                                    key={i}
                                    href={social.link} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-2xl text-gray-500 ${social.color} transition-all duration-500 hover:-translate-y-2 flex justify-center items-center h-12 w-12 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 shadow-xl`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-[10px] tracking-[0.4em] text-gray-600 font-black">
                            © 2026 MICROTASKER // ENCRYPTED WORKFORCE PROTOCOL
                        </p>
                        <p className="text-[8px] text-gray-700 tracking-[0.2em] font-bold normal-case">
                            Designed for high-performance micro-economies.
                        </p>
                    </div>
                    
                    <div className="flex gap-10">
                        <div className="flex items-center gap-3 group bg-black/20 px-4 py-2 rounded-full border border-white/5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_#22c55e]"></span>
                            <span className="text-[10px] text-gray-400 font-black tracking-widest">SERVER: OPERATIONAL</span>
                        </div>
                        <div className="flex items-center gap-3 group bg-black/20 px-4 py-2 rounded-full border border-white/5">
                            <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_12px_#3b82f6]"></span>
                            <span className="text-[10px] text-gray-400 font-black tracking-widest">LATENCY: 14MS</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        </footer>
    );
};

export default Footer;
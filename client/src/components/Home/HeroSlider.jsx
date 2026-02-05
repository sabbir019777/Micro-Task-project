import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider"; 

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  const { user } = useContext(AuthContext); 

  const handleScrollToBestWorkers = () => {
    const section = document.getElementById("best-workers");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const slides = [
    {
      title: "DECENTRALIZED EARNING REVOLUTION",
      desc: "Connect with global opportunities and earn crypto-valued coins instantly.",
      bg: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000",
    },
    {
      title: "NEURAL NETWORK SKILLED WORKERS",
      desc: "Deploy your tasks to a smart workforce powered by efficiency and trust.",
      bg: "https://images.unsplash.com/photo-1550741821-3e595e892674?q=80&w=2000",
    },
    {
      title: "QUANTUM SPEED PAYOUT SYSTEM",
      desc: "Experience the fastest withdrawal process in the micro-earning industry.",
      bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
    },
    {
      title: "AI POWERED TASK VERIFICATION",
      desc: "Ensuring 100% accuracy and fairness for both buyers and workers.",
      bg: "https://cdn.prod.website-files.com/65aa88196fa61dfde861d520/65afb3793414fdde3ffccd46_The%20Mechanics%20of%20AI%20in%20Identity%20Verification.png",
    },
    {
      title: "GLOBAL DIGITAL WORKSPACE 2.0",
      desc: "Work from anywhere, anytime, and build your digital fortune.",
      bg: "https://png.pngtree.com/thumb_back/fh260/background/20250121/pngtree-high-tech-workspace-with-digital-globe-and-advanced-monitoring-image_16892817.jpg",
    },
    {
      title: "FUTURISTIC EARNING ECOSYSTEM",
      desc: "A seamless flow of tasks and rewards designed for the next generation.",
      bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000",
    },
    {
      title: "GATEWAY TO FINANCIAL FREEDOM",
      desc: "Start your journey today on the world's most advanced micro-task platform.",
      bg: "https://img.freepik.com/premium-photo/person-holding-golden-key-unlocking-door-financial-freedom_1296644-42180.jpg",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="h-[600px] md:h-[850px] w-full bg-[#1d232a] relative overflow-hidden font-sans uppercase">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        effect="fade"
        parallax={true}
        navigation={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full flex items-center justify-start overflow-hidden">
              
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `linear-gradient(to right, rgba(29, 35, 42, 0.95) 30%, rgba(29, 35, 42, 0.4) 60%, rgba(29, 35, 42, 0.2)), url(${slide.bg})`,
                }}
                data-swiper-parallax="20%"
              ></div>
              
              <div className="absolute left-6 h-1/2 w-[1px] bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 hidden md:block"></div>

              <div className="relative z-10 px-8 md:px-24 max-w-6xl">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <motion.div variants={wordVariants} className="inline-flex items-center gap-3 mb-8">
                    <span className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                    <span className="text-xs font-bold tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      MISSION PROTOCOL v2.0
                    </span>
                  </motion.div>

                  {/* Multi-color Title Design */}
                  <h1 className="text-4xl md:text-8xl font-black mb-10 leading-none tracking-tighter flex flex-wrap gap-x-4">
                    {slide.title.split(" ").map((word, i) => (
                      <motion.span 
                        key={i} 
                        variants={wordVariants}
                        className={i % 2 !== 0 
                          ? "text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-cyan-400" 
                          : "text-transparent stroke-text"}
                        style={{
                          WebkitTextStroke: i % 2 === 0 ? "1.5px" : "none",
                          WebkitTextStrokeColor: i === 0 ? "#3b82f6" : (i === 2 ? "#06b6d4" : "#a855f7")
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>

                  <motion.p 
                    variants={wordVariants}
                    className="text-sm md:text-lg text-gray-400 mb-14 max-w-xl normal-case tracking-wide leading-relaxed border-l-2 border-gradient pl-6"
                    style={{ borderImage: "linear-gradient(to bottom, #3b82f6, #06b6d4) 1" }}
                  >
                    {slide.desc}
                  </motion.p>

     
                  <motion.div variants={wordVariants} className="flex flex-row items-center gap-10">
                    
           
                    <Link 
                        to={user ? "/dashboard" : "/login"}
                        className="relative group px-14 py-5 overflow-hidden rounded-sm font-black text-sm tracking-[0.2em] transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    >
                        {/* Animated Gradient Background */}
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 group-hover:animate-gradient-x transition-all"></span>
                        
                
                        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></span>
                        
                        <span className="relative z-10 text-white flex items-center gap-2">
                           {user ? "GO TO DASHBOARD" : "INITIATE MISSION"} <span className="text-xl">→</span>
                        </span>

                        {/* Button Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50"></div>
                    </Link>

                    {/* Secondary Button: EXPLORE GRID */}
                    <button 
                        onClick={handleScrollToBestWorkers}
                        className="group text-white font-bold text-xs tracking-[0.3em] hover:text-cyan-400 transition-colors flex items-center gap-3"
                    >
                        <span className="h-[1px] w-10 bg-gradient-to-r from-blue-500 to-transparent transition-all group-hover:w-16"></span>
                        EXPLORE GRID
                    </button>

                  </motion.div>
                </motion.div>
              </div>

              <div className="absolute top-1/4 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-[80px] animate-pulse"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .stroke-text { color: transparent; }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .swiper-pagination-bullet { background: #fff !important; width: 30px; height: 3px; border-radius: 0 !important; opacity: 0.1; transition: 0.4s; }
        .swiper-pagination-bullet-active { background: linear-gradient(to right, #3b82f6, #06b6d4) !important; width: 60px; opacity: 1; }
      `}</style>
    </div>
  );
};

export default HeroSlider;
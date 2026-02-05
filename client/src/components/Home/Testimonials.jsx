import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import { motion } from "framer-motion";
import "swiper/css";

const Testimonials = () => {
  const reviews = [
    { id: 1, name: "Tamim Iqbal", quote: "As a buyer, I found the most reliable workers here. My data entry tasks were completed with 100% accuracy." },
    { id: 2, name: "Rakib Ahmed", quote: "The interface is very user-friendly. I love how easy it is to track my earnings and submitted tasks daily." },
    { id: 3, name: "Tania Sultana", quote: "Best platform for beginners. I received my 10 coins bonus instantly after registration and started working!" },
    { id: 4, name: "Ariful Islam", quote: "MicroTasker has completely changed how I earn online. The withdrawal process is incredibly fast." },
    { id: 5, name: "Jannat Akter", quote: "The task validation system is very fair. I never had any issues with my payments." },
    { id: 6, name: "Mehedi Hasan", quote: "Great support team and active community. Highly recommended for micro-tasking." },
    { id: 7, name: "Sumaiya Khan", quote: "The dashboard is very intuitive. Finding tasks that match my skill is very easy." },
    { id: 8, name: "Tanvir Ahmed", quote: "Reliable platform for both buyers and workers. The coin system is very transparent." }
  ];

  const photoColumns = [
    { id: 1, images: ["https://i.pinimg.com/474x/b9/81/75/b98175e0e16a8ba5201019ac4c4dc4e1.jpg", "https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww"], y: "mt-86" },
    { id: 1, images: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2"], y: "mt-36" },
    { id: 2, images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYUGw5VPpLVJTW0Js9zJYfS_rBtp5QvQF4w&s", "https://images.pexels.com/photos/10260775/pexels-photo-10260775.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"], y: "mt-4" },
    { id: 3, images: ["https://i.ibb.co/MxjfYN5v/linkdin-profile-jpg.png"], y: "-mt-54" }, 
    { id: 4, images: ["https://i.pravatar.cc/150?u=6", "https://i.pravatar.cc/150?u=7"], y: "mt-4" },
    { id: 5, images: ["https://img.freepik.com/free-photo/young-woman-blue-sweater-autumn-park_1303-11368.jpg?semt=ais_hybrid&w=740&q=80", "https://i.pinimg.com/736x/bf/91/a5/bf91a589e32a475fef8fd6cf831ac699.jpg"], y: "mt-36" },
    { id: 5, images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTwC_Y9QnCZRNqsrw1F94Wfbrg4bekp8wO4A&s", "https://img.freepik.com/free-photo/portrait-attractive-young-man-straightening-his-jacket_171337-19813.jpg?semt=ais_hybrid&w=740&q=80"], y: "mt-86" },
    
 
  ];

  return (
    <section className="py-24 bg-[#1d232a] relative overflow-hidden font-sans uppercase">

      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-none">
                TRUSTED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">LEADERS</span>
            </h2>
        </div>


        <div className="flex justify-center items-center gap-4 md:gap-8 mb-24 min-h-[400px]">
          {photoColumns.map((column, colIndex) => (
            <div key={column.id} className={`flex flex-col gap-6 ${column.y}`}>
              {column.images.map((imgSrc, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4 + colIndex, repeat: Infinity, ease: "easeInOut" }}
                  className={`${column.images.length === 1 ? 'w-28 h-28 md:w-40 md:h-40 shadow-[0_0_25px_rgba(34,211,238,0.15)]' : 'w-20 h-20 md:w-28 md:h-28'} 
                  rounded-[2rem] overflow-hidden border-2 border-white/10 relative group shadow-2xl`}
                >
                  <img src={imgSrc} alt="User" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true} 
          breakpoints={{ 
            768: { slidesPerView: 2 }, 
            1024: { slidesPerView: 3 } 
          }}
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false 
          }}
          className="pb-10 testimonial-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="relative p-10 bg-[#1e293b]/70 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex flex-col items-center text-center group transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_45px_rgba(34,211,238,0.25)] hover:border-cyan-500/40 min-h-[380px] justify-center overflow-hidden">
                

                <p className="mb-10 leading-relaxed text-sm md:text-base normal-case font-bold italic text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-cyan-400">
                  "{review.quote}"
                </p>


                <h4 className="text-xl font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors italic">
                  {review.name}
                </h4>
                <div className="flex text-cyan-400 mt-4 drop-shadow-[0_0_10px_#22d3ee] text-xs gap-1">
                  {[...Array(5)].map((_, i) => <span key={i} className="animate-pulse">★</span>)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .testimonial-swiper .swiper-pagination { display: none !important; }
      `}</style>
    </section>
  );
};

export default Testimonials;
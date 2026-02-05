import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
 
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  
  const faqData = [
    {
      question: "How can I start earning money?",
      answer:
        "It's simple! Sign up as a 'Worker'. Go to your dashboard and complete small tasks like watching videos, liking posts, or sharing content to earn coins instantly.",
    },
    {
      question: "What is the minimum withdrawal amount?",
      answer:
        "You can withdraw your earnings once you reach just 200 coins (equivalent to $2). We support various local payment methods including Bkash, Nagad, and Rocket.",
    },
    {
      question: "How do I post a job as a Buyer?",
      answer:
        "First, you need to purchase coins. Then go to 'Add New Task', describe your requirements, set the proof you need, and publish it. Workers will start submitting proofs immediately.",
    },
    {
      question: "How long does the payment process take?",
      answer:
        "We usually process payments within 24 hours. However, depending on the server load or payment gateway, it might take up to 48 hours in rare cases.",
    },
    {
      question: "Can I manage both Worker and Buyer roles?",
      answer:
        "Each account has a specific role. However, you can switch your role from the dashboard settings or create a separate account with a different email for a different role.",
    },
  ];

  return (
    <div className="py-20 bg-[#1d232a] relative overflow-hidden">
   
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
  
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-[#3b82f6]">Questions</span>
          </h2>
          <p className="text-gray-400">
            Got questions? We've got answers. Everything you need to know.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`group border transition-all duration-300 rounded-xl overflow-hidden ${
                openIndex === index
                  ? "border-[#3b82f6] bg-[#15191e] shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  : "border-gray-700 bg-[#1d232a] hover:border-gray-500"
              }`}
            >
 
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span
                  className={`text-lg md:text-xl font-semibold transition-colors ${
                    openIndex === index ? "text-[#3b82f6]" : "text-gray-200"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`p-2 rounded-full transition-all duration-300 ${
                    openIndex === index
                      ? "bg-[#3b82f6] text-white rotate-180"
                      : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
                  }`}
                >

                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-700/50 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
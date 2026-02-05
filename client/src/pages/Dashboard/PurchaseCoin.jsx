import { useNavigate } from "react-router-dom";
import { 
    FaCoins, FaShoppingCart, FaBolt, FaRocket, FaGem, FaCrown, 
    FaStar, FaFire, FaGift, FaShieldAlt, FaTrophy, FaHeart, FaAtom 
} from "react-icons/fa";

const PurchaseCoin = () => {
    const navigate = useNavigate();


    const themes = [
        { color: "text-blue-400", bgGlow: "bg-blue-500/20", border: "group-hover:border-blue-500", btnColor: "bg-blue-600 hover:bg-blue-700" },
        { color: "text-green-400", bgGlow: "bg-green-500/20", border: "group-hover:border-green-500", btnColor: "bg-green-600 hover:bg-green-700" },
        { color: "text-purple-400", bgGlow: "bg-purple-500/20", border: "group-hover:border-purple-500", btnColor: "bg-purple-600 hover:bg-purple-700" },
        { color: "text-yellow-400", bgGlow: "bg-yellow-500/20", border: "group-hover:border-yellow-500", btnColor: "bg-yellow-600 hover:bg-yellow-700" },
        { color: "text-pink-400", bgGlow: "bg-pink-500/20", border: "group-hover:border-pink-500", btnColor: "bg-pink-600 hover:bg-pink-700" },
        { color: "text-cyan-400", bgGlow: "bg-cyan-500/20", border: "group-hover:border-cyan-500", btnColor: "bg-cyan-600 hover:bg-cyan-700" },
        { color: "text-orange-400", bgGlow: "bg-orange-500/20", border: "group-hover:border-orange-500", btnColor: "bg-orange-600 hover:bg-orange-700" },
        { color: "text-red-400", bgGlow: "bg-red-500/20", border: "group-hover:border-red-500", btnColor: "bg-red-600 hover:bg-red-700" },
    ];

    const icons = [
        <FaBolt />, <FaRocket />, <FaGem />, <FaCrown />, 
        <FaStar />, <FaFire />, <FaGift />, <FaShieldAlt />, 
        <FaTrophy />, <FaHeart />, <FaAtom />, <FaCoins />
    ];

 
    const coinsData = Array.from({ length: 52 }, (_, i) => {
        const theme = themes[i % themes.length]; 
        const icon = icons[i % icons.length];  
        
        
        let coins = (i + 1) * 10; 
        if (i > 10) coins = (i + 1) * 50;
        if (i > 30) coins = (i + 1) * 100;


        const price = Math.ceil(coins / 20); 

        return {
            id: i,
            coins: coins,
            price: price,
            label: `Tier ${i + 1} Pack`,
            icon: icon,
            ...theme 
        };
    });

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#1d232a]">

            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter flex justify-center items-center gap-3">
                    <FaShoppingCart className="text-blue-500" />
                    PURCHASE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">COINS</span>
                </h2>
                <p className="text-gray-500 mt-3 text-sm font-bold uppercase tracking-widest">
                    Choose from {coinsData.length} Exclusive Packages
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-4 rounded-full"></div>
            </div>

    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {coinsData.map((data) => (
                    <div 
                        key={data.id} 
                        onClick={() => navigate(`/dashboard/payment/${data.price}/${data.coins}`)}
                        className={`relative group bg-[#15191e] border border-white/10 rounded-[2rem] p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${data.border}`}
                    >
                       
                        <div className={`absolute top-0 right-0 w-24 h-24 ${data.bgGlow} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                        <div className={`inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest mb-6 ${data.color}`}>
                            {data.label}
                        </div>

                
                        <div className={`w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4 border border-white/5 group-hover:scale-110 transition-transform duration-300 ${data.color} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                            {data.icon}
                        </div>

                        <h3 className="text-2xl font-black text-white mb-1 flex justify-center items-center gap-2">
                            {data.coins} <span className="text-sm font-bold text-gray-500">Coins</span>
                        </h3>

             
                        <p className="text-gray-400 font-mono text-sm mb-6">
                            Price: <span className={`text-xl font-bold ${data.color}`}>${data.price}</span>
                        </p>

           
                        <button className={`btn w-full border-none text-white font-bold uppercase tracking-widest rounded-xl shadow-lg ${data.btnColor}`}>
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseCoin;
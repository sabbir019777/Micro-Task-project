import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaCoins, FaMoneyBillWave, FaUniversity } from "react-icons/fa";

const Withdraw = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [withdrawCoin, setWithdrawCoin] = useState(0);


    const { data: userData = {}, refetch } = useQuery({
        queryKey: ['user-coin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    const currentCoins = userData.coin || 0;
    const withdrawAmount = withdrawCoin / 20; 

    const handleWithdraw = async (e) => {
        e.preventDefault();

        const coinToWithdraw = parseInt(withdrawCoin);

        if (coinToWithdraw < 200) {
            return Swal.fire("Error", "Minimum withdraw limit is 200 coins!", "error");
        }
        if (coinToWithdraw > currentCoins) {
            return Swal.fire("Error", "Insufficient coin balance!", "error");
        }

        const withdrawData = {
            worker_email: user?.email,
            worker_name: user?.displayName,
            withdrawal_coin: coinToWithdraw,
            withdrawal_amount: withdrawAmount,
            payment_system: e.target.payment_system.value,
            account_number: e.target.account_number.value,
            withdraw_date: new Date(),
            status: "pending"
        };

        try {
            const res = await axiosSecure.post("/withdrawals", withdrawData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Withdraw request sent successfully",
                    icon: "success",
                    background: "#15191e",
                    color: "#fff"
                });
                e.target.reset();
                setWithdrawCoin(0);
                refetch(); 
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };

    return (
        <div className="p-4 md:p-8 min-h-screen text-white">
            
    
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-black italic tracking-tighter">
                    WITHDRAW <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">EARNINGS</span>
                </h2>
                <p className="text-gray-500 mt-2 font-bold uppercase text-sm">Transfer coins to real money</p>
            </div>

  
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                
              
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-[#15191e] border border-white/10 p-6 rounded-3xl shadow-xl text-center">
                        <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center text-3xl text-yellow-400 mb-4 border border-yellow-500/20">
                            <FaCoins />
                        </div>
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Current Balance</h3>
                        <p className="text-4xl font-black text-white">{currentCoins}</p>
                        <p className="text-xs text-gray-500 mt-2">Maximum withdrawal limit</p>
                    </div>

                    <div className="bg-[#15191e] border border-white/10 p-6 rounded-3xl shadow-xl text-center">
                        <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center text-3xl text-green-400 mb-4 border border-green-500/20">
                            <FaMoneyBillWave />
                        </div>
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Exchange Rate</h3>
                        <p className="text-2xl font-black text-white">20 Coins = $1</p>
                    </div>
                </div>

           
                <div className="md:col-span-2 bg-[#15191e] border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleWithdraw} className="space-y-6">
                        
                  
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Coin To Withdraw</span>
                            </label>
                            <input 
                                type="number" 
                                name="withdraw_coin"
                                onChange={(e) => setWithdrawCoin(e.target.value)}
                                placeholder="Min 200 Coins"
                                className="input bg-[#1a202c] border border-white/20 text-white focus:border-orange-500 w-full rounded-xl"
                                required 
                                max={currentCoins} 
                            />
                            {withdrawCoin > currentCoins && <span className="text-red-500 text-xs mt-1">Insufficient balance</span>}
                        </div>

                  
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Withdraw Amount ($)</span>
                            </label>
                            <input 
                                type="text" 
                                value={`$ ${withdrawAmount.toFixed(2)}`} 
                                readOnly 
                                className="input bg-[#1a202c] border border-white/20 text-green-400 font-bold text-xl w-full rounded-xl"
                            />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Select Payment System</span>
                            </label>
                            <select name="payment_system" className="select bg-[#1a202c] border border-white/20 text-white w-full rounded-xl" required>
                                <option disabled selected>Select Method</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Rocket">Rocket</option>
                            </select>
                        </div>

                     
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Account Number</span>
                            </label>
                            <div className="relative">
                                <FaUniversity className="absolute left-4 top-4 text-gray-500" />
                                <input 
                                    type="text" 
                                    name="account_number"
                                    placeholder="017xxxxxxxx"
                                    className="input bg-[#1a202c] border border-white/20 text-white pl-10 w-full rounded-xl"
                                    required 
                                />
                            </div>
                        </div>

                   
                        <button 
                            type="submit" 
                            className="btn w-full bg-gradient-to-r from-orange-900 to-red-600 border-none text-white font-bold rounded-xl shadow-lg hover:shadow-green-600 h-12 mt-4 disabled:bg-gray-700 disabled:text-gray-400"
                            disabled={withdrawCoin < 200 || withdrawCoin > currentCoins}
                        >
                            {withdrawCoin < 200 ? "Enter at least 200 coins" : "Withdraw Now"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
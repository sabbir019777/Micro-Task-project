import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userData] = useUserRole();

    return (
    
        <div className="flex justify-center items-center min-h-[80vh] bg-[#1d232a] px-4">
            

            <div className="bg-[#15191e] p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-700">
                
   
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <img 
                        src={user?.photoURL || "https://i.ibb.co/5h1f1xX/default-avatar.png"} 
                        alt="Profile" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full rounded-full object-cover border-4 border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
           
                    <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-[#15191e]"></div>
                </div>
                
            
                <h2 className="text-3xl font-extrabold text-white mb-2">{user?.displayName}</h2>
                <p className="text-gray-400 font-medium mb-6">{user?.email}</p>


                <div className="grid grid-cols-2 gap-4 mb-8">

                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl">
                        <p className="text-sm text-blue-400 font-bold uppercase tracking-wider">Role</p>
                        <p className="text-xl font-black text-white capitalize">{userData?.role || 'User'}</p>
                    </div>
                    
   
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl">
                        <p className="text-sm text-yellow-400 font-bold uppercase tracking-wider">Coins</p>
                        <p className="text-xl font-black text-white">🪙 {userData?.coin || 0}</p>
                    </div>
                </div>

       
                <Link 
                    to="/dashboard/update-profile" 
                    className="block w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                    Update Profile
                </Link>
            </div>
        </div>
    );
};

export default Profile;
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProfile = () => {
    const { user, updateUserProfile, setUser } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || ""); 
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        
        
        updateUserProfile(name, photo)
            .then(() => {
     
                
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated!',
                    text: 'Your profile details have been updated.',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1d232a',
                    color: '#fff'
                });
                navigate("/dashboard/profile");
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    background: '#1d232a',
                    color: '#fff'
                });
            });
    };

    return (

        <div className="flex justify-center items-center min-h-[80vh] bg-[#1d232a] px-4">
            
 
            <div className="bg-[#15191e] p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-700">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Update Profile</h2>
                
            
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-[#3b82f6] p-1 shadow-lg overflow-hidden">
                        <img 
                            src={photo || "https://i.ibb.co/5h1f1xX/default-avatar.png"} 
                            alt="Preview" 
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => e.target.src = "https://i.ibb.co/5h1f1xX/default-avatar.png"} // ভুল লিংক দিলে ডিফল্ট ইমেজ দেখাবে
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Preview</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-5">
                    
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Full Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-xl bg-[#1d232a] border border-gray-600 text-white focus:border-[#3b82f6] focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

          
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Photo URL</label>
                        <input 
                            type="text" 
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 rounded-xl bg-[#1d232a] border border-gray-600 text-white focus:border-[#3b82f6] focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-2">
                        <button 
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 rounded-xl transition-all border border-gray-600"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
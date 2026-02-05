import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserTag, FaUserShield, FaUserEdit } from "react-icons/fa";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    const handleUpdateRole = async (id, newRole) => {
        const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Role Updated!',
                text: `User is now a ${newRole}`,
                background: '#15191e',
                color: '#fff',
                confirmButtonColor: '#3b82f6'
            });
            refetch();
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            background: '#15191e',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been removed.",
                        icon: "success",
                        background: '#15191e',
                        color: '#fff'
                    });
                    refetch();
                }
            }
        });
    };

    if (isLoading) return <div className="p-10 text-cyan-400 animate-pulse font-bold tracking-widest text-center">ACCESSING DATABASE...</div>;

    return (
        <div className="p-4 md:p-8 min-h-screen">
        
            <div className="mb-10">
                <h2 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
                    <FaUserShield className="text-blue-500" />
                    MANAGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">USERS</span>
                </h2>
                <p className="text-gray-500 mt-2 tracking-wide text-sm uppercase">Total Users Found: {users.length}</p>
            </div>

          
            <div className="relative overflow-hidden bg-[#15191e] border border-white/10 rounded-[2rem] shadow-2xl">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="table w-full border-separate border-spacing-y-2 px-4">
                      
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[11px] tracking-[0.2em]">
                                <th className="bg-transparent border-none py-6">User Info</th>
                                <th className="bg-transparent border-none py-6">Email Address</th>
                                <th className="bg-transparent border-none py-6 text-center">Role Status</th>
                                <th className="bg-transparent border-none py-6 text-right pr-10">System Actions</th>
                            </tr>
                        </thead>
                        
                        {/* টেবিল বডি */}
                        <tbody className="space-y-4">
                            {users.map(user => (
                                <tr key={user._id} className="group hover:bg-white/5 transition-all duration-300">
                               
                                    <td className="bg-transparent border-none py-4 rounded-l-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-200 tracking-wide">{user.name}</span>
                                        </div>
                                    </td>

                                    <td className="bg-transparent border-none py-4">
                                        <span className="text-gray-400 font-mono text-xs">{user.email}</span>
                                    </td>

                       
                                    <td className="bg-transparent border-none py-4 text-center">
                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 
                                            user.role === 'buyer' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 
                                            'bg-green-500/10 text-green-400 border-green-500/30'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                                user.role === 'admin' ? 'bg-purple-400' : 
                                                user.role === 'buyer' ? 'bg-cyan-400' : 'bg-green-400'
                                            }`}></span>
                                            {user.role}
                                        </div>
                                    </td>

                              
                                    <td className="bg-transparent border-none py-4 rounded-r-2xl text-right pr-6">
                                        <div className="flex justify-end items-center gap-3">
                                
                                            <div className="relative flex items-center gap-2 bg-black/30 border border-white/5 rounded-xl px-3 group-hover:border-blue-500/50 transition-colors">
                                                <FaUserEdit className="text-blue-500 text-xs" />
                                                <select 
                                                    onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                                                    className="bg-transparent text-gray-300 text-xs py-2 focus:outline-none cursor-pointer uppercase font-bold"
                                                    defaultValue={user.role}
                                                >
                                                    <option value="worker" className="bg-[#15191e]">Worker</option>
                                                    <option value="buyer" className="bg-[#15191e]">Buyer</option>
                                                    <option value="admin" className="bg-[#15191e]">Admin</option>
                                                </select>
                                            </div>

                                         
                                            <button 
                                                onClick={() => handleDelete(user._id)} 
                                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 shadow-lg"
                                                title="Remove User"
                                            >
                                                <FaTrashAlt className="text-sm" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
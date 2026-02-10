import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userData] = useUserRole();
    const axiosSecure = useAxiosSecure();

 
    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications', user?.email],
 
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const token = localStorage.getItem('access-token');
            
            const res = await axiosSecure.get(`/notifications/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        }
    });

    const navLinkStyles = ({ isActive }) =>
        `relative px-5 py-2 transition-all duration-500 font-medium tracking-wide flex items-center gap-2 group ${
            isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
        }`;

    return (
        <div className="sticky top-0 z-[1000] w-full bg-[#1d232a]/95 backdrop-blur-md border-b border-white/5">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="navbar h-24 p-0">
                    
                    {/* START: Logo & Mobile Menu */}
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden p-0 mr-4 text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-[#1d232a] border border-white/10 rounded-2xl w-64 text-gray-200 backdrop-blur-3xl">
                                <li><NavLink to="/" className="py-3">Home</NavLink></li>
                    
                                <li><NavLink to="/about" className="py-3">About Us</NavLink></li>
                                <li><NavLink to="/dashboard" className="py-3">Dashboard</NavLink></li>
                                <li>
                                    <a href="https://github.com/sabbir019777" target="_blank" rel="noreferrer" className="py-3 text-cyan-400 font-bold">
                                            Join as Developer
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <Link to="/" className="flex items-center gap-3.5">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative h-13 w-13 bg-[#0f172a] rounded-full flex items-center justify-center border border-white/20 shadow-inner">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-300 text-2xl font-black italic">MT</span>
                                </div>
                            </div>
                            <div className="hidden sm:flex flex-col">
                                <span className="text-2xl font-black text-white leading-none tracking-tight">
                                    MICRO<span className="text-blue-500">TASKER</span>
                                </span>
                                <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Earning Platform</span>
                            </div>
                        </Link>
                    </div>

                    {/* CENTER: Navigation Links */}
                    <div className="navbar-center hidden lg:flex">
                        <div className="flex items-center bg-white/5 px-2 py-1.5 rounded-2xl border border-white/5">
                            <NavLink to="/" className={navLinkStyles}>
                                {({ isActive }) => (
                                    <>
                                        <span>Home</span>
                                        {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6] rounded-full"></span>}
                                    </>
                                )}
                            </NavLink>

                            <NavLink to="/about" className={navLinkStyles}>
                                {({ isActive }) => (
                                    <>
                                        <span>About Us</span>
                                        {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6] rounded-full"></span>}
                                    </>
                                )}
                            </NavLink>

                            <NavLink to="/dashboard" className={navLinkStyles}>
                                {({ isActive }) => (
                                    <>
                                        <span>Dashboard</span>
                                        {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6] rounded-full"></span>}
                                    </>
                                )}
                            </NavLink>
                            
                            <a 
                                href="https://github.com/sabbir019777" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="px-5 py-2 text-gray-400 hover:text-cyan-400 transition-colors font-medium"
                            >
                                Join as Developer
                            </a>
                        </div>
                    </div>

                    {/* END: User Section / Auth Buttons */}
                    <div className="navbar-end gap-6">
                        {user ? (
                            <div className="flex items-center gap-5">

                                {/* Notification Bell Icon */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative group">
                                        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                        <div className="indicator">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            {notifications.length > 0 && (
                                                <span className="badge badge-xs indicator-item bg-red-500 border-none text-white animate-pulse">
                                                    {notifications.length}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div tabIndex={0} className="mt-5 z-[1] card card-compact dropdown-content w-80 bg-[#1e293b] border border-white/10 text-gray-200 shadow-2xl backdrop-blur-xl rounded-2xl">
                                        <div className="card-body max-h-96 overflow-y-auto custom-scrollbar">
                                            <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                                                <span className="font-bold text-lg text-white">Notifications</span>
                                                <span className="badge badge-primary badge-sm">{notifications.length} New</span>
                                            </div>
                                            
                                            {notifications.length === 0 ? (
                                                <div className="text-center py-6 text-gray-500">
                                                    <p>No new notifications</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-2">
                                                    {notifications.map((notif, idx) => (
                                                        <div key={idx} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 group">
                                                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{notif.message}</p>
                                                            <p className="text-[10px] text-blue-400 mt-1 font-mono text-right">
                                                                {moment(notif.time).fromNow()}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <Link to="/dashboard" className="btn btn-sm btn-ghost w-full mt-2 text-blue-400 hover:text-white">
                                                View All
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Coin Counter */}
                                <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-5 py-2.5 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-yellow-500 rounded-full blur-sm opacity-20 animate-pulse"></div>
                                        <div className="relative h-7 w-7 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center border border-yellow-200/50">
                                            <span className="text-black text-[12px] font-black">₵</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-mono font-black text-lg leading-none">{userData?.coin || 0}</span>
                                        <span className="text-[9px] text-blue-400 font-bold uppercase tracking-tighter">Available</span>
                                    </div>
                                </div>

                                {/* Profile Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                                        <div className="w-13 rounded-2xl border-2 border-blue-500 p-0.5 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-110 transition-transform duration-300">
                                            <img 
                                                className="rounded-xl object-cover" 
                                                src={user?.photoURL || "https://i.ibb.co/5h1f1xX/default-avatar.png"} 
                                                alt="Profile" 
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-5 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-[#1e293b] border border-white/10 rounded-2xl w-72 space-y-3 backdrop-blur-xl">
                                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                            <img 
                                                className="w-10 h-10 rounded-lg object-cover" 
                                                src={user?.photoURL || "https://i.ibb.co/5h1f1xX/default-avatar.png"} 
                                                alt="User" 
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white truncate w-40">{user?.displayName}</span>
                                                <span className="text-[10px] text-blue-400 font-mono tracking-widest">{userData?.role || 'User'}</span>
                                            </div>
                                        </div>
                                        
                                        <li><Link to="/dashboard/profile" className="py-3 text-gray-300 hover:bg-blue-600 hover:text-white rounded-xl transition-all font-medium">👤 My Profile</Link></li>
                                        <li><Link to="/dashboard" className="py-3 text-gray-300 hover:bg-blue-600 hover:text-white rounded-xl transition-all font-medium">✨ My Dashboard</Link></li>
                                        <li><Link to="/dashboard/withdraw" className="py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-all">💰 Wallet & Withdraw</Link></li>
                                        <div className="h-[1px] bg-white/10 mx-2"></div>
                                        <li>
                                            <button onClick={logOut} className="py-3 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white font-bold rounded-xl transition-all flex justify-center shadow-lg">
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="hidden sm:flex relative px-6 py-3 rounded-2xl group overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                                    <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 bg-gradient-to-t from-blue-600/20 to-transparent" />
                                    <span className="relative text-sm font-bold text-gray-400 group-hover:text-blue-400 transition-colors uppercase tracking-widest">
                                        Login
                                    </span>
                                </Link>
                                
                                <Link to="/signup" className="relative group px-8 py-3.5">
                                    <span className="absolute inset-0 w-full h-full bg-blue-600 rounded-2xl blur-sm group-hover:blur-md transition-all opacity-40"></span>
                                    <span className="relative bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 rounded-2xl text-white font-black uppercase tracking-wider text-sm shadow-xl group-hover:scale-105 transition-transform inline-block">
                                        Join Now
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaWallet, FaBell, FaHistory, FaPlusCircle, FaUsers, FaMoneyCheckAlt, FaBolt, FaBars, FaSignOutAlt, FaUserCircle, FaThLarge, FaChartPie, FaCheckCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

import useNotifications from "../hooks/useNotifications"; 

const Dashboard = () => {
    const { user, logOut } = useAuth();
    const [userData] = useUserRole(); 
    const [notifications] = useNotifications(); 
    const navigate = useNavigate();

    const role = userData?.role;

 
    const dashboardHome = 
        role === 'admin' ? '/dashboard/admin-home' : 
        role === 'buyer' ? '/dashboard/buyer-home' : 
        '/dashboard/worker-home';


    const handleLogOut = () => {
        logOut()
            .then(() => navigate("/"))
            .catch(err => console.log(err));
    };


    const closeSidebar = () => {
        const drawerCheckbox = document.getElementById('my-drawer-2');
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };

    const navLinkClasses = ({ isActive }) =>
        `relative flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 font-medium tracking-wide overflow-hidden group ${
            isActive 
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/30" 
            : "text-gray-400 hover:text-cyan-400 hover:bg-white/5 border border-transparent hover:border-white/5"
        }`;

    const dropdownLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
            isActive 
            ? "bg-blue-600/10 text-blue-400" 
            : "text-gray-300 hover:bg-white/5 hover:text-white"
        }`;


    const menuItems = (
        <>
            <NavLink to="/" onClick={closeSidebar} className={`${navLinkClasses} mb-2 border-b border-white/5 pb-4`}>
                <FaHome className="text-blue-400" /> 
                <span className="font-bold">Back Home</span>
            </NavLink>

            <NavLink to="/dashboard/overview" onClick={closeSidebar} className={navLinkClasses}>
                <FaChartPie className="text-orange-400" /> 
                <span>Dashboard Overview</span>
            </NavLink>

            <NavLink to={dashboardHome} onClick={closeSidebar} className={navLinkClasses}>
                <FaThLarge className="text-purple-400" /> 
                <span>Dashboard Home</span>
            </NavLink>

            <div className="my-2 h-[1px] bg-white/10"></div>

       
            {role === "buyer" && (
                <>
                    <NavLink onClick={closeSidebar} to="/dashboard/addNewTask" className={navLinkClasses}><FaPlusCircle /> Add New Task</NavLink>
                    <NavLink onClick={closeSidebar} to="/dashboard/myTasks" className={navLinkClasses}><FaTasks /> My Tasks</NavLink>
               
                    <NavLink onClick={closeSidebar} to="/dashboard/reviewSubmissions" className={navLinkClasses}><FaCheckCircle className="text-green-400" /> Review Submissions</NavLink> 
                    <NavLink onClick={closeSidebar} to="/dashboard/purchaseCoin" className={navLinkClasses}><FaWallet /> Purchase Coin</NavLink>
                    <NavLink onClick={closeSidebar} to="/dashboard/paymentHistory" className={navLinkClasses}><FaHistory /> Payment History</NavLink>
                </>
            )}

    
            {role === "worker" && (
                <>
                    <NavLink onClick={closeSidebar} to="/dashboard/taskList" className={navLinkClasses}><FaTasks /> Available Tasks</NavLink>
                    <NavLink onClick={closeSidebar} to="/dashboard/mySubmissions" className={navLinkClasses}><FaHistory /> My Submissions</NavLink>
                    <NavLink onClick={closeSidebar} to="/dashboard/withdraw" className={navLinkClasses}><FaWallet /> Withdraw Money</NavLink>
                </>
            )}

   
            {role === "admin" && (
                <>
                    <NavLink onClick={closeSidebar} to="/dashboard/manageUsers" className={navLinkClasses}><FaUsers /> Manage Users</NavLink>
                    <NavLink onClick={closeSidebar} to="/dashboard/manageTasks" className={navLinkClasses}><FaTasks /> Manage Tasks</NavLink>
                    <NavLink onClick={closeSidebar} to="/dashboard/manageWithdrawals" className={navLinkClasses}><FaMoneyCheckAlt /> Withdrawals</NavLink>
                </>
            )}
        </>
    );


    const dropdownItems = (
        <>
            <NavLink to="/" className={dropdownLinkClasses}><FaHome /> Back Home</NavLink>
            <div className="divider my-1 before:bg-white/5 after:bg-white/5"></div>
            
            <NavLink to="/dashboard/overview" className={dropdownLinkClasses}><FaChartPie /> Overview</NavLink>
            <NavLink to={dashboardHome} className={dropdownLinkClasses}><FaThLarge /> Dashboard Home</NavLink>
            
            {role === "buyer" && (
                <>
                    <NavLink to="/dashboard/addNewTask" className={dropdownLinkClasses}><FaPlusCircle /> Add Task</NavLink>
                    <NavLink to="/dashboard/myTasks" className={dropdownLinkClasses}><FaTasks /> My Tasks</NavLink>
                    <NavLink to="/dashboard/reviewSubmissions" className={dropdownLinkClasses}><FaCheckCircle /> Review Submissions</NavLink>
                </>
            )}

            {role === "worker" && (
                <>
                    <NavLink to="/dashboard/taskList" className={dropdownLinkClasses}><FaTasks /> Task List</NavLink>
                    <NavLink to="/dashboard/withdraw" className={dropdownLinkClasses}><FaWallet /> Withdraw</NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="drawer lg:drawer-open font-sans selection:bg-cyan-500 selection:text-white bg-[#1d232a]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col min-h-screen relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                <header className="h-20 bg-[#15191e]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 flex justify-between items-center sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle lg:hidden text-white hover:bg-white/10">
                            <FaBars className="text-xl" />
                        </label>

                        <div>
                            <h3 className="text-gray-400 text-xs md:text-sm font-medium tracking-wide">Welcome back,</h3>
                            <h2 className="text-white font-bold text-sm md:text-lg tracking-tight truncate max-w-[150px] md:max-w-none">{user?.displayName}</h2>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="flex items-center gap-2 md:gap-3 bg-[#1d232a] px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] group hover:border-blue-400 transition-colors cursor-pointer">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg group-hover:animate-spin">
                                <span className="text-black font-black text-[10px] md:text-xs">₵</span>
                            </div>
                            <div className="flex flex-col items-end leading-none">
                                <span className="text-white font-mono font-bold text-sm md:text-xl">{userData?.coin || 0}</span>
                                <span className="text-[8px] md:text-[9px] text-blue-400 font-bold uppercase hidden md:block">Balance</span>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm md:btn-md relative bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50">
                                <FaBell className="text-lg md:text-xl text-gray-300" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_#ef4444] animate-pulse font-bold">
                                        {notifications.length}
                                    </span>
                                )}
                            </label>
                            
                            <div tabIndex={0} className="dropdown-content z-[20] menu p-0 shadow-2xl bg-[#1e293b] rounded-2xl w-72 md:w-80 mt-4 border border-white/10 backdrop-blur-3xl overflow-hidden">
                                <div className="p-4 border-b border-white/5 bg-[#15191e] flex justify-between items-center">
                                    <h3 className="font-bold text-white text-sm">Notifications</h3>
                                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">{notifications.length} New</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto custom-scrollbar bg-[#1e293b]/50">
                                    {notifications.length > 0 ? (
                                        notifications.map((n) => (
                                            <div key={n._id} className="p-4 border-b border-white/5 hover:bg-blue-500/5 transition cursor-pointer group">
                                                <p className="text-gray-300 text-xs leading-relaxed group-hover:text-white transition-colors">{n.message}</p>
                                                <span className="text-[10px] text-gray-500 mt-2 block font-mono">
                                                    {new Date(n.time).toLocaleString()}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-10 text-center flex flex-col items-center gap-2">
                                            <FaBell className="text-gray-600 text-2xl" />
                                            <p className="text-gray-500 text-xs italic">No new notifications</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm md:btn-md avatar online cursor-pointer">
                                <div className="w-8 md:w-11 rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition-transform duration-300">
                                    <img className="rounded-full border-2 border-[#15191e]" src={user?.photoURL || "https://i.ibb.co/5h1f1xX/default-avatar.png"} alt="Profile" />
                                </div>
                            </label>
                            
                            <ul tabIndex={0} className="mt-4 z-[50] p-2 shadow-2xl menu menu-sm dropdown-content bg-[#15191e] border border-white/10 rounded-2xl w-64 backdrop-blur-xl">
                                <div className="p-4 text-center border-b border-white/5 mb-2">
                                    <p className="text-white font-bold truncate">{user?.displayName}</p>
                                    <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">{role}</p>
                                </div>
                                <li><NavLink to="/dashboard/profile" className={dropdownLinkClasses}><FaUserCircle /> My Profile</NavLink></li>
                                <div className="divider my-1 before:bg-white/5 after:bg-white/5">Menu</div>
                                {dropdownItems}
                                <div className="divider my-1 before:bg-white/5 after:bg-white/5">Exit</div>
                                <li>
                                    <button onClick={handleLogOut} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-8 relative z-10 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
                    <Outlet />
                </main>
            </div> 

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <div className="w-72 bg-[#15191e] border-r border-white/5 text-white shadow-2xl h-full flex flex-col relative z-20">
                    <div className="p-8 border-b border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-2">
                            <FaBolt className="text-yellow-400 animate-pulse" />
                            MICRO<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">TASKER</span>
                        </h2>
                        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">
                                {role || 'User'} Command Center
                            </p>
                        </div>
                    </div>
                    <nav className="p-5 mt-2 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                        {menuItems}
                    </nav>
                    <div className="p-5 border-t border-white/5 bg-black/20">
                        <button 
                            onClick={handleLogOut} 
                            className="flex items-center justify-center gap-3 w-full p-3.5 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white transition-all border border-red-500/20 hover:border-red-500 group shadow-lg"
                        >
                            <FaSignOutAlt className="group-hover:rotate-180 transition-transform duration-500" /> 
                            <span className="font-bold text-sm uppercase tracking-wider">Exit System</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
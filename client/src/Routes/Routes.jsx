import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard"; 
import Home from "../pages/Home/Home";
import Login from "../pages/login/login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "../Routes/PrivateRoute";


import AboutUs from "../components/AboutUs/AboutUs";


import AddTask from "../pages/Dashboard/AddTask";
import MyTasks from "../pages/Dashboard/MyTasks";
import TaskList from "../pages/Dashboard/TaskList";
import TaskDetails from "../pages/Dashboard/TaskDetails";
import PurchaseCoin from "../pages/Dashboard/PurchaseCoin";
import Payment from "../pages/Dashboard/Payment";
import BuyerHome from "../pages/Dashboard/BuyerHome";
import ReviewSubmissions from "../pages/Dashboard/ReviewSubmissions"; 
import PaymentHistory from "../pages/Dashboard/PaymentHistory";


import WorkerHome from "../pages/Dashboard/WorkerHome";
import Withdraw from "../pages/Dashboard/Withdraw";
import MySubmissions from "../pages/Dashboard/MySubmissions";

import AdminHome from "../pages/Dashboard/AdminHome";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageTasks from "../pages/Dashboard/ManageTasks";
import ManageWithdrawals from "../pages/Dashboard/ManageWithdrawals";


import Profile from "../pages/Dashboard/Profile";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
   
      { path: "about", element: <AboutUs /> }, 
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
   
      { index: true, element: <Profile /> }, 
      

      { path: "overview", element: <Profile /> }, 
      
      { path: "profile", element: <Profile /> },
      { path: "update-profile", element: <UpdateProfile /> },

   
      { path: "buyer-home", element: <BuyerHome /> },
      { path: "addNewTask", element: <AddTask /> },
      { path: "myTasks", element: <MyTasks /> },
     
      { path: "reviewSubmissions", element: <ReviewSubmissions /> }, 
      
      { path: "purchaseCoin", element: <PurchaseCoin /> },
      { path: "payment/:price/:coins", element: <Payment /> },
      { path: "paymentHistory", element: <PaymentHistory /> },

 
      { path: "worker-home", element: <WorkerHome /> },
      { path: "taskList", element: <TaskList /> },
      { path: "taskDetails/:id", element: <TaskDetails /> },
      { path: "mySubmissions", element: <MySubmissions /> },
      { path: "withdraw", element: <Withdraw /> },


      { path: "admin-home", element: <AdminHome /> },
      { path: "manageUsers", element: <ManageUsers /> },
      { path: "manageTasks", element: <ManageTasks /> },
      { path: "manageWithdrawals", element: <ManageWithdrawals /> },
    ],
  },
]);
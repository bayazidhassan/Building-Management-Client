import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login&SignUp/Login";
import Dashboard from "../Layout/Dashboard";
import SignUp from "../Pages/Login&SignUp/SignUp";
import UserHome from "../Pages/Dashboard/User/UserHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ErrorPage from "../Pages/ErrorPage";
import Apartments from "../Pages/Apartments";
import Announcements from "../Pages/Dashboard/Announcements";
import ManageMembers from "../Pages/Dashboard/Admin/ManageMembers";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import AgreementRequests from "../Pages/Dashboard/Admin/AgreementRequests";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MemberHome from "../Pages/Dashboard/Member/MemberHome";
import MakePayment from "../Pages/Dashboard/Member/MakePayment";
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory";
import MemberRoute from "./MemberRoute";
import Payment from "../Pages/Dashboard/Member/Payment";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/apartments',
                element: <Apartments></Apartments>,
            },



        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [

            //user routes
            {
                path: 'userHome',
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path: 'announcements',
                element: <PrivateRoute><Announcements></Announcements></PrivateRoute>
            },




            //member routes
            {
                path: 'memberHome',
                element: <MemberRoute><MemberHome></MemberHome></MemberRoute>
            },
            {
                path: 'makePayment',
                element: <MemberRoute><MakePayment></MakePayment></MemberRoute>
            },
            {
                path: 'payment',
                element: <MemberRoute><Payment></Payment></MemberRoute>
            },
            {
                path: 'paymentHistory',
                element: <MemberRoute><PaymentHistory></PaymentHistory></MemberRoute>
            },





            //admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageMembers',
                element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>
            },
            {
                path: 'makeAnnouncement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            },
            {
                path: 'agreementRequests',
                element: <AdminRoute><AgreementRequests></AgreementRequests></AdminRoute>
            },
            {
                path: 'manageCoupons',
                element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
            },
        ]
    }


]);
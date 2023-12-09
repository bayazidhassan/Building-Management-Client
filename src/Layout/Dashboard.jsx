import { FaHome, FaUser, FaFileContract, FaFileInvoiceDollar } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";
import useAdmin from "../Hooks/useAdmin";
import useMember from "../Hooks/useMember";


const Dashboard = () => {


    const [isAdmin] = useAdmin();
    const [isMember] = useMember();

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">

            <div className="lg:w-1/5 min-h-full bg-orange-400">

                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminHome'> <FaUser></FaUser>My Profile</NavLink></li>
                                <li><NavLink to='/dashboard/manageMembers'> <FaUsersGear></FaUsersGear>Manage Members</NavLink></li>
                                <li><NavLink to='/dashboard/makeAnnouncement'> <GrAnnounce></GrAnnounce>Make Announcement</NavLink></li>
                                <li><NavLink to='/dashboard/agreementRequests'> <FaFileContract></FaFileContract>Agreement Requests</NavLink></li>
                                <li><NavLink to='/dashboard/manageCoupons'> <RiCoupon2Fill></RiCoupon2Fill>Manage Coupons</NavLink></li>
                            </>
                            :
                            (
                                isMember ?
                                    <>
                                        <li><NavLink to='/dashboard/memberHome'> <FaUser></FaUser>My Profile</NavLink></li>
                                        <li><NavLink to='/dashboard/makePayment'> <MdPayment></MdPayment>Make Payment</NavLink></li>
                                        <li><NavLink to='/dashboard/paymentHistory'> <FaFileInvoiceDollar></FaFileInvoiceDollar>Payment History</NavLink></li>
                                        <li><NavLink to='/dashboard/announcements'> <GrAnnounce></GrAnnounce>Announcements</NavLink></li>
                                    </>
                                    :
                                    <>
                                        <li><NavLink to='/dashboard/userHome'> <FaUser></FaUser>My Profile</NavLink></li>
                                        <li><NavLink to='/dashboard/announcements'> <GrAnnounce></GrAnnounce>Announcements</NavLink></li>
                                    </>
                            )
                    }
                    <dir className="divider"></dir>
                    <li><Link to='/'> <FaHome></FaHome>Home</Link></li>
                </ul>
            </div>

            <div className="lg:w-4/5 bg-slate-200 p-4">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;
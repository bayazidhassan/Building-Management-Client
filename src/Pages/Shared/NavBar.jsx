import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { MdLogin } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";
import useMember from "../../Hooks/useMember";


const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isAdmin] = useAdmin();
    const [isMember] = useMember();


    const navOptions = <div className="flex items-center">
        <li> <Link to='/'>Home</Link> </li>
        <li> <Link to='/apartments'>Apartment</Link> </li>
    </div>

    const handleLogout = () => {
        logOut();
        navigate('/login');
    }

    return (
        <div className="max-w-7xl navbar fixed z-10 bg-opacity-40 bg-black text-white">
            <div className="navbar-start ml-1 md:ml-3">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content z-10 p-2 shadow-xl bg-slate-100 border-2 border-orange-300 text-black text-lg font-semibold rounded-box w-44">
                        {
                            navOptions
                        }
                    </ul>
                </div>
                <Link to='/'><img className="w-16 md:w-20" src="https://i.ibb.co/rFkRtFZ/logo.png" alt="" /></Link>
                <h2 className="text-lg hidden lg:flex">Building Management</h2>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-lg">
                    {
                        navOptions
                    }
                </ul>
            </div>
            <div className="navbar-center flex lg:hidden">
                <h2 className="flex md:hidden">Building <br></br> Management</h2>
                <h2 className="hidden md:flex text-lg">Building Management</h2>
            </div>
            <div className="navbar-end mr-4">
                {
                    user ?
                        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                            <label tabIndex={0}> {user?.photoURL ? <img className="w-10 h-10 rounded-full" src={user.photoURL}></img> : ''}</label>
                            <ul tabIndex={0} className="dropdown-content z-10 menu mr-6 p-2 shadow-xl border-2 border-orange-300 bg-slate-100 rounded-box w-32 md:w-40">
                                <h2 className="text-center text-black md:text-lg font-semibold">{user.displayName} </h2>
                                {
                                    isAdmin ? <button className="my-2 btn btn-sm btn-accent"><Link to='/dashboard/adminHome'>Dashboard</Link></button>
                                        :
                                        (
                                            isMember ?
                                                <button className="my-2 btn btn-sm btn-accent"><Link to='/dashboard/memberHome'>Dashboard</Link></button>
                                                :
                                                <button className="my-2 btn btn-sm btn-accent"><Link to='/dashboard/userHome'>Dashboard</Link></button>
                                        )
                                }
                                <button className="btn btn-sm btn-error" onClick={handleLogout}>Log Out</button>
                            </ul>
                        </div>
                        :
                        <Link to='/login'><MdLogin className="w-6 h-6"></MdLogin></Link>
                }
            </div>
        </div>
    );
};

export default NavBar;
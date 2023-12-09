import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../Pages/Shared/NavBar";
import Footer from "../Pages/Shared/Footer";


const Main = () => {

    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div className="max-w-7xl mx-auto">

            <NavBar></NavBar>

            <Outlet></Outlet>

            {noHeaderFooter || <Footer></Footer>}

            <ToastContainer />

        </div>
    );
};

export default Main;
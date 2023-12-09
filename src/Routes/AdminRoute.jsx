import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../Hooks/useAdmin";


const AdminRoute = ({ children }) => {

    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading || isAdminLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (user && isAdmin) {
        return children;
    }
    // return <Navigate state={location.pathname} to='/login' replace></Navigate>
    return <Navigate state={{ from: location }} to='/login' replace></Navigate>

};

AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;
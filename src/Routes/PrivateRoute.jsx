import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../providers/AuthProvider";



const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (user) {
        return children;
    }
    // return <Navigate state={location.pathname} to='/login' replace></Navigate>
    return <Navigate state={{ from: location }} to='/login' replace></Navigate>

};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;
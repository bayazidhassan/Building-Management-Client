import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../providers/AuthProvider";
import useMember from "../Hooks/useMember";


const MemberRoute = ({ children }) => {

    const [isMember, isMemberLoading] = useMember();
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading || isMemberLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (user && isMember) {
        return children;
    }
    // return <Navigate state={location.pathname} to='/login' replace></Navigate>
    return <Navigate state={{ from: location }} to='/login' replace></Navigate>

};

MemberRoute.propTypes = {
    children: PropTypes.node
};

export default MemberRoute;
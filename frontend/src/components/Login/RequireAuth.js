import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        auth?.roles?.find(role => allowedRoles?.includes(role));
    }, [auth, allowedRoles]); // Include allowedRoles in the dependency array

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/dental/success" state={{ from: location }} replace />
                : <Navigate to="/dental/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;

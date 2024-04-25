import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { USER_ROLES } from "../constants/roles";

const CheckLoginStatus = () => {
  const user = useAuthStore.getState().user;

  if (!user) {
    return <Outlet />;
  }

  const permissionLevel = user.role;

  if (permissionLevel === USER_ROLES.CATER) {
    return <Navigate to="/cater" />;
  } else if (permissionLevel === USER_ROLES.FACILITY_STAFF) {
    return <Navigate to="/facility-staff" />;
  } else if (permissionLevel === USER_ROLES.STUDENT) {
    return <Navigate to="/" />;
  } else if (permissionLevel === USER_ROLES.WARDEN) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default CheckLoginStatus;

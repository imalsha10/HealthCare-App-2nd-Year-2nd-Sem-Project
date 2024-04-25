import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";
import { USER_ROLES } from "../constants/roles";

import {
  Home,
  Login,
  Signup,
  LabAssistantDashboard,
  PatientDashboard,
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Check Login Status */}
          <Route element={<CheckLoginStatus />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Lab Assistant Private Routes */}
          <Route
            element={
              <PrivateRoute permissionLevel={[USER_ROLES.LAB_ASSISTANT]} />
            }
          >
            <Route path="/lab-assistant" element={<LabAssistantDashboard />} />
          </Route>

          {/* Patient Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.PATIENT]} />}
          >
            <Route path="/patient" element={<PatientDashboard />} />
          </Route>

          {/* return 404 page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;

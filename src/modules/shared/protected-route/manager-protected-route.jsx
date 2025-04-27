import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ManagerProtectedRoute({ children }) {
  const { userProfileData } = useSelector((state) => state.profile);
  const userRole = userProfileData?.group?.name;


  // If the user is not an Manager, redirect to home
  if (userRole === "Employee") {
    return <Navigate to="/dashboard" />;
  }

  // If token exists and the user is an admin, render the children (the protected component)
  return children;
}

export default ManagerProtectedRoute;

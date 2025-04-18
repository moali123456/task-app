import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingProtectedRoute({ children }) {
  const userData = useSelector((state) => state.auth.userData);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userRole = userData?.user?.role;

  // If the user is not logged in, redirect to login
  if (!isLogged) {
    return <Navigate to="/" />;
  }

  // If the role is not available yet (e.g., still fetching), return null to prevent rendering
  if (!userRole) {
    return null;
  }

  // If the user is not an admin, redirect to home
  if (userRole === "admin") {
    return <Navigate to="/dashboard" />;
  }

  // If token exists and the user is an admin, render the children (the protected component)
  return children;
}

export default LandingProtectedRoute;

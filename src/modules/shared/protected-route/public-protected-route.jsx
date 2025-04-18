import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicProtectedRoute({ children }) {
  const userData = useSelector((state) => state.auth.userData);
  const userRole = userData?.user?.role;

  // If the user is not an admin, redirect to home
  if (userRole === "admin") {
    return <Navigate to="/dashboard" />;
  }

  // If token exists and the user is an admin, render the children (the protected component)
  return children;
}

export default PublicProtectedRoute;

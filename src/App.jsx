import i18n from "i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Protected Routes
import AuthProtectedRoute from "./modules/shared/protected-route/auth-protected-route";
import AdminProtectedRoute from "./modules/shared/protected-route/admin-protected-route";
// Layouts
import AuthLayout from "./modules/layouts/components/auth-layout/auth-layout";
import AdminLayout from "./modules/layouts/components/admin-layout/admin-layout";
// Auth Pages
import Login from "./modules/auth/components/login/login";
import Register from "./modules/auth/components/register/register";
import VerifyAccount from "./modules/auth/components/verify-account/verify-account";
import ForgotPassword from "./modules/auth/components/forgot-password/forgot-password";
import ResetPassword from "./modules/auth/components/reset-password/reset-password";
import AuthNotFound from "./modules/auth/components/auth-not-found/auth-not-found";
// Admin Pages
import DashboardPage from "./modules/admin/components/dashboard-page/dashboard-page";
import RoomsAdminPage from "./modules/admin/components/rooms-page/rooms-page";
import AddRoom from "./modules/admin/components/add-room/add-room";
import UpdateRoom from "./modules/admin/components/update-room/update-room";
import FacilitiesPage from "./modules/admin/components/facilities-page/facilities-page";
import AdsPage from "./modules/admin/components/ads-page/ads-page";
import AdminNotFound from "./modules/admin/components/admin-not-found/admin-not-found";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  document.documentElement.lang = i18n.language;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProtectedRoute>
          <AuthLayout />
        </AuthProtectedRoute>
      ),
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "forgot-pass", element: <ForgotPassword /> },
        { path: "reset-pass", element: <ResetPassword /> },
        { path: "*", element: <AuthNotFound /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      ),
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "home", element: <DashboardPage /> },
        { path: "admin-rooms", element: <RoomsAdminPage /> },
        { path: "add-room", element: <AddRoom /> },
        { path: "update-room/:id", element: <UpdateRoom /> },
        { path: "facilities", element: <FacilitiesPage /> },
        { path: "ads", element: <AdsPage /> },
        { path: "*", element: <AdminNotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
};

export default App;

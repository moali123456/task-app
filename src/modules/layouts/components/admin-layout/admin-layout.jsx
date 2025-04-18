import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainLoader from "../../../shared/loaders/main-loader";
import FireLoader from "../../../../utils/loader/fire-loader";
import AdminPageTitle from "../../../../utils/page-titles/admin-page-title";
import MainSidebar from "../../../admin/shared/main-sidebar/main-sidebar";
import MainTopbar from "../../../admin/shared/main-topbar/main-topbar";
import "./admin-layout.scss";

const AdminLayout = () => {
  AdminPageTitle();
  FireLoader();

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  return (
    <div id="admin_layout" className="min-h-screen">
      <MainLoader />

      <div className="flex h-full min-h-screen">
        {/* Sidebar */}
        <MainSidebar
          sideBarCollapsed={sideBarCollapsed}
          setSideBarCollapsed={setSideBarCollapsed}
        />

        {/* Content */}
        <div
          className={`w-full p-5 overflow-hidden main_content ${
            sideBarCollapsed ? "ms-20 closed" : "ms-60 opened"
          } transition-all duration-500`}
        >
          {/* topbar */}
          <MainTopbar
            onIconClick={() => setSideBarCollapsed(!sideBarCollapsed)}
          />

          {/* Collapse Button in Parent */}
          {/* <button
            className="cursor-pointer z-50"
            onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
          >
            {sideBarCollapsed ? "Expand" : "Collapse"}
          </button> */}

          <main className="py-6 px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

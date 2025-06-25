import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-base-200 p-4 space-y-4">
          <h2 className="text-xl font-bold text-primary">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `px-2 py-2 rounded-md ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-base-200 hover:text-accent"
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/dashboard/addRecipe"
              className={({ isActive }) =>
                `px-2 py-2 rounded-md ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-base-200 hover:text-accent"
                }`
              }
            >
              Add Recipe
            </NavLink>
            <NavLink
              to="/dashboard/myRecipes"
              className={({ isActive }) =>
                `px-2 py-2 rounded-md ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-base-200 hover:text-accent"
                }`
              }
            >
              My Recipes
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

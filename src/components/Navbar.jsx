import { Menu, Moon, Sun, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import navLogo from "../assets/icons/cookingNavLogo.png";
import { AuthContext } from "../contexts/AuthContext";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user } = useContext(AuthContext);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navItem = [
    { name: "Home", path: "/" },
    { name: "All Recipe", path: "/allRecipes" },
    { name: "Add Recipe", path: "/addRecipe" },
    { name: "My Recipe", path: "/myRecipes" },
  ];

  return (
    <nav className="flex items-center justify-between bg-base-300 px-4 py-3 shadow-md">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              className="w-10 h-10 cursor-pointer hidden md:inline-block"
              src={navLogo}
              alt="Cooking"
            />
          </Link>
          <h1 className="text-lg font-bold">
            <span className="text-secondary">Cook</span>
            <span className="text-primary">Sy</span>
          </h1>
        </div>
      </div>

      <ul className="hidden md:flex space-x-4">
        {navItem.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `px-2 py-2 rounded-md ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-base-200 hover:text-accent"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="btn btn-sm btn-outline rounded-full"
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {user ? (
          <UserMenu />
        ) : (
          <div className="space-x-2">
            <button className="btn btn-outline btn-sm">
              <Link to="/auth/signin">SignIn</Link>
            </button>
            <button className="btn btn-primary btn-sm">
              <Link to="/auth/signup">SignUp</Link>
            </button>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-opacity-30">
          <div
            className="absolute inset-0"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="absolute top-14 left-0 rounded bg-base-100 p-4 shadow-md">
            <ul className="flex flex-col space-y-3">
              {navItem.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-2 py-2 rounded-md ${
                      isActive ? "bg-primary text-white" : "hover:bg-base-200"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

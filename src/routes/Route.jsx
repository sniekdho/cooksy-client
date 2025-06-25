import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Page404 from "../components/Page404";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { Component } from "react";
import AllRecipes from "../pages/AllRecipes";
import PrivateRoute from "./PrivateRoute";
import AddRecipe from "../pages/AddRecipe";
import MyRecipes from "../pages/MyRecipes";
import Spinner from "../components/Spinner";
import RecipeDetails from "../pages/RecipeDetails";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Support from "../pages/Support";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allRecipes",
        Component: AllRecipes,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/support",
        Component: Support,
      },
      {
        path: "/recipe_details/:id",
        loader: ({ params }) =>
          fetch(`https://cooksy-server-nine.vercel.app/recipes/${params.id}`),
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/signin",
        Component: SignIn,
      },
      {
        path: "/auth/signup",
        Component: SignUp,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Overview,
      },
      {
        path: "/dashboard/addRecipe",
        Component: AddRecipe,
      },
      {
        path: "/dashboard/myRecipes",
        Component: MyRecipes,
      },
    ],
  },

  {
    path: "/*",
    Component: Page404,
  },
]);

export default router;

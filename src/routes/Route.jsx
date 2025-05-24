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
        path: "/recipe_details/:id",
        loader: ({ params }) =>
          fetch(`https://cooksy-server-nine.vercel.app/recipes/${params.id}`),
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/addRecipe",
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "/myRecipes",
        element: (
          <PrivateRoute>
            <MyRecipes></MyRecipes>
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
    path: "/*",
    Component: Page404,
  },
]);

export default router;

import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Page404 from "../components/Page404";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
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

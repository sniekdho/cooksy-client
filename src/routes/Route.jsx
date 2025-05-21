import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Page404 from "../components/Page404";
import Home from "../pages/Home";

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
    path: "/*",
    Component: Page404,
  },
]);

export default router;

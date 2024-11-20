import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { DashBoard } from "./pages/DashBoard";
import BlogPosts from "./pages/Blogs/BlogPosts";
import { LoginPage } from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import { PaymentForm } from "./pages/PaymentForm";
import { NgoDashBoard } from "./pages/NgoDashBoard";
import FoodPostPage from "./pages/FoodPostsPage";
import ReadBlog from "./pages/Blogs/ReadBlog";

import { RegisterPage } from "./pages/RegisterPage";
// import { OrganisationDashboard } from "./pages/OrganisationDashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: LandingPage,
        index: true,
      },
      {
        path: "/dashboard",
        Component: DashBoard,
      },
      {
        path: "/ngodashboard",
        Component: NgoDashBoard,
      },
      // {
      //   path: "/organisationdashboard",
      //   Component: OrganisationDashboard,
      // },
      {
        path: "events/:id/donation/checkout",
        Component: PaymentForm,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/blogposts",
    Component: BlogPosts,
  },
  {
    path: "/foodPosts", // Define the path for the FoodPostPage component
    Component: FoodPostPage, // Assign the FoodPostPage component
  },
  {
    path: "/blogposts/:blog_id",
    Component: ReadBlog,
  },
]);

export default router;

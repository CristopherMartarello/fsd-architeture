import { HomePage } from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/book/:id",
    element: <div>Book page</div>,
  },
  {
    path: "/library",
    element: <div>Library page</div>,
  },
  {
    path: "/compare",
    element: <div>Compare page</div>,
  },
  {
    path: "/profile",
    element: <div>Profile page</div>,
  },
]);

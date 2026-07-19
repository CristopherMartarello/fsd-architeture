import { BookPage } from "@/pages/book";
import { HomePage } from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/book/:id",
    element: <BookPage />,
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

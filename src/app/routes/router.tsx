import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppHeader } from "@/widgets/app-header";
import { HomePage } from "@/pages/home";
import { BookPage } from "@/pages/book";
import { LibraryPage } from "@/pages/library";

// eslint-disable-next-line react-refresh/only-export-components
function RootLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "book/:id", element: <BookPage /> },
      { path: "library", element: <LibraryPage /> },
    ],
  },
]);

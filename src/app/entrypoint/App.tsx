import { router } from "@/app/routes";
import { QueryProvider } from "./query-provider";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;

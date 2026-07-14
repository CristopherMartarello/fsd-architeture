import { QueryProvider } from "@/app/providers";
import { router } from "@/app/routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;

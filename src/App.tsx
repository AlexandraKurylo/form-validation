import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { UserProfileFormPage } from "./pages/UserProfileFormPage";
import { RegisterFormPage } from "./pages/RegisterFormPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ValidationResultPage } from "./pages/ValidationResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <UserProfileFormPage />,
      },
      {
        path: "register",
        element: <RegisterFormPage />,
      },
      {
        path: "result",
        element: <ValidationResultPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

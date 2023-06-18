import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import TodoList from "./components/Todo/TodoList";
import Login from "./components/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

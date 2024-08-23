import { createHashRouter } from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/login";
import Root from "./Root";
import Registration from "../pages/registration";

const router = createHashRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

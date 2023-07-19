import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/Home"
import Deposit from "../pages/Deposit"
import Withdraw from "../pages/Withdraw"
import ControlPanel from "../pages/ControlPanel"
import Faqs from "../pages/Faqs";


const routes = createBrowserRouter([
     {
          path: "/",
          element: <MainLayout />,
          children: [
               { index: true, element: <Home /> },
               { path: "/deposit", element: <Deposit /> },
               { path: "/withdraw", element: <Withdraw /> },
               { path: "/faqs", element: <Faqs /> },
               { path: "/control-panel", element: <ControlPanel /> },
          ]
     }
])

export default routes;
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import Menu from "../Pages/Menu";
import OrderFood from "../Pages/OrderFood";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h3>404 error</h3>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/orderfood/:category',
                element: <OrderFood></OrderFood>
            },
            {
                path:'/login',
                element:<Login></Login>
            }
        ]
        
    }
   
])

export default router;
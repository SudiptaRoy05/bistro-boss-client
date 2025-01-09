import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import Menu from "../Pages/Menu";
import OrderFood from "../Pages/OrderFood";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../Pages/Shared/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Shared/Cart";
import AllUsers from "../Pages/AllUsers";
import AddItems from "../Pages/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItem from "../Pages/ManageItem";

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
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/secret',
                element: <PrivateRoutes>
                    <Secret></Secret>
                </PrivateRoutes>,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes>
            <Dashboard></Dashboard>
        </PrivateRoutes>,
        errorElement: <h3>404</h3>,
        children: [
            {
                path: '/dashboard/cart',
                element: <Cart></Cart>
            },

            // adminOnly routes 
            {
                path: '/dashboard/allUsers',
                element: <AdminRoutes>
                    <AllUsers></AllUsers>
                </AdminRoutes>,
            },
            {
                path: '/dashboard/manageItem',
                element: <AdminRoutes>
                    <ManageItem></ManageItem>
                </AdminRoutes>
            },
            {
                path: '/dashboard/addItem',
                element: <AdminRoutes>
                    <AddItems></AddItems>
                </AdminRoutes>,
            }

        ]
    }

])

export default router;
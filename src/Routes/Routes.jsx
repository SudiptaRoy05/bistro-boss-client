import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import Menu from "../Pages/Menu";

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
            }
        ]
    }
])

export default router;
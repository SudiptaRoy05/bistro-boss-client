import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

export default function Main() {
    const location = useLocation();
    const isLogin = location.pathname.includes('login') || location.pathname.includes('register')

    return (
        <div className="flex flex-col min-h-screen">
            {isLogin || <Navbar />}
            <main className="flex-grow">
                <Outlet />
            </main>
            {isLogin || <Footer />}
        </div>
    );
}

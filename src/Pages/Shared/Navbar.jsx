import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../../Provider/AuthProvider"

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
            .then((result) => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const navLinks = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/menu'>Menu</NavLink></li>
            <li><NavLink to='/orderfood/salad'>Order Food</NavLink></li>
        </>
    )
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">BistroBoss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <button
                            className="btn bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 border-none shadow-lg"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            className="btn bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 border-none shadow-lg"
                            to="/login"
                        >
                            Login
                        </Link>
                    )}
                </div>

            </div>
        </div>
    )
}

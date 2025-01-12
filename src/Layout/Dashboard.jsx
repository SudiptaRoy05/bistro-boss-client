import { NavLink, Outlet } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaBook, FaCalendarAlt, FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BsMenuUp } from "react-icons/bs";
import useAdmin from "../Hook/useAdmin";
export default function Dashboard() {

    const adminLinks = [
        { path: '/dashboard/adminhome', icon: <IoHome />, label: 'Admin HOME' },
        { path: '/dashboard/addItem', icon: <FaCalendarAlt />, label: 'ADD ITEMS' },
        { path: '/dashboard/manageItem', icon: <FaCalendarAlt />, label: 'MANAGE ITEMS' },
        { path: '/dashboard/payment', icon: <IoWallet />, label: 'MANAGE ITEMS' },
        { path: '/dashboard/allUsers', icon: <FaUser></FaUser>, label: 'ALL USERS' },
        { path: '/dashboard/manageBookings', icon: <FaBook></FaBook>, label: 'MANAGE BOOKING' },
    ];

    const links = [
        { path: '/dashboard/userhome', icon: <IoHome />, label: 'USER HOME' },
        { path: '/dashboard/paymenthistory', icon: <FaCalendarAlt />, label: 'PAYMENT HISTORY' },
        { path: '/dashboard/payment', icon: <IoWallet />, label: 'PAYMENT' },
        { path: '/dashboard/cart', icon: <IoCart />, label: 'MY CART' },
        { path: '/dashboard/review', icon: <BiSolidCommentDetail />, label: 'ADD REVIEW' },
        { path: '/dashboard/bookings', icon: <BsJournalBookmarkFill />, label: 'MY BOOKING' },
    ];


    const mainLinks = [
        { path: '/', icon: <IoHome />, label: 'HOME' },
        { path: '/', icon: <BsMenuUp />, label: 'MENU' },
        { path: '/', icon: <IoWallet />, label: 'Contact' },
    ];
    // TODO 
    const [isAdmin] = useAdmin();
    console.log(isAdmin);
    // const isAdmin = true;


    return (
        <div className="flex gap-10">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu space-y-2">
                    {
                        isAdmin ? <ul>
                            {adminLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink to={link.path}>
                                        {link.icon} {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul> : <ul>
                            {
                                links.map((link, index) => (
                                    <li key={index}>
                                        <NavLink to={link.path}>
                                            {link.icon} {link.label}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    }
                    <div className="divider"></div>
                    {mainLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.path}>
                                {link.icon} {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

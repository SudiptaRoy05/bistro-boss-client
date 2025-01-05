import { NavLink, Outlet } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BsMenuUp } from "react-icons/bs";
export default function Dashboard() {
    const links = (
        <>
            <li>
                <NavLink to='/dashboard/home'><IoHome />
                    USER HOME
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/reservation'>
                    <FaCalendarAlt /> RESERVATION
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/payment'><IoWallet></IoWallet> PAYMENT HISTORY</NavLink>
            </li>
            <li>
                <NavLink to='cart'>
                    <IoCart></IoCart>
                    MY CART
                </NavLink>
            </li>

            <li>
                <NavLink to='/dashboard/'><BiSolidCommentDetail></BiSolidCommentDetail> ADD REVIEW</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/cart'><BsJournalBookmarkFill></BsJournalBookmarkFill> MY BOOKING</NavLink>
            </li>
        </>
    )
    const mainLinks = (
        <>
            <li>
                <NavLink to='/'><IoHome />
                    HOME
                </NavLink>
            </li>
            <li>
                <NavLink to='/'>
                    <BsMenuUp /> MENU
                </NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/payment'><IoWallet></IoWallet> PAYMENT HISTORY</NavLink>
            </li>

        </>
    )
    return (
        <div className="flex gap-10">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu space-y-2">
                    {links}
                    <div className="divider"></div>
                    {mainLinks}
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

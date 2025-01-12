import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hook/useAuth"
import useAxiosSecure from "../Hook/useAxiosSecure";
import { FaDollarSign } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';

export default function AdminHome() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            console.log(res.data)
            return res.data
        }
    })

    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign size={40}></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats?.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser size={40}></FaUser>
                    </div>
                    <div className="stat-title">New Users</div>
                    <div className="stat-value">{stats?.user}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FiMenu size={40}></FiMenu>
                    </div>
                    <div className="stat-title">Menu</div>
                    <div className="stat-value">{stats?.menuItems}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaShoppingCart size={40}></FaShoppingCart>
                    </div>
                    <div className="stat-title">Order</div>
                    <div className="stat-value">{stats?.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    )
}

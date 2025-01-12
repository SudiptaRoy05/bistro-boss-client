import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth"
import useAxiosSecure from "../../Hook/useAxiosSecure";

export default function PaymentHistory() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            // console.log(res.data);
            return res.data
        }
    })
    return (
        <div>
            <h2>Total Payment: {payments.length} </h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Price</th>
                                <th>Transaction Id</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((pay, idx) => <tr key={pay._id}>
                                    <th>{idx + 1}</th>
                                    <td>{pay.price}</td>
                                    <td>{pay.transactionId}</td>
                                    <td>{pay.status}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

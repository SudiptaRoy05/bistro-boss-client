import Swal from "sweetalert2";
import useCart from "../../Hook/useCart"
import { FaDeleteLeft } from "react-icons/fa6";
import useAxiosSecure from "../../Hook/useAxiosSecure";
export default function Cart() {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });

    }
    return (
        <div>
            <h2 className="text-3xl text-center py-3">My Cart</h2>
            <div className="flex justify-evenly items-center bg-slate-500 p-2 mb-8">
                <h2 className="text-3xl"> Item : {cart && cart.length}</h2>
                <h2 className="text-3xl"> Total Price : {cart && totalPrice}</h2>
                <button className="btn btn-success">Pay</button>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, idx) => <tr key={item._id}>

                                    <th>
                                        <p>{idx + 1}</p>
                                    </th>
                                    <td>
                                        <img className="w-28 rounded-lg" src={item.image} alt="" />
                                    </td>
                                    <td>
                                        <p>{item.name}</p>
                                    </td>
                                    <td><p>{item.price}</p></td>
                                    <th>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn"><FaDeleteLeft className="text-red-600"></FaDeleteLeft></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

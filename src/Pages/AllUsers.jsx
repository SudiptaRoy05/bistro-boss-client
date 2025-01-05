import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../Hook/useAxiosSecure"
import { FaDeleteLeft } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllUsers() {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleDelete = (user) => {
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

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you want to make him/her admin?",
            text: "dont warry you will be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make him/her admin!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Done!",
                                text: "yess! operation success.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }
    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users : {users.length}</h2>
            </div>
            <div className="overflow-x-auto ">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? "Admin" : <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-secondary"><FaUsers className="text-white text-xl"></FaUsers></button>
                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn"><FaDeleteLeft className="text-red-600 text-xl"></FaDeleteLeft></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import SectionTitle from "../Components/SectionTitle";
import useMenu from "../Hook/useMenu";
import { MdUpdate, MdDelete } from "react-icons/md";


export default function ManageItem() {
    const [menu] = useMenu();

    return (
        <div>
            <SectionTitle
                heading={"Manage All Item"}
                subHeading={"Hurry up"}
            ></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, idx) => <tr>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">
                                            <MdUpdate size={20} />
                                        </button>
                                    </th>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">
                                            <MdDelete className="text-red-500" size={20} />
                                        </button>
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

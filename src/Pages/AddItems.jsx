import SectionTitle from "../Components/SectionTitle";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../Hook/useAxiosPublic";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?expiration=600&key=${imgHostingKey}`

export default function AddItems() {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        //img upload to imgBB and get an url
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const res = await axiosPublic.post(imgHostingApi, formData, {
            Headers: {
                "Content-Type": 'multiple/form-data'
            }
        })
        if (res.data.success) {
            // send the menu data to DB 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            }

            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Menu item has been added successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        }
        console.log(res.data)

    }
    return (
        <div>
            <SectionTitle
                heading={"Add an Item"}
                subHeading={"Whats new"}
            ></SectionTitle>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            {...register("name", { required: true })}
                            type="text"
                            placeholder="Enter your name"
                            className="mt-2 block w-full rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        />
                    </div>

                    <div className="flex justify-between  items-center gap-5">
                        <div className="w-full ">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                defaultValue="defalut"
                                id="category"
                                {...register("category", { required: true })}
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            >
                                <option disabled value="defalut">
                                    Select Category
                                </option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drink">Drink</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                {...register("price", { required: true })}
                                type="number"
                                placeholder="Price"
                                className="mt-2 block w-full rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="recipe" className="block text-sm font-medium text-gray-700">
                            Recipe Details
                        </label>
                        <textarea
                            id="recipe"
                            {...register("recipe", { required: true })}
                            placeholder="Enter recipe details"
                            className="mt-2 block w-full rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            Upload File
                        </label>
                        <input
                            id="file"
                            type="file"
                            {...register("image", { required: true })}
                            className="mt-2 block w-full rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add Item
                    </button>

                </form>

            </div>
        </div>
    )
}

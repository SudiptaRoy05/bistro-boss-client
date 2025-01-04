import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

export default function FoodCard({ item }) {
    const { _id, name, image, price, recipe } = item
    const { user } = useAuth();
    const email = user?.email;

    const navigate = useNavigate();
    const location = useLocation();


    const handleAddToCard = async (food) => {
        try {
            const cardItem = {
                menuItemId: _id,
                email,
                name,
                price,
                image,
            }
            if (user && email) {
                //TODO:
                const { data } = await axios.post('http://localhost:5000/carts', cardItem)
                console.log(data)
                Swal.fire({
                    title: 'Added to Cart!',
                    text: `${name} has been successfully added to your cart.`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000, // Automatically closes after 2 seconds
                });
            } else {
                Swal.fire({
                    title: 'Login Required',
                    text: 'Please log in to add items to your cart.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Login Now',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirect user to login page
                        navigate('/login', { state: { form: location } });
                    }
                });
            }

            // console.log(food, email)

        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="pb-3">
                <img
                    src={image}
                    alt={name}
                    className="rounded-xl" />
            </figure>
            <p className="bg-slate-900 text-white absolute right-0 p-2 rounded-md">Price : ${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Name : {name}</h2>
                <h2 className="card-title text-xs font-thin">{recipe}</h2>
                <div className="card-actions">
                    <button
                        onClick={() => handleAddToCard(item)}
                        className="btn btn-outline border-b-4 btn-primary bg-slate-200">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

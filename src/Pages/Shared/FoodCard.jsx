
export default function FoodCard({ item }) {
    const { name, image, price, recipe } = item
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
                    <button className="btn btn-outline border-b-4 btn-primary bg-slate-200">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

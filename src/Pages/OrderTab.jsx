import FoodCard from "./Shared/FoodCard"


export default function OrderTab({ items }) {
    return (
        <div className="p-4 text-center grid grid-cols-3 gap-6">
            {
                items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
            }
        </div>
    )
}

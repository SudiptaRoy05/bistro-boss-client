
export default function MenuItem({ item }) {
    const { image, name, recipe, price } = item;

    return (
        <div className="flex justify-between items-center gap-4 p-3 ">
            <div >
                <img className="w-28 h-24 rounded-r-full rounded-bl-full" src={image} alt="" />
            </div>
            <div className="flex justify-between">
                <div>
                    <h3 className="uppercase">{name}---------------------</h3>
                    <p className="text-gray-500">{recipe}</p>
                </div>
                <div>
                    <p className="text-yellow-600">{price}</p>
                </div>
            </div>
        </div>
    )
}

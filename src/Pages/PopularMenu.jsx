import { useEffect, useState } from "react";
import SectionTitle from "../Components/SectionTitle";
import MenuItem from "../Components/MenuItem";

export default function PopularMenu() {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItem = data.filter(item => item.category === 'popular')
                setMenu(popularItem);
            })
    }, [])
    return (
        <section className="mb-20">
            <SectionTitle
                subHeading={'Popular Items'}
                heading={"From Our Menu"}
            ></SectionTitle>
            <div className="grid grid-cols-2 gap-3">
                {
                    menu.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </section>
    )
}

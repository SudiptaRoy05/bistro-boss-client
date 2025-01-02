
import SectionTitle from "../Components/SectionTitle";
import MenuItem from "../Components/MenuItem";
import useMenu from "../Hook/useMenu";

export default function PopularMenu() {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <section className="mb-20">
            <SectionTitle
                subHeading={'Popular Items'}
                heading={"From Our Menu"}
            ></SectionTitle>
            <div className="grid grid-cols-2 gap-3">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </section>
    )
}

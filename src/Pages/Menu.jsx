import { Helmet } from "react-helmet";
import COver from "./Shared/Cover/COver";
import menuBG from '../assets/menu/banner3.jpg'
import PopularMenu from "./PopularMenu";

export default function Menu() {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <COver img={menuBG} title={"Our Menu"} subTitle={"See our menu"}></COver>
            
        </div>
    )
}

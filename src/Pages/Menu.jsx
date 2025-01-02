import { Helmet } from "react-helmet";
import COver from "./Shared/Cover/COver";
import menuBG from '../assets/menu/banner3.jpg'
import desertBG from '../assets/menu/dessert-bg.jpeg'
import pizzaBG from '../assets/menu/pizza-bg.jpg'
import soupBG from '../assets/menu/soup-bg.jpg'
import saladBG from '../assets/menu/salad-bg.jpg'

import useMenu from "../Hook/useMenu";
import SectionTitle from "../Components/SectionTitle";
import MenuCategory from "./MenuCategory";

export default function Menu() {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* main cover  */}
            <COver img={menuBG} title={"Our Menu"} subTitle={"See our menu"}></COver>
            <SectionTitle
            subHeading={"Don't miss"}
            heading={"Today's Offer"}
            ></SectionTitle>
            {/* offered menu  */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu  */}

            <MenuCategory coverImg={desertBG} title={'dessert'} subTitle={"Once a desert always a desert"} items={dessert}></MenuCategory>

             {/* pizza menu  */}
             <MenuCategory coverImg={pizzaBG} title={'pizza'} subTitle={"Once a soup always a soup"} items={soup}></MenuCategory>


            {/* soup menu  */}
            <MenuCategory coverImg={soupBG} title={'soup'} subTitle={"Once a soup always a soup"} items={soup}></MenuCategory>
            
           
            {/* pizza menu  */}
            <MenuCategory coverImg={saladBG} title={'salad'} subTitle={"Once a salad always a salad"} items={salad}></MenuCategory>

        </div>
    )
}

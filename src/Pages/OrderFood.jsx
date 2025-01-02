import { useState } from 'react';
import orderCOver from '../assets/shop/banner2.jpg';
import COver from './Shared/Cover/COver';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FoodCard from './Shared/FoodCard';
import useMenu from '../Hook/useMenu';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function OrderFood() {
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"]
    const { category } = useParams();

    const initialIndex = categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0;


    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = useMenu();
    const pizza = menu.filter(item => item.category === 'pizza');
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const drink = menu.filter(item => item.category === 'drinks');

    return (
        <div>

            <Helmet>
                <title>Bistro-Boss | Order Food</title>
            </Helmet>
            <COver
                img={orderCOver}
                title={"Order Food"}
                subTitle={"Browse our menu and place your order now"}
            />


            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="flex gap-4 justify-center mt-8">
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drink}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
}

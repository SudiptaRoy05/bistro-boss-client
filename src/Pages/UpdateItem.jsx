
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle";

export default function UpdateItem() {
    const item = useLoaderData() || {};
    console.log(item)

    return (
        <div>
            <SectionTitle
                heading={"Update Item"}
                subHeading={"Update Info Hurry up"}
            ></SectionTitle>
        </div>
    )
}

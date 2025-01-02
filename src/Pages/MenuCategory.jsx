import { Link } from "react-router-dom"
import MenuItem from "../Components/MenuItem"
import COver from "./Shared/Cover/COver"

export default function MenuCategory({ items, coverImg, title, subTitle }) {
    return (
        <div className="mb-16">
            {title && <COver img={coverImg}
                title={title}
                subTitle={subTitle}></COver>}
            <div className="grid grid-cols-2 gap-3">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/orderfood/${title}`}><button className="btn btn-outline border-b-4 btn-primary">Order Now</button></Link>
        </div>
    )
}

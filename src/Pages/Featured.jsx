import SectionTitle from "../Components/SectionTitle";
import featuredImg from "../../src/assets/home/featured.jpg"
import './featured.css'

export default function Featured() {
  return (
    <div className="featured-item bg-cover bg-fixed mb-20 pt-8 text-white">
      <section>
        <SectionTitle
        subHeading={"Check it out"}
        heading={"Featured Item"}
        ></SectionTitle>
        <div className="flex justify-center items-center gap-3 pb-24 w-2/3 mx-auto bg-black bg-opacity-15">
            <div>
                <img className="w-[700px]" src={featuredImg} alt="" />
            </div>
            <div className="text-white">
                <p>Aug 20, 2029</p>
                <p className="uppercase">Where can i get some ? </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque explicabo impedit expedita ipsum facilis nulla assumenda cupiditate quos reiciendis ab, commodi molestiae amet placeat libero quam ad quis ut minima?</p>
                <button className="btn btn-outline border-b-4 btn-primary">Order Now</button>
            </div>
        </div>
      </section>
    </div>
  )
}

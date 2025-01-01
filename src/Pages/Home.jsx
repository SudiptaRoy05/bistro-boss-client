import Banner from "./Banner";
import Category from "./Category/Category";
import Featured from "./Featured";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  )
}

import SectionTitle from "../Components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

export default function Testimonials() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])
    return (
        <section className="mb-20">
            <SectionTitle
                subHeading={"What our client say"}
                heading={"Testimonials"}
            ></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="mx-20 flex flex-col items-center gap-4">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={3}
                                readOnly
                            />

                            <p>{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>

        </section>

    )
}

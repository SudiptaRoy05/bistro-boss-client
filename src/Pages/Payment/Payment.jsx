import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// todo:Add key 
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)

export default function Payment() {
    return (
        <div>
            <SectionTitle
                heading={"Payment"}
                subHeading={"Please pay to it"}
            >
            </SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    )
}

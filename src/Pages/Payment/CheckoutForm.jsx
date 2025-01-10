import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error)
        } else {
            console.log('payment method', paymentMethod)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white shadow-md rounded-md p-4">
                <CardElement
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#374151',
                                '::placeholder': {
                                    color: '#9CA3AF',
                                },
                            },
                            invalid: {
                                color: '#DC2626',
                            },
                        },
                    }}
                />
            </div>
            <button
                className="btn btn-primary w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
                type="submit"
                disabled={!stripe}
            >
                Pay
            </button>
        </form>
    )
}
